(() => {
  const targets = [
    {
      key: 'hideCiEnNetBanner',
      legacyKey: 'hideBanner',
      hosts: ['ci-en.net'],
      selector: '.banner-swiper',
    },
    {
      key: 'hideCiEnR18Banner',
      hosts: ['ci-en.dlsite.com'],
      selector: '#supporting > div.e-box.is-invisible > div.banner-swiper',
    },
  ];

  const activeTargets = targets.filter((target) => target.hosts.includes(location.hostname));
  const styleElements = new Map();

  const ensureHead = () => document.head || document.documentElement;

  const getStyle = (target) => {
    if (!styleElements.has(target.key)) {
      const style = document.createElement('style');
      style.dataset.cienBannerBlocker = target.key;
      style.textContent = `${target.selector} { display: none !important; }`;
      styleElements.set(target.key, style);
    }
    return styleElements.get(target.key);
  };

  const applyStyle = (target) => {
    const style = getStyle(target);
    if (style.parentNode) return;
    const parent = ensureHead();
    if (!parent) return;
    parent.appendChild(style);
  };

  const refreshSwiper = (target) => {
    const run = () => {
      document.querySelectorAll(target.selector).forEach((banner) => {
        const candidates = [banner, ...banner.querySelectorAll('.swiper, .swiper-container')];
        candidates.forEach((element) => {
          if (element.swiper && typeof element.swiper.update === 'function') {
            element.swiper.update();
          }
        });
      });
      window.dispatchEvent(new Event('resize'));
    };

    requestAnimationFrame(() => {
      run();
      setTimeout(run, 100);
      setTimeout(run, 500);
    });
  };

  const removeStyle = (target) => {
    const style = getStyle(target);
    if (style.parentNode) {
      style.parentNode.removeChild(style);
      refreshSwiper(target);
    }
  };

  const setState = (target, shouldHide) => {
    if (shouldHide) {
      applyStyle(target);
    } else {
      removeStyle(target);
    }
  };

  // Apply immediately to avoid flicker until storage state loads.
  activeTargets.forEach(applyStyle);

  const storageKeys = targets.flatMap((target) => [target.key, target.legacyKey]).filter(Boolean);

  chrome.storage.local.get(storageKeys, (result) => {
    const defaults = {};

    activeTargets.forEach((target) => {
      const storedValue = result[target.key];
      const legacyValue = target.legacyKey ? result[target.legacyKey] : undefined;
      const hide = storedValue === undefined
        ? (legacyValue === undefined ? true : Boolean(legacyValue))
        : Boolean(storedValue);

      if (storedValue === undefined) {
        defaults[target.key] = hide;
      }
      setState(target, hide);
    });

    if (Object.keys(defaults).length > 0) {
      chrome.storage.local.set(defaults);
    }
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;

    activeTargets.forEach((target) => {
      if (changes[target.key]) {
        setState(target, Boolean(changes[target.key].newValue));
      }
    });
  });
})();
