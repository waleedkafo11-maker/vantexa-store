const USDT_TRC20_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const TEST_PRICE_USDT = 2;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const txid = String(body.txid || "").trim();
    const orderNo = String(body.order_no || "").trim();

    if (!orderNo) {
      return json({
        ok: false,
        error: "Order number is missing"
      }, 400);
    }

    if (!/^[a-fA-F0-9]{64}$/.test(txid)) {
      return json({
        ok: false,
        error: "Enter a valid 64-character TXID"
      }, 400);
    }

    /*
      Cloudflare wallet variable.
      Supports both names so we don't get blocked
      by a variable-name mismatch.
    */
    const STORE_WALLET =
      String(
        env.TRC20_WALLET ||
        env.TRC20_WALLET_ADDRESS ||
        ""
      ).trim();

    if (!STORE_WALLET) {
      return json({
        ok: false,
        error: "Store wallet is not configured"
      }, 500);
    }

    if (!env.DB) {
      return json({
        ok: false,
        error: "Database is not connected"
      }, 500);
    }

    // Create a small table used only to prevent TXID reuse.
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS used_payment_txids (
        txid TEXT PRIMARY KEY,
        order_no TEXT NOT NULL,
        amount REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    const alreadyUsed = await env.DB.prepare(
      "SELECT txid FROM used_payment_txids WHERE txid = ? LIMIT 1"
    ).bind(txid).first();

    if (alreadyUsed) {
      return json({
        ok: false,
        error: "This TXID has already been used"
      }, 409);
    }

    const headers = {
      "accept": "application/json"
    };

    if (env.TRONGRID_API_KEY) {
      headers["TRON-PRO-API-KEY"] = env.TRONGRID_API_KEY;
    }

    const url =
      "https://api.trongrid.io/v1/transactions/" +
      encodeURIComponent(txid) +
      "/events?only_confirmed=true";

    const response = await fetch(url, {
      method: "GET",
      headers
    });

    if (!response.ok) {
      return json({
        ok: false,
        error: "Unable to verify payment on TRON"
      }, 502);
    }

    const result = await response.json();

    const events =
      Array.isArray(result.data)
        ? result.data
        : [];

    let validTransfer = null;
    let receivedAmount = 0;

    for (const event of events) {
      if (event.event_name !== "Transfer") {
        continue;
      }

      const contract =
        String(
          event.contract_address ||
          event.contract ||
          ""
        ).trim();

      if (contract !== USDT_TRC20_CONTRACT) {
        continue;
      }

      if (!event.result) {
        continue;
      }

      const to =
        String(event.result.to || "").trim();

      const rawValue =
        String(
          event.result.value ??
          event.result._value ??
          ""
        );

      const amount =
        Number(rawValue) / 1000000;

      if (
        to === STORE_WALLET &&
        Number.isFinite(amount) &&
        amount >= TEST_PRICE_USDT
      ) {
        validTransfer = event;
        receivedAmount = amount;
        break;
      }
    }

    if (!validTransfer) {
      return json({
        ok: false,
        error: "No confirmed matching USDT payment was found"
      }, 400);
    }

    // Register TXID only after successful verification.
    try {
      await env.DB.prepare(`
        INSERT INTO used_payment_txids
        (txid, order_no, amount)
        VALUES (?, ?, ?)
      `).bind(
        txid,
        orderNo,
        receivedAmount
      ).run();

    } catch (e) {
      return json({
        ok: false,
        error: "This TXID has already been used"
      }, 409);
    }

    return json({
      ok: true,
      paid: true,
      order_no: orderNo,
      txid,
      amount: receivedAmount,
      message: "Payment confirmed successfully"
    });

  } catch (error) {
    return json({
      ok: false,
      error: "Verification failed"
    }, 500);
  }
}
