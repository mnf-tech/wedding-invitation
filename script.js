// ===================== PETAL AMBIENCE =====================
(function initPetals(){
  const field = document.getElementById('petalField');
  if(!field) return;
  const count = window.innerWidth < 600 ? 10 : 18;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = (8 + Math.random()*8) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    p.style.opacity = (0.35 + Math.random()*0.35).toFixed(2);
    p.style.width = p.style.height = (6 + Math.random()*8) + 'px';
    field.appendChild(p);
  }
})();

// ===================== TORAN LEAVES =====================
(function initToranLeaves(){
  const wrap = document.getElementById('toranLeaves');
  if(!wrap) return;
  const leafCount = 14;
  for(let i=0;i<leafCount;i++){
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.animationDelay = (i*0.06) + 's, ' + (1.2 + Math.random()) + 's';
    wrap.appendChild(leaf);
  }
})();

// ===================== SCROLL REVEAL =====================
(function initReveal(){
  const targets = document.querySelectorAll('.reveal-in, [data-reveal]');
  targets.forEach((el,i)=> el.style.setProperty('--i', i % 8));

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el=> io.observe(el));

  // Hero elements reveal immediately on load rather than waiting for scroll
  window.addEventListener('load', ()=>{
    document.querySelectorAll('.hero .reveal-in').forEach((el,i)=>{
      setTimeout(()=> el.classList.add('visible'), i*120);
    });
  });
})();

// ===================== COUNTDOWN =====================
(function initCountdown(){
  const target = new Date('2026-07-24T18:00:00+05:30').getTime();
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };
  if(!els.d) return;

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const now = Date.now();
    let diff = target - now;
    if(diff <= 0){
      els.d.textContent = els.h.textContent = els.m.textContent = els.s.textContent = '00';
      const label = document.querySelector('.countdown-label');
      if(label) label.textContent = 'शुभविवाह मंगलमय होवो! 🎉';
      clearInterval(timer);
      return;
    }
    const day = Math.floor(diff / 86400000);
    const hr  = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const sec = Math.floor((diff % 60000) / 1000);
    els.d.textContent = pad(day);
    els.h.textContent = pad(hr);
    els.m.textContent = pad(min);
    els.s.textContent = pad(sec);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();
