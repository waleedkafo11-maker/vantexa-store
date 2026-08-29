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

    if (!txid || txid.length < 32) {
      return json({ ok: false, message: "TXID غير صحيح" }, 400);
    }

    if (!Number.isFinite(expectedAmount) || expectedAmount <= 0) {
      return json({ ok: false, message: "قيمة الطلب غير صحيحة" }, 400);
    }

    if (!env.TRC20_WALLET) {
      return json({ ok: false, message: "محفظة المتجر غير مضبوطة" }, 500);
    }

    const headers = { accept: "application/json" };

    if (env.TRONGRID_API_KEY) {
      headers["TRON-PRO-API-KEY"] = env.TRONGRID_API_KEY;
    }

    const url =
      "https://api.trongrid.io/v1/transactions/" +
      encodeURIComponent(txid) +
      "/events";

    const response = await fetch(url, { headers });

    if (!response.ok) {
      return json({ ok: false, message: "تعذر التحقق من شبكة TRON" }, 502);
    }

    const result = await response.json();
    const events = Array.isArray(result.data) ? result.data : [];

    const transfer = events.find((event) => {
      if (event.event_name !== "Transfer") return false;

      const contract =
        event.contract_address ||
        event.contract ||
        "";

      return contract === USDT_TRC20_CONTRACT;
    });

    if (!transfer || !transfer.result) {
      return json({
        ok: false,
        message: "لم يتم العثور على تحويل USDT مطابق"
      });
    }

    const to = String(transfer.result.to || "");
    const rawValue = String(
      transfer.result.value ??
      transfer.result._value ??
      ""
    );

    const amount = Number(rawValue) / 1_000_000;

    if (to !== env.TRC20_WALLET) {
      return json({
        ok: false,
        message: "التحويل ليس إلى محفظة VANTEXA"
      });
    }

    if (Math.abs(amount - expectedAmount) > 0.000001) {
      return json({
        ok: false,
        message: "قيمة التحويل لا تطابق قيمة الطلب"
      });
    }

    return json({
      ok: true,
      paid: true,
      txid,
      amount,
      message: "تم التحقق من الدفع بنجاح"
    });

  } catch (error) {
    return json({
      ok: false,
      message: "حدث خطأ أثناء التحقق من الدفع"
    }, 500);
  }
}
