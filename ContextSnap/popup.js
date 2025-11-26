document.addEventListener('DOMContentLoaded', () => {
  const screenshotImg = document.getElementById('screenshot-img');
  const titleInput = document.getElementById('title-input');
  const urlEl = document.getElementById('page-url');
  const btnCopyAll = document.getElementById('copy-all');
  const btnCopyLink = document.getElementById('copy-link');
  const btnCopyImg = document.getElementById('copy-img');
  const btnDownload = document.getElementById('download-btn');
  const msgEl = document.getElementById('msg');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    titleInput.value = activeTab.title;
    urlEl.textContent = activeTab.url;
    urlEl.href = activeTab.url;
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      screenshotImg.src = dataUrl;
    });
  });

  function showMessage(text){
    msgEl.textContent = text;
    msgEl.style.opacity = '1';
    setTimeout(() => {
      msgEl.style.opacity = '0';},2000);
  }
  
  btnCopyAll.addEventListener('click', async () => {
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
      
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText
        })
      ]);
      showMessage("✅ Copied Image & Link!");
    } catch (err) {
      console.error(err);
      showMessage("❌ Failed to copy");
    }
  });

  btnCopyImg.addEventListener('click', async () => {
    try {
      const response = await fetch(screenshotImg.src);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      showMessage("Image Copied!");
    } catch (err) {
      console.error(err);
      showMessage("❌ Error copying image.");
    }
  });

  btnCopyLink.addEventListener('click', async () => {
    try {
      const url = urlEl.href;
      await navigator.clipboard.writeText(url);
      showMessage("Link Copied!");
    } catch (err) {
      showMessage("❌ Error");
    }
  });

  btnDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = screenshotImg.src;
    const filename = titleInput.value.replace(/[^a-z0-9]/gi, '_').substring(0, 20);
    link.download = `snap_${filename}.png`;
    link.click();
  });
});
  
  

                      
