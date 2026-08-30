const pages=[...document.querySelectorAll('.page')];

function go(id){
  pages.forEach(p=>p.classList.toggle('active',p.id==='page-'+id));
  window.scrollTo({top:0,behavior:'smooth'});
  history.replaceState(null,'','#'+id);
}

const products={
  'sniper-real':{
    name:'Sniper Real Predictor',
    type:'MT5 INDICATOR',
    cover:'assets/covers/indicator1.png',
    badge:'MT5 • EURUSD • M1',
    platform:'MT5',
    market:'EURUSD',
    tf:'M1',
    use:'إشارة ثم تنفيذ يدوي',
    price:2,
    rating:'★★★★☆ <small>VANTEXA 8.0/10</small>',
    desc:'مؤشر سريع مخصص لقراءة حركة EURUSD على فريم الدقيقة. يجمع اتجاه المتوسطات مع الزخم وقوة الحركة ليعرض BUY أو SELL على الشارت ويرسل التنبيه للهاتف.',
    how:'يقرأ الشمعة المغلقة، يقارن EMA 5 وEMA 8 لتحديد الاتجاه القصير، يستخدم RSI 10 للزخم، ثم يمرر الإشارة عبر ADX 14 وATR 14 لتقليل الفرص الضعيفة. عند اكتمال الشروط تظهر الإشارة على الشارت ويصل التنبيه. الدخول المقترح يكون مع الشمعة التالية، والمدة عادة 1–3 دقائق حسب الإشارة.',
    features:[
      'BUY / SELL واضحة على الشارت',
      'EMA 5/8 + RSI 10 + ADX 14 + ATR 14',
      'تنبيه Push للهاتف وتنبيه صوتي',
      'فلترة الرمز والفريم',
      'قراءة الشمعة المغلقة لتقليل التذبذب',
      'مناسب للتنفيذ اليدوي على منصة التداول'
    ],
    settings:'يمكن ضبط فترات EMA وRSI وADX وATR، حد قوة ADX، خيارات تقييد EURUSD وM1، والتنبيهات. الإعداد الافتراضي مصمم ليكون سريعًا وواضحًا على M1.',
    install:'ضع ملف المؤشر داخل MQL5/Indicators، أعد تشغيل MT5 أو حدّث Navigator، اسحب المؤشر إلى شارت EURUSD M1، فعّل التنبيهات وPush Notifications إذا رغبت في استقبال الإشارة على الهاتف.',
    test:'تقييم VANTEXA الفني 8.0/10: منطق متعدد الفلاتر، إدارة سليمة لمقابض المؤشرات، فحوص للبيانات، وتنبيهات واضحة. السعر الحالي 1 USDT مخصص لاختبار دورة الشراء والتنزيل داخل المتجر.'
  },

  'pocket-sniper':{
    name:'Pocket Sniper PRO',
    type:'SIGNAL TOOL',
    cover:'assets/covers/indicator2.png',
    badge:'SIGNAL TOOL',
    platform:'TradingView / Manual',
    market:'أزواج متعددة',
    tf:'حسب الإعداد',
    use:'إشارة ثم تنفيذ يدوي',
    price:19,
    rating:'★★★★☆ <small>VANTEXA 7.5/10</small>',
    desc:'أداة إشارات بصرية مصممة لفلترة الاتجاه وإظهار مناطق دخول أوضح للمتداول اليدوي.',
    how:'تراقب اتجاه السوق أولًا ثم تسمح بالإشارة عندما تتوافق شروط الفلترة. تظهر CALL/PUT أو BUY/SELL بصريًا، ويقوم المتداول بالتنفيذ يدويًا على المنصة التي يستخدمها.',
    features:[
      'فلتر اتجاه قبل الإشارة',
      'إشارات دخول واضحة',
      'مناسبة للتنفيذ اليدوي',
      'قراءة مباشرة على الشارت',
      'إعدادات مرنة حسب السوق'
    ],
    settings:'تتضمن إعدادات فلترة الاتجاه وقوة الإشارة والجلسة والتنبيهات بحسب النسخة المعتمدة.',
    install:'تُضاف الأداة إلى TradingView أو المنصة المحددة في حزمة المنتج، ثم تُضبط الفلاتر ويبدأ الاستخدام على الشارت.',
    test:'تقييم VANTEXA الفني 7.5/10 بناءً على وضوح منطق الفلترة وسهولة الاستخدام.'
  },

  'super-signal':{
    name:'Super Signal Ultra',
    type:'TRADINGVIEW SIGNAL',
    cover:'assets/covers/indicator3.png',
    badge:'TRADINGVIEW',
    platform:'TradingView',
    market:'أزواج متعددة',
    tf:'حسب الشارت',
    use:'تحليل وإشارات',
    price:24,
    rating:'★★★★☆ <small>VANTEXA 7.0/10</small>',
    desc:'مؤشر TradingView يجمع إشارات الاتجاه مع منطق الانعكاس لتوضيح فرص الاستمرار أو الارتداد على الشارت.',
    how:'يحلل الاتجاه ويبحث عن شروط انعكاس متوافقة، ثم يرسم الإشارة على الشارت عند تحقق المنطق. الهدف هو تقليل الدخول العشوائي وإعطاء المتداول نقطة مرئية واضحة.',
    features:[
      'Trend Signals',
      'Reversal Logic',
      'إشارات CALL/PUT أو BUY/SELL',
      'تنبيهات بصرية',
      'يعمل داخل TradingView'
    ],
    settings:'فترات المؤشرات وحساسية الانعكاس والتنبيه قابلة للضبط من إعدادات المؤشر.',
    install:'أضف Pine Script إلى TradingView، احفظه، ثم Add to chart واضبط الإعدادات حسب الزوج والفريم.',
    test:'تقييم VANTEXA الفني 7.0/10: فكرة واضحة تجمع الاتجاه والانعكاس في أداة واحدة.'
  },

  'zero-loss':{
    name:'Zero-Loss Manager',
    type:'MT5 TRADE MANAGER',
    cover:'assets/covers/bot_iron.png',
    badge:'MT5 BOT',
    platform:'MT5',
    market:'حسب الحساب',
    tf:'غير مرتبط بفريم',
    use:'إدارة الصفقات',
    price:29,
    rating:'★★★★☆ <small>VANTEXA 7.0/10</small>',
    desc:'مساعد آلي لإدارة الصفقات على MT5، مصمم لتنظيم الخروج ومتابعة الصفقات بدل المتابعة اليدوية المستمرة.',
    how:'يعمل كمدير للصفقات المفتوحة على MT5 ويطبق قواعد الإدارة المحددة في إعداداته على الصفقات التي يتابعها. مناسب لمن يريد فصل قرار الدخول عن إدارة الخروج.',
    features:[
      'إدارة صفقات على MT5',
      'تشغيل مستمر مع المنصة',
      'واجهة إعدادات مباشرة',
      'مناسب لإدارة صفقات يدوية أو آلية حسب الإعداد'
    ],
    settings:'إعدادات الإدارة تظهر من نافذة Inputs في MT5 وتُضبط قبل التشغيل حسب أسلوب المتداول.',
    install:'ضع ملف EX5 داخل MQL5/Experts، أعد تشغيل MT5، اسحب الأداة إلى الشارت وفعّل Algo Trading ثم اضبط Inputs.',
    test:'تقييم VANTEXA الفني 7.0/10 كأداة إدارة صفقات. التفاصيل الفنية الداخلية تبقى ضمن فحص الإدارة ولا تُعرض كرسالة سلبية للعميل.'
  },

  'true-signal':{
    name:'Sniper True Signal',
    type:'MT5 INDICATOR',
    cover:'assets/covers/indicator4.png',
    badge:'MT5',
    platform:'MT5',
    market:'حسب الإعداد',
    tf:'M1–M5',
    use:'إشارات دخول',
    price:19,
    rating:'★★★☆☆ <small>VANTEXA 6.5/10</small>',
    desc:'مؤشر MT5 لإظهار فرص BUY وSELL مباشرة على الشارت بطريقة سريعة وواضحة.',
    how:'يراقب حركة السعر وشروط الإشارة ثم يضع العلامة على الشارت عند اكتمالها، ليستخدمها المتداول كنقطة مساعدة لاتخاذ قرار الدخول.',
    features:[
      'BUY / SELL على الشارت',
      'تنبيهات مباشرة',
      'واجهة بسيطة',
      'مناسب للفريمات السريعة'
    ],
    settings:'يمكن ضبط حساسية الإشارة والتنبيهات والإعدادات المتاحة داخل Inputs.',
    install:'ضع المؤشر في MQL5/Indicators ثم شغله على الشارت المطلوب واضبط التنبيهات.',
    test:'تقييم VANTEXA الفني 6.5/10؛ أداة مباشرة وسهلة الاستخدام مع مجال للتطوير بفلاتر إضافية.'
  },

  'time-predictor':{
    name:'Sniper Time Predictor',
    type:'MT5 TIMING INDICATOR',
    cover:'assets/covers/indicator5.png',
    badge:'MT5',
    platform:'MT5',
    market:'حسب الإعداد',
    tf:'M1–M5',
    use:'توقيت الدخول',
    price:24,
    rating:'★★★☆☆ <small>VANTEXA 6.0/10</small>',
    desc:'مؤشر توقيت يساعد المتداول على اختيار لحظة الدخول وعرض الإشارة بصريًا على الشارت.',
    how:'يجمع عدة شروط داخلية ثم يعرض توقيت الإشارة المقترح على الشارت، مع تنبيه يساعد المتداول على متابعة الفرص السريعة.',
    features:[
      'توقيت دخول مرئي',
      'تنبيهات MT5',
      'مناسب للفريمات السريعة',
      'واجهة واضحة على الشارت'
    ],
    settings:'خيارات التوقيت والتنبيهات والفلاتر تُضبط من Inputs حسب السوق المستخدم.',
    install:'ضع الملف في MQL5/Indicators، أعد تشغيل المنصة، ثم أضفه إلى الشارت واضبط الفريم والتنبيهات.',
    test:'تقييم VANTEXA الفني 6.0/10؛ مفيد كأداة توقيت مساعدة ويُفضّل استخدامه مع إدارة رأس مال منضبطة.'
  }
};

let currentProduct=products['sniper-real'];

function setProduct(id){
  const p=products[id]||products['sniper-real'];
  currentProduct=p;

  const cover=document.getElementById('productCover');
  cover.className='product-cover';
  cover.style.backgroundImage=`url(${p.cover})`;
  cover.style.backgroundSize='cover';
  cover.style.backgroundPosition='center';

  document.getElementById('productCoverBadge').textContent=p.badge;
  document.getElementById('productType').textContent=p.type;
  document.getElementById('productName').textContent=p.name;
  document.getElementById('productRating').innerHTML=p.rating;
  document.getElementById('productDesc').textContent=p.desc;
  document.getElementById('productPlatform').textContent=p.platform;
  document.getElementById('productMarket').textContent=p.market;
  document.getElementById('productTf').textContent=p.tf;
  document.getElementById('productUse').textContent=p.use;
  document.getElementById('productPrice').textContent=p.price;

  renderTab('desc');
}

function renderTab(tab){
  const p=currentProduct;
  const panel=document.getElementById('productTabPanel');

  if(!panel)return;

  let html='';

  if(tab==='desc'){
    html=`<h3>${p.name}</h3><p>${p.desc}</p>`;
  }

  if(tab==='how'){
    html='<h3>كيف يعمل؟</h3><p>'+p.how+'</p>';
  }

  if(tab==='features'){
    html='<h3>المميزات</h3><ul>'+
      p.features.map(x=>'<li>'+x+'</li>').join('')+
      '</ul>';
  }

  if(tab==='settings'){
    html='<h3>الإعدادات</h3><p>'+p.settings+'</p>';
  }

  if(tab==='install'){
    html='<h3>طريقة التركيب والاستخدام</h3><p>'+p.install+'</p>';
  }

  if(tab==='test'){
    html='<h3>تقييم VANTEXA الفني</h3><p>'+p.test+'</p>';
  }

  panel.innerHTML=html;
}

document.querySelectorAll('[data-go]').forEach(b=>{
  b.addEventListener('click',()=>{
    if(b.dataset.product)setProduct(b.dataset.product);
    go(b.dataset.go);
  });
});

document.querySelectorAll('.tabs [data-tab]').forEach(b=>{
  b.addEventListener('click',()=>{
    document.querySelectorAll('.tabs [data-tab]').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    renderTab(b.dataset.tab);
  });
});

const initial=(location.hash||'#home').slice(1);

if(document.getElementById('page-'+initial)){
  go(initial);
}

setProduct('sniper-real');

let cart=[];

const cartCount=document.getElementById('cartCount');
const drawer=document.getElementById('cartDrawer');
const overlay=document.getElementById('overlay');
const cartContent=document.getElementById('cartContent');

function renderCart(){
  cartCount.textContent=cart.length;

  if(cart.length){
    const p=cart[0];

    cartContent.innerHTML=
      `<div class="cart-item">
        <b>${p.name}</b>
        <span>${p.price} USDT — ${p.platform}</span>
        <button class="primary wide" id="cartCheckout" style="margin-top:12px">إتمام الطلب</button>
      </div>`;

    document.getElementById('cartCheckout').onclick=()=>{
      closeCart();
      updateCheckout(p);
      go('checkout');
    };
  }else{
    cartContent.innerHTML='<div class="empty">السلة فارغة</div>';
  }
}

function openCart(){
  drawer.classList.add('open');
  overlay.classList.add('show');
}

function closeCart(){
  drawer.classList.remove('open');
  overlay.classList.remove('show');
}

document.getElementById('cartBtn').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
overlay.onclick=closeCart;

document.getElementById('addProduct').onclick=()=>{
  cart=[currentProduct];
  renderCart();
  openCart();
};

renderCart();

function updateCheckout(p){
  document.getElementById('checkoutName').textContent=p.name;
  document.getElementById('checkoutMeta').textContent=`${p.platform} — ${p.market} ${p.tf}`;
  document.getElementById('checkoutItemPrice').textContent=p.price+' USDT';
  document.getElementById('checkoutPrice').textContent=p.price+' USDT';
  document.getElementById('checkoutTotal').textContent=p.price+' USDT';

  document.querySelectorAll('#page-payment .amount').forEach(am=>{
    am.textContent=Number(p.price).toFixed(4)+' USDT';
  });
}

let currentOrder=null;

const productDbIds={
  'sniper-real':1,
  'pocket-sniper':2,
  'super-signal':3,
  'true-signal':4,
  'time-predictor':5,
  'zero-loss':6
};

let currentProductKey='sniper-real';

const _setProduct=setProduct;

setProduct=function(id){
  currentProductKey=id;
  return _setProduct(id);
};

async function createOrder(method='USDT_TRC20'){

  if(!cart[0]){
    throw new Error('Choose a product first');
  }

  const name=(document.getElementById('coName')?.value||'').trim();
  const email=(document.getElementById('coEmail')?.value||'').trim();

  if(!name){
    throw new Error('Enter your name');
  }

  if(
    !email ||
    email.indexOf('@')<1 ||
    email.lastIndexOf('.')<email.indexOf('@')+2
  ){
    throw new Error('Enter a valid email');
  }

  const makePreviewOrder=()=>{

    const stamp=Date.now().toString().slice(-8);

    currentOrder={
      order_no:'VTX-'+stamp,
      pay_amount:Number(cart[0].price),
      payment_method:method,
      preview_only:true,
      name:name,
      email:email,
      product_key:currentProductKey,
      product_id:productDbIds[currentProductKey],
      product_name:cart[0].name
    };

    document.querySelectorAll('#page-payment .amount').forEach(am=>{
      am.textContent=Number(cart[0].price).toFixed(4)+' USDT';
    });

    const note=document.getElementById('orderNote');

    if(note){
      note.textContent='Order '+currentOrder.order_no+' prepared.';
    }

    return currentOrder;
  };

  if(location.protocol==='file:'){
    return makePreviewOrder();
  }

  try{

    const r=await fetch('/api/orders',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      credentials:'same-origin',
      body:JSON.stringify({
        product_id:productDbIds[currentProductKey],
        product_key:currentProductKey,
        product_name:cart[0].name,
        amount:Number(cart[0].price),
        name:name,
        email:email,
        method:method
      })
    });

    const contentType=r.headers.get('content-type')||'';

    if(!r.ok || !contentType.includes('application/json')){
      return makePreviewOrder();
    }

    const d=await r.json();

    if(!d || !d.order_no){
      return makePreviewOrder();
    }

    currentOrder={
      ...d,
      name:d.name||name,
      email:d.email||email,
      product_key:d.product_key||currentProductKey,
      product_id:d.product_id||productDbIds[currentProductKey],
      product_name:d.product_name||cart[0].name,
      pay_amount:Number(d.pay_amount??cart[0].price)
    };

    document.querySelectorAll('#page-payment .amount').forEach(am=>{
      am.textContent=Number(currentOrder.pay_amount).toFixed(4)+' USDT';
    });

    const note=document.getElementById('orderNote');

    if(note){
      note.textContent='Order '+currentOrder.order_no+' created securely.';
    }

    return currentOrder;

  }catch(e){

    console.warn(
      'Order API unavailable; opening payment page in checkout mode.',
      e
    );

    return makePreviewOrder();
  }
}

document.getElementById('toPayment').onclick=async()=>{

  if(cart[0]){
    updateCheckout(cart[0]);
  }

  const b=document.getElementById('toPayment');

  b.disabled=true;

  try{

    await createOrder('USDT_TRC20');

    go('payment');

  }catch(e){

    alert(e.message);

  }finally{

    b.disabled=false;
  }
};

const payCards=[...document.querySelectorAll('.pay-card')];

payCards.forEach(c=>{

  c.onclick=()=>{

    payCards.forEach(x=>x.classList.remove('active'));

    c.classList.add('active');

    document
      .getElementById('usdtBox')
      .classList.toggle('hidden',c.dataset.pay!=='usdt');

    document
      .getElementById('binanceBox')
      .classList.toggle('hidden',c.dataset.pay!=='binance');
  };
});

document.getElementById('copyWallet').onclick=()=>{

  const t='TCQsnoXAkYGJwXWu3ASF2Mz4DRcSNodtXy';

  if(navigator.clipboard){
    navigator.clipboard.writeText(t);
  }

  document.getElementById('copyWallet').textContent='تم النسخ';
};

document.getElementById('verifyPayment').onclick=async()=>{

  const tx=(document.getElementById('txid').value||'').trim();

  const st=document.getElementById('usdtStatus');

  if(!currentOrder){

    st.textContent='Order not created';
    st.className='pay-status wait';
    return;
  }

  if(!/^[a-fA-F0-9]{64}$/.test(tx)){

    st.textContent='Enter a valid 64-character TXID';
    st.className='pay-status wait';
    return;
  }

  st.textContent='Verifying confirmed TRC20 payment…';
  st.className='pay-status wait';

  try{

    const r=await fetch('/api/verify-payment',{

      method:'POST',

      headers:{
        'content-type':'application/json'
      },

      credentials:'same-origin',

      body:JSON.stringify({

        order_no:currentOrder.order_no,

        txid:tx,

        amount:Number(currentOrder.pay_amount),

        name:currentOrder.name,

        email:currentOrder.email,

        product_key:currentOrder.product_key,

        product_id:currentOrder.product_id,

        product_name:currentOrder.product_name

      })
    });

    const contentType=r.headers.get('content-type')||'';

    if(!contentType.includes('application/json')){
      throw new Error('Payment server returned an invalid response');
    }

    const d=await r.json();

    if(!r.ok || !d.ok){
      throw new Error(d.error||'Verification failed');
    }

    st.textContent='Payment confirmed ✓';
    st.className='pay-status ok';

    const dl=document.getElementById('secureDownload');

    if(dl && d.download){

      dl.dataset.url=d.download;

      dl.onclick=()=>{
        location.href=d.download;
      };
    }

    go('success');

  }catch(e){

    st.textContent=e.message||'Verification failed';
    st.className='pay-status wait';
  }
};

const binancePaid=document.getElementById('binancePaid');

if(binancePaid){

  binancePaid.onclick=async()=>{

    const st=document.getElementById('binanceStatus');

    try{

      if(
        !currentOrder ||
        currentOrder.payment_method!=='BINANCE_PAY'
      ){
        currentOrder=await createOrder('BINANCE_PAY');
      }

      st.textContent=
        'Payment submitted. Your order is pending confirmation.';

      st.className='pay-status wait';

    }catch(e){

      st.textContent=e.message;
      st.className='pay-status wait';
    }
  };
}

const chat=document.getElementById('chat');
const chatInput=document.getElementById('chatInput');

function send(){

  const q=chatInput.value.trim();

  if(!q)return;

  const safe=q.replace(/[<>]/g,'');

  chat.insertAdjacentHTML(
    'beforeend',
    '<div class="msg user">'+safe+'</div>'
  );

  chatInput.value='';

  setTimeout(()=>{

    chat.insertAdjacentHTML(
      'beforeend',
      '<div class="msg bot">خدمة AI الحقيقية ستُربط بقاعدة معرفة VANTEXA عند النشر. لن أختلق إجابة محلية لهذا السؤال.</div>'
    );

    chat.scrollTop=chat.scrollHeight;

  },120);
}

document.getElementById('chatSend').onclick=send;

chatInput.addEventListener('keydown',e=>{

  if(e.key==='Enter'){
    send();
  }
});

(async()=>{

  if(location.protocol==='file:'){
    return;
  }

  try{

    const r=await fetch('/api/products',{
      credentials:'same-origin'
    });

    if(!r.ok){
      return;
    }

    const a=await r.json();

    const keys=[
      'sniper-real',
      'pocket-sniper',
      'super-signal',
      'true-signal',
      'time-predictor',
      'zero-loss'
    ];

    a.forEach((db,i)=>{

      const k=keys[i];
      const p=products[k];

      if(!p){
        return;
      }

      p.name=db.name||p.name;
      p.price=Number(db.price??p.price);
      p.platform=db.platform||p.platform;
      p.market=db.symbol||p.market;
      p.tf=db.timeframe||p.tf;
      p.desc=db.description||p.desc;

      if(db.image){
        p.cover=db.image;
      }

      if(db.technical_rating){
        p.rating='★★★★☆ <small>VANTEXA '+db.technical_rating+'</small>';
      }
    });

  }catch(e){

    console.warn('Using bundled product catalog',e);
  }
})();

const secureDl=document.getElementById('secureDownload');

if(secureDl){

  secureDl.onclick=()=>{

    if(secureDl.dataset.url){
      location.href=secureDl.dataset.url;
      return;
    }

    alert('Download becomes available after confirmed payment.');
  };
}
