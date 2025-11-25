document.addEventListener('DOMContentLoaded', () => {
  const screenshotImg = document.getElementById('screenshot-img');
  const titleEl = document.getElementById('page-title');
  const urlEl = document.getElementById('page-url');
  const copyBtn = document.getElementById('copy-btn');
  const downloadBtn = document.getElementById('download-btn');
  const msgEl = document.getElementById('msg');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    titleEl.textContent = activeTab.title;
    urlEl.textContent = activeTab.url;
    urlEl.href = activeTab.url;

    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      screenshotImg.src = dataUrl;
    });
  });

  copyBtn.addEventListener('click', async () => {
    try {
      const imgSrc = screenshotImg.src;
      const title = titleEl.textContent;
      const url = urlEl.href;

      const htmlContent = `
        <p><img src="${imgSrc}" style="max-width: 100%; border: 1px solid #ccc;" /></p>
        <p><strong>${title}</strong></p>
        <p><a href="${url}">${url}</a></p>
      `;

      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const blobText = new Blob([url], { type: 'text/plain' });
      const data = [new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText
      })];

      await navigator.clipboard.write(data);
      
      msgEl.style.opacity = '1';
      copyBtn.textContent = "✅ Copied!";
      setTimeout(() => {
        msgEl.style.opacity = '0';
        copyBtn.textContent = "Copy Image & Link";
      }, 2000);

    } catch (err) {
      console.error('Copy failed', err);
      alert("Copy failed. Please try again.");
    }
  });

  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = screenshotImg.src;
    link.download = 'screenshot.png';
    link.click();
  });
});