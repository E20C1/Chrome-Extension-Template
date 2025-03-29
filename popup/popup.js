/**
 * Popup Script for Chrome Extension
 */

// DOM Elements
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const toggleButton = document.getElementById('toggle-status');
const themeSwitch = document.getElementById('theme-switch');
const featureToggles = document.querySelectorAll('.feature-toggle');
const actionButton = document.getElementById('action-button');
const optionsButton = document.getElementById('options-button');
const popupTitle = document.getElementById('popup-title');
const featuresTitle = document.getElementById('features-title');
const versionText = document.getElementById('version-text');
const feature1Text = document.getElementById('feature1-text');
const feature2Text = document.getElementById('feature2-text');
const feature3Text = document.getElementById('feature3-text');

// Extension state
let extensionEnabled = true;
let currentSettings = {
  theme: 'light',
  language: 'en',
  features: {
    feature1: true,
    feature2: true,
    feature3: true
  }
};

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  // Load settings from storage
  chrome.storage.sync.get(['isEnabled', 'settings'], (data) => {
    if (data.isEnabled !== undefined) {
      extensionEnabled = data.isEnabled;
    }
    
    if (data.settings) {
      currentSettings = data.settings;
      
      // Update theme toggle
      if (currentSettings.theme === 'dark') {
        themeSwitch.checked = true;
        document.body.classList.add('dark-theme');
      }
      
      // Update feature toggles
      featureToggles.forEach(toggle => {
        const feature = toggle.dataset.feature;
        if (currentSettings.features && currentSettings.features[feature] !== undefined) {
          toggle.checked = currentSettings.features[feature];
        }
      });
    }

    // Load i18n messages
    loadI18nMessages();
    
    // Update UI based on status
    updateStatusUI();
  });
  
  // Set up event listeners
  setupEventListeners();
});

// Load internationalization messages
function loadI18nMessages() {
  // Set document title
  document.title = chrome.i18n.getMessage('extensionName');
  
  // Set popup header
  popupTitle.textContent = chrome.i18n.getMessage('popupTitle');
  
  // Set features title
  featuresTitle.textContent = chrome.i18n.getMessage('featuresTitle');
  
  // Set feature texts
  feature1Text.textContent = chrome.i18n.getMessage('feature1');
  feature2Text.textContent = chrome.i18n.getMessage('feature2');
  feature3Text.textContent = chrome.i18n.getMessage('feature3');
  
  // Set button texts
  actionButton.textContent = chrome.i18n.getMessage('executeAction');
  optionsButton.textContent = chrome.i18n.getMessage('advancedSettings');
  
  // Set version text
  versionText.textContent = chrome.i18n.getMessage('version');
}

// Set up all event listeners
function setupEventListeners() {
  // Toggle extension on/off
  toggleButton.addEventListener('click', toggleExtensionStatus);
  
  // Toggle dark/light theme
  themeSwitch.addEventListener('change', toggleTheme);
  
  // Feature toggles
  featureToggles.forEach(toggle => {
    toggle.addEventListener('change', updateFeatureSettings);
  });
  
  // Action button
  actionButton.addEventListener('click', performAction);
  
  // Options button
  optionsButton.addEventListener('click', openOptionsPage);
}

// Toggle extension enabled/disabled
function toggleExtensionStatus() {
  extensionEnabled = !extensionEnabled;
  
  // Save to storage
  chrome.storage.sync.set({ isEnabled: extensionEnabled }, () => {
    console.log('Extension status updated:', extensionEnabled);
    updateStatusUI();
    
    // Notify background script
    chrome.runtime.sendMessage({
      type: 'TOGGLE_STATUS',
      data: { isEnabled: extensionEnabled }
    });
  });
}

// Update UI based on extension status
function updateStatusUI() {
  if (extensionEnabled) {
    statusIndicator.classList.remove('disabled');
    statusIndicator.classList.add('enabled');
    statusText.textContent = chrome.i18n.getMessage('statusEnabled');
    toggleButton.textContent = chrome.i18n.getMessage('turnOff');
  } else {
    statusIndicator.classList.remove('enabled');
    statusIndicator.classList.add('disabled');
    statusText.textContent = chrome.i18n.getMessage('statusDisabled', 'Extension is disabled');
    toggleButton.textContent = chrome.i18n.getMessage('turnOn');
  }
}

// Toggle theme between light and dark
function toggleTheme() {
  const isDarkTheme = themeSwitch.checked;
  
  if (isDarkTheme) {
    document.body.classList.add('dark-theme');
    currentSettings.theme = 'dark';
  } else {
    document.body.classList.remove('dark-theme');
    currentSettings.theme = 'light';
  }
  
  // Save settings
  saveSettings();
}

// Update feature settings when toggles change
function updateFeatureSettings() {
  featureToggles.forEach(toggle => {
    const feature = toggle.dataset.feature;
    currentSettings.features[feature] = toggle.checked;
  });
  
  // Save settings
  saveSettings();
}

// Save settings to storage
function saveSettings() {
  chrome.storage.sync.set({ settings: currentSettings }, () => {
    console.log('Settings saved:', currentSettings);
    
    // Notify background script
    chrome.runtime.sendMessage({
      type: 'SAVE_SETTINGS',
      data: { settings: currentSettings }
    });
  });
}

// Perform main action
function performAction() {
  console.log('Action button clicked');
  
  // Get current tab info
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.runtime.sendMessage({
        type: 'PERFORM_ACTION',
        data: {
          tabId: tabs[0].id,
          url: tabs[0].url
        }
      });
    }
  });
  
  // Visual feedback
  const originalText = actionButton.textContent;
  actionButton.textContent = '実行中...';
  setTimeout(() => {
    actionButton.textContent = '完了!';
    setTimeout(() => {
      actionButton.textContent = originalText;
    }, 1000);
  }, 1000);
}

// Open options page
function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}
