'use strict';

(function () {

  /* Header: transparent → frosted glass on scroll */
  const header = document.getElementById('site-header');

  if (header) {
    const SOLID = 80;
    let ticking  = false;

    function updateHeader() {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > SOLID);
      header.classList.toggle('on-hero',  y <= SOLID);
      ticking = false;
    }

    updateHeader();
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
    }, { passive: true });
  }


  /* Mobile nav toggle */
  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  function openNav() {
    if (!toggle || !mobileNav) return;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    const [a, b, c] = toggle.querySelectorAll('span');
    a.style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
    b.style.opacity   = '0';
    c.style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
    mobileNav.querySelectorAll('a').forEach(el => el.removeAttribute('tabindex'));
  }

  function closeNav() {
    if (!toggle || !mobileNav) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    const [a, b, c] = toggle.querySelectorAll('span');
    a.style.transform = b.style.opacity = c.style.transform = '';
    mobileNav.querySelectorAll('a').forEach(el => el.setAttribute('tabindex', '-1'));
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      mobileNav.classList.contains('open') ? closeNav() : openNav();
    });
    document.addEventListener('click', e => {
      if (mobileNav.classList.contains('open') &&
          !toggle.contains(e.target) && !mobileNav.contains(e.target)) closeNav();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeNav(); toggle.focus();
      }
    });
  }


  /* Smooth scroll + URL hash */
  function getHeaderH() {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '64', 10
    );
  }

  function scrollTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getHeaderH() - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      scrollTo(href);
      closeNav();
      if (history.pushState) history.pushState(null, '', href);
    });
  });

  if (location.hash) setTimeout(() => scrollTo(location.hash), 300);


  /* Grand Award countdown */
  const countdown = document.querySelector('.winner-countdown[data-countdown-target]');

  if (countdown) {
    const target = new Date(countdown.dataset.countdownTarget).getTime();
    const status = countdown.querySelector('[data-countdown-status]');
    const daysEl = countdown.querySelector('[data-countdown-days]');
    const hoursEl = countdown.querySelector('[data-countdown-hours]');
    const minutesEl = countdown.querySelector('[data-countdown-minutes]');
    const secondsEl = countdown.querySelector('[data-countdown-seconds]');
    const pad = value => String(value).padStart(2, '0');

    function renderCountdown() {
      const remaining = Math.max(0, target - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minutesEl) minutesEl.textContent = pad(minutes);
      if (secondsEl) secondsEl.textContent = pad(seconds);

      if (status) {
        status.textContent = remaining > 0
          ? `${days} ${days === 1 ? 'day' : 'days'} left`
          : 'Announcement window open';
      }

      countdown.setAttribute(
        'aria-label',
        remaining > 0
          ? `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until the Grand Award winner announcement`
          : 'Grand Award winner announcement window is open'
      );

      return remaining > 0;
    }

    if (Number.isFinite(target)) {
      renderCountdown();
      const countdownTimer = window.setInterval(() => {
        if (!renderCountdown()) window.clearInterval(countdownTimer);
      }, 1000);
    }
  }


  /* Active nav link tracking */
  const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
          );
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
  }


  /* FAQ accordion */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* Guidelines PDF accordions — defer PDF load until after expand animation */
  let guidelinesPdfTimer = null;
  const guidelineItems = document.querySelectorAll('.guidelines-item');
  guidelineItems.forEach(item => {
    const btn = item.querySelector('.guidelines-btn');
    const iframe = item.querySelector('.guidelines-embed iframe');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (guidelinesPdfTimer) {
        clearTimeout(guidelinesPdfTimer);
        guidelinesPdfTimer = null;
      }
      const isOpen = item.classList.contains('open');
      guidelineItems.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.guidelines-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (iframe && iframe.dataset.pdfSrc) {
          guidelinesPdfTimer = setTimeout(() => {
            guidelinesPdfTimer = null;
            if (!item.classList.contains('open')) return;
            const src = iframe.getAttribute('src');
            if (src === 'about:blank' || !src) {
              iframe.setAttribute('src', iframe.dataset.pdfSrc);
            }
          }, 450);
        }
      }
    });
  });


  /* Lazy image fade-in */
  function initLazyImage(img) {
    // Determine if this image should have fade-in
    const isLazy = img.loading === 'lazy' || img.classList.contains('lazy-img');
    if (!isLazy) return;

    // Ensure the CSS class is present for the transition
    img.classList.add('lazy-img');

    function markDone() { img.classList.add('loaded'); }
    if (img.complete && img.naturalWidth > 0) {
      markDone();
    } else {
      img.addEventListener('load',  markDone, { once: true });
      img.addEventListener('error', markDone, { once: true });
    }
  }

  document.querySelectorAll('img').forEach(initLazyImage);


  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

})();
