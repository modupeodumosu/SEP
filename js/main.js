// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    q.parentElement.classList.toggle('open');
  });
});

// Hub Directory notify form
const hubForm = document.getElementById('hub-form');
const hubSuccess = document.getElementById('hub-success');
if (hubForm) {
  hubForm.addEventListener('submit', e => {
    e.preventDefault();
    const row = hubForm.querySelector('.hub-input-row');
    if (row) row.style.display = 'none';
    if (hubSuccess) hubSuccess.classList.add('show');
  });
}

// Footer devos newsletter form
const devosForm = document.getElementById('devos-form');
const devosSuccess = document.getElementById('devos-success');
if (devosForm) {
  devosForm.addEventListener('submit', e => {
    e.preventDefault();
    devosForm.innerHTML = '<div style="color:var(--lime);font-family:var(--font-mono);font-size:13px;letter-spacing:.1em;">✓ You\'re subscribed.</div>';
  });
}

// Registration form (prototype)
const regForm = document.getElementById('registration-form');
const regSuccess = document.getElementById('success');
if (regForm) {
  regForm.addEventListener('submit', e => {
    e.preventDefault();
    const content = document.querySelector('.reg-form-content');
    if (content) content.style.display = 'none';
    if (regSuccess) {
      regSuccess.classList.add('show');
      regSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Donate form (prototype)
const donateForm = document.getElementById('donate-form');
if (donateForm) {
  donateForm.addEventListener('submit', e => {
    e.preventDefault();
    donateForm.innerHTML = '<div class="success-msg show"><div class="success-icon">✓</div><h4>Thank you for your generosity.</h4><p>We\'ll be in touch with details of how your donation will be used.</p></div>';
  });
}

// Donation amount selector
document.querySelectorAll('.amount-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const customInput = document.getElementById('custom-amount');
    if (customInput) customInput.value = btn.dataset.amount || '';
  });
});

// Netlify form AJAX handler — prevents page redirect, shows inline success
function handleNotifyForm(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }).catch(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    });
  });
}
handleNotifyForm('webinar-form', 'webinar-success');
handleNotifyForm('career-form', 'career-success');
handleNotifyForm('devos-banner-form', 'devos-banner-success');

// Copy account number to clipboard (donate.html)
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    if (!text) return;
    const orig = btn.textContent;
    const finish = () => {
      btn.textContent = 'Copied ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2200);
    };
    navigator.clipboard ? navigator.clipboard.writeText(text).then(finish).catch(finish) : (() => {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      Object.assign(ta.style, { position: 'fixed', opacity: '0' });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      finish();
    })();
  });
});

// Scroll-triggered fade-in
const fadeEls = document.querySelectorAll('.growth-year, .about-item, .skill-card, .speaker-card, .day-card, .testi-card, .program-card, .blog-card, .day-session-card, .about-stat-card, .stage-card, .facilitator-card, .impact-point');
if (fadeEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  fadeEls.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ============ LIGHTBOX ============
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbStage = document.getElementById('lb-stage');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
let currentIndex = 0;

if (galleryItems.length && lightbox) {
  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    const inner = item.querySelector('img, .gallery-ph');
    lbStage.innerHTML = '';
    lbStage.appendChild(inner.cloneNode(true));
    lbCaption.textContent = item.dataset.caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }
  function navigate(delta) {
    currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }
  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => navigate(-1));
  if (lbNext) lbNext.addEventListener('click', () => navigate(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    }
  });
}

// ============ LITE YOUTUBE EMBEDS ============
document.querySelectorAll('.lite-yt').forEach(el => {
  const id = el.dataset.videoId;
  if (id && !id.startsWith('VIDEO_ID_')) {
    el.style.backgroundImage = `url("https://i.ytimg.com/vi/${id}/hqdefault.jpg")`;
    el.classList.add('has-thumb');
  }
  el.addEventListener('click', () => {
    if (!id || id.startsWith('VIDEO_ID_')) {
      console.log('Placeholder video — replace data-video-id with a real YouTube ID');
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = el.dataset.title || 'YouTube video';
    el.innerHTML = '';
    el.appendChild(iframe);
  });
});

// Smooth-scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  });
});

// ============ BUSINESS DEVOTIONAL POPUP ============
// In-memory flag — resets on page load (intentional, privacy-friendly)
(function () {
  let dismissed = false;

  function buildPopup() {
    const list = (typeof SEP_DEVOTIONALS !== 'undefined' && SEP_DEVOTIONALS.length)
      ? SEP_DEVOTIONALS : null;
    if (!list || dismissed) return;

    const devo = list[Math.floor(Math.random() * list.length)];

    const popup = document.createElement('div');
    popup.id = 'devos-popup';
    popup.className = 'devos-popup';
    popup.setAttribute('role', 'complementary');
    popup.setAttribute('aria-label', 'Business Devotional');

    popup.innerHTML =
      '<div class="devos-popup-header">' +
        '<span class="devos-popup-label">Business Devotional</span>' +
        '<button class="devos-popup-close" aria-label="Close devotional">&times;</button>' +
      '</div>' +
      '<p class="devos-popup-text">' + devo.text + '</p>' +
      '<div class="devos-popup-verse">' + devo.verse + '</div>' +
      '<a href="#devos-form" class="devos-popup-cta">Get weekly devotionals →</a>';

    document.body.appendChild(popup);

    // Animate in (double rAF ensures the initial state is painted first)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { popup.classList.add('show'); });
    });

    function dismiss() {
      dismissed = true;
      popup.classList.remove('show');
      popup.classList.add('hide');
      setTimeout(function () { if (popup.parentNode) popup.parentNode.removeChild(popup); }, 350);
    }

    popup.querySelector('.devos-popup-close').addEventListener('click', dismiss);

    // CTA: smooth-scroll to footer signup then close
    popup.querySelector('.devos-popup-cta').addEventListener('click', function (e) {
      e.preventDefault();
      dismiss();
      var target = document.getElementById('devos-form');
      if (target) {
        var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  setTimeout(buildPopup, 8000);
}());
