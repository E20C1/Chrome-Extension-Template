/**
 * Background Script for Chrome Extension
 * 
 * This script runs in the background and handles events from the extension.
 * It can communicate with content scripts, popup, and options page.
 */

// Extension initialization
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    // Set default extension settings
    chrome.storage.local.set({
      isEnabled: true,
      settings: {
        theme: 'light',
        notifications: true
      }
    });
    
    // Open onboarding page on install
    chrome.tabs.create({
      url: 'options/options.html'
    });
  }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Log messages for debugging
  console.log('Received message:', message, 'from:', sender);
  
  if (message.type === 'GET_SETTINGS') {
    // Return settings to the requester
    chrome.storage.local.get(['isEnabled', 'settings'], (data) => {
      sendResponse(data);
    });
    return true; // Required to use sendResponse asynchronously
  }
  
  if (message.type === 'SAVE_SETTINGS') {
    // Save settings
    chrome.storage.local.set({
      isEnabled: message.data.isEnabled,
      settings: message.data.settings
    }, () => {
      sendResponse({ success: true });
    });
    return true; // Required to use sendResponse asynchronously
  }
});

// Example of browser action (toolbar icon) click handler
chrome.action.onClicked.addListener((tab) => {
  // This only runs if you don't have a default popup
  console.log('Extension icon clicked on tab:', tab.id);
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Tab has finished loading
    console.log('Tab updated:', tabId, tab.url);
  }
});
