/**
 * Content Script for Chrome Extension
 * 
 * This script runs in the context of web pages and can interact with their DOM.
 * It communicates with the background script using chrome.runtime.sendMessage.
 */

// Initialize content script
function initContentScript() {
  console.log('Content script initialized on:', window.location.href);
  
  // Request settings from background script
  chrome.runtime.sendMessage(
    { type: 'GET_SETTINGS' },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
        return;
      }
      
      if (response && response.isEnabled) {
        // Extension is enabled, start main functionality
        startExtensionFeatures(response.settings);
      }
    }
  );
}

// Main functionality of the extension
function startExtensionFeatures(settings) {
  console.log('Starting extension features with settings:', settings);
  
  // Example: Add custom styles based on settings
  if (settings.theme === 'dark') {
    applyDarkTheme();
  }
  
  // Example: Add event listeners to page elements
  document.addEventListener('click', handlePageClick);
  
  // Example: Modify page content
  // addCustomInterface();
}

// Example function to apply dark theme
function applyDarkTheme() {
  const style = document.createElement('style');
  style.textContent = `
    /* Custom dark theme styles */
    .extension-element {
      background-color: #333;
      color: #fff;
    }
  `;
  document.head.appendChild(style);
}

// Example event handler for page clicks
function handlePageClick(event) {
  // Process click events if needed
  // console.log('Page click:', event.target);
}

// Example function to add custom interface elements
function addCustomInterface() {
  const container = document.createElement('div');
  container.className = 'extension-element';
  container.innerHTML = `
    <div class="extension-header">Extension Interface</div>
    <button id="extension-action-btn">Perform Action</button>
  `;
  
  document.body.appendChild(container);
  
  document.getElementById('extension-action-btn').addEventListener('click', () => {
    chrome.runtime.sendMessage({
      type: 'PERFORM_ACTION',
      data: { url: window.location.href }
    });
  });
}

// Start the content script
initContentScript();
