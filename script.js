/* script.js
   - Language switching (English / Hindi / Odia)
   - Theme toggle with smooth transitions
   - Demo pincode finder (mock DB)
   - Animated chat popup with typing effect + canned multilingual answers
*/

(() => {
  // --- DOM references
  const body = document.body;
  const themeBtn = document.getElementById('themeBtn');
  const langBtn = document.getElementById('langBtn');
  const chatFab = document.getElementById('openChat');
  const chatWindow = document.getElementById('chatWindow');
  const closeChat = document.getElementById('closeChat');
  const sendBtn = document.getElementById('sendBtn');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const chatLang = document.getElementById('chatLang');
  const startBtn = document.getElementById('startBtn');
  const findBtn = document.getElementById('findBtn');
  const pincodeInput = document.getElementById('pincode');
  const foundEl = document.getElementById('found');

  // --- initial state
  let theme = localStorage.getItem('theme') || 'light';
  let lang  = localStorage.getItem('lang') || 'en';
  body.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';

  // --- i18n dictionary
  const L = {
    en: {
      langName:'English',
      heroTitle:'Empowering Rural Communities with Health Awareness',
      heroLead:'Get reliable health information, find nearby healthcare centers, and access government health policies — in your preferred language.',
      start:'Start Your Health Journey',
      t1:'Health Information', d1:'Access reliable health tips and medical guidance',
      t2:'Medicine Guide', d2:'Find information about medicines and treatments',
      t3:'Healthcare Centers', d3:'Locate nearby hospitals and medical facilities',
      t4:'Vaccination Info', d4:'Stay updated on vaccination schedules and campaigns',
      t5:'Government Policies', d5:'Learn about health schemes and government initiatives',
      t6:'AI Health Assistant', d6:'Get instant answers to your health questions',
      emTitle:'Emergency Health Services', emLead:'In case of medical emergency, call these numbers immediately',
      langBtn:'🌐 English',
      greeting:'Hello! Ask about symptoms, vaccines, nearby hospitals, or government schemes. Try: "fever", "vaccine for children", "nearest hospital 751001"'
    },
    hi: {
      langName:'हिन्दी',
      heroTitle:'स्वास्थ्य जागरूकता के साथ ग्रामीण समुदायों को सशक्त बनाना',
      heroLead:'भरोसेमंद स्वास्थ्य जानकारी प्राप्त करें, नज़दीकी स्वास्थ्य केंद्र खोजें और सरकारी स्वास्थ्य नीतियों तक पहुँचें — अपनी पसंदीदा भाषा में।',
      start:'अपनी स्वास्थ्य यात्रा शुरू करें',
      t1:'स्वास्थ्य जानकारी', d1:'भरोसेمند स्वास्थ्य सुझाव और चिकित्सा मार्गदर्शन प्राप्त करें',
      t2:'दवा मार्गदर्शिका', d2:'दवाओं और उपचारों के बारे में जानकारी प्राप्त करें',
      t3:'स्वास्थ्य केंद्र', d3:'नज़दीकी अस्पताल और चिकित्सा सुविधाओं का पता लगाएं',
      t4:'टीकाकरण जानकारी', d4:'टीकाकरण शेड्यूल और अभियानों पर अपडेट रहें',
      t5:'सरकारी नीतियाँ', d5:'स्वास्थ्य योजनाओं और सरकारी पहलों के बारे में जानें',
      t6:'एआई हेल्थ असिस्टेंट', d6:'अपने स्वास्थ्य प्रश्नों के तुरंत उत्तर प्राप्त करें',
      emTitle:'आपातकालीन स्वास्थ्य सेवाएं', emLead:'चिकित्सा आपातकाल की स्थिति में, तुरंत इन नंबरों पर कॉल करें',
      langBtn:'🌐 हिन्दी',
      greeting:'नमस्ते! लक्षण, टीकाकरण, नज़दीकी अस्पताल, या सरकारी योजनाओं के बारे में पूछें। (उदाहरण: "बुखार", "बच्चों के लिए टीका", "नज़दीकी अस्पताल 751001")'
    },
    or: {
      langName:'ଓଡ଼ିଆ',
      heroTitle:'ସ୍ୱାସ୍ଥ୍ୟ ସଚେତନତା ସହିତ ଗ୍ରାମୀଣ ସମାଜକୁ ସଶକ୍ତ କରିବା',
      heroLead:'ଯଥାର୍ଥ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ପାଆନ୍ତୁ, ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ଖୋଜନ୍ତୁ ଏବଂ ସରକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ନୀତିଗୁଡ଼ିକୁ ଅନୁସରଣ କରନ୍ତୁ।',
      start:'ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ',
      t1:'ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା', d1:'ଯଥାର୍ଥ ସ୍ୱାସ୍ଥ୍ୟ ସୁପାରିଶ ଏବଂ ଚିକିତ୍ସା ସହାୟତା',
      t2:'ଔଷଧ ପରିଚୟ', d2:'ଔଷଧ ଏବଂ ଚିକିତ୍ସା ସମ୍ପର୍କରେ ତଥ୍ୟ ମିଳନ୍ତୁ',
      t3:'ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର', d3:'ନିକଟସ୍ଥ ହସ୍ପିଟାଲ ଏବଂ ଚିକିତ୍ସା ସୁବିଧା ଖୋଜନ୍ତୁ',
      t4:'ଟୀକା ସୂଚନା', d4:'ଟୀକାକରଣ ସୂଚୀ ଏବଂ ଅଭିଯାନ ପାଇଁ ଅଦ୍ୟତନ ରୁହନ୍ତୁ',
      t5:'ସରକାରୀ ନୀତି', d5:'ସ୍ୱାସ୍ଥ୍ୟ ଯୋଜନା ଏବଂ ସରକାରୀ ପଦକ୍ଷେପ ବିଷୟରେ ଜାଣନ୍ତୁ',
      t6:'ଏଆଇ ହେଲ୍ତ୍ ଅସିଷ୍ଟେଣ୍ଟ', d6:'ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନର ତତ୍କାଳ ଉତ୍ତର ପାଆନ୍ତୁ',
      emTitle:'ଆପାତକାଳୀନ ସ୍ୱାସ୍ଥ୍ୟ ସେବା', emLead:'ଚିକିତ୍ସା ଆପାତକାଳୀନ ପରିସ୍ଥିତିରେ, ତରଣ୍ଟ ଡାକ/ନମ୍ବରକୁ କଲ୍ କରନ୍ତୁ',
      langBtn:'🌐 ଓଡ଼ିଆ',
      greeting:'ନମସ୍କାର! ଲକ୍ଷଣ, ଟୀକା, ନିକଟସ୍ଥ ହସ୍ପିଟାଲ କିମ୍ବା ସରକାରୀ ଯୋଜନା ସମ୍ବନ୍ଧରେ ପ୍ରଶ୍ନ କରନ୍ତୁ। (ଉଦାହରଣ: "ଜ୍ୱର", "ଶିଶୁଙ୍କ ପାଇଁ ଟୀକା", "ନିକଟସ୍ଥ ହସ୍ପିଟାଲ 751001")'
    }
  };

  // --- helper to apply language strings to page
  function applyLang(l) {
    const dict = L[l];
    if (!dict) return;
    document.getElementById('heroTitle').textContent = dict.heroTitle;
    document.getElementById('heroLead').textContent = dict.heroLead;
    document.getElementById('startBtn').textContent = '❤️ ' + dict.start;
    document.getElementById('t1').textContent = dict.t1;
    document.getElementById('d1').textContent = dict.d1;
    document.getElementById('t2').textContent = dict.t2;
    document.getElementById('d2').textContent = dict.d2;
    document.getElementById('t3').textContent = dict.t3;
    document.getElementById('d3').textContent = dict.d3;
    document.getElementById('t4').textContent = dict.t4;
    document.getElementById('d4').textContent = dict.d4;
    document.getElementById('t5').textContent = dict.t5;
    document.getElementById('d5').textContent = dict.d5;
    document.getElementById('t6').textContent = dict.t6;
    document.getElementById('d6').textContent = dict.d6;
    document.getElementById('emTitle').textContent = dict.emTitle;
    document.getElementById('emLead').textContent = dict.emLead;
    langBtn.textContent = dict.langBtn;
    // greeting update
    const bot = chatBody.querySelector('.bot');
    if (bot) bot.textContent = dict.greeting;
    // store
    localStorage.setItem('lang', l);
  }

  // --- apply initial language
  applyLang(lang);
  // set chatLang select
  chatLang.value = lang;

  // --- theme toggle
  themeBtn.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', theme);
  });

  // --- header language switch (cycles)
  langBtn.addEventListener('click', () => {
    lang = lang === 'en' ? 'hi' : (lang === 'hi' ? 'or' : 'en');
    applyLang(lang);
  });

  // --- reveal animation for cards when in viewport
  const animated = Array.from(document.querySelectorAll('[data-anim]'));
  function handleScrollReveal() {
    const bottom = window.innerHeight;
    animated.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < bottom - 40) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('load', handleScrollReveal);
  window.addEventListener('scroll', handleScrollReveal);

  // --- demo pincode DB
  const db = {
    '751001': [{ name: 'Model Hospital — Bhubaneswar', dist: '2.4 km' }, { name: 'Community Health Center', dist: '6.1 km' }],
    '700001': [{ name: 'Salt Lake Clinic', dist: '1.2 km' }, { name: 'City Hospital', dist: '3.8 km' }]
  };

  findBtn.addEventListener('click', () => {
    const p = (pincodeInput.value || '').trim();
    foundEl.innerHTML = '';
    if (!p) {
      foundEl.innerHTML = `<div class="pill muted">Please enter pincode</div>`;
      return;
    }
    if (db[p]) {
      foundEl.innerHTML = db[p].map(x => `<div class="pill">📍 ${x.name} — ${x.dist}</div>`).join(' ');
    } else {
      foundEl.innerHTML = `<div class="pill muted">No demo data for this pincode. Try 751001 or 700001</div>`;
    }
  });

  // --- chat open/close with animation
  chatFab.addEventListener('click', openChatWindow);
  closeChat.addEventListener('click', closeChatWindow);

  function openChatWindow() {
    chatWindow.classList.add('open');
    chatWindow.setAttribute('aria-hidden', 'false');
    // focus input after animation
    setTimeout(() => chatInput.focus(), 260);
  }
  function closeChatWindow() {
    chatWindow.classList.remove('open');
    chatWindow.setAttribute('aria-hidden', 'true');
  }

  // also open chat when start button pressed
  startBtn.addEventListener('click', () => {
    openChatWindow();
  });

  // --- simple multilingual canned answers
  const faq = {
    en: {
      'fever': 'For fever: rest, hydrate, paracetamol (if no contraindication). If fever persists >3 days or is very high, consult a doctor.',
      'vaccine for children': 'Child vaccines follow the national schedule. Visit your local health centre (or call) for details under the Universal Immunization Program.',
      'nearest hospital': (p) => {
        if (db[p]) return 'Found: ' + db[p].map(x => x.name + ' (' + x.dist + ')').join(' | ');
        return 'No demo data for pincode ' + p + '. Try 751001 or 700001';
      }
    },
    hi: {
      'fever': 'बुखार के लिए: आराम करें, पर्याप्त पानी पिएं, पैरासिटामोल (यदि अनुमति हो)। 3 दिन से अधिक या तेज बुखार पर डॉक्टर से मिलें।',
      'vaccine for children': 'बच्चों के टीकाकरण राष्ट्रीय शेड्यूल के अनुसार होते हैं। विवरण के लिए अपने नज़दीकी स्वास्थ्य केंद्र से संपर्क करें।',
      'nearest hospital': (p) => {
        if (db[p]) return 'मिले: ' + db[p].map(x => x.name + ' (' + x.dist + ')').join(' | ');
        return 'पिनकोड ' + p + ' के लिए डेमो डेटा नहीं है। 751001 या 700001 आज़माएँ।';
      }
    },
    or: {
      'fever': 'ଜ୍ୱର ପାଇଁ: ଆରାମ କରନ୍ତୁ, ପର୍ଯ୍ୟାପ୍ତ ପାଣି ପିଇଁ, ପାରାସିଟାମଲ୍ (ଯଦି ଅନୁମତ)। 3 ଦିନ ରୁ ଅଧିକ କିମ୍ବା ଉଚ୍ଚ ଜ୍ୱର ହେଲେ ଡାକ୍ତରଙ୍କୁ ଯାଆନ୍ତୁ।',
      'vaccine for children': 'ଶିଶୁଙ୍କ ଟୀକା ଜାତୀୟ ଶେଡ୍ୟୁଲ୍ ଅନୁସାରେ। ବିସ୍ତୃତ ତଥ୍ୟ ପାଇଁ ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ସହଯୋଗ କରନ୍ତୁ।',
      'nearest hospital': (p) => {
        if (db[p]) return 'ମିଳିଲା: ' + db[p].map(x => x.name + ' (' + x.dist + ')').join(' | ');
        return 'ପିନକୋଡ୍ ' + p + ' ପାଇଁ ଡେମୋ ଡାଟା ନାହିଁ। 751001 କିମ୍ବା 700001 ଚେଷ୍ଟା କରନ୍ତୁ।';
      }
    }
  };

  // append message (with small animation)
  function appendMsg(text, who = 'bot') {
    const el = document.createElement('div');
    el.className = 'msg ' + (who === 'user' ? 'user' : 'bot');
    el.textContent = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // typing effect for bot responses
  function botReplyTyping(fullText) {
    // create empty bubble
    const bubble = document.createElement('div');
    bubble.className = 'msg bot';
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    let i = 0;
    const speed = 16; // ms per char (feel)
    function type() {
      if (i <= fullText.length) {
        bubble.textContent = fullText.slice(0, i);
        i++;
        chatBody.scrollTop = chatBody.scrollHeight;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // parse and answer queries
  function handleQuery(qRaw) {
    const q = (qRaw || '').trim();
    if (!q) return;
    appendMsg(q, 'user');
    // determine language for faq
    const langCode = chatLang.value || 'en';
    const low = q.toLowerCase();

    // check FAQ keys
    const keys = Object.keys(faq[langCode]);
    let answered = false;
    for (let k of keys) {
      if (low.includes(k)) {
        const ans = faq[langCode][k];
        if (typeof ans === 'function') {
          // for nearest hospital, extract pincode
          const match = low.match(/(\d{5,6})/);
          const p = match ? match[1] : '';
          const out = ans(p);
          botReplyTyping(out);
        } else {
          botReplyTyping(ans);
        }
        answered = true;
        break;
      }
    }

    if (!answered) {
      // fallback: simple suggestion + local help
      const fallback = {
        en: 'I am a demo assistant — for serious medical issues please consult a doctor. Try: "fever", "vaccine for children", "nearest hospital 751001"',
        hi: 'मैं एक डेमो सहायक हूँ — गंभीर मामलों में कृपया डॉक्टर से संपर्क करें। कोशिश करें: "बुखार", "बच्चों के लिए टीका", "नज़दीकी अस्पताल 751001"',
        or: 'ମୁଁ ଏକ ଡେମୋ ସହାୟକ — ଗୁରୁତର ସ୍ୱାସ୍ଥ୍ୟ ସମସ୍ୟା ପାଇଁ ଡାକ୍ତରଙ୍କୁ ସମ୍ପର୍କ କରନ୍ତୁ। ଚେଷ୍ଟା କରନ୍ତୁ: "ଜ୍ୱର", "ଶିଶୁଙ୍କ ପାଇଁ ଟୀକା", "ନିକଟସ୍ଥ ହସ୍ପିଟାଲ 751001"'
      }[langCode];
      botReplyTyping(fallback);
    }
  }

  // send button
  sendBtn.addEventListener('click', () => {
    const q = chatInput.value.trim();
    if (!q) return;
    chatInput.value = '';
    handleQuery(q);
  });

  // enter to send
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // chat language select changes greeting text
  chatLang.addEventListener('change', () => {
    const v = chatLang.value;
    const bot = chatBody.querySelector('.bot[data-id="greeting"]');
    // update the first bot greeting (if present)
    if (bot) bot.textContent = L[v].greeting || L.en.greeting;
    // also update main page text
    applyLang(v);
  });

  // start with stored language
  chatLang.value = lang;

  // small accessible behaviour: focus input when chat opens
  chatFab.addEventListener('click', () => setTimeout(() => chatInput.focus(), 280));

})();


