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

// Scroll-triggered fade-in
const fadeEls = document.querySelectorAll('.growth-year, .about-item, .skill-card, .speaker-card, .day-card, .testi-card, .program-card, .blog-card, .day-session-card, .about-stat-card');
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
