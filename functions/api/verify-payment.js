const USDT_TRC20_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

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
    const expectedAmount = Number(body.amount);

    const orderNo = String(body.order_no || "").trim();
    const customerName = String(body.name || "").trim();
    const customerEmail = String(body.email || "").trim();

    const productKey = String(body.product_key || "").trim();
    const productId = body.product_id || null;
    const productName = String(body.product_name || "").trim();

    // -----------------------------
    // Validate transaction data
    // -----------------------------

    if (!/^[a-fA-F0-9]{64}$/.test(txid)) {
      return json({
        ok: false,
        error: "TXID غير صحيح",
        message: "TXID غير صحيح"
      }, 400);
    }

    if (!Number.isFinite(expectedAmount) || expectedAmount <= 0) {
      return json({
        ok: false,
        error: "قيمة الطلب غير صحيحة",
        message: "قيمة الطلب غير صحيحة"
      }, 400);
    }

    // -----------------------------
    // Store wallet
    // -----------------------------

    if (!env.TRC20_WALLET) {
      return json({
        ok: false,
        error: "محفظة المتجر غير مضبوطة",
        message: "محفظة المتجر غير مضبوطة"
      }, 500);
    }

    const headers = {
      accept: "application/json"
    };

    if (env.TRONGRID_API_KEY) {
      headers["TRON-PRO-API-KEY"] = env.TRONGRID_API_KEY;
    }

    // -----------------------------
    // Ask TronGrid for TX events
    // -----------------------------

    const url =
      "https://api.trongrid.io/v1/transactions/" +
      encodeURIComponent(txid) +
      "/events";

    const response = await fetch(url, {
      headers
    });

    if (!response.ok) {
      return json({
        ok: false,
        error: "تعذر التحقق من شبكة TRON",
        message: "تعذر التحقق من شبكة TRON"
      }, 502);
    }

    const result = await response.json();

    const events =
      Array.isArray(result.data)
        ? result.data
        : [];

    // -----------------------------
    // Find USDT Transfer
    // -----------------------------

    const transfer = events.find((event) => {

      if (event.event_name !== "Transfer") {
        return false;
      }

      const contract =
        event.contract_address ||
        event.contract ||
        "";

      return contract === USDT_TRC20_CONTRACT;
    });

    if (!transfer || !transfer.result) {
      return json({
        ok: false,
        error: "لم يتم العثور على تحويل USDT مطابق",
        message: "لم يتم العثور على تحويل USDT مطابق"
      }, 400);
    }

    // -----------------------------
    // Read receiver and amount
    // -----------------------------

    const to = String(
      transfer.result.to || ""
    );

    const rawValue = String(
      transfer.result.value ??
      transfer.result._value ??
      ""
    );

    const amount =
      Number(rawValue) / 1_000_000;

    if (!Number.isFinite(amount)) {
      return json({
        ok: false,
        error: "تعذر قراءة قيمة التحويل",
        message: "تعذر قراءة قيمة التحويل"
      }, 400);
    }

    // -----------------------------
    // Check receiving wallet
    // -----------------------------

    if (to !== env.TRC20_WALLET) {
      return json({
        ok: false,
        error: "التحويل ليس إلى محفظة VANTEXA",
        message: "التحويل ليس إلى محفظة VANTEXA"
      }, 400);
    }

    // -----------------------------
    // Check exact payment amount
    // -----------------------------

    if (
      Math.abs(amount - expectedAmount) >
      0.000001
    ) {
      return json({
        ok: false,
        error: "قيمة التحويل لا تطابق قيمة الطلب",
        message: "قيمة التحويل لا تطابق قيمة الطلب",
        received_amount: amount,
        expected_amount: expectedAmount
      }, 400);
    }

    // -----------------------------
    // Payment verified
    // -----------------------------

    return json({
      ok: true,
      paid: true,

      order_no: orderNo,

      txid: txid,
      amount: amount,

      customer: {
        name: customerName,
        email: customerEmail
      },

      product: {
        key: productKey,
        id: productId,
        name: productName
      },

      message: "تم التحقق من الدفع بنجاح"
    });

  } catch (error) {

    return json({
      ok: false,
      error: "حدث خطأ أثناء التحقق من الدفع",
      message: "حدث خطأ أثناء التحقق من الدفع"
    }, 500);
  }
}
