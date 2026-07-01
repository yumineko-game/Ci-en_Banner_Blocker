const options = [
  {
    key: 'hideCiEnNetBanner',
    legacyKey: 'hideBanner',
    checkbox: document.getElementById('net-banner-toggle'),
  },
  {
    key: 'hideCiEnR18Banner',
    checkbox: document.getElementById('r18-banner-toggle'),
  },
];

const init = () => {
  const storageKeys = options.flatMap((option) => [option.key, option.legacyKey]).filter(Boolean);

  chrome.storage.local.get(storageKeys, (result) => {
    const defaults = {};

    options.forEach((option) => {
      const storedValue = result[option.key];
      const legacyValue = option.legacyKey ? result[option.legacyKey] : undefined;
      const hide = storedValue === undefined
        ? (legacyValue === undefined ? true : Boolean(legacyValue))
        : Boolean(storedValue);

      option.checkbox.checked = hide;
      if (storedValue === undefined) {
        defaults[option.key] = hide;
      }
    });

    if (Object.keys(defaults).length > 0) {
      chrome.storage.local.set(defaults);
    }
  });
};

options.forEach((option) => {
  option.checkbox.addEventListener('change', () => {
    chrome.storage.local.set({ [option.key]: option.checkbox.checked });
  });
});

init();
