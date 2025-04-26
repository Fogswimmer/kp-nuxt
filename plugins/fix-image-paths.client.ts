export default defineNuxtPlugin(() => {
    const apiBase = 'https://nebelschwimmer.site';
  
    if (import.meta.client) {
      const fixImages = () => {
        document.querySelectorAll('img').forEach((img) => {
          if (img.getAttribute('src')?.startsWith('/uploads/')) {
            img.src = apiBase + img.getAttribute('src');
          }
        });
      };
  
      if (document.readyState === 'complete') {
        fixImages();
      } else {
        window.addEventListener('load', fixImages);
      }
    }
  });
  