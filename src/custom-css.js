chrome.storage.sync.get(["options"], ({ options }) => {
  if (!options) return;
  const { customCSS } = options;
  window.addEventListener("DOMContentLoaded", () => {
    document.head.innerHTML += `<style>${customCSS}</style>`;
  });
});
