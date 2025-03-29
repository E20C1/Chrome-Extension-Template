/**
 * Options Page Script for Chrome Extension
 */

// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const autoStart = document.getElementById('auto-start');
const notifications = document.getElementById('notifications');
const dataSync = document.getElementById('data-sync');
const updateInterval = document.getElementById('update-interval');
const operationMode = document.getElementById('operation-mode');
const customCSS = document.getElementById('custom-css');
const siteRulesList = document.getElementById('site-rules-list');
const addSiteRuleBtn = document.getElementById('add-site-rule');
const exportDataBtn = document.getElementById('export-data');
const importDataBtn = document.getElementById('import-data');
const clearDataBtn = document.getElementById('clear-data');
const resetOptionsBtn = document.getElementById('reset-options');
const saveOptionsBtn = document.getElementById('save-options');
const dataSize = document.getElementById('data-size');
const lastUpdate = document.getElementById('last-update');

// i18n Element IDs
const i18nElements = {
  'settings-title': 'settingsTitle',
  'general-settings-title': 'generalSettings',
  'auto-start-label': 'autoStart',
  'auto-start-desc': 'autoStartDesc',
  'notifications-label': 'notifications',
  'notifications-desc': 'notificationsDesc',
  'data-sync-label': 'dataSync',
  'data-sync-desc': 'dataSyncDesc',
  'advanced-options-title': 'advancedOptions',
  'update-interval-label': 'updateInterval',
  'update-interval-desc': 'updateIntervalDesc',
  'hour-option': 'hour',
  'operation-mode-label': 'operationMode',
  'operation-mode-desc': 'operationModeDesc',
  'light-mode-option': 'lightMode',
  'balanced-mode-option': 'balancedMode',
  'full-mode-option': 'fullMode',
  'custom-css-label': 'customCSS',
  'custom-css-desc': 'customCSSDesc',
  'site-settings-title': 'siteSettings',
  'domain-label': 'domain',
  'enabled-label': 'enabled',
  'actions-label': 'actions',
  'add-site-rule': 'addSite',
  'data-management-title': 'dataManagement',
  'stored-data-size-label': 'storedDataSize',
  'last-update-label': 'lastUpdate',
  'export-data': 'exportData',
  'import-data': 'importData',
  'clear-data': 'clearData',
  'reset-options': 'resetToDefaults',
  'save-options': 'saveSettings',
  'version-text': 'version'
};

// Default options
const defaultOptions = {
  theme: 'light',
  autoStart: true,
  notifications: true,
  dataSync: false,
  updateInterval: '30',
  operationMode: 'light',
  customCSS: '',
  siteRules: [
    { domain: 'example.com', enabled: true }
  ]
};

// Current options
let currentOptions = { ...defaultOptions };

// Initialize options page
document.addEventListener('DOMContentLoaded', () => {
  // Load saved options
  loadOptions();
  
  // Set up event listeners
  setupEventListeners();
});

// Load options from storage
function loadOptions() {
  chrome.storage.sync.get('options', (data) => {
    if (data.options) {
      currentOptions = { ...defaultOptions, ...data.options };
    }
    
    // Update UI with loaded options
    updateUI();
    
    // Apply i18n messages
    loadI18nMessages();
  });
}

// Update UI elements with current options
function updateUI() {
  // Theme
  if (currentOptions.theme === 'dark') {
    themeSwitch.checked = true;
    document.body.classList.add('dark-theme');
  } else {
    themeSwitch.checked = false;
    document.body.classList.remove('dark-theme');
  }
  
  // General settings
  autoStart.checked = currentOptions.autoStart;
  notifications.checked = currentOptions.notifications;
  dataSync.checked = currentOptions.dataSync;
  
  // Advanced settings
  updateInterval.value = currentOptions.updateInterval;
  operationMode.value = currentOptions.operationMode;
  customCSS.value = currentOptions.customCSS || '';
  
  // Site rules
  updateSiteRulesList();
  
  // Last update time
  const now = new Date();
  lastUpdate.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  
  // Calculate approximate data size
  calculateDataSize();
}

// Load internationalization messages
function loadI18nMessages() {
  // Set document title
  document.title = chrome.i18n.getMessage('settingsTitle');
  
  // Apply translations to all elements
  for (const [elementId, messageName] of Object.entries(i18nElements)) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = chrome.i18n.getMessage(messageName);
    }
  }
  
  // Special case for textarea placeholder
  customCSS.placeholder = chrome.i18n.getMessage('customCSSPlaceholder');
}

// Set up all event listeners
function setupEventListeners() {
  // Theme toggle
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.body.classList.add('dark-theme');
      currentOptions.theme = 'dark';
    } else {
      document.body.classList.remove('dark-theme');
      currentOptions.theme = 'light';
    }
  });
  
  // General settings
  autoStart.addEventListener('change', () => {
    currentOptions.autoStart = autoStart.checked;
  });
  
  notifications.addEventListener('change', () => {
    currentOptions.notifications = notifications.checked;
  });
  
  dataSync.addEventListener('change', () => {
    currentOptions.dataSync = dataSync.checked;
  });
  
  // Advanced settings
  updateInterval.addEventListener('change', () => {
    currentOptions.updateInterval = updateInterval.value;
  });
  
  operationMode.addEventListener('change', () => {
    currentOptions.operationMode = operationMode.value;
  });
  
  customCSS.addEventListener('input', () => {
    currentOptions.customCSS = customCSS.value;
  });
  
  // Site rules
  addSiteRuleBtn.addEventListener('click', addNewSiteRule);
  
  // Data management
  exportDataBtn.addEventListener('click', exportData);
  importDataBtn.addEventListener('click', importData);
  clearDataBtn.addEventListener('click', clearData);
  
  // Save and reset
  resetOptionsBtn.addEventListener('click', resetOptions);
  saveOptionsBtn.addEventListener('click', saveOptions);
}

// Update the site rules list UI
function updateSiteRulesList() {
  // Clear existing list
  siteRulesList.innerHTML = '';
  
  // Add each site rule
  currentOptions.siteRules.forEach((rule, index) => {
    const ruleItem = document.createElement('div');
    ruleItem.className = 'site-rule-item';
    
    ruleItem.innerHTML = `
      <div class="site-rule-domain">${rule.domain}</div>
      <div class="site-rule-enabled">
        <label class="toggle-switch small">
          <input type="checkbox" data-index="${index}" ${rule.enabled ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="site-rule-actions">
        <button class="icon-button edit-rule" data-index="${index}">✏️</button>
        <button class="icon-button delete-rule" data-index="${index}">🗑️</button>
      </div>
    `;
    
    siteRulesList.appendChild(ruleItem);
    
    // Add event listeners for this rule
    const toggleCheckbox = ruleItem.querySelector('input[type="checkbox"]');
    toggleCheckbox.addEventListener('change', () => {
      currentOptions.siteRules[index].enabled = toggleCheckbox.checked;
    });
    
    const editButton = ruleItem.querySelector('.edit-rule');
    editButton.addEventListener('click', () => {
      editSiteRule(index);
    });
    
    const deleteButton = ruleItem.querySelector('.delete-rule');
    deleteButton.addEventListener('click', () => {
      deleteSiteRule(index);
    });
  });
}

// Add a new site rule
function addNewSiteRule() {
  const promptMessage = 'Enter domain (e.g. example.com):';
    
  const domain = prompt(promptMessage);
  if (domain) {
    // Check if domain already exists
    const exists = currentOptions.siteRules.some(rule => rule.domain === domain);
    if (exists) {
      const alertMessage = 'This domain is already registered.';
      alert(alertMessage);
      return;
    }
    
    // Add new rule
    currentOptions.siteRules.push({
      domain: domain,
      enabled: true
    });
    
    // Update UI
    updateSiteRulesList();
  }
}

// Edit an existing site rule
function editSiteRule(index) {
  const rule = currentOptions.siteRules[index];
  
  const promptMessage = 'Enter new domain name:';
    
  const newDomain = prompt(promptMessage, rule.domain);
  if (newDomain && newDomain !== rule.domain) {
    // Check if domain already exists
    const exists = currentOptions.siteRules.some((r, i) => i !== index && r.domain === newDomain);
    if (exists) {
      const alertMessage = 'This domain is already registered.';
      alert(alertMessage);
      return;
    }
    
    // Update rule
    currentOptions.siteRules[index].domain = newDomain;
    
    // Update UI
    updateSiteRulesList();
  }
}

// Delete a site rule
function deleteSiteRule(index) {
  const confirmMessage = 'Are you sure you want to delete this site rule?';
    
  if (confirm(confirmMessage)) {
    currentOptions.siteRules.splice(index, 1);
    updateSiteRulesList();
  }
}

// Export all extension data
function exportData() {
  // Prepare data
  const exportData = {
    options: currentOptions,
    version: '1.0.0',
    exportDate: new Date().toISOString()
  };
  
  // Convert to JSON
  const jsonData = JSON.stringify(exportData, null, 2);
  
  // Create download link
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create and click download link
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chrome-extension-backup.json';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Import extension data
function importData() {
  const confirmMessage = 'Existing settings will be overwritten by imported data. Continue?';
    
  if (!confirm(confirmMessage)) {
    return;
  }
  
  // Create file input
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        
        if (!importedData || !importedData.options) {
          throw new Error('Invalid data format');
        }
        
        // Apply imported options
        currentOptions = { ...defaultOptions, ...importedData.options };
        
        // Update UI
        updateUI();
        
        // Save to storage
        saveOptions();
        
        const successMessage = 'Data import completed successfully.';
        alert(successMessage);
      } catch (error) {
        const errorMessage = 'Failed to import data: ' + error.message;
        alert(errorMessage);
        console.error('Import error:', error);
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

// Clear all extension data
function clearData() {
  const confirmMessage = 'This will delete all data and settings. This cannot be undone. Continue?';
    
  if (confirm(confirmMessage)) {
    // Reset to defaults
    currentOptions = { ...defaultOptions };
    
    // Update UI
    updateUI();
    
    // Save to storage
    saveOptions();
    
    const clearMessage = 'Data has been cleared.';
    alert(clearMessage);
  }
}

// Reset options to defaults
function resetOptions() {
  const confirmMessage = 'Reset all settings to defaults. Continue?';
    
  if (confirm(confirmMessage)) {
    currentOptions = { ...defaultOptions };
    updateUI();
    
    const resetMessage = 'Settings have been reset.';
    alert(resetMessage);
  }
}

// Save options to storage
function saveOptions() {
  chrome.storage.sync.set({ options: currentOptions }, () => {
    console.log('Options saved:', currentOptions);
    
    // Update settings in other parts of the extension
    chrome.runtime.sendMessage({
      type: 'OPTIONS_UPDATED',
      data: { options: currentOptions }
    });
    
    // Visual feedback
    const originalText = saveOptionsBtn.textContent;
    const savedText = 'Saved!';
    
    saveOptionsBtn.textContent = savedText;
    saveOptionsBtn.classList.add('success');
    
    setTimeout(() => {
      saveOptionsBtn.textContent = originalText;
      saveOptionsBtn.classList.remove('success');
    }, 2000);
    
    // Update last update time
    const now = new Date();
    lastUpdate.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  });
}

// Calculate approximate data size
function calculateDataSize() {
  // Get all data as string
  const optionsStr = JSON.stringify(currentOptions);
  
  // Calculate size in KB
  const sizeInBytes = new Blob([optionsStr]).size;
  let sizeText;
  
  if (sizeInBytes < 1024) {
    sizeText = `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    sizeText = `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else {
    sizeText = `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  
  // Update UI
  dataSize.textContent = sizeText;
}
