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
      const title = titleInput.value;
      const url = urlEl.href;
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.contentEditable = 'true';
      wrapper.innerHTML = `
        <p><img src="${imgSrc}" style="max-width: 600px;" /></p>
        <p><strong>${title}</strong></p>
        <p><a href="${url}">${url}</a></p>
      `;
      
      document.body.appendChild(wrapper);

      const range = document.createRange();
      range.selectNodeContents(wrapper);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      const successful = document.execCommand('copy');
      document.body.removeChild(wrapper);
      selection.removeAllRanges();

      if (successful) {
        showMessage("✅ Copied Image & Link!");
      } else {
        throw new Error("execCommand returned false");
      }
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
