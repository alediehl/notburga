const navLinks = Array.from(document.querySelectorAll('.tab-link'));
const sections = Array.from(document.querySelectorAll('section[data-section]'));
const emergencyFab = document.querySelector('.emergency-fab');

function setText(id, value) {
  if (typeof value !== 'string') {
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setHtml(id, value) {
  if (typeof value !== 'string') {
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = value;
  }
}

function setAttr(id, attrName, value) {
  if (typeof value !== 'string') {
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.setAttribute(attrName, value);
  }
}

function applyContent(content) {
  setAttr('meta-description', 'content', content.meta?.description);
  setText('page-title', content.meta?.title);

  setText('skip-link', content.a11y?.skipLink);
  setAttr('main-nav', 'aria-label', content.a11y?.mainNavLabel);
  setAttr('hero-figure', 'aria-label', content.a11y?.heroFigureLabel);
  setAttr('hero-image', 'alt', content.a11y?.heroImageAlt);
  setAttr('emergency-fab', 'aria-label', content.a11y?.emergencyFabLabel);

  setText('brand', content.header?.brand);
  setText('tagline', content.header?.tagline);
  setText('nav-soforthilfe', content.header?.nav?.soforthilfe);
  setText('nav-angebote', content.header?.nav?.angebote);
  setText('nav-spenden', content.header?.nav?.spenden);

  setText('hero-eyebrow', content.hero?.eyebrow);
  setText('hero-title', content.hero?.title);
  setText('hero-lead', content.hero?.lead);
  setAttr('hero-image', 'src', content.hero?.imageSrc);
  setText('hero-btn-soforthilfe', content.hero?.buttons?.soforthilfe);
  setText('hero-btn-beratung', content.hero?.buttons?.beratung);
  setText('hero-btn-spenden', content.hero?.buttons?.spenden);

  setText('soforthilfe-kicker', content.soforthilfe?.kicker);
  setText('soforthilfe-title', content.soforthilfe?.title);
  setText('soforthilfe-card-title', content.soforthilfe?.cardTitle);
  setText('soforthilfe-card-text', content.soforthilfe?.cardText);
  setText('helpline-label', content.soforthilfe?.helplineLabel);
  setText('helpline-number', content.soforthilfe?.helplineDisplay);
  setAttr('helpline-number', 'href', content.soforthilfe?.helplineHref);
  setText('soforthilfe-call-btn', content.soforthilfe?.callButton);
  setAttr('soforthilfe-call-btn', 'href', content.soforthilfe?.helplineHref);
  setText('kontaktablauf-title', content.soforthilfe?.flowTitle);
  setText('kontaktablauf-step-1', content.soforthilfe?.steps?.[0]);
  setText('kontaktablauf-step-2', content.soforthilfe?.steps?.[1]);
  setText('kontaktablauf-step-3', content.soforthilfe?.steps?.[2]);
  setText('kontaktablauf-step-4', content.soforthilfe?.steps?.[3]);
  setText('privacy-note', content.soforthilfe?.privacyNote);

  setText('angebote-kicker', content.angebote?.kicker);
  setText('angebote-title', content.angebote?.title);
  setText('angebote-intro', content.angebote?.intro);
  setText('angebot-1-title', content.angebote?.items?.[0]?.title);
  setText('angebot-1-text', content.angebote?.items?.[0]?.text);
  setText('angebot-2-title', content.angebote?.items?.[1]?.title);
  setText('angebot-2-text', content.angebote?.items?.[1]?.text);
  setText('angebot-3-title', content.angebote?.items?.[2]?.title);
  setText('angebot-3-text', content.angebote?.items?.[2]?.text);
  setText('angebot-4-title', content.angebote?.items?.[3]?.title);
  setText('angebot-4-text', content.angebote?.items?.[3]?.text);
  setText('wissen-title', content.angebote?.gutZuWissenTitle);
  setHtml('wissen-item-1', content.angebote?.gutZuWissen?.[0]);
  setHtml('wissen-item-2', content.angebote?.gutZuWissen?.[1]);
  setHtml('wissen-item-3', content.angebote?.gutZuWissen?.[2]);

  setText('spenden-kicker', content.spenden?.kicker);
  setText('spenden-title', content.spenden?.title);
  setText('spenden-why-title', content.spenden?.whyTitle);
  setText('spenden-why-text', content.spenden?.whyText);
  setHtml('spenden-item-1', content.spenden?.points?.[0]);
  setHtml('spenden-item-2', content.spenden?.points?.[1]);
  setHtml('spenden-item-3', content.spenden?.points?.[2]);
  setText('mitwirken-title', content.spenden?.mitwirkenTitle);
  setText('mitwirken-text', content.spenden?.mitwirkenText);
  setText('spenden-payment-title', content.spenden?.paymentTitle);
  setText('spenden-iban-label', content.spenden?.payment?.ibanLabel);
  setText('spenden-iban-value', content.spenden?.payment?.ibanValue);
  setText('spenden-recipient-label', content.spenden?.payment?.recipientLabel);
  setText('spenden-recipient-line-1', content.spenden?.payment?.recipientLines?.[0]);
  setText('spenden-recipient-line-2', content.spenden?.payment?.recipientLines?.[1]);
  setText('spenden-recipient-line-3', content.spenden?.payment?.recipientLines?.[2]);
  setText('spenden-btn-once', content.spenden?.buttons?.once);
  setText('spenden-btn-monthly', content.spenden?.buttons?.monthly);
  setText('spenden-btn-volunteer', content.spenden?.buttons?.volunteer);
  setText('spenden-note', content.spenden?.note);

  setText('emergency-fab', content.floating?.helpNow);
}

async function loadContent() {
  try {
    const response = await fetch('/static/content.de.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Could not load content JSON (${response.status})`);
    }
    const content = await response.json();
    applyContent(content);
  } catch (error) {
    console.error('Content JSON loading failed. Using HTML fallback text.', error);
  }
}

loadContent();

function setActiveTab(id) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.tab === id;
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveTab(visible.target.dataset.section);
    }
  },
  {
    rootMargin: '-35% 0px -45% 0px',
    threshold: [0.15, 0.35, 0.55],
  }
);

sections.forEach((section) => observer.observe(section));

if (emergencyFab) {
  emergencyFab.addEventListener('click', () => {
    const target = emergencyFab.dataset.jump;
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(section.dataset.section);
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveTab(link.dataset.tab);
  });
});
