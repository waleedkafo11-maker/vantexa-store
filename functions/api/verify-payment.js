const USDT_TRC20_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

const PRODUCTS = {
  "sniper-real": {
    name: "Sniper Real Predictor",
    price: 1,
    download: "/Sniper_Real_Predictor_VANTEXA.zip"
  }
};

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
    const productKey = String(body.product_key || "").trim();
    const orderNo = String(body.order_no || "").trim();
    const customerName = String(body.name || "").trim();
    const customerEmail = String(body.email || "").trim();

    const product = PRODUCTS[productKey];

    if (!product) {
      return json({
        ok: false,
        message: "المنتج غير صحيح"
      }, 400);
    }

    if (!/^[a-fA-F0-9]{64}$/.test(txid)) {
      return json({
        ok: false,
        message: "TXID غير صحيح"
      }, 400);
    }

    if (!env.TRC20_WALLET) {
      return json({
        ok: false,
        message: "محفظة المتجر غير مضبوطة"
      }, 500);
    }

    const headers = {
      accept: "application/json"
    };

    if (env.TRONGRID_API_KEY) {
      headers["TRON-PRO-API-KEY"] = env.TRONGRID_API_KEY;
    }

    const url =
      "https://api.trongrid.io/v1/transactions/" +
      encodeURIComponent(txid) +
      "/events";

    const response = await fetch(url, { headers });

    if (!response.ok) {
      return json({
        ok: false,
        message: "تعذر التحقق من شبكة TRON"
      }, 502);
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
      }, 400);
    }

    const to = String(transfer.result.to || "");

    const rawValue = String(
      transfer.result.value ??
      transfer.result._value ??
      ""
    );

    const amount = Number(rawValue) / 1000000;

    if (!Number.isFinite(amount)) {
      return json({
        ok: false,
        message: "تعذر قراءة قيمة التحويل"
      }, 400);
    }

    if (to !== env.TRC20_WALLET) {
      return json({
        ok: false,
        message: "التحويل ليس إلى محفظة VANTEXA"
      }, 400);
    }

    if (Math.abs(amount - product.price) > 0.000001) {
      return json({
        ok: false,
        message: "قيمة التحويل لا تطابق سعر المنتج",
        received_amount: amount,
        expected_amount: product.price
      }, 400);
    }

    return json({
      ok: true,
      paid: true,
      order_no: orderNo,
      txid,
      amount,
      customer: {
        name: customerName,
        email: customerEmail
      },
      product: {
        key: productKey,
        name: product.name
      },
      download: product.download,
      message: "تم التحقق من الدفع بنجاح"
    });

  } catch (error) {
    return json({
      ok: false,
      message: "حدث خطأ أثناء التحقق من الدفع"
    }, 500);
  }
}
