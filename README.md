Context Snapper 

Context Snapper is a lightweight Google Chrome Extension that allows you to capture screenshots 
of your current browser tab while automatically grabbing the Page Title and URL. 
<img width="865" height="700" alt="Example" src="https://github.com/user-attachments/assets/495d79a7-25ba-4a3f-8d32-3ec3a7a20d1c" />

Reference:https://youtu.be/E8gmARGvPlI?si=x23Y5ZFOFK7sYvdx

Features:

Instant Screenshot: Captures the visible part of your current tab immediately.
Context Capture:*Automatically* fetches the Page Title and URL.
Smart Copying:
1.  Copy All: Copies the Image, Title, and clickable Link to your clipboard (great for pasting into Word, Teams, or Notion).
2.  Copy Link: Copies just the URL.
3.  Copy Image:Copies just the screenshot.(Can paste it into applications like WhatsApp, it doesn't need to be saved to your device.)
4.  Download: Save the screenshot as a `.png` file locally.

Installation:

From GitHub 
Since this project is open source, you can install it manually before it hits the Chrome Web Store:

1.  Clone or Download this repository to your computer.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Toggle Developer mode in the top right corner.
4.  Click Load unpacked.
5.  Select the folder where you downloaded this code.
6.  The extension icon should appear in your browser bar!

From Chrome Web Store:

Not , Yet 

Project Structure:

1.  `manifest.json`: The configuration file required by Chrome.
2.  `popup.html`: The user interface (buttons, image preview).
3.  `styles.css`: Styling for the popup window.
4.   `popup.js`: Logic for capturing the screen and handling clipboard actions.

Technologies Used:

1.  HTML5
2.  CSS3 (Flexbox/Grid)
3.  Vanilla JavaScript
4.  Chrome Extension API (`activeTab`, `scripting`)



