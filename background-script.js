// Gmail Spam Detector Pro - Background Service Worker
// Enterprise-grade background processing with performance monitoring

class BackgroundServiceWorker {
  constructor() {
    this.analytics = {
      totalEmailsProcessed: 0,
      totalSpamDetected: 0,
      totalDeletions: 0,
      totalUnsubscribes: 0,
      averageProcessingTime: 0,
      uptime: Date.now(),
      errors: [],
      performanceMetrics: {}
    };
    
    this.cache = new Map();
    this.activeTabs = new Set();
    this.isInitialized = false;
    
    this.init();
  }

  async init() {
    console.log('🚀 Gmail Spam Detector Pro Background Service initializing...');
    
    try {
      await this.setupDefaultSettings();
      this.setupEventListeners();
      this.startPerformanceMonitoring();
      this.startAnalyticsCollection();
      this.setupPeriodicCleanup();
      
      this.isInitialized = true;
      console.log('✅ Background Service ready');
    } catch (error) {
      console.error('❌ Background Service initialization failed:', error);
      this.logError('Background initialization failed', error);
    }
  }

  async setupDefaultSettings() {
    const defaultSettings = {
      autoDelete: false,
      logDeletions: true,
      sensitivity: 3,
      autoUnsubscribe: true,
      unsubscribeDelay: 2000,
      enableAI: true,
      enableCaching: true,
      enableNotifications: true,
      batchProcessing: true,
      memoryOptimization: true,
      realTimeProtection: true,
      analyticsEnabled: true,
      performanceMonitoring: true
    };

    try {
      const result = await chrome.storage.sync.get(['spamDetectorSettings']);
      if (!result.spamDetectorSettings) {
        await chrome.storage.sync.set({ spamDetectorSettings: defaultSettings });
        console.log('📝 Default settings initialized');
      }
    } catch (error) {
      console.error('Error setting up default settings:', error);
    }
  }

  setupEventListeners() {
    // Extension installation
    chrome.runtime.onInstalled.addListener((details) => {
      console.log('📦 Extension installed/updated:', details.reason);
      this.analytics.installationDate = new Date().toISOString();
      
      if (details.reason === 'install') {
        this.showWelcomeNotification();
      } else if (details.reason === 'update') {
        this.showUpdateNotification();
      }
    });

    // Message handling
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open for async response
    });

    // Tab management
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      this.handleTabUpdate(tabId, changeInfo, tab);
    });

    chrome.tabs.onRemoved.addListener((tabId) => {
      this.activeTabs.delete(tabId);
    });

    // Extension action click
    chrome.action.onClicked.addListener((tab) => {
      this.handleExtensionAction(tab);
    });

    // Storage change monitoring
    chrome.storage.onChanged.addListener((changes, namespace) => {
      this.handleStorageChange(changes, namespace);
    });
  }

  async handleMessage(request, sender, sendResponse) {
    const startTime = performance.now();
    
    try {
      switch (request.action) {
        case 'getSettings':
          await this.handleGetSettings(sendResponse);
          break;
          
        case 'saveSettings':
          await this.handleSaveSettings(request.settings, sendResponse);
          break;
          
        case 'getDeletedEmails':
          await this.handleGetDeletedEmails(sendResponse);
          break;
          
        case 'getUnsubscribeLogs':
          await this.handleGetUnsubscribeLogs(sendResponse);
          break;
          
        case 'clearActivityLog':
          await this.handleClearActivityLog(sendResponse);
          break;
          
        case 'scanUnsubscribeLinks':
          await this.handleScanUnsubscribeLinks(sendResponse);
          break;
          
        case 'manualUnsubscribe':
          await this.handleManualUnsubscribe(sendResponse);
          break;
          
        case 'getAnalytics':
          await this.handleGetAnalytics(sendResponse);
          break;
          
        case 'getPerformanceMetrics':
          await this.handleGetPerformanceMetrics(sendResponse);
          break;
          
        case 'clearCache':
          await this.handleClearCache(sendResponse);
          break;
          
        case 'exportData':
          await this.handleExportData(sendResponse);
          break;
          
        default:
          sendResponse({ error: 'Unknown action' });
      }
      
      // Log performance
      const processingTime = performance.now() - startTime;
      this.analytics.averageProcessingTime = 
        (this.analytics.averageProcessingTime + processingTime) / 2;
        
    } catch (error) {
      console.error('Error handling message:', error);
      this.logError('Message handling error', error);
      sendResponse({ error: error.message });
    }
  }

  async handleGetSettings(sendResponse) {
    try {
      const result = await chrome.storage.sync.get(['spamDetectorSettings']);
      sendResponse(result.spamDetectorSettings || {});
    } catch (error) {
      console.error('Error getting settings:', error);
      sendResponse({});
    }
  }

  async handleSaveSettings(settings, sendResponse) {
    try {
      await chrome.storage.sync.set({ spamDetectorSettings: settings });
      this.analytics.settingsUpdated = new Date().toISOString();
      sendResponse({ success: true });
    } catch (error) {
      console.error('Error saving settings:', error);
      sendResponse({ error: error.message });
    }
  }

  async handleGetDeletedEmails(sendResponse) {
    try {
      const result = await chrome.storage.local.get(['deletedEmails']);
      sendResponse(result.deletedEmails || []);
    } catch (error) {
      console.error('Error getting deleted emails:', error);
      sendResponse([]);
    }
  }

  async handleGetUnsubscribeLogs(sendResponse) {
    try {
      const result = await chrome.storage.local.get(['unsubscribeLogs']);
      sendResponse(result.unsubscribeLogs || []);
    } catch (error) {
      console.error('Error getting unsubscribe logs:', error);
      sendResponse([]);
    }
  }

  async handleClearActivityLog(sendResponse) {
    try {
      await chrome.storage.local.remove(['deletedEmails', 'unsubscribeLogs']);
      this.analytics.totalDeletions = 0;
      this.analytics.totalUnsubscribes = 0;
      sendResponse({ success: true });
    } catch (error) {
      console.error('Error clearing activity log:', error);
      sendResponse({ error: error.message });
    }
  }

  async handleScanUnsubscribeLinks(sendResponse) {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0] && tabs[0].url.includes('mail.google.com')) {
        await chrome.tabs.sendMessage(tabs[0].id, { action: 'scanUnsubscribeLinks' });
      }
      sendResponse({ success: true });
    } catch (error) {
      console.error('Error scanning unsubscribe links:', error);
      sendResponse({ error: error.message });
    }
  }

  async handleManualUnsubscribe(sendResponse) {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0] && tabs[0].url.includes('mail.google.com')) {
        await chrome.tabs.sendMessage(tabs[0].id, { action: 'manualUnsubscribe' });
      }
      sendResponse({ success: true });
    } catch (error) {
      console.error('Error manual unsubscribe:', error);
      sendResponse({ error: error.message });
    }
  }

  async handleGetAnalytics(sendResponse) {
    try {
      const analytics = {
        ...this.analytics,
        uptime: Date.now() - this.analytics.uptime,
        cacheSize: this.cache.size,
        activeTabs: this.activeTabs.size
      };
      sendResponse(analytics);
    } catch (error) {
      console.error('Error getting analytics:', error);
      sendResponse({});
    }
  }

  async handleGetPerformanceMetrics(sendResponse) {
    try {
      const metrics = {
        memoryUsage: performance.memory ? {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        } : null,
        cacheSize: this.cache.size,
        averageProcessingTime: this.analytics.averageProcessingTime,
        totalEmailsProcessed: this.analytics.totalEmailsProcessed
      };
      sendResponse(metrics);
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      sendResponse({});
    }
  }

  async handleClearCache(sendResponse) {
    try {
      this.cache.clear();
      sendResponse({ success: true, cacheSize: 0 });
    } catch (error) {
      console.error('Error clearing cache:', error);
      sendResponse({ error: error.message });
    }
  }

  async handleExportData(sendResponse) {
    try {
      const [settings, deletedEmails, unsubscribeLogs] = await Promise.all([
        chrome.storage.sync.get(['spamDetectorSettings']),
        chrome.storage.local.get(['deletedEmails']),
        chrome.storage.local.get(['unsubscribeLogs'])
      ]);

      const exportData = {
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        settings: settings.spamDetectorSettings || {},
        deletedEmails: deletedEmails.deletedEmails || [],
        unsubscribeLogs: unsubscribeLogs.unsubscribeLogs || [],
        analytics: this.analytics
      };

      sendResponse({ success: true, data: exportData });
    } catch (error) {
      console.error('Error exporting data:', error);
      sendResponse({ error: error.message });
    }
  }

  handleTabUpdate(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('mail.google.com')) {
      this.activeTabs.add(tabId);
      console.log('📧 Gmail tab detected:', tabId);
      
      // Inject content script if needed
      this.ensureContentScriptInjected(tabId);
    }
  }

  async ensureContentScriptInjected(tabId) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
          try {
            if (typeof window !== 'undefined' && !window.gmailSpamDetector) {
              console.log('🔄 Content script not found, reloading...');
              window.location.reload();
            }
          } catch (error) {
            console.error('Error in content script check:', error);
          }
        }
      });
    } catch (error) {
      console.error('Error ensuring content script:', error);
    }
  }

  handleExtensionAction(tab) {
    if (tab.url && tab.url.includes('mail.google.com')) {
      // Open popup or show settings
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          try {
            if (typeof window !== 'undefined' && window.gmailSpamDetector) {
              window.gmailSpamDetector.showSettings();
            }
          } catch (error) {
            console.error('Error in extension action:', error);
          }
        }
      });
    } else {
      // Show notification for non-Gmail tabs
      this.showNotification('Please navigate to Gmail to use the Spam Detector', 'info');
    }
  }

  handleStorageChange(changes, namespace) {
    console.log('💾 Storage changed:', namespace, Object.keys(changes));
    
    // Update analytics based on storage changes
    if (namespace === 'local') {
      if (changes.deletedEmails) {
        this.analytics.totalDeletions = changes.deletedEmails.newValue?.length || 0;
      }
      if (changes.unsubscribeLogs) {
        this.analytics.totalUnsubscribes = changes.unsubscribeLogs.newValue?.length || 0;
      }
    }
  }

  startPerformanceMonitoring() {
    setInterval(() => {
      this.collectPerformanceMetrics();
    }, 30000); // Every 30 seconds
  }

  async collectPerformanceMetrics() {
    try {
      const metrics = {
        timestamp: Date.now(),
        memoryUsage: performance.memory ? {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        } : null,
        cacheSize: this.cache.size,
        activeTabs: this.activeTabs.size,
        uptime: Date.now() - this.analytics.uptime
      };

      this.analytics.performanceMetrics = metrics;
      
      // Log if memory usage is high
      if (performance.memory && performance.memory.usedJSHeapSize > performance.memory.jsHeapSizeLimit * 0.8) {
        console.warn('⚠️ High memory usage detected');
        this.optimizeMemory();
      }
    } catch (error) {
      console.error('Error collecting performance metrics:', error);
    }
  }

  startAnalyticsCollection() {
    setInterval(() => {
      this.saveAnalytics();
    }, 60000); // Every minute
  }

  async saveAnalytics() {
    try {
      await chrome.storage.local.set({
        analytics: {
          ...this.analytics,
          lastUpdated: Date.now()
        }
      });
    } catch (error) {
      console.error('Error saving analytics:', error);
    }
  }

  setupPeriodicCleanup() {
    setInterval(() => {
      this.performCleanup();
    }, 300000); // Every 5 minutes
  }

  async performCleanup() {
    try {
      // Clear old cache entries
      const maxCacheSize = 1000;
      if (this.cache.size > maxCacheSize) {
        const entries = Array.from(this.cache.entries());
        const toDelete = entries.slice(0, entries.length - maxCacheSize);
        toDelete.forEach(([key]) => this.cache.delete(key));
        console.log('🧹 Cache cleaned, removed', toDelete.length, 'entries');
      }

      // Clear old error logs
      if (this.analytics.errors.length > 100) {
        this.analytics.errors = this.analytics.errors.slice(-50);
      }

      // Optimize memory
      this.optimizeMemory();
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  optimizeMemory() {
    // Clear old performance metrics
    if (this.analytics.totalEmailsProcessed > 10000) {
      this.analytics.totalEmailsProcessed = Math.floor(this.analytics.totalEmailsProcessed / 2);
    }

    // Force garbage collection if available (service worker context)
    if (typeof globalThis !== 'undefined' && globalThis.gc) {
      globalThis.gc();
    }
  }

  logError(message, error) {
    const errorLog = {
      message,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };

    this.analytics.errors.push(errorLog);
    console.error('❌ Error logged:', errorLog);
  }

  async showNotification(message, type = 'info') {
    try {
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Gmail Spam Detector Pro',
        message: message
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }

  showWelcomeNotification() {
    this.showNotification('Welcome to Gmail Spam Detector Pro! 🎉', 'info');
  }

  showUpdateNotification() {
    this.showNotification('Gmail Spam Detector Pro has been updated! 🚀', 'info');
  }
}

// Initialize the background service worker with error handling
let backgroundWorker;

try {
  backgroundWorker = new BackgroundServiceWorker();
  console.log('✅ Background service worker initialized');
} catch (error) {
  console.error('❌ Failed to initialize background service worker:', error);
}

// Handle service worker lifecycle
self.addEventListener('install', (event) => {
  console.log('🔄 Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service worker activated');
  event.waitUntil(self.clients.claim());
});

// Handle unhandled errors
self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason);
  if (backgroundWorker) {
    backgroundWorker.logError('Unhandled promise rejection', event.reason);
  }
});

// Handle errors
self.addEventListener('error', (event) => {
  console.error('❌ Service worker error:', event.error);
  if (backgroundWorker) {
    backgroundWorker.logError('Service worker error', event.error);
  }
}); 