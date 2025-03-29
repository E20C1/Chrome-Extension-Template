# Chrome Extension Template 🚀

*Read this in other languages: [日本語](README.ja.md)*

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Manifest: v3](https://img.shields.io/badge/Manifest-v3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<p align="center">
  <img src="https://via.placeholder.com/150?text=CET" alt="Chrome Extension Template Logo" width="150">
</p>

> A template for easily developing the latest Chrome extensions

## 📋 Table of Contents

- [Features](#features-)
- [File Structure](#file-structure-)
- [Installation](#installation-)
- [Usage](#usage-)
- [Customization Guide](#customization-guide-)
- [Development Tips](#development-tips-)
- [How to Contribute](#how-to-contribute-)
- [Technical Specifications](#technical-specifications-)
- [Todo](#todo-)

## Features 💯

<p align="center">
  <img src="assets/icons/icon128.png" alt="Chrome Extension Icon" width="128">
</p>

<table align="center">
  <tr>
    <td align="center">🌙 ⟷ ☀️<br><b>Dark Mode</b></td>
    <td align="center">🔄<br><b>Auto-Save</b></td>
    <td align="center">🌐<br><b>Site-Specific Settings</b></td>
  </tr>
  <tr>
    <td align="center">📦<br><b>Data Management</b></td>
    <td align="center">📱<br><b>Modern UI</b></td>
    <td align="center">🔌<br><b>Manifest V3</b></td>
  </tr>
</table>

- **Manifest V3 Compatible**: Designed according to the latest Chrome extension API
- **Modular Design**: Properly segregated background scripts, content scripts, popup, and settings screens
- **Dark Mode Support**: Dark mode toggle feature to enhance user experience
- **Data Management**: Data import/export functionality for easy migration of settings
- **Site-Specific Settings**: Customize behavior for specific domains
- **Auto-Save Functionality**: Real-time saving and synchronization of user settings

## File Structure 📁

```
chrome-extension/
│
├── manifest.json           # Extension configuration file
│
├── scripts/
│   └── background.js       # Background script
│
├── content/
│   ├── content.js          # Content script
│   └── content.css         # Content styles
│
├── popup/
│   ├── popup.html          # Popup HTML
│   ├── popup.css           # Popup styles
│   └── popup.js            # Popup script
│
├── options/
│   ├── options.html        # Options page HTML
│   ├── options.css         # Options page styles
│   └── options.js          # Options page script
│
└── assets/
    └── icons/              # Icon files
```

## System Architecture 🔄

<div align="center">

| Component | Role | Features |
|:---:|:---:|:---:|
| 🔄 **Background Script** | Resident Process | Event Monitoring & Data Management |
| 📄 **Content Script** | Web Page Operation | DOM Manipulation & User Interaction |
| 🖥️ **Popup UI** | User Settings | Setting Changes & Display Control |
| 💾 **Chrome Storage** | Data Storage | Settings & State Persistence |

</div>

<div align="center">
  <b>⚙️ Component Interaction Flow ⚙️</b><br><br>
  <code>Background Script</code> ⟷ <code>Chrome Storage</code><br>
  ⬆️ ⬇️<br>
  <code>Content Script</code> ⟷ <code>Web Page</code><br>
  ⬆️ ⬇️<br>
  <code>Popup UI</code> ⟷ <code>User</code>
</div>

## Installation 🔧

### Requirements

- Google Chrome browser (v88+ recommended)
- Developer mode enabled

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/chrome-extension-template.git
   cd chrome-extension-template
   ```

2. **Load the extension in Chrome**:
   - Open `chrome://extensions` in Chrome
   - Turn on "Developer mode"
   - Click "Load unpacked"
   - Select the cloned directory

<div align="center">
  <table>
    <tr>
      <td align="center">🔍</td>
      <td>Access <code>chrome://extensions</code></td>
    </tr>
    <tr>
      <td align="center">🔧</td>
      <td>Turn on "Developer mode" in the top right</td>
    </tr>
    <tr>
      <td align="center">📦</td>
      <td>Click "Load unpacked"</td>
    </tr>
    <tr>
      <td align="center">✅</td>
      <td>Verify the extension has been loaded successfully</td>
    </tr>
  </table>
</div>

## Usage 👆

### Basic Features

- **Enable/Disable Extension**: Toggle on/off with popup button
- **Theme Switching**: Switch between light/dark modes
- **Feature Settings**: Turn individual features on/off

### Detailed Settings

- **Update Interval**: Set the frequency of data updates
- **Operation Mode**: Select operation mode based on performance
- **Custom CSS**: Apply your own styles
- **Site-Specific Settings**: Customize extension behavior for specific domains

## Customization Guide 🛠️

### Editing the Manifest

Edit `manifest.json` to set basic information for your extension:

```json
{
  "name": "Your Extension Name",
  "description": "Description of your extension",
  "version": "Version number"
}
```

### Permission Settings

Add only necessary permissions to respect user privacy:

```json
"permissions": [
  "storage",  // For basic data storage
  // Add other necessary permissions
]
```

### Adding Icons

Add icons of the following sizes to the `assets/icons/` directory:
- icon16.png (16x16 px)
- icon48.png (48x48 px)
- icon128.png (128x128 px)

## Key Features ✨

- **Simple Design**: Easy-to-understand structure, even for beginners
- **Minimal Permissions**: Respects user privacy
- **Modern UI**: Intuitive interface
- **Fast Performance**: Optimized for speed

## Development Tips 💡

1. **Console Logs**: Check logs for `background.js` and `content.js` in developer tools
2. **Hot Reload**: Refresh changes with the refresh button on the extensions page
3. **Debugging**: Debug using the inspect tool on the background page
4. **Storage**: Save settings using `chrome.storage.local`

## How to Contribute 🤝

1. Fork the repository 🍴
2. Add new features or improvements ✨
3. Submit a pull request 🚀

Contribution Guidelines:
- Follow code style 📏
- Write clear commit messages 📝
- Provide detailed explanations of changes 🔍

## Technical Specifications 💻

- **Manifest Version**: Manifest V3
- **ES6+ Support**: Utilizing the latest JavaScript features
- **Modular**: Background script as ServiceWorker
- **Storage API**: Data storage with chrome.storage.local
- **Message Passing**: Component communication via messaging

## Todo 📝

- [ ] Add icon files
- [ ] Create onboarding page
- [ ] Cross-browser support (Firefox adjustments)
- [ ] Add unit tests
- [ ] Set up build automation scripts

## License 📄

[MIT License](LICENSE)

---

<p align="center">
  © 2025 My Chrome Extension Template<br>
  <a href="https://github.com/e20c1">Made with ❤️ by E20C1</a>
</p>
