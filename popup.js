// Gmail Spam Detector Pro - Popup Manager
// Enterprise-grade popup with real-time analytics and advanced features

class PopupManagerPro {
  constructor() {
    this.currentTab = 'dashboard';
    this.analytics = {};
    this.performanceMetrics = {};
    this.settings = {};
    this.isLoading = false;
    
    this.init();
  }

  async init() {
    console.log('🚀 Popup Manager Pro initializing...');
    
    try {
      // Safety check for chrome.runtime
      if (typeof chrome === 'undefined' || !chrome.runtime) {
        console.error('❌ Chrome runtime not available');
        this.showNotification('Extension not loaded properly', 'error');
        return;
      }

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      await this.loadSettings();
      this.setupEventListeners();
      this.setupTabNavigation();
      this.loadDashboardData();
      this.startRealTimeUpdates();
      this.checkExtensionStatus();
      
      console.log('✅ Popup Manager Pro ready');
    } catch (error) {
      console.error('❌ Popup initialization failed:', error);
      this.showNotification('Failed to initialize popup', 'error');
    }
  }

  async loadSettings() {
    try {
      // Try to get settings from content script
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url && tab.url.includes('mail.google.com')) {
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getSettings' });
        if (response && response.settings) {
          this.settings = response.settings;
          this.updateSettingsUI();
          return;
        }
      }
      
      // Fallback: load from storage
      const result = await chrome.storage.sync.get(['spamDetectorSettings']);
      if (result.spamDetectorSettings) {
        this.settings = result.spamDetectorSettings;
        this.updateSettingsUI();
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Use default settings
      this.settings = {
        autoDelete: false,
        logDeletions: true,
        sensitivity: 3,
        autoUnsubscribe: true,
        enableAI: true,
        enableCaching: true,
        batchProcessing: true,
        memoryOptimization: true,
        realTimeProtection: true,
        autoOrganize: false
      };
      this.updateSettingsUI();
    }
  }

  updateSettingsUI() {
    // Update toggle switches with correct IDs
    this.updateToggle('auto-delete', this.settings.autoDelete);
    this.updateToggle('log-deletions', this.settings.logDeletions);
    this.updateToggle('auto-unsubscribe', this.settings.autoUnsubscribe);
    this.updateToggle('enable-ai', this.settings.enableAI);
    this.updateToggle('enable-caching', this.settings.enableCaching);
    this.updateToggle('batch-processing', this.settings.batchProcessing);
    this.updateToggle('memory-optimization', this.settings.memoryOptimization);
    this.updateToggle('real-time-protection', this.settings.realTimeProtection);
    this.updateToggle('auto-organize', this.settings.autoOrganize);
    
    // Update sensitivity slider
    const sensitivitySlider = document.getElementById('sensitivity');
    const sensitivityValue = document.getElementById('sensitivity-value');
    if (sensitivitySlider && sensitivityValue) {
      sensitivitySlider.value = this.settings.sensitivity || 3;
      sensitivityValue.textContent = this.settings.sensitivity || 3;
    }
  }

  updateToggle(elementId, isActive) {
    const element = document.getElementById(elementId);
    if (element) {
      if (isActive) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    }
  }

  setupEventListeners() {
    try {
      // Settings save (keep for manual save if button exists)
      const saveSettingsBtn = document.getElementById('save-settings');
      if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
          this.saveSettings();
        });
      }

      // Sensitivity slider (auto-save)
      const sensitivitySlider = document.getElementById('sensitivity');
      const sensitivityValue = document.getElementById('sensitivity-value');
      if (sensitivitySlider && sensitivityValue) {
        sensitivitySlider.addEventListener('input', (e) => {
          sensitivityValue.textContent = e.target.value;
          this.settings.sensitivity = Number(e.target.value);
          this.saveSettings(); // Auto-save on slider change
        });
      }

      // Toggle switches (auto-save)
      this.setupToggleSwitches();
      
      // Data management buttons
      const exportDataBtn = document.getElementById('export-data');
      if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
          this.exportData();
        });
      }
      
      const clearLogsBtn = document.getElementById('clear-logs');
      if (clearLogsBtn) {
        clearLogsBtn.addEventListener('click', () => {
          this.clearLogs();
        });
      }
      
      const resetSettingsBtn = document.getElementById('reset-settings');
      if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', () => {
          this.resetSettings();
        });
      }

      // Logs tab buttons
      const clearActivityLogBtn = document.getElementById('clear-activity-log');
      if (clearActivityLogBtn) {
        clearActivityLogBtn.addEventListener('click', () => {
          this.clearActivityLog();
        });
      }
      
      const exportActivityDataBtn = document.getElementById('export-activity-data');
      if (exportActivityDataBtn) {
        exportActivityDataBtn.addEventListener('click', () => {
          this.exportActivity();
        });
      }
    } catch (error) {
      console.error('Error setting up event listeners:', error);
    }
  }

  setupToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        // Update settings object
        const settingName = toggle.id;
        this.settings[settingName] = toggle.classList.contains('active');
        this.saveSettings(); // Auto-save on toggle
      });
    });
  }

  setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.tab);
      });
    });
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    this.currentTab = tabName;
    
    // Load tab-specific data
    switch (tabName) {
      case 'dashboard':
        this.loadDashboardData();
        break;
      case 'settings':
        this.loadSettings();
        break;
      case 'analytics':
        this.loadAnalytics();
        break;
      case 'logs':
        this.loadActivityLog();
        break;
    }
  }

  async loadDashboardData() {
    try {
      this.setLoading(true);
      
      // Load statistics
      await this.loadStatistics();
      
      // Load performance metrics
      await this.loadPerformanceMetrics();
      
      this.setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      this.setLoading(false);
    }
  }

  async loadStatistics() {
    try {
      // Safety check for chrome.runtime
      if (typeof chrome === 'undefined' || !chrome.runtime) {
        console.error('❌ Chrome runtime not available for statistics');
        return;
      }

      const [deletedEmails, unsubscribeLogs] = await Promise.all([
        chrome.runtime.sendMessage({ action: 'getDeletedEmails' }).catch(() => []),
        chrome.runtime.sendMessage({ action: 'getUnsubscribeLogs' }).catch(() => [])
      ]);

      // Update dashboard stats with available element IDs
      const emailsProcessedEl = document.getElementById('emails-processed');
      const spamDetectedEl = document.getElementById('spam-detected');
      const unsubscribesEl = document.getElementById('unsubscribes');
      const organizationsEl = document.getElementById('organizations');

      if (emailsProcessedEl) emailsProcessedEl.textContent = this.analytics.totalEmailsProcessed || 0;
      if (spamDetectedEl) spamDetectedEl.textContent = deletedEmails?.length || 0;
      if (unsubscribesEl) unsubscribesEl.textContent = unsubscribeLogs?.length || 0;
      if (organizationsEl) organizationsEl.textContent = this.analytics.organizations || 0;
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  }

  async loadPerformanceMetrics() {
    try {
      // Safety check for chrome.runtime
      if (typeof chrome === 'undefined' || !chrome.runtime) {
        console.error('❌ Chrome runtime not available for performance metrics');
        return;
      }

      const metrics = await chrome.runtime.sendMessage({ action: 'getPerformanceMetrics' }).catch(() => null);
      
      if (metrics && typeof metrics === 'object') {
        const processingSpeedEl = document.getElementById('processing-speed');
        const cacheHitRateEl = document.getElementById('cache-hit-rate');
        const memoryUsageEl = document.getElementById('memory-usage');

        if (processingSpeedEl) {
          processingSpeedEl.textContent = 
            metrics.averageProcessingTime ? `${metrics.averageProcessingTime.toFixed(2)}ms` : '--';
        }
        
        if (cacheHitRateEl) {
          cacheHitRateEl.textContent = 
            metrics.cacheSize ? `${metrics.cacheSize} items` : '--';
        }
        
        if (memoryUsageEl) {
          if (metrics.memoryUsage && typeof metrics.memoryUsage === 'object') {
            try {
              const usedMB = (metrics.memoryUsage.used / 1024 / 1024).toFixed(1);
              const totalMB = (metrics.memoryUsage.total / 1024 / 1024).toFixed(1);
              memoryUsageEl.textContent = `${usedMB}MB / ${totalMB}MB`;
            } catch (calcError) {
              console.error('Error calculating memory usage:', calcError);
              memoryUsageEl.textContent = '--';
            }
          } else {
            memoryUsageEl.textContent = '--';
          }
        }
      } else {
        console.log('No performance metrics available');
      }
    } catch (error) {
      console.error('Error loading performance metrics:', error);
    }
  }

  async loadActivityLog() {
    try {
      this.setLoading(true);
      
      // Safety check for chrome.runtime
      if (typeof chrome === 'undefined' || !chrome.runtime) {
        console.error('❌ Chrome runtime not available for activity log');
        this.setLoading(false);
        return;
      }

      const [deletedEmails, unsubscribeLogs] = await Promise.all([
        chrome.runtime.sendMessage({ action: 'getDeletedEmails' }).catch(() => []),
        chrome.runtime.sendMessage({ action: 'getUnsubscribeLogs' }).catch(() => [])
      ]);
      
      // Combine and sort all activities
      const allActivities = [
        ...(deletedEmails || []).map(item => ({ ...item, type: 'deletion' })),
        ...(unsubscribeLogs || []).map(item => ({ ...item, type: 'unsubscribe' }))
      ];
      
      allActivities.sort((a, b) => new Date(b.timestamp || b.deletedAt) - new Date(a.timestamp || a.deletedAt));
      
      this.displayActivityLog(allActivities);
      this.displayUnsubscribeHistory(unsubscribeLogs || []);
      
      this.setLoading(false);
    } catch (error) {
      console.error('Error loading activity log:', error);
      this.setLoading(false);
    }
  }

  displayActivityLog(activities) {
    const logContainer = document.getElementById('activity-log');
    
    if (!logContainer) {
      console.warn('Activity log container not found');
      return;
    }
    
    if (activities.length === 0) {
      logContainer.innerHTML = '<div class="no-log">No activity logged yet</div>';
      return;
    }

    const logHTML = activities.slice(0, 15).map(activity => {
      const isUnsubscribe = activity.type === 'unsubscribe';
      const date = activity.timestamp || activity.deletedAt;
      
      return `
        <div class="log-entry ${isUnsubscribe ? 'unsubscribe-entry' : ''}">
          <div class="log-sender">${this.escapeHtml(activity.sender)}</div>
          <div class="log-subject">${this.escapeHtml(activity.subject)}</div>
          ${isUnsubscribe ? 
            `<div class="log-reason">Unsubscribed via: ${this.escapeHtml(activity.unsubscribeLink || 'link')}</div>` :
            `<div class="log-reason">${this.escapeHtml(activity.reason)} (Score: ${activity.spamScore})</div>`
          }
          <div class="log-date">${this.formatDate(date)}</div>
        </div>
      `;
    }).join('');

    logContainer.innerHTML = logHTML;
  }

  displayUnsubscribeHistory(unsubscribeLogs) {
    const container = document.getElementById('unsubscribe-list');
    
    if (!container) {
      console.warn('Unsubscribe list container not found');
      return;
    }
    
    if (unsubscribeLogs.length === 0) {
      container.innerHTML = '<div class="no-log">No unsubscribe history</div>';
      return;
    }

    const historyHTML = unsubscribeLogs.slice(0, 10).map(log => `
      <div class="log-entry unsubscribe-entry">
        <div class="log-sender">${this.escapeHtml(log.sender)}</div>
        <div class="log-subject">${this.escapeHtml(log.subject)}</div>
        <div class="log-reason">Unsubscribed: ${this.escapeHtml(log.unsubscribeLink)}</div>
        <div class="log-date">${this.formatDate(log.timestamp)}</div>
      </div>
    `).join('');

    container.innerHTML = historyHTML;
  }

  async loadAnalytics() {
    try {
      this.setLoading(true);
      
      // Safety check for chrome.runtime
      if (typeof chrome === 'undefined' || !chrome.runtime) {
        console.error('❌ Chrome runtime not available for analytics');
        this.setLoading(false);
        return;
      }

      const [analytics, metrics] = await Promise.all([
        chrome.runtime.sendMessage({ action: 'getAnalytics' }).catch(() => null),
        chrome.runtime.sendMessage({ action: 'getPerformanceMetrics' }).catch(() => null)
      ]);
      
      if (analytics && typeof analytics === 'object') {
        this.analytics = analytics;
        this.updateAnalyticsUI(analytics);
      }
      
      if (metrics && typeof metrics === 'object') {
        this.performanceMetrics = metrics;
        this.updatePerformanceUI(metrics);
      }
      
      this.setLoading(false);
    } catch (error) {
      console.error('Error loading analytics:', error);
      this.setLoading(false);
    }
  }

  async loadSettings() {
    try {
      this.setLoading(true);
      
      // Update UI with current settings
      this.updateSettingsUI();
      
      this.setLoading(false);
    } catch (error) {
      console.error('Error loading settings:', error);
      this.setLoading(false);
    }
  }

  updateAnalyticsUI(analytics) {
    // Update analytics elements that exist in the current HTML
    const timeSavedEl = document.getElementById('time-saved');
    const emailsOrganizedEl = document.getElementById('emails-organized');
    const spamBlockedEl = document.getElementById('spam-blocked');
    const productivityScoreEl = document.getElementById('productivity-score');

    if (timeSavedEl) timeSavedEl.textContent = `${Math.floor((analytics.totalEmailsProcessed || 0) * 0.5)} hours`;
    if (emailsOrganizedEl) emailsOrganizedEl.textContent = analytics.organizations || 0;
    if (spamBlockedEl) spamBlockedEl.textContent = analytics.totalSpamDetected || 0;
    if (productivityScoreEl) productivityScoreEl.textContent = `${Math.min(100, (analytics.totalEmailsProcessed || 0) * 2)}%`;
  }

  updatePerformanceUI(metrics) {
    if (metrics && metrics.memoryUsage && typeof metrics.memoryUsage === 'object') {
      try {
        const usedMB = (metrics.memoryUsage.used / 1024 / 1024).toFixed(1);
        const totalMB = (metrics.memoryUsage.total / 1024 / 1024).toFixed(1);
        const percentage = ((metrics.memoryUsage.used / metrics.memoryUsage.total) * 100).toFixed(1);
        
        // Update memory usage display with percentage
        const memoryElement = document.getElementById('memory-usage');
        if (memoryElement) {
          memoryElement.textContent = `${usedMB}MB / ${totalMB}MB (${percentage}%)`;
        }
      } catch (error) {
        console.error('Error updating performance UI:', error);
        const memoryElement = document.getElementById('memory-usage');
        if (memoryElement) {
          memoryElement.textContent = '--';
        }
      }
    }
  }

  async saveSettings() {
    try {
      // Save to storage
      await chrome.storage.sync.set({ spamDetectorSettings: this.settings });
      
      // Send to content script
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url && tab.url.includes('mail.google.com')) {
        await chrome.tabs.sendMessage(tab.id, { 
          action: 'updateSettings', 
          settings: this.settings 
        });
      }
      
      this.showNotification('Settings saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showNotification('Error saving settings', 'error');
    }
  }

  async scanNow() {
    try {
      this.setLoading(true);
      
      // Send scan message to content script
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0] && tabs[0].url.includes('mail.google.com')) {
        await chrome.tabs.sendMessage(tabs[0].id, { action: 'scanUnsubscribeLinks' });
        this.showNotification('Scanning for spam emails...', 'info');
      } else {
        this.showNotification('Please navigate to Gmail to scan', 'warning');
      }
      
      this.setLoading(false);
    } catch (error) {
      console.error('Error scanning:', error);
      this.showNotification('Error during scan', 'error');
      this.setLoading(false);
    }
  }

  async exportData() {
    try {
      this.setLoading(true);
      
      const response = await chrome.runtime.sendMessage({ action: 'exportData' });
      
      if (response.success) {
        const dataStr = JSON.stringify(response.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `spam-detector-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully!', 'success');
      }
      
      this.setLoading(false);
    } catch (error) {
      console.error('Error exporting data:', error);
      this.showNotification('Error exporting data', 'error');
      this.setLoading(false);
    }
  }

  async clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      try {
        this.setLoading(true);
        
        await chrome.runtime.sendMessage({ action: 'clearActivityLog' });
        await chrome.runtime.sendMessage({ action: 'clearCache' });
        
        this.loadDashboardData();
        this.showNotification('All data cleared successfully!', 'success');
        
        this.setLoading(false);
      } catch (error) {
        console.error('Error clearing data:', error);
        this.showNotification('Error clearing data', 'error');
        this.setLoading(false);
      }
    }
  }

  async clearActivityLog() {
    if (confirm('Are you sure you want to clear the activity log?')) {
      try {
        this.setLoading(true);
        
        await chrome.runtime.sendMessage({ action: 'clearActivityLog' });
        this.loadActivityLog();
        this.showNotification('Activity log cleared!', 'success');
        
        this.setLoading(false);
      } catch (error) {
        console.error('Error clearing log:', error);
        this.showNotification('Error clearing log', 'error');
        this.setLoading(false);
      }
    }
  }

  async clearCache() {
    try {
      this.setLoading(true);
      
      const response = await chrome.runtime.sendMessage({ action: 'clearCache' });
      
      if (response.success) {
        this.showNotification(`Cache cleared! (${response.cacheSize} items removed)`, 'success');
        this.loadAnalytics();
      }
      
      this.setLoading(false);
    } catch (error) {
      console.error('Error clearing cache:', error);
      this.showNotification('Error clearing cache', 'error');
      this.setLoading(false);
    }
  }

  async refreshAnalytics() {
    try {
      this.setLoading(true);
      await this.loadAnalytics();
      this.showNotification('Analytics refreshed!', 'success');
      this.setLoading(false);
    } catch (error) {
      console.error('Error refreshing analytics:', error);
      this.showNotification('Error refreshing analytics', 'error');
      this.setLoading(false);
    }
  }

  async resetAllSettings() {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      try {
        this.setLoading(true);
        
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

        await chrome.runtime.sendMessage({ 
          action: 'saveSettings', 
          settings: defaultSettings 
        });
        
        this.settings = defaultSettings;
        this.updateSettingsUI();
        this.showNotification('Settings reset to default!', 'success');
        
        this.setLoading(false);
      } catch (error) {
        console.error('Error resetting settings:', error);
        this.showNotification('Error resetting settings', 'error');
        this.setLoading(false);
      }
    }
  }

  async exportSettings() {
    try {
      const settings = await chrome.runtime.sendMessage({ action: 'getSettings' });
      const dataStr = JSON.stringify(settings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `spam-detector-settings-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      this.showNotification('Settings exported!', 'success');
    } catch (error) {
      console.error('Error exporting settings:', error);
      this.showNotification('Error exporting settings', 'error');
    }
  }

  async exportActivity() {
    try {
      const [deletedEmails, unsubscribeLogs] = await Promise.all([
        chrome.runtime.sendMessage({ action: 'getDeletedEmails' }),
        chrome.runtime.sendMessage({ action: 'getUnsubscribeLogs' })
      ]);

      const activityData = {
        timestamp: new Date().toISOString(),
        deletedEmails: deletedEmails || [],
        unsubscribeLogs: unsubscribeLogs || []
      };

      const dataStr = JSON.stringify(activityData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `spam-detector-activity-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      this.showNotification('Activity data exported!', 'success');
    } catch (error) {
      console.error('Error exporting activity:', error);
      this.showNotification('Error exporting activity', 'error');
    }
  }

  async exportAllData() {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'exportData' });
      
      if (response.success) {
        const dataStr = JSON.stringify(response.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `spam-detector-complete-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('All data exported!', 'success');
      }
    } catch (error) {
      console.error('Error exporting all data:', error);
      this.showNotification('Error exporting data', 'error');
    }
  }

  async checkExtensionStatus() {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const isGmailTab = tabs[0] && tabs[0].url.includes('mail.google.com');
      
      const statusIndicator = document.getElementById('status-indicator');
      if (statusIndicator) {
        if (isGmailTab) {
          statusIndicator.style.background = '#27ae60';
        } else {
          statusIndicator.style.background = '#f39c12';
        }
      }
    } catch (error) {
      console.error('Error checking extension status:', error);
    }
  }

  startRealTimeUpdates() {
    // Update dashboard every 30 seconds
    setInterval(() => {
      if (this.currentTab === 'dashboard') {
        this.loadDashboardData();
      }
    }, 30000);
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
    
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      if (isLoading) {
        button.disabled = true;
        button.style.opacity = '0.6';
      } else {
        button.disabled = false;
        button.style.opacity = '1';
      }
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add type-specific styling
    const colors = {
      info: '#4285f4',
      success: '#27ae60',
      warning: '#f39c12',
      error: '#e74c3c'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 4000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return date.toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  }
}

// Initialize the popup manager with safety checks
console.log('🚀 Starting popup initialization...');

try {
  // Check if we're in a popup context
  if (typeof window === 'undefined') {
    console.error('❌ Window object not available');
  } else if (typeof chrome === 'undefined') {
    console.error('❌ Chrome runtime not available - popup cannot initialize');
  } else if (!chrome.runtime) {
    console.error('❌ Chrome runtime API not available');
  } else {
    console.log('✅ Chrome runtime available, initializing popup manager...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM loaded, creating popup manager...');
        window.popupManager = new PopupManagerPro();
        console.log('✅ Popup manager initialized successfully');
      });
    } else {
      console.log('📄 DOM already ready, creating popup manager...');
      window.popupManager = new PopupManagerPro();
      console.log('✅ Popup manager initialized successfully');
    }
  }
} catch (error) {
  console.error('❌ Failed to initialize popup manager:', error);
  console.error('Error details:', {
    message: error.message,
    stack: error.stack,
    chrome: typeof chrome,
    runtime: typeof chrome?.runtime,
    window: typeof window,
    document: typeof document
  });
} 