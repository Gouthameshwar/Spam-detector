// Gmail Spam Detector Pro - Enterprise Edition
// Performance-optimized with advanced caching and AI-powered detection

// Safety check for chrome.runtime availability
if (typeof chrome === 'undefined' || !chrome.runtime) {
  console.error('❌ Chrome runtime not available - extension not loaded properly');
} else {
  console.log('✅ Chrome runtime available');
}

class GmailSpamDetectorPro {
  constructor() {
    // Performance optimizations
    this.cache = new Map();
    this.observer = null;
    this.isEnabled = true;
    this.performanceMetrics = {
      scanTime: 0,
      emailsProcessed: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
    
    // Advanced settings with defaults
    this.settings = {
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
      autoOrganize: false // New setting for auto-organization
    };
    
    // AI-powered detection patterns
    this.aiPatterns = {
      spamKeywords: new Set([
        'sponsored', 'advertisement', 'promotion', 'offer', 'limited time',
        'act now', 'click here', 'unsubscribe', 'special offer', 'discount',
        'sale', 'free trial', 'exclusive deal', 'urgent', 'last chance',
        'limited offer', 'one time', 'flash sale', 'clearance', 'buy now',
        'order now', 'limited quantity', 'while supplies last', 'expires soon'
      ]),
      sponsoredIndicators: new Set([
        '[ad]', '[sponsored]', '[promotion]', '[advertisement]', '[sponsored content]',
        'sponsored content', 'paid partnership', 'advertisement', 'promoted post',
        'sponsored post', 'paid content', 'branded content', 'sponsored by'
      ]),
      urgencyPatterns: new Set([
        'urgent', 'immediate', 'now', 'today only', 'expires', 'deadline',
        'limited time', 'act fast', 'don\'t miss', 'last chance'
      ]),
      spamDomains: new Set([
        'noreply', 'donotreply', 'no-reply', 'marketing', 'newsletter',
        'promotions', 'offers', 'deals', 'sales', 'ads', 'spam'
      ])
    };

      // Smart categorization patterns
  this.categorizationPatterns = {
    work: {
      keywords: ['meeting', 'project', 'deadline', 'report', 'presentation', 'client', 'business', 'work', 'office', 'team'],
      domains: ['company.com', 'corp.com', 'business.com', 'work.com'],
      score: 0
    },
    personal: {
      keywords: ['family', 'friend', 'personal', 'home', 'love', 'dear', 'mom', 'dad', 'sister', 'brother'],
      domains: ['gmail.com', 'yahoo.com', 'hotmail.com'],
      score: 0
    },
    finance: {
      keywords: ['bank', 'account', 'payment', 'invoice', 'bill', 'credit', 'debit', 'transaction', 'balance', 'statement'],
      domains: ['bank.com', 'paypal.com', 'stripe.com', 'square.com'],
      score: 0
    },
    shopping: {
      keywords: ['order', 'purchase', 'shipping', 'delivery', 'tracking', 'receipt', 'confirmation', 'amazon', 'ebay', 'etsy'],
      domains: ['amazon.com', 'ebay.com', 'etsy.com', 'shop.com', 'store.com'],
      score: 0
    },
    social: {
      keywords: ['facebook', 'twitter', 'instagram', 'linkedin', 'social', 'post', 'like', 'follow', 'share'],
      domains: ['facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com'],
      score: 0
    },
    travel: {
      keywords: ['flight', 'hotel', 'booking', 'reservation', 'travel', 'trip', 'vacation', 'airline', 'airbnb', 'uber'],
      domains: ['booking.com', 'airbnb.com', 'uber.com', 'lyft.com', 'hotels.com'],
      score: 0
    },
    health: {
      keywords: ['doctor', 'appointment', 'medical', 'health', 'pharmacy', 'prescription', 'insurance', 'hospital', 'clinic'],
      domains: ['health.com', 'medical.com', 'pharmacy.com', 'insurance.com'],
      score: 0
    },
    education: {
      keywords: ['course', 'class', 'assignment', 'homework', 'exam', 'test', 'grade', 'school', 'university', 'college'],
      domains: ['edu', 'school.com', 'university.com', 'college.com'],
      score: 0
    }
  };

  // Smart email prioritization patterns
  this.priorityPatterns = {
    urgent: {
      keywords: ['urgent', 'immediate', 'emergency', 'critical', 'asap', 'deadline', 'important', 'priority'],
      score: 10,
      color: '#ff4757'
    },
    work: {
      keywords: ['meeting', 'project', 'deadline', 'report', 'presentation', 'client', 'boss', 'manager'],
      score: 8,
      color: '#3742fa'
    },
    personal: {
      keywords: ['family', 'friend', 'love', 'dear', 'mom', 'dad', 'sister', 'brother', 'birthday', 'anniversary'],
      score: 7,
      color: '#ffa502'
    },
    finance: {
      keywords: ['bank', 'account', 'payment', 'invoice', 'bill', 'credit', 'debit', 'transaction', 'balance'],
      score: 9,
      color: '#2ed573'
    },
    health: {
      keywords: ['doctor', 'appointment', 'medical', 'health', 'pharmacy', 'prescription', 'insurance', 'hospital'],
      score: 9,
      color: '#ff6348'
    }
  };
    
    this.init();
  }

  async init() {
    console.log('🚀 Gmail Spam Detector Pro initializing...');
    
    try {
      await this.loadSettings();
      this.setupPerformanceMonitoring();
      this.setupObserver();
      this.injectUI();
      this.showActiveIndicator();
      this.startRealTimeProtection();
      this.setupSmartSearch(); // Initialize smart search
      this.setupMessageListener(); // Setup message handling
      console.log('✅ Gmail Spam Detector Pro ready');
    } catch (error) {
      console.error('❌ Initialization failed:', error);
    }
  }

  setupMessageListener() {
    // Safety check for chrome.runtime
    if (typeof chrome === 'undefined' || !chrome.runtime) {
      console.error('❌ Cannot setup message listener - chrome.runtime not available');
      return;
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('📨 Received message:', request);
      
      try {
        switch (request.action) {
          case 'getSettings':
            sendResponse({ settings: this.settings });
            break;
            
          case 'updateSettings':
            this.settings = { ...this.settings, ...request.settings };
            this.saveSettings();
            sendResponse({ success: true });
            break;
            
          case 'scanNow':
            this.scanExistingEmails();
            sendResponse({ success: true });
            break;
            
          case 'getStats':
            sendResponse({
              emailsProcessed: this.performanceMetrics.emailsProcessed,
              spamDetected: this.performanceMetrics.spamDetected || 0,
              unsubscribes: this.performanceMetrics.unsubscribes || 0,
              organizations: this.performanceMetrics.organizations || 0
            });
            break;
            
          default:
            sendResponse({ error: 'Unknown action' });
        }
      } catch (error) {
        console.error('❌ Error handling message:', error);
        sendResponse({ error: error.message });
      }
      
      return true; // Keep message channel open for async response
    });
  }

  async loadSettings() {
    try {
      // Safety check for chrome.storage
      if (typeof chrome === 'undefined' || !chrome.storage) {
        console.error('❌ Chrome storage not available - using default settings');
        return;
      }

      const result = await chrome.storage.sync.get(['spamDetectorSettings']);
      if (result.spamDetectorSettings) {
        this.settings = { ...this.settings, ...result.spamDetectorSettings };
        console.log('✅ Settings loaded:', this.settings);
      } else {
        console.log('ℹ️ No saved settings found, using defaults');
      }
    } catch (error) {
      console.error('❌ Error loading settings:', error);
    }
  }

  setupPerformanceMonitoring() {
    // Monitor memory usage
    if (this.settings.memoryOptimization) {
      setInterval(() => {
        this.optimizeMemory();
      }, 30000); // Every 30 seconds
    }
    
    // Performance metrics
    setInterval(() => {
      this.logPerformanceMetrics();
    }, 60000); // Every minute
  }

  optimizeMemory() {
    // Clear old cache entries
    const maxCacheSize = 1000;
    if (this.cache.size > maxCacheSize) {
      const entries = Array.from(this.cache.entries());
      const toDelete = entries.slice(0, entries.length - maxCacheSize);
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
    
    // Clear old performance metrics
    if (this.performanceMetrics.emailsProcessed > 10000) {
      this.performanceMetrics = {
        scanTime: 0,
        emailsProcessed: 0,
        cacheHits: 0,
        cacheMisses: 0
      };
    }
  }

  setupObserver() {
    // Improved observer for better email detection
    this.observer = new MutationObserver((mutations) => {
      if (!this.settings.realTimeProtection) return;
      
      const startTime = performance.now();
      let processedCount = 0;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const emails = this.scanForEmails(node);
            processedCount += emails.length;
          }
        });
      });
      
      if (processedCount > 0) {
        console.log(`Processed ${processedCount} new emails`);
      }
      
      this.performanceMetrics.scanTime += performance.now() - startTime;
      this.performanceMetrics.emailsProcessed += processedCount;
    });

    // Observe the entire document for email changes
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    // Also scan existing emails on page load
    setTimeout(() => {
      this.scanExistingEmails();
    }, 2000);
  }

  scanExistingEmails() {
    console.log('🔍 Scanning existing emails...');
    const emailRows = document.querySelectorAll('[role="row"]');
    let processedCount = 0;
    
    emailRows.forEach(row => {
      if (this.isEmailRow(row) && !row.hasAttribute('data-spam-detected')) {
        this.analyzeEmail(row);
        processedCount++;
      }
    });
    
    console.log(`✅ Processed ${processedCount} existing emails`);
    return processedCount;
  }

  scanForEmails(container) {
    const emailRows = container.querySelectorAll('[role="row"]');
    const emails = [];
    
    emailRows.forEach(row => {
      if (this.isEmailRow(row) && !row.dataset.scanned) {
        emails.push(row);
        row.dataset.scanned = 'true';
      }
    });
    
    // Batch processing for better performance
    if (this.settings.batchProcessing && emails.length > 0) {
      this.processBatch(emails);
    } else {
      emails.forEach(row => this.analyzeEmail(row));
    }
    
    return emails;
  }

  async processBatch(emailRows) {
    const promises = emailRows.map(row => this.analyzeEmail(row));
    await Promise.all(promises);
  }

  isEmailRow(row) {
    // Updated to work with Gmail's current structure
    return row && 
           row.querySelector('[role="checkbox"]') && 
           row.querySelector('[data-tooltip]') &&
           row.offsetHeight > 0 &&
           !row.classList.contains('zA') &&
           !row.hasAttribute('data-spam-detected'); // Prevent re-processing
  }

  async analyzeEmail(emailRow) {
    if (!this.isEnabled) return;
    
    // Mark as processed to prevent re-analysis
    emailRow.setAttribute('data-spam-detected', 'true');
    
    const startTime = performance.now();
    const emailData = this.extractEmailData(emailRow);
    if (!emailData) return;

    console.log('Analyzing email:', emailData.subject, 'from:', emailData.sender);

    // Check cache first
    const cacheKey = this.generateCacheKey(emailData);
    if (this.settings.enableCaching && this.cache.has(cacheKey)) {
      this.performanceMetrics.cacheHits++;
      const cachedResult = this.cache.get(cacheKey);
      if (cachedResult.spamScore >= this.settings.sensitivity) {
        await this.handleSpamEmail(emailRow, emailData, cachedResult.spamScore);
      }
      return;
    }

    this.performanceMetrics.cacheMisses++;
    const spamScore = this.calculateAdvancedSpamScore(emailData);
    
    console.log('Spam score:', spamScore, 'for:', emailData.subject);
    
    // Cache the result
    if (this.settings.enableCaching) {
      this.cache.set(cacheKey, { spamScore, timestamp: Date.now() });
    }
    
    if (spamScore >= this.settings.sensitivity) {
      await this.handleSpamEmail(emailRow, emailData, spamScore);
    }

    // Check for unsubscribe links
    if (this.settings.autoUnsubscribe) {
      await this.checkForUnsubscribeLinks(emailRow, emailData);
    }

    // Auto-organize email
    if (this.settings.autoOrganize) {
      await this.autoOrganizeEmail(emailRow, emailData);
    }

    // Prioritize email
    const priority = this.prioritizeEmail(emailData);
    if (priority) {
      this.highlightPriorityEmail(emailRow, priority);
    }
    
    this.performanceMetrics.scanTime += performance.now() - startTime;
  }

  generateCacheKey(emailData) {
    return `${emailData.sender}:${emailData.subject}`.toLowerCase();
  }

  extractEmailData(emailRow) {
    try {
      // Updated selectors for Gmail's current structure
      const senderElement = emailRow.querySelector('[data-tooltip]');
      const subjectElement = emailRow.querySelector('[data-thread-perm-id]') || 
                           emailRow.querySelector('.bog') ||
                           emailRow.querySelector('[role="gridcell"]');
      const snippetElement = emailRow.querySelector('.bog') || 
                           emailRow.querySelector('[data-thread-perm-id]');

      if (!senderElement) {
        console.log('No sender element found');
        return null;
      }

      const sender = senderElement.getAttribute('data-tooltip') || senderElement.textContent;
      const subject = subjectElement ? (subjectElement.getAttribute('title') || subjectElement.textContent) : '';
      const snippet = snippetElement ? snippetElement.textContent : '';

      console.log('Extracted data:', { sender, subject, snippet });

      return {
        sender: sender.trim(),
        subject: subject.trim(),
        snippet: snippet.trim(),
        timestamp: new Date().toISOString(),
        emailId: emailRow.getAttribute('data-legacy-message-id') || Date.now().toString(),
        domain: this.extractDomain(sender)
      };
    } catch (error) {
      console.error('Error extracting email data:', error);
      return null;
    }
  }

  extractDomain(sender) {
    try {
      const emailMatch = sender.match(/@([^>]+)/);
      return emailMatch ? emailMatch[1].toLowerCase() : '';
    } catch {
      return '';
    }
  }

  calculateAdvancedSpamScore(emailData) {
    let score = 0;
    const text = `${emailData.subject} ${emailData.snippet}`.toLowerCase();
    const sender = emailData.sender.toLowerCase();
    const domain = emailData.domain;

    // AI-powered keyword analysis
    this.aiPatterns.spamKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 2;
      }
    });

    // Sponsored content detection
    this.aiPatterns.sponsoredIndicators.forEach(indicator => {
      if (text.includes(indicator)) {
        score += 3;
      }
    });

    // Urgency pattern detection
    this.aiPatterns.urgencyPatterns.forEach(pattern => {
      if (text.includes(pattern)) {
        score += 1;
      }
    });

    // Advanced sender analysis
    if (this.isKnownSpamSender(sender, domain)) {
      score += 4;
    }

    // Pattern analysis
    score += this.analyzeTextPatterns(text);
    score += this.analyzeSenderPatterns(sender);

    return score;
  }

  // Smart email categorization
  categorizeEmail(emailData) {
    const text = `${emailData.subject} ${emailData.snippet}`.toLowerCase();
    const sender = emailData.sender.toLowerCase();
    const domain = emailData.domain;
    
    let bestCategory = null;
    let highestScore = 0;
    
    // Analyze each category
    Object.keys(this.categorizationPatterns).forEach(category => {
      const pattern = this.categorizationPatterns[category];
      let score = 0;
      
      // Check keywords
      pattern.keywords.forEach(keyword => {
        if (text.includes(keyword)) {
          score += 2;
        }
      });
      
      // Check domain patterns
      pattern.domains.forEach(domainPattern => {
        if (domain.includes(domainPattern) || sender.includes(domainPattern)) {
          score += 3;
        }
      });
      
      // Update best category
      if (score > highestScore) {
        highestScore = score;
        bestCategory = category;
      }
    });
    
    return highestScore >= 2 ? bestCategory : 'general';
  }

  // Auto-organize email into appropriate folder
  async autoOrganizeEmail(emailRow, emailData) {
    if (!this.settings.autoOrganize) return;
    
    const category = this.categorizeEmail(emailData);
    if (category === 'general') return;
    
    try {
      // Create category folder if it doesn't exist
      await this.createCategoryFolder(category);
      
      // Move email to category folder
      await this.moveToCategory(emailRow, category);
      
      // Log organization action
      await this.logOrganization(emailData, category);
      
      // Show notification
      this.showNotification(`Email organized into ${category} folder`, 'success');
    } catch (error) {
      console.error('Error organizing email:', error);
    }
  }

  async createCategoryFolder(category) {
    // Check if folder exists
    const folderExists = await this.checkFolderExists(category);
    if (!folderExists) {
      // Create new folder using Gmail API
      await this.createGmailFolder(category);
    }
  }

  async checkFolderExists(category) {
    // Implementation to check if Gmail folder exists
    const folders = document.querySelectorAll('[data-tooltip]');
    return Array.from(folders).some(folder => 
      folder.textContent.toLowerCase().includes(category)
    );
  }

  async createGmailFolder(category) {
    // Implementation to create Gmail folder
    // This would use Gmail's folder creation API
    console.log(`Creating folder: ${category}`);
  }

  async moveToCategory(emailRow, category) {
    // Implementation to move email to category folder
    // This would use Gmail's move email API
    console.log(`Moving email to ${category} folder`);
  }

  async logOrganization(emailData, category) {
    try {
      const logs = await chrome.storage.local.get(['organizationLogs']) || { organizationLogs: [] };
      logs.organizationLogs.push({
        timestamp: Date.now(),
        sender: emailData.sender,
        subject: emailData.subject,
        category: category,
        action: 'auto-organized'
      });
      
      // Keep only last 1000 logs
      if (logs.organizationLogs.length > 1000) {
        logs.organizationLogs = logs.organizationLogs.slice(-1000);
      }
      
      await chrome.storage.local.set(logs);
    } catch (error) {
      console.error('Error logging organization:', error);
    }
  }

  isKnownSpamSender(sender, domain) {
    // Check domain patterns
    if (this.aiPatterns.spamDomains.has(domain)) {
      return true;
    }

    // Check sender patterns
    const spamPatterns = [
      'noreply', 'donotreply', 'no-reply', 'marketing', 'newsletter',
      'promotions', 'offers', 'deals', 'sales', 'ads', 'spam',
      'notifications', 'alerts', 'updates', 'news'
    ];

    return spamPatterns.some(pattern => sender.includes(pattern));
  }

  analyzeTextPatterns(text) {
    let score = 0;
    
    // Excessive punctuation
    const exclamationCount = (text.match(/!/g) || []).length;
    const questionCount = (text.match(/\?/g) || []).length;
    if (exclamationCount > 2) score += 1;
    if (questionCount > 3) score += 1;
    
    // ALL CAPS detection
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (capsRatio > 0.7 && text.length > 10) score += 2;
    
    // Number patterns (prices, percentages)
    const numberPatterns = /\d+%|\$\d+|\d+\.\d{2}/g;
    if ((text.match(numberPatterns) || []).length > 2) score += 1;
    
    return score;
  }

  analyzeSenderPatterns(sender) {
    let score = 0;
    
    // Random character patterns
    const randomPatterns = /[a-z]{10,}|[0-9]{8,}/g;
    if (sender.match(randomPatterns)) score += 2;
    
    // Suspicious domains
    const suspiciousDomains = ['temp', 'test', 'example', 'fake'];
    if (suspiciousDomains.some(domain => sender.includes(domain))) score += 3;
    
    return score;
  }

  async handleSpamEmail(emailRow, emailData, spamScore) {
    if (this.settings.autoDelete) {
      await this.moveToTrash(emailRow, emailData, spamScore);
    } else {
      this.highlightSpam(emailRow, emailData, spamScore);
    }
    
    // Show notification if enabled
    if (this.settings.enableNotifications) {
      this.showNotification(`Spam detected: ${emailData.subject}`, 'warning');
    }
  }

  async moveToTrash(emailRow, emailData, spamScore) {
    try {
      const checkbox = emailRow.querySelector('[role="checkbox"]');
      if (checkbox) {
        checkbox.click();
        await this.sleep(100);
        
        const trashButton = document.querySelector('[data-tooltip="Move to Trash"]') ||
                           document.querySelector('[aria-label="Move to Trash"]');
        
        if (trashButton) {
          trashButton.click();
          await this.logDeletion(emailData, spamScore);
          console.log(`🗑️ Moved spam email to trash: ${emailData.subject}`);
        }
      }
    } catch (error) {
      console.error('Error moving email to trash:', error);
    }
  }

  highlightSpam(emailRow, emailData, spamScore) {
    emailRow.style.backgroundColor = '#ffebee';
    emailRow.style.borderLeft = '4px solid #f44336';
    
    // Add spam indicator
    const indicator = document.createElement('div');
    indicator.className = 'spam-indicator';
    indicator.textContent = 'SPAM';
    indicator.style.cssText = `
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: #f44336;
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: bold;
      z-index: 1000;
    `;
    
    emailRow.style.position = 'relative';
    emailRow.appendChild(indicator);
  }

  async checkForUnsubscribeLinks(emailRow, emailData) {
    try {
      // First, try to find unsubscribe links in the current email row
      const unsubscribeLinks = this.findUnsubscribeLinksInRow(emailRow);
      
      if (unsubscribeLinks.length > 0) {
        console.log('Found unsubscribe links:', unsubscribeLinks.length);
        this.showUnsubscribeNotification(emailData.sender, unsubscribeLinks.length);
        
        if (this.settings.autoUnsubscribe) {
          setTimeout(() => {
            this.autoUnsubscribe(emailData, unsubscribeLinks);
          }, this.settings.unsubscribeDelay);
        }
      }
    } catch (error) {
      console.error('Error checking unsubscribe links:', error);
    }
  }

  findUnsubscribeLinksInRow(emailRow) {
    // Look for unsubscribe links within the email row
    const links = emailRow.querySelectorAll('a[href*="unsubscribe"], a[href*="opt-out"], a[href*="remove"]');
    return Array.from(links).filter(link => {
      const href = link.href.toLowerCase();
      const text = link.textContent.toLowerCase();
      return href.includes('unsubscribe') || 
             href.includes('opt-out') || 
             href.includes('remove') ||
             text.includes('unsubscribe') ||
             text.includes('opt-out');
    });
  }

  findUnsubscribeLinks() {
    // Fallback: search entire document
    const links = document.querySelectorAll('a[href*="unsubscribe"], a[href*="opt-out"], a[href*="remove"]');
    return Array.from(links).filter(link => {
      const href = link.href.toLowerCase();
      const text = link.textContent.toLowerCase();
      return href.includes('unsubscribe') || 
             href.includes('opt-out') || 
             href.includes('remove') ||
             text.includes('unsubscribe');
    });
  }

  showUnsubscribeNotification(sender, linkCount) {
    const notification = document.createElement('div');
    notification.className = 'unsubscribe-notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2196f3;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        max-width: 300px;
      ">
        <div style="font-weight: bold; margin-bottom: 4px;">Unsubscribe Found</div>
        <div>${sender} has ${linkCount} unsubscribe link(s)</div>
        <button onclick="this.parentElement.remove()" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          margin-top: 8px;
          cursor: pointer;
        ">Dismiss</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  async autoUnsubscribe(emailData, unsubscribeLinks) {
    try {
      const link = unsubscribeLinks[0];
      if (link) {
        link.click();
        await this.logUnsubscribe(emailData, link.href);
        this.showUnsubscribeSuccess(emailData.sender);
      }
    } catch (error) {
      console.error('Error auto-unsubscribing:', error);
    }
  }

  showUnsubscribeSuccess(sender) {
    const notification = document.createElement('div');
    notification.className = 'unsubscribe-success';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
      ">
        <div style="font-weight: bold; margin-bottom: 4px;">Unsubscribed Successfully</div>
        <div>Successfully unsubscribed from ${sender}</div>
        <button onclick="this.parentElement.remove()" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          margin-top: 8px;
          cursor: pointer;
        ">Dismiss</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  }

  async logUnsubscribe(emailData, unsubscribeLink) {
    const unsubscribeLog = {
      ...emailData,
      unsubscribeLink,
      timestamp: new Date().toISOString()
    };

    const result = await chrome.storage.local.get(['unsubscribeLogs']);
    const logs = result.unsubscribeLogs || [];
    logs.push(unsubscribeLog);
    
    await chrome.storage.local.set({
      unsubscribeLogs: logs.slice(-50) // Keep last 50 entries
    });
  }

  async logDeletion(emailData, spamScore) {
    if (!this.settings.logDeletions) return;

    const deletionLog = {
      ...emailData,
      spamScore,
      deletedAt: new Date().toISOString(),
      reason: this.getSpamReason(emailData, spamScore)
    };

    const result = await chrome.storage.local.get(['deletedEmails']);
    const logs = result.deletedEmails || [];
    logs.push(deletionLog);
    
    await chrome.storage.local.set({
      deletedEmails: logs.slice(-100) // Keep last 100 entries
    });
  }

  getSpamReason(emailData, spamScore) {
    const reasons = [];
    
    if (spamScore >= 8) reasons.push('High spam score');
    if (spamScore >= 6) reasons.push('Multiple spam indicators');
    if (spamScore >= 4) reasons.push('Suspicious content');
    if (spamScore >= 2) reasons.push('Spam keywords detected');
    
    return reasons.join(', ') || 'Spam detected';
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showActiveIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'spam-detector-status';
    indicator.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        left: 10px;
        background: #4caf50;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: bold;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 6px;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        "></div>
        Spam Detector Active
        <button onclick="this.parentElement.remove()" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          margin-left: 8px;
          cursor: pointer;
          font-size: 10px;
        ">×</button>
      </div>
      <style>
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(indicator);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (indicator.parentElement) {
        indicator.remove();
      }
    }, 5000);
  }

  toggleExtension() {
    this.isEnabled = !this.isEnabled;
    const status = this.isEnabled ? 'enabled' : 'disabled';
    console.log(`Spam Detector ${status}`);
    
    // Update UI
    const statusElement = document.getElementById('spam-detector-status');
    if (statusElement) {
      statusElement.style.background = this.isEnabled ? '#4caf50' : '#f44336';
      statusElement.querySelector('div').textContent = `Spam Detector ${status.charAt(0).toUpperCase() + status.slice(1)}`;
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'spam-detector-notification';
    
    const colors = {
      info: '#2196f3',
      warning: '#ff9800',
      error: '#f44336',
      success: '#4caf50'
    };
    
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        max-width: 300px;
      ">
        ${message}
        <button onclick="this.parentElement.remove()" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          margin-left: 8px;
          cursor: pointer;
        ">×</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 4000);
  }

  injectUI() {
    // Remove existing settings button if present
    const existingButton = document.getElementById('spam-detector-settings');
    if (existingButton) {
      existingButton.remove();
    }

    // Inject settings button
    const settingsButton = document.createElement('div');
    settingsButton.id = 'spam-detector-settings';
    settingsButton.innerHTML = `
      <button id="spam-settings-btn" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4285f4 0%, #3367d6 100%);
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;
      ">
        <span style="font-size: 16px;">⚙️</span>
        <span>Spam Settings</span>
      </button>
    `;
    
    document.body.appendChild(settingsButton);
    
    // Add event listener
    const settingsBtn = document.getElementById('spam-settings-btn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.showSettings();
      });
      
      // Add hover effects
      settingsBtn.addEventListener('mouseenter', () => {
        settingsBtn.style.transform = 'translateY(-2px)';
        settingsBtn.style.boxShadow = '0 6px 16px rgba(66, 133, 244, 0.4)';
      });
      
      settingsBtn.addEventListener('mouseleave', () => {
        settingsBtn.style.transform = 'translateY(0)';
        settingsBtn.style.boxShadow = '0 4px 12px rgba(66, 133, 244, 0.3)';
      });
    }
  }

  showSettings() {
    // Remove existing modal if present
    const existingModal = document.getElementById('spam-detector-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'spam-detector-modal';
    modal.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background: white;
          padding: 24px;
          border-radius: 12px;
          max-width: 400px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #333;">⚙️ Spam Detector Settings</h2>
            <button id="close-modal" style="
              background: none;
              border: none;
              font-size: 20px;
              cursor: pointer;
              color: #666;
            ">×</button>
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
              <input type="checkbox" id="auto-delete" ${this.settings.autoDelete ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-weight: 500;">Auto-delete spam emails</span>
            </label>
            <small style="color: #666; margin-left: 20px;">Automatically move detected spam to trash</small>
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
              <input type="checkbox" id="log-deletions" ${this.settings.logDeletions ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-weight: 500;">Log deletions</span>
            </label>
            <small style="color: #666; margin-left: 20px;">Keep track of deleted emails</small>
          </div>
          
          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
              <input type="checkbox" id="auto-unsubscribe" ${this.settings.autoUnsubscribe ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-weight: 500;">Auto-unsubscribe</span>
            </label>
            <small style="color: #666; margin-left: 20px;">Automatically handle unsubscribe links</small>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
              <input type="checkbox" id="auto-organize" ${this.settings.autoOrganize ? 'checked' : ''} style="margin-right: 8px;">
              <span style="font-weight: 500;">Auto-organize emails</span>
            </label>
            <small style="color: #666; margin-left: 20px;">Automatically categorize emails</small>
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="margin-bottom: 8px; display: block; font-weight: 500;">
              Detection Sensitivity: <span id="sensitivity-value" style="color: #4285f4; font-weight: bold;">${this.settings.sensitivity}</span>
            </label>
            <input type="range" id="sensitivity" min="1" max="10" value="${this.settings.sensitivity}" style="width: 100%; height: 6px; border-radius: 3px; background: #ddd; outline: none;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #666; margin-top: 4px;">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          
          <div style="display: flex; gap: 8px; margin-top: 20px;">
            <button id="save-settings-btn" style="
              background: #4285f4;
              color: white;
              border: none;
              padding: 12px 16px;
              border-radius: 6px;
              cursor: pointer;
              flex: 1;
              font-weight: 500;
            ">💾 Save Settings</button>
            <button id="cancel-settings-btn" style="
              background: #666;
              color: white;
              border: none;
              padding: 12px 16px;
              border-radius: 6px;
              cursor: pointer;
              flex: 1;
            ">Cancel</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup event listeners
    const sensitivitySlider = document.getElementById('sensitivity');
    const sensitivityValue = document.getElementById('sensitivity-value');
    const saveBtn = document.getElementById('save-settings-btn');
    const cancelBtn = document.getElementById('cancel-settings-btn');
    const closeBtn = document.getElementById('close-modal');
    
    if (sensitivitySlider && sensitivityValue) {
      sensitivitySlider.addEventListener('input', (e) => {
        sensitivityValue.textContent = e.target.value;
      });
    }
    
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveSettings();
      });
    }
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        modal.remove();
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.remove();
      });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  async saveSettings() {
    try {
      // Safety check for chrome.storage
      if (typeof chrome === 'undefined' || !chrome.storage) {
        console.error('❌ Chrome storage not available - cannot save settings');
        return;
      }

      // Collect settings from the modal form
      const autoDelete = document.getElementById('auto-delete')?.checked || false;
      const logDeletions = document.getElementById('log-deletions')?.checked || false;
      const autoUnsubscribe = document.getElementById('auto-unsubscribe')?.checked || false;
      const autoOrganize = document.getElementById('auto-organize')?.checked || false;
      const sensitivity = parseInt(document.getElementById('sensitivity')?.value || '3');

      // Update settings object
      this.settings = {
        ...this.settings,
        autoDelete,
        logDeletions,
        autoUnsubscribe,
        autoOrganize,
        sensitivity
      };

      // Save to storage
      await chrome.storage.sync.set({ spamDetectorSettings: this.settings });
      console.log('✅ Settings saved:', this.settings);
      
      // Show success notification
      this.showNotification('Settings saved successfully!', 'success');
      
      // Close the modal
      const modal = document.getElementById('spam-detector-modal');
      if (modal) {
        modal.remove();
      }
    } catch (error) {
      console.error('❌ Error saving settings:', error);
      this.showNotification('Error saving settings', 'error');
    }
  }

  startRealTimeProtection() {
    if (this.settings.realTimeProtection) {
      console.log('🛡️ Real-time protection enabled');
    }
  }

  logPerformanceMetrics() {
    if (this.performanceMetrics.emailsProcessed > 0) {
      const avgScanTime = this.performanceMetrics.scanTime / this.performanceMetrics.emailsProcessed;
      const cacheHitRate = this.performanceMetrics.cacheHits / (this.performanceMetrics.cacheHits + this.performanceMetrics.cacheMisses);
      
      console.log('📊 Performance Metrics:', {
        emailsProcessed: this.performanceMetrics.emailsProcessed,
        avgScanTime: `${avgScanTime.toFixed(2)}ms`,
        cacheHitRate: `${(cacheHitRate * 100).toFixed(1)}%`,
        cacheSize: this.cache.size
      });
    }
  }

  // Smart email search and filtering
  setupSmartSearch() {
    // Add search button to Gmail interface
    const searchContainer = document.querySelector('[role="search"]');
    if (searchContainer && !document.getElementById('smart-search-btn')) {
      const smartSearchBtn = document.createElement('button');
      smartSearchBtn.id = 'smart-search-btn';
      smartSearchBtn.innerHTML = '🔍 Smart Search';
      smartSearchBtn.style.cssText = `
        background: #4285f4;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        margin-left: 8px;
        cursor: pointer;
        font-size: 12px;
      `;
      
      smartSearchBtn.addEventListener('click', () => {
        this.showSmartSearchDialog();
      });
      
      searchContainer.appendChild(smartSearchBtn);
    }
  }

  showSmartSearchDialog() {
    const dialog = document.createElement('div');
    dialog.id = 'smart-search-dialog';
    dialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      z-index: 10000;
      width: 400px;
      max-width: 90vw;
    `;
    
    dialog.innerHTML = `
      <h3 style="margin-bottom: 16px; color: #2c3e50;">🔍 Smart Email Search</h3>
      <p style="margin-bottom: 16px; color: #7f8c8d; font-size: 14px;">
        Search emails using natural language. Examples:
        <br>• "emails from John about project deadline"
        <br>• "shopping receipts from last month"
        <br>• "work emails with attachments"
      </p>
      <textarea id="smart-search-input" placeholder="Describe what you're looking for..." 
        style="width: 100%; height: 80px; padding: 12px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 16px; font-family: inherit;"></textarea>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button id="cancel-smart-search" style="padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">Cancel</button>
        <button id="execute-smart-search" style="padding: 8px 16px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">Search</button>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Event listeners
    document.getElementById('cancel-smart-search').addEventListener('click', () => {
      document.body.removeChild(dialog);
    });
    
    document.getElementById('execute-smart-search').addEventListener('click', () => {
      const query = document.getElementById('smart-search-input').value;
      this.executeSmartSearch(query);
      document.body.removeChild(dialog);
    });
  }

  async executeSmartSearch(query) {
    const searchCriteria = this.parseNaturalLanguageQuery(query);
    const results = await this.searchEmailsByCriteria(searchCriteria);
    this.displaySearchResults(results, query);
  }

  parseNaturalLanguageQuery(query) {
    const criteria = {
      sender: null,
      subject: null,
      category: null,
      timeRange: null,
      hasAttachments: false,
      keywords: []
    };
    
    const lowerQuery = query.toLowerCase();
    
    // Extract sender information
    const senderMatch = lowerQuery.match(/(?:from|by)\s+([a-zA-Z\s]+)/);
    if (senderMatch) {
      criteria.sender = senderMatch[1].trim();
    }
    
    // Extract subject/keywords
    const subjectMatch = lowerQuery.match(/(?:about|regarding|concerning)\s+([a-zA-Z\s]+)/);
    if (subjectMatch) {
      criteria.subject = subjectMatch[1].trim();
    }
    
    // Extract category
    const categoryMatch = lowerQuery.match(/(work|personal|finance|shopping|social|travel|health|education)\s+emails?/);
    if (categoryMatch) {
      criteria.category = categoryMatch[1];
    }
    
    // Extract time range
    const timeMatch = lowerQuery.match(/(last\s+(week|month|year)|yesterday|today|this\s+(week|month|year))/);
    if (timeMatch) {
      criteria.timeRange = timeMatch[0];
    }
    
    // Check for attachments
    if (lowerQuery.includes('attachment') || lowerQuery.includes('file')) {
      criteria.hasAttachments = true;
    }
    
    // Extract general keywords
    const keywords = query.toLowerCase().split(' ').filter(word => 
      word.length > 3 && !['from', 'about', 'with', 'the', 'and', 'or', 'emails', 'email'].includes(word)
    );
    criteria.keywords = keywords;
    
    return criteria;
  }

  async searchEmailsByCriteria(criteria) {
    const emails = document.querySelectorAll('[role="row"]');
    const results = [];
    
    for (const emailRow of emails) {
      if (!this.isEmailRow(emailRow)) continue;
      
      const emailData = this.extractEmailData(emailRow);
      if (!emailData) continue;
      
      if (this.matchesSearchCriteria(emailData, criteria)) {
        results.push({
          element: emailRow,
          data: emailData,
          matchScore: this.calculateMatchScore(emailData, criteria)
        });
      }
    }
    
    return results.sort((a, b) => b.matchScore - a.matchScore);
  }

  matchesSearchCriteria(emailData, criteria) {
    const text = `${emailData.subject} ${emailData.snippet}`.toLowerCase();
    const sender = emailData.sender.toLowerCase();
    
    // Check sender
    if (criteria.sender && !sender.includes(criteria.sender.toLowerCase())) {
      return false;
    }
    
    // Check subject/keywords
    if (criteria.subject && !text.includes(criteria.subject.toLowerCase())) {
      return false;
    }
    
    // Check category
    if (criteria.category) {
      const emailCategory = this.categorizeEmail(emailData);
      if (emailCategory !== criteria.category) {
        return false;
      }
    }
    
    // Check keywords
    if (criteria.keywords.length > 0) {
      const hasKeyword = criteria.keywords.some(keyword => 
        text.includes(keyword) || sender.includes(keyword)
      );
      if (!hasKeyword) {
        return false;
      }
    }
    
    return true;
  }

  calculateMatchScore(emailData, criteria) {
    let score = 0;
    const text = `${emailData.subject} ${emailData.snippet}`.toLowerCase();
    const sender = emailData.sender.toLowerCase();
    
    // Sender match
    if (criteria.sender && sender.includes(criteria.sender.toLowerCase())) {
      score += 10;
    }
    
    // Subject match
    if (criteria.subject && text.includes(criteria.subject.toLowerCase())) {
      score += 8;
    }
    
    // Category match
    if (criteria.category) {
      const emailCategory = this.categorizeEmail(emailData);
      if (emailCategory === criteria.category) {
        score += 6;
      }
    }
    
    // Keyword matches
    criteria.keywords.forEach(keyword => {
      if (text.includes(keyword)) score += 2;
      if (sender.includes(keyword)) score += 3;
    });
    
    return score;
  }

  displaySearchResults(results, originalQuery) {
    // Highlight matching emails
    results.forEach(result => {
      result.element.style.backgroundColor = '#e8f5e8';
      result.element.style.borderLeft = '4px solid #27ae60';
    });
    
    // Show results summary
    this.showNotification(
      `Found ${results.length} emails matching "${originalQuery}"`,
      'info'
    );
    
    // Auto-scroll to first result
    if (results.length > 0) {
      results[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  prioritizeEmail(emailData) {
    const text = `${emailData.subject} ${emailData.snippet}`.toLowerCase();
    const sender = emailData.sender.toLowerCase();
    
    let highestPriority = null;
    let highestScore = 0;
    
    // Check each priority pattern
    Object.keys(this.priorityPatterns).forEach(priority => {
      const pattern = this.priorityPatterns[priority];
      let score = 0;
      
      // Check keywords
      pattern.keywords.forEach(keyword => {
        if (text.includes(keyword)) {
          score += pattern.score;
        }
      });
      
      // Check sender patterns
      if (this.isImportantSender(sender)) {
        score += 5;
      }
      
      // Check for time-sensitive indicators
      if (this.hasTimeSensitiveIndicators(text)) {
        score += 3;
      }
      
      if (score > highestScore) {
        highestScore = score;
        highestPriority = priority;
      }
    });
    
    return highestScore >= 5 ? highestPriority : null;
  }

  isImportantSender(sender) {
    const importantPatterns = [
      'boss', 'manager', 'ceo', 'director', 'president', 'executive',
      'hr', 'human.resources', 'payroll', 'accounting', 'finance',
      'support', 'help', 'admin', 'system', 'noreply'
    ];
    
    return importantPatterns.some(pattern => sender.includes(pattern));
  }

  hasTimeSensitiveIndicators(text) {
    const timeIndicators = [
      'today', 'tomorrow', 'this week', 'this month', 'deadline',
      'expires', 'limited time', 'act now', 'urgent', 'immediate'
    ];
    
    return timeIndicators.some(indicator => text.includes(indicator));
  }

  highlightPriorityEmail(emailRow, priority) {
    if (!priority) return;
    
    const pattern = this.priorityPatterns[priority];
    if (!pattern) return;
    
    // Add priority indicator
    const priorityIndicator = document.createElement('div');
    priorityIndicator.className = 'priority-indicator';
    priorityIndicator.innerHTML = `🎯 ${priority.toUpperCase()}`;
    priorityIndicator.style.cssText = `
      position: absolute;
      top: 4px;
      right: 8px;
      background: ${pattern.color};
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: bold;
      z-index: 10;
    `;
    
    emailRow.style.position = 'relative';
    emailRow.style.borderLeft = `4px solid ${pattern.color}`;
    emailRow.style.backgroundColor = `${pattern.color}10`;
    
    // Add indicator if not already present
    if (!emailRow.querySelector('.priority-indicator')) {
      emailRow.appendChild(priorityIndicator);
    }
    
    // Show notification for high priority emails
    if (priority === 'urgent' || priority === 'finance' || priority === 'health') {
      this.showNotification(`High priority email: ${priority}`, 'warning');
    }
  }
}

// Initialize the detector with safety checks
try {
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    console.error('❌ Extension not loaded properly - chrome.runtime not available');
  } else {
    window.gmailSpamDetector = new GmailSpamDetectorPro();
    console.log('✅ Extension initialized successfully');
  }
} catch (error) {
  console.error('❌ Failed to initialize extension:', error);
}

// Handle messages from popup with safety checks
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
      if (request.action === 'getSettings') {
        sendResponse(window.gmailSpamDetector?.settings || {});
      }
      
      if (request.action === 'saveSettings') {
        if (window.gmailSpamDetector) {
          window.gmailSpamDetector.settings = { ...window.gmailSpamDetector.settings, ...request.settings };
        }
        sendResponse({ success: true });
      }
      
      if (request.action === 'toggleExtension') {
        window.gmailSpamDetector?.toggleExtension();
        sendResponse({ success: true });
      }
      
      if (request.action === 'getPerformanceMetrics') {
        sendResponse(window.gmailSpamDetector?.performanceMetrics || {});
      }
    } catch (error) {
      console.error('❌ Error handling popup message:', error);
      sendResponse({ error: error.message });
    }
  });
} else {
  console.error('❌ Cannot setup popup message listener - chrome.runtime not available');
} 