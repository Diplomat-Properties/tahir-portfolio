/* All enhancements are optional. The portfolio content and contact links work without JS. */
(() => {
  'use strict';

  const root = document.documentElement;
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  const motionButton = document.querySelector('#motion-toggle');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let storedMotion = null;
  try { storedMotion = localStorage.getItem('tahir-motion'); } catch { /* Storage is optional. */ }
  let motionEnabled = !motionPreference.matches && storedMotion !== 'off';

  function applyMotionPreference() {
    root.classList.toggle('motion-off', !motionEnabled);
    motionButton.setAttribute('aria-pressed', String(motionEnabled));
    motionButton.querySelector('.motion-label').textContent = motionPreference.matches ? 'Motion reduced' : `Motion ${motionEnabled ? 'on' : 'off'}`;
    motionButton.disabled = motionPreference.matches;
    motionButton.title = motionPreference.matches ? 'Reduced motion follows your device accessibility preference.' : 'Toggle decorative motion';
    document.querySelectorAll('[data-tilt]').forEach(element => element.style.removeProperty('transform'));
  }
  applyMotionPreference();
  motionButton.addEventListener('click', () => {
    motionEnabled = !motionEnabled;
    storedMotion = motionEnabled ? 'on' : 'off';
    try { localStorage.setItem('tahir-motion', storedMotion); } catch { /* Nonessential preference. */ }
    applyMotionPreference();
  });
  motionPreference.addEventListener('change', () => {
    motionEnabled = !motionPreference.matches && storedMotion !== 'off';
    applyMotionPreference();
  });

  function closeMenu(returnFocus = false) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('is-open');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  // Reveal only when the browser supports it. Every section remains readable without JS.
  if ('IntersectionObserver' in window && motionEnabled) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
  }

  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const progressBar = document.querySelector('.reading-progress');
  let scrollPending = false;
  function updateScrollState() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0})`;
    let current = '';
    const offset = window.innerHeight * 0.35;
    sections.forEach(section => { if (section.getBoundingClientRect().top <= offset) current = section.id; });
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScrollState); }
  }, { passive: true });
  window.addEventListener('resize', updateScrollState, { passive: true });
  updateScrollState();

  // A shallow 3D tilt with perspective and distinct portrait/label layers.
  document.querySelectorAll('[data-tilt]').forEach(element => {
    let tiltFrame = 0;
    element.addEventListener('pointermove', event => {
      if (!motionEnabled || !finePointer.matches || event.pointerType !== 'mouse') return;
      const bounds = element.parentElement.getBoundingClientRect();
      const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
      const amount = Number(element.dataset.tilt) || 5;
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        element.style.transform = `rotateX(${-y * amount}deg) rotateY(${x * amount * 2}deg)`;
      });
    }, { passive: true });
    element.addEventListener('pointerleave', () => {
      cancelAnimationFrame(tiltFrame);
      element.style.removeProperty('transform');
    });
  });

  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const companyCards = [...document.querySelectorAll('.company-card')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    companyCards.forEach(card => {
      const visible = filter === 'all' || card.dataset.sector === filter;
      card.hidden = !visible;
      if (visible) { count += 1; card.classList.add('is-visible'); }
    });
    document.querySelector('.portfolio-note').hidden = filter !== 'all';
    document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'company' : 'companies'}`;
    updateScrollState();
  }));

  // Content uses the supplied CV, with the role and company-name corrections requested by the owner.
  const companyData = {
    'business-link': {
      name: 'Business Link Consultancies', sector: 'Business services', role: 'Proprietor', dates: 'March 2011 — Present', logo: 'assets/logos/business-link.png',
      description: 'Supporting entrepreneurs and established businesses through company formation, PRO services, document clearing, management consultancy and human resources consultancy.',
      focus: ['Business formation and trade licence management', 'PRO services and document processing', 'Management and human resources consultancy', 'Client relationships, team development and operational direction']
    },
    diplomat: {
      name: 'Diplomat Properties', sector: 'Real estate', role: 'Proprietor', dates: '2013 — Present', logo: 'assets/logos/diplomat-properties.png',
      description: 'Leading a Dubai real estate business across property acquisitions, sales, leasing and management, with a focus on strong client relationships and capable teams.',
      focus: ['Business strategy and financial planning', 'Property sales, leasing and acquisitions', 'Client relationships and service quality', 'Agent leadership, marketing and business operations']
    },
    faiza: {
      name: 'Faiza Saqlain Ready Made Garments', sector: 'Fashion & apparel', role: 'Sales Director & Partner', dates: 'February 2024 — Present', logo: 'assets/logos/faiza-saqlain.png',
      description: 'Directing sales strategy and business development within the fashion and apparel sector, connecting customer needs with the brand’s products and market ambitions.',
      focus: ['Sales strategy, forecasting and performance', 'Retail and wholesale client relationships', 'Sales team coaching and development', 'Pricing, negotiation and collaboration with marketing and product teams']
    },
    rise: {
      name: 'Rise Properties LLC', sector: 'Real estate', role: 'Director & Partner', dates: 'June 2024 — Present', logo: 'assets/logos/rise-properties.png',
      description: 'Providing direction across the property business, from identifying opportunities and managing budgets to marketing, leasing and relationship development.',
      focus: ['Property opportunities and business planning', 'Financial planning and operational oversight', 'Marketing, leasing and negotiations', 'Client and industry relationships']
    },
    'rise-branch': {
      name: 'Rise Properties LLC · Branch', sector: 'Real estate · Branch', role: 'Director & Partner', dates: 'September 2025 — Present', logo: 'assets/logos/rise-properties.png',
      description: 'Leading the Rise Properties branch with a focus on strategy, daily operations, financial discipline and a team committed to client service.',
      focus: ['Branch strategy and business objectives', 'Property sales, leasing and management', 'Team leadership and professional development', 'Client service, marketing and operational performance']
    }
  };

  const dialog = document.querySelector('#company-dialog');
  let dialogTrigger = null;
  document.querySelectorAll('[data-company]').forEach(link => link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    const company = companyData[link.dataset.company];
    if (!company) return;
    event.preventDefault();
    dialogTrigger = link;
    document.querySelector('#dialog-title').textContent = company.name;
    document.querySelector('#dialog-sector').textContent = company.sector.toUpperCase();
    document.querySelector('#dialog-role').textContent = company.role;
    document.querySelector('#dialog-dates').textContent = company.dates;
    document.querySelector('#dialog-description').textContent = company.description;
    const logo = document.querySelector('#dialog-logo');
    logo.src = company.logo;
    logo.alt = `${company.name} logo`;
    const focusList = document.querySelector('#dialog-focus');
    focusList.replaceChildren(...company.focus.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
    dialog.querySelector('.dialog-close').focus();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    dialogTrigger?.focus({ preventScroll: true });
  });
  document.querySelector('#dialog-contact').addEventListener('click', event => {
    event.preventDefault();
    dialogTrigger = null;
    dialog.close();
    document.querySelector('#contact').scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
    document.querySelector('#contact .button').focus({ preventScroll: true });
    history.replaceState(null, '', '#contact');
  });

  let toastTimer;
  function showToast(message) {
    const toast = document.querySelector('#toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
  }
  document.querySelector('.copy-email').addEventListener('click', async () => {
    const email = 'tahirbaig77@gmail.com';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      showToast('Email address copied.');
    } catch {
      // HTTP previews and older browsers may not expose the modern Clipboard API.
      const temporaryField = document.createElement('textarea');
      temporaryField.value = email;
      temporaryField.setAttribute('readonly', '');
      temporaryField.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.appendChild(temporaryField);
      temporaryField.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { /* Keep the visible selection fallback. */ }
      temporaryField.remove();
      document.querySelector('.copy-email').focus({ preventScroll: true });
      if (copied) { showToast('Email address copied.'); return; }
      showToast(`Select and copy: ${email}`);
      const emailText = document.querySelector('.contact-value');
      const range = document.createRange();
      range.selectNodeContents(emailText);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  });
  document.querySelector('#copyright-year').textContent = new Date().getFullYear();
})();
