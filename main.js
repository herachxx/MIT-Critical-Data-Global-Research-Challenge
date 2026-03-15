'use strict';
(function () {

  /* navbar scroll */
  const navbar = document.getElementById('navbar');
  let raf = false;
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 28);
        raf = false;
      });
    }, { passive: true });
  }

  /* hamburger */
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (ham && menu) {
    ham.addEventListener('click', e => {
      e.stopPropagation();
      const open = menu.classList.toggle('open');
      ham.setAttribute('aria-expanded', open);
      const [a, b, c] = ham.querySelectorAll('span');
      if (open) {
        a.style.transform = 'rotate(45deg) translate(4px, 4px)';
        b.style.opacity   = '0';
        c.style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        a.style.transform = c.style.transform = '';
        b.style.opacity = '1';
      }
    });
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  /* session-aware nav */
  const sess = (() => { try { return JSON.parse(localStorage.getItem('mitrc_session')); } catch(e) { return null; } })();
  if (sess) {
    document.querySelectorAll('.nav-cta, .mobile-login, .m-cta').forEach(el => {
      el.textContent = 'Dashboard';
      el.href = 'dashboard.html';
    });
  }

  /* smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 86, behavior: 'smooth' }); }
    });
  });

  /* Hash on load (cross-page links) */
  if (location.hash) {
    setTimeout(() => {
      const t = document.querySelector(location.hash);
      if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 86, behavior: 'smooth' });
    }, 360);
  }

  /* FAQ */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* scroll reveal */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  /* active nav highlight */
  if (document.querySelector('.hero')) {
    const secs  = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links li a');
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach(a => {
            const href = a.getAttribute('href');
            a.classList.toggle('active', href === `#${id}` || (id === 'home' && (href === 'index.html' || href === './')));
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' }).observe.bind && secs.forEach(s => {
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
        });
      }, { rootMargin: '-30% 0px -60% 0px' }).observe(s);
    });
  }

})();
