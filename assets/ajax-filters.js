/**
 * Phase 2B: Simplified Ajax Retailer Filter - ENHANCED DEBUGGING VERSION
 * 
 * This system provides Ajax functionality for the retailer filter with custom filter pills.
 * Enhanced with comprehensive debugging and error handling.
 * 
 * UPDATED: Enhanced image size standardization for Issue #2 resolution
 */

class AjaxFilters {
  constructor() {
    this.activeFilters = [];
    this.isLoading = false;
    this.initialized = false;
    
    // Initialize with multiple fallbacks
    this.initializeWithFallbacks();
  }
  
  /**
   * Initialize with multiple fallback mechanisms
   */
  initializeWithFallbacks() {
    console.log('AjaxFilters: Starting initialization with fallbacks...');
    
    // Try immediate initialization
    if (document.readyState === 'complete') {
      console.log('Document already complete, initializing immediately');
      this.init();
    } else if (document.readyState === 'interactive') {
      console.log('Document interactive, initializing immediately');
      this.init();
    } else {
      console.log('Document still loading, setting up event listeners');
      // Set up multiple event listeners for different loading states
      document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded fired, initializing');
        this.init();
      });
      
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
          console.log('ReadyState changed to', document.readyState, 'initializing');
          this.init();
        }
      });
      
      // Fallback timeout
      setTimeout(() => {
        if (!this.initialized) {
          console.log('Fallback timeout reached, force initializing');
          this.init();
        }
      }, 2000);
    }
  }
  
  /**
   * Initialize the Ajax filters system
   */
  init() {
    if (this.initialized) {
      console.log('AjaxFilters: Already initialized, skipping');
      return;
    }
    
    console.log('=== INITIALIZING AJAX FILTER SYSTEM ===');
    
    // Check if we're on a collection page
    if (!window.location.pathname.includes('/collections/')) {
      console.log('AjaxFilters: Not on collection page, skipping initialization');
      return;
    }
    
    // Perform the actual initialization
    this.performInitialization();
    
    // ENHANCED: Ensure product count is correct after initialization
    setTimeout(() => {
      this.checkAndFixProductCountDisplay();
    }, 100);
    
    // Initialize comprehensive image standardization system
    setTimeout(() => {
      this.applyImageStandardization();
      this.setupImageStandardizationObserver();
    }, 200);
    
    console.log('✅ Ajax filter system initialized with comprehensive image standardization');
    console.log('=== END INITIALIZING AJAX FILTER SYSTEM ===');
  }
  
  /**
   * Perform the actual initialization
   */
  performInitialization() {
    console.log('=== PERFORMING INITIALIZATION ===');
    
    // CRITICAL: Force cleanup any stuck loading states first
    this.forceCleanupLoadingStates();
    
    // Initialize filter state from URL
    this.updateFilterStateFromURL();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Update UI to reflect current state
    this.updateUI();
    
    // Setup periodic URL checking for navigation events
    this.setupPeriodicURLCheck();
    
    // Apply comprehensive image standardization
    this.applyImageStandardization();
    
    // Setup observer for dynamic content
    this.setupImageStandardizationObserver();
    
    console.log('=== INITIALIZATION COMPLETE ===');
  }

  /**
   * Debug helper to check if key elements exist
   */
  debugElementExistence() {
    console.log('=== DEBUGGING ELEMENT EXISTENCE ===');
    
    // Check filter button elements
    const summaryLabel = document.querySelector('#Details-retailer-filter .facets__summary-label');
    console.log('Summary label found:', !!summaryLabel, summaryLabel);
    
    const headerSelected = document.querySelector('#Details-retailer-filter .facets__header .facets__selected');
    console.log('Header selected found:', !!headerSelected, headerSelected);
    
    const summary = document.querySelector('#Details-retailer-filter summary');
    console.log('Summary element found:', !!summary, summary);
    
    // Check filter pills container
    const pillsContainer1 = document.querySelector('#ajax-filter-pills');
    console.log('Pills container #ajax-filter-pills found:', !!pillsContainer1, pillsContainer1);
    
    const pillsContainer2 = document.querySelector('.active-facets.active-facets-desktop');
    console.log('Pills container .active-facets.active-facets-desktop found:', !!pillsContainer2, pillsContainer2);
    
    // Check checkboxes
    const checkboxes = document.querySelectorAll('input[name="filter.p.tag"]');
    console.log('Retailer checkboxes found:', checkboxes.length);
    checkboxes.forEach((cb, index) => {
      console.log(`Checkbox ${index}:`, cb.value, cb.checked);
    });
    
    console.log('=== END DEBUGGING ===');
  }

  /**
   * Set up event listeners for filter interactions
   */
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Use event delegation for more robust event handling
    document.addEventListener('change', (e) => {
      if (e.target && e.target.name === 'filter.p.tag') {
        console.log('=== CHECKBOX CHANGE EVENT (DELEGATED) ===');
        console.log('Checkbox changed:', e.target.value, e.target.checked);
        console.log('Event target:', e.target);
        this.handleRetailerFilterChange(e.target);
        console.log('=== END CHECKBOX CHANGE EVENT (DELEGATED) ===');
      }
    });
    
    // Also set up direct listeners as backup
    const retailerCheckboxes = document.querySelectorAll('input[name="filter.p.tag"]');
    console.log('Found retailer checkboxes:', retailerCheckboxes.length);
    
    retailerCheckboxes.forEach((checkbox, index) => {
      console.log(`Setting up listener for checkbox ${index}:`, checkbox.value);
      checkbox.addEventListener('change', (e) => {
        console.log('=== CHECKBOX CHANGE EVENT (DIRECT) ===');
        console.log('Checkbox changed:', e.target.value, e.target.checked);
        console.log('Event target:', e.target);
        this.handleRetailerFilterChange(e.target);
        console.log('=== END CHECKBOX CHANGE EVENT (DIRECT) ===');
      });
    });
    
    console.log('Event listeners set up successfully');
  }
  
  /**
   * Update filter state from URL parameters
   */
  updateFilterStateFromURL() {
    console.log('=== UPDATING FILTER STATE FROM URL ===');
    
    const urlParams = new URLSearchParams(window.location.search);
    console.log('Current URL:', window.location.href);
    console.log('URL search params:', window.location.search);
    
    // ENHANCED: Handle all URL parameters properly regardless of navigation pathway
    
    // Get all retailer tags from URL and remove duplicates using Set
    const allRetailerTags = urlParams.getAll('filter.p.tag');
    const uniqueRetailerTags = [...new Set(allRetailerTags)].filter(tag => tag && tag.trim() !== '');
    
    console.log('All retailer tags from URL (including duplicates):', allRetailerTags);
    console.log('Unique retailer tags from URL:', uniqueRetailerTags);
    
    // Enhanced URL cleaning check
    const urlCleaningCheck = {
      hasDuplicates: allRetailerTags.length !== uniqueRetailerTags.length,
      hasEmptyPriceFilters: urlParams.has('filter.v.price.gte') || urlParams.has('filter.v.price.lte'),
      allRetailerTags: allRetailerTags.length,
      uniqueRetailerTags: uniqueRetailerTags.length
    };
    
    console.log('URL cleaning check:', urlCleaningCheck);
    
    // Clean URL if needed
    if (this.shouldCleanURL(urlParams, uniqueRetailerTags)) {
      console.log('🧹 Cleaning URL parameters for consistency...');
      this.cleanAndUpdateURL(uniqueRetailerTags, urlParams);
      return; // Exit early as URL will be updated and this method will be called again
    }
    
    // Update active filters with valid retailer tags
    const validRetailerTags = uniqueRetailerTags.filter(tag => this.isValidRetailer(tag));
    
    console.log('Valid retailer tags:', validRetailerTags);
    console.log('Current active filters before update:', this.activeFilters);
    
    // Check if filters have actually changed
    const filtersChanged = JSON.stringify(this.activeFilters.sort()) !== JSON.stringify(validRetailerTags.sort());
    
    if (filtersChanged) {
      console.log('🔄 Filter state changed, updating...');
      this.activeFilters = validRetailerTags;
      console.log('Updated active filters:', this.activeFilters);
      
      // Update UI to reflect new state
      this.updateUI();
      
      // ENHANCED: Check product count display and update if needed
      this.checkAndFixProductCountDisplay();
      
      // CRITICAL FIX: Always perform Ajax filter when filters change
      console.log('🚀 Performing Ajax filter with updated state...');
      this.performAjaxFilter();
    } else {
      console.log('✅ Filter state already matches URL');
      
      // ENHANCED: Check product count display and update if needed
      this.checkAndFixProductCountDisplay();
      
      // CRITICAL FIX: Even if state matches, check if we need to trigger Ajax
      // This handles cases where UI is updated but products haven't been fetched
      if (this.activeFilters.length > 0) {
        console.log('🔍 State matches but checking if products are displayed...');
        
        // Check if products are actually displayed
        const productGrid = document.querySelector('#product-grid, ul.product-grid');
        const hasProducts = productGrid && productGrid.children.length > 0;
        const productCount = document.querySelector('#ProductCountDesktop, #ProductCount');
        const showingZeroProducts = productCount && productCount.textContent.includes('0 of');
        
        if (!hasProducts || showingZeroProducts) {
          console.log('🚀 No products displayed despite active filters, triggering Ajax filter...');
          this.performAjaxFilter();
        } else {
          console.log('✅ Products already displayed, no Ajax needed');
        }
      }
    }
    
    console.log('Final active filters:', this.activeFilters);
    console.log('=== END UPDATING FILTER STATE FROM URL ===');
  }
  
  /**
   * Check if URL needs cleaning (has duplicates, empty params, etc.)
   */
  shouldCleanURL(urlParams, uniqueRetailerTags) {
    // Check for duplicate retailer tags
    const allRetailerTags = urlParams.getAll('filter.p.tag');
    const hasDuplicates = allRetailerTags.length !== uniqueRetailerTags.length;
    
    // Check for empty price filters
    const priceGte = urlParams.get('filter.v.price.gte');
    const priceLte = urlParams.get('filter.v.price.lte');
    const hasEmptyPriceFilters = (priceGte === '' || priceGte === null) && (priceLte === '' || priceLte === null);
    
    console.log('URL cleaning check:', {
      hasDuplicates,
      hasEmptyPriceFilters,
      allRetailerTags: allRetailerTags.length,
      uniqueRetailerTags: uniqueRetailerTags.length
    });
    
    return hasDuplicates || hasEmptyPriceFilters;
  }
  
  /**
   * Clean URL parameters and update browser history
   */
  cleanAndUpdateURL(uniqueRetailerTags, originalParams) {
    console.log('🧹 Cleaning URL parameters...');
    
    const cleanParams = new URLSearchParams();
    
    // Add unique retailer tags only
    uniqueRetailerTags.forEach(tag => {
      cleanParams.append('filter.p.tag', tag);
    });
    
    // Preserve sort parameter if it exists and is not empty
    const sortBy = originalParams.get('sort_by');
    if (sortBy && sortBy.trim() !== '') {
      cleanParams.set('sort_by', sortBy);
      console.log('Preserved sort parameter:', sortBy);
    }
    
    // Preserve other non-empty filter parameters
    for (const [key, value] of originalParams.entries()) {
      if (key.startsWith('filter.') && 
          !key.includes('filter.p.tag') && 
          !key.includes('filter.v.price') && 
          value && value.trim() !== '') {
        cleanParams.set(key, value);
        console.log('Preserved filter parameter:', key, '=', value);
      }
    }
    
    // Build clean URL
    const cleanURL = window.location.pathname + (cleanParams.toString() ? '?' + cleanParams.toString() : '');
    
    console.log('Original URL:', window.location.href);
    console.log('Clean URL:', cleanURL);
    
    // Update browser history with clean URL
    if (cleanURL !== window.location.pathname + window.location.search) {
      window.history.replaceState({}, '', cleanURL);
      console.log('✅ URL cleaned and updated');
    }
  }
  
  /**
   * Set up periodic URL checking to handle HotReload interference
   */
  setupPeriodicURLCheck() {
    // Set up aggressive URL monitoring to handle HotReload interference
    // This will check every 1 second to catch HotReload resets immediately
    
    console.log('🔄 Setting up AGGRESSIVE URL monitoring for HotReload interference...');
    
    const urlChecker = setInterval(() => {
      // Skip URL monitoring if Ajax request is in progress
      if (this.isLoading) {
        console.log('⏸️ Skipping URL check - Ajax request in progress');
        return;
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      // Get unique retailer tags from URL (remove duplicates)
      const allRetailerTags = urlParams.getAll('filter.p.tag');
      const uniqueRetailerTags = [...new Set(allRetailerTags)].filter(tag => tag && tag.trim() !== '');
      
      // Get unique active filters from JavaScript state
      const uniqueActiveFilters = [...new Set(this.activeFilters)];
      
      // If URL has filters but our state doesn't, update our state
      if (uniqueRetailerTags.length > 0 && uniqueActiveFilters.length === 0) {
        console.log('🚨 HOTRELOAD INTERFERENCE DETECTED: URL has filters but JavaScript state is empty');
        console.log('URL filters:', uniqueRetailerTags);
        console.log('JavaScript state:', uniqueActiveFilters);
        
        this.activeFilters = uniqueRetailerTags;
        this.updateUI();
        
        // ENHANCED: Check product count display and update if needed
        this.checkAndFixProductCountDisplay();
        
        // CRITICAL FIX: Also trigger Ajax filter after state recovery
        console.log('🚀 Triggering Ajax filter after HotReload state recovery...');
        setTimeout(() => {
          this.performAjaxFilter();
        }, 100); // Small delay to ensure UI is updated first
        
        console.log('✅ State recovered from HotReload interference');
      }
      
      // Also check if URL is empty but we have active filters (user navigated away)
      // BUT only if we're not in the middle of an Ajax request
      if (uniqueRetailerTags.length === 0 && uniqueActiveFilters.length > 0) {
        // Additional check: make sure we're not just in the middle of updating the URL
        // Wait a bit to see if the URL gets updated
        setTimeout(() => {
          if (this.isLoading) {
            console.log('⏸️ Skipping URL clear check - Ajax request in progress');
            return;
          }
          
          const currentUrlParams = new URLSearchParams(window.location.search);
          const currentAllTags = currentUrlParams.getAll('filter.p.tag');
          const currentUniqueTags = [...new Set(currentAllTags)].filter(tag => tag && tag.trim() !== '');
          
          if (currentUniqueTags.length === 0 && this.activeFilters.length > 0) {
            console.log('🔄 URL cleared but JavaScript still has filters, clearing state...');
            this.activeFilters = [];
            this.updateUI();
            console.log('✅ State cleared to match empty URL');
          }
        }, 500); // Wait 500ms to allow for URL updates
      }
      
      // Additional check: if URL has filters but UI doesn't reflect it
      if (uniqueRetailerTags.length > 0 && !this.isLoading) {
        const summaryLabel = document.querySelector('#Details-retailer-filter .facets__summary-label');
        const selectedSpan = summaryLabel ? summaryLabel.querySelector('.facets__selected') : null;
        
        if (!selectedSpan || selectedSpan.textContent !== `(${uniqueRetailerTags.length})`) {
          console.log('🚨 UI STATE MISMATCH DETECTED: URL has filters but UI doesn\'t show them');
          console.log('Expected UI count:', uniqueRetailerTags.length);
          console.log('Actual UI count:', selectedSpan ? selectedSpan.textContent : 'none');
          
          this.activeFilters = uniqueRetailerTags;
          this.updateUI();
          
          // CRITICAL FIX: Also trigger Ajax filter after UI synchronization
          console.log('🚀 Triggering Ajax filter after UI state synchronization...');
          setTimeout(() => {
            this.performAjaxFilter();
          }, 100); // Small delay to ensure UI is updated first
          
          console.log('✅ UI state forcibly synchronized with URL');
        }
      }
    }, 1000); // Check every 1 second for immediate detection
    
    // Store the interval ID so we can clear it if needed
    this.urlCheckerInterval = urlChecker;
    
    console.log('✅ AGGRESSIVE URL monitoring started (every 1 second)');
    
    // Also set up HotReload event detection if available
    if (window.addEventListener) {
      // Listen for potential HotReload events
      window.addEventListener('beforeunload', () => {
        console.log('🔄 Page unload detected - potential HotReload');
      });
      
      // Listen for page visibility changes (HotReload might cause these)
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && !this.isLoading) {
          console.log('🔄 Page became visible - checking for HotReload state reset');
          setTimeout(() => {
            this.checkAndSyncURLState();
          }, 100);
        }
      });
      
      // Listen for focus events (HotReload might cause these)
      window.addEventListener('focus', () => {
        if (!this.isLoading) {
          console.log('🔄 Window focus detected - checking for HotReload state reset');
          setTimeout(() => {
            this.checkAndSyncURLState();
          }, 100);
        }
      });
    }
  }
  
  /**
   * Handle retailer filter checkbox changes
   */
  handleRetailerFilterChange(checkbox) {
    console.log('=== HANDLING RETAILER FILTER CHANGE ===');
    const retailerKey = checkbox.value;
    
    console.log('Retailer filter changed:', retailerKey, checkbox.checked);
    console.log('Current active filters before change:', this.activeFilters);
    
    if (checkbox.checked) {
      // Add filter if not already present (allow multiple selection)
      if (!this.activeFilters.includes(retailerKey)) {
        console.log('Adding filter:', retailerKey);
        this.activeFilters.push(retailerKey);
      } else {
        console.log('Filter already active:', retailerKey);
      }
    } else {
      // Remove this filter
      console.log('Removing filter:', retailerKey);
      const index = this.activeFilters.indexOf(retailerKey);
      if (index > -1) {
        this.activeFilters.splice(index, 1);
        console.log('Filter removed at index:', index);
      } else {
        console.log('Filter not found in active filters');
      }
    }
    
    console.log('Active filters after change:', this.activeFilters);
    
    // Update UI and perform filtering with a small delay to ensure DOM is ready
    console.log('Calling updateUI...');
    setTimeout(() => {
      this.updateUI();
      console.log('Calling performAjaxFilter...');
      this.performAjaxFilter();
    }, 50);
    
    console.log('=== END HANDLING RETAILER FILTER CHANGE ===');
  }
  
  /**
   * Update the UI (button text and pills)
   */
  updateUI() {
    console.log('=== UPDATING UI ===');
    const count = this.activeFilters.length;
    console.log('Updating UI with count:', count);
    console.log('Active filters:', this.activeFilters);
    
    // Update filter button text
    console.log('Calling updateFilterButton...');
    this.updateFilterButton(count);
    
    // Update filter pills
    console.log('Calling updateFilterPills...');
    this.updateFilterPills();
    
    // Update checkbox states
    console.log('Calling updateCheckboxStates...');
    this.updateCheckboxStates();
    
    console.log('=== END UPDATING UI ===');
  }
  
  /**
   * Update the filter button text
   */
  updateFilterButton(count) {
    console.log('=== UPDATING FILTER BUTTON ===');
    console.log('Updating filter button with count:', count);
    
    // Try multiple selectors for the summary label
    let summaryLabel = document.querySelector('#Details-retailer-filter .facets__summary-label');
    if (!summaryLabel) {
      summaryLabel = document.querySelector('[id="Details-retailer-filter"] .facets__summary-label');
    }
    if (!summaryLabel) {
      summaryLabel = document.querySelector('details[data-index="retailer"] .facets__summary-label');
    }
    
    console.log('Summary label element:', summaryLabel);
    
    if (summaryLabel) {
      let selectedSpan = summaryLabel.querySelector('.facets__selected');
      console.log('Existing selected span:', selectedSpan);
      
      if (!selectedSpan) {
        console.log('Creating new selected span');
        selectedSpan = document.createElement('span');
        selectedSpan.className = 'facets__selected';
        summaryLabel.appendChild(selectedSpan);
        console.log('New selected span created and appended');
      }
      
      const newText = `(${count})`;
      selectedSpan.textContent = newText;
      selectedSpan.classList.toggle('hidden', count === 0);
      console.log('Updated summary label text:', newText);
      console.log('Hidden class applied:', count === 0);
    } else {
      console.error('Summary label not found!');
    }
    
    // Try multiple selectors for the header
    let headerSelected = document.querySelector('#Details-retailer-filter .facets__header .facets__selected');
    if (!headerSelected) {
      headerSelected = document.querySelector('[id="Details-retailer-filter"] .facets__header .facets__selected');
    }
    if (!headerSelected) {
      headerSelected = document.querySelector('details[data-index="retailer"] .facets__header .facets__selected');
    }
    
    console.log('Header selected element:', headerSelected);
    
    if (headerSelected) {
      const headerText = `${count} filter${count !== 1 ? 's' : ''} selected`;
      headerSelected.textContent = headerText;
      console.log('Updated header text:', headerText);
    } else {
      console.error('Header selected not found!');
    }
    
    // Try multiple selectors for the summary
    let summary = document.querySelector('#Details-retailer-filter summary');
    if (!summary) {
      summary = document.querySelector('[id="Details-retailer-filter"] summary');
    }
    if (!summary) {
      summary = document.querySelector('details[data-index="retailer"] summary');
    }
    
    console.log('Summary element for aria-label:', summary);
    
    if (summary) {
      const ariaLabel = `Retailer (${count} filter${count !== 1 ? 's' : ''} selected)`;
      summary.setAttribute('aria-label', ariaLabel);
      console.log('Updated aria-label:', ariaLabel);
    } else {
      console.error('Summary element not found!');
    }
    
    console.log('=== END UPDATING FILTER BUTTON ===');
  }
  
  /**
   * Update filter pills
   */
  updateFilterPills() {
    console.log('=== UPDATING FILTER PILLS ===');
    console.log('Active filters for pills:', this.activeFilters);
    
    // Try multiple selectors for the pills container
    let pillsContainer = document.querySelector('#ajax-filter-pills');
    console.log('Pills container #ajax-filter-pills:', pillsContainer);
    
    if (!pillsContainer) {
      // Try alternative selectors
      pillsContainer = document.querySelector('.active-facets.active-facets-desktop');
      console.log('Pills container .active-facets.active-facets-desktop:', pillsContainer);
      
      if (!pillsContainer) {
        // Try to find any active-facets container
        const allActiveFacets = document.querySelectorAll('.active-facets');
        console.log('Found active-facets containers:', allActiveFacets.length);
        
        if (allActiveFacets.length > 0) {
          // Use the first one that has the right ID or class
          for (let i = 0; i < allActiveFacets.length; i++) {
            const container = allActiveFacets[i];
            if (container.id === 'ajax-filter-pills' || container.classList.contains('active-facets-desktop')) {
              pillsContainer = container;
              console.log('Found suitable container:', container);
              break;
            }
          }
          
          // If still not found, use the first one
          if (!pillsContainer && allActiveFacets.length > 0) {
            pillsContainer = allActiveFacets[0];
            console.log('Using first available container:', pillsContainer);
          }
        }
        
        if (!pillsContainer) {
          console.error('No filter pills container found!');
          console.log('Available elements with active-facets class:');
          allActiveFacets.forEach((el, index) => {
            console.log(`Element ${index}:`, el, el.id, el.className);
          });
          return;
        }
      }
    }
    
    console.log('Using pills container:', pillsContainer);
    
    // Clear existing pills (but keep native hidden ones)
    const existingPills = pillsContainer.querySelectorAll('.ajax-filter-pill');
    console.log('Existing pills to remove:', existingPills.length);
    existingPills.forEach(pill => pill.remove());
    
    // Remove existing "Remove all" button
    const existingRemoveAll = pillsContainer.querySelector('#ajax-remove-all');
    if (existingRemoveAll) {
      console.log('Removing existing remove all button');
      existingRemoveAll.remove();
    }
    
    // Add pills for active filters
    console.log('Creating pills for active filters:', this.activeFilters);
    this.activeFilters.forEach((retailer, index) => {
      console.log(`Creating pill ${index} for retailer:`, retailer);
      const pill = this.createFilterPill(retailer);
      pillsContainer.appendChild(pill);
      console.log('Pill created and appended:', pill);
    });
    
    // Add "Remove all" button if there are active filters
    if (this.activeFilters.length > 0) {
      console.log('Creating remove all button');
      const removeAllButton = this.createRemoveAllButton();
      pillsContainer.appendChild(removeAllButton);
      console.log('Remove all button created and appended:', removeAllButton);
    }
    
    console.log(`Filter pills updated: ${this.activeFilters.length} pills`);
    console.log('Final pills container content:', pillsContainer.innerHTML);
    console.log('=== END UPDATING FILTER PILLS ===');
  }
  
  /**
   * Create a filter pill element
   */
  createFilterPill(retailer) {
    console.log('Creating filter pill for:', retailer);
    const pill = document.createElement('div');
    pill.className = 'ajax-filter-pill';
    pill.innerHTML = `
      <a href="#" class="active-facets__button active-facets__button--light" data-retailer="${retailer}">
        <span class="active-facets__button-inner button button--tertiary">
          Retailer: ${retailer}
          <span class="svg-wrapper">
            <svg viewBox="0 0 12 12" class="icon icon-close-small" aria-hidden="true" focusable="false">
              <path d="m8.224 6 2.88-2.88a.75.75 0 1 0-1.061-1.061L7.163 4.939 4.283 2.059a.75.75 0 0 0-1.061 1.061L6.102 6 3.222 8.88a.75.75 0 1 0 1.061 1.061L7.163 7.061l2.88 2.88a.75.75 0 1 0 1.061-1.061L8.224 6Z" fill="currentColor"></path>
            </svg>
          </span>
          <span class="visually-hidden">Remove ${retailer} filter</span>
        </span>
      </a>
    `;
    
    // Add click handler
    const link = pill.querySelector('a');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Filter pill clicked for:', retailer);
      this.removeFilter(retailer);
    });
    
    console.log('Filter pill created:', pill);
    return pill;
  }
  
  /**
   * Create remove all button
   */
  createRemoveAllButton() {
    console.log('Creating remove all button');
    const button = document.createElement('div');
    button.id = 'ajax-remove-all';
    button.className = 'active-facets__button-wrapper';
    button.innerHTML = `
      <a href="#" class="active-facets__button-remove underlined-link">
        <span>Remove all</span>
      </a>
    `;
    
    // Add click handler
    const link = button.querySelector('a');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Remove all button clicked');
      this.clearAllFilters();
    });
    
    console.log('Remove all button created:', button);
    return button;
  }
  
  /**
   * Remove a specific filter
   */
  removeFilter(retailer) {
    console.log('=== REMOVING FILTER ===');
    console.log('Removing filter:', retailer);
    const index = this.activeFilters.indexOf(retailer);
    if (index > -1) {
      this.activeFilters.splice(index, 1);
      console.log('Filter removed, new active filters:', this.activeFilters);
    } else {
      console.log('Filter not found in active filters');
    }
    
    this.updateUI();
    this.performAjaxFilter();
    console.log('=== END REMOVING FILTER ===');
  }
  
  /**
   * Clear all filters
   */
  clearAllFilters() {
    console.log('=== CLEARING ALL FILTERS ===');
    console.log('Clearing all filters, current:', this.activeFilters);
    this.activeFilters = [];
    console.log('All filters cleared');
    this.updateUI();
    this.performAjaxFilter();
    console.log('=== END CLEARING ALL FILTERS ===');
  }
  
  /**
   * Update checkbox states
   */
  updateCheckboxStates() {
    console.log('=== UPDATING CHECKBOX STATES ===');
    const checkboxes = document.querySelectorAll('input[name="filter.p.tag"]');
    console.log('Found checkboxes for state update:', checkboxes.length);
    
    checkboxes.forEach((checkbox, index) => {
      const isActive = this.activeFilters.includes(checkbox.value);
      const wasChecked = checkbox.checked;
      checkbox.checked = isActive;
      
      console.log(`Checkbox ${index} (${checkbox.value}): was ${wasChecked}, now ${isActive}`);
      
      // Update visual state
      const label = checkbox.closest('.facet-checkbox');
      if (label) {
        label.classList.toggle('active', isActive);
        console.log(`Label for ${checkbox.value} active class:`, isActive);
      }
    });
    console.log('=== END UPDATING CHECKBOX STATES ===');
  }
  
  /**
   * Perform Ajax filtering request with OR logic for multiple retailers
   */
  async performAjaxFilter() {
    console.log('=== PERFORMING AJAX FILTER WITH OR LOGIC ===');
    if (this.isLoading) {
      console.log('Already loading, skipping');
      return;
    }
    
    this.isLoading = true;
    this.showLoadingState();
    
    try {
      let combinedProducts = [];
      let totalProductCount = 0;
      let combinedPagination = null;
      
      if (this.activeFilters.length === 0) {
        // No filters - show all products
        console.log('No filters active, showing all products');
        const response = await this.fetchFilteredProducts();
        const result = this.parseFilterResponse(response);
        this.updatePageContent(result.html, result.productCount, result.hasPagination);
        this.updateURL('/collections/all');
        
        // Apply comprehensive image standardization after content update
        setTimeout(() => {
          this.applyImageStandardization();
        }, 150);
        
        this.hideLoadingState();
      } else if (this.activeFilters.length === 1) {
        // Single filter - use direct request for efficiency
        const retailer = this.activeFilters[0];
        console.log('Single filter active, using direct request:', retailer);
        console.log('Fetching products for retailer:', retailer);
        
        const response = await this.fetchFilteredProducts(retailer);
        const result = this.parseFilterResponse(response);
        this.updatePageContent(result.html, result.productCount, result.hasPagination);
        this.updateURL(this.buildFilterURL());
        
        // Apply comprehensive image standardization after content update
        setTimeout(() => {
          this.applyImageStandardization();
        }, 150);
        
        this.hideLoadingState();
      } else {
        // Multiple filters - use OR logic with client-side merging
        console.log('Multiple filters active, using OR logic:', this.activeFilters);
        
        // Fetch retailers in parallel for better performance
        const fetchPromises = this.activeFilters.map(async (retailer, index) => {
          console.log('Starting fetch for retailer:', retailer);
          
          // Add small delay to prevent server overload with parallel requests
          if (index > 0) {
            await new Promise(resolve => setTimeout(resolve, 200 * index));
            console.log(`Added ${200 * index}ms delay for ${retailer}`);
          }
          
          try {
            const allProducts = await this.fetchAllProductsForRetailer(retailer);
            console.log(`Completed fetch for ${retailer}: ${allProducts.products.length} products`);
            return {
              retailer: retailer,
              products: allProducts.products,
              totalCount: allProducts.totalCount
            };
          } catch (error) {
            console.error(`Error fetching products for ${retailer}:`, error);
            return {
              retailer: retailer,
              products: [],
              totalCount: 0
            };
          }
        });
        
        console.log('Waiting for all retailers to complete...');
        const responses = await Promise.all(fetchPromises);
        console.log('Received responses for all retailers:', responses.length);
        
        // Process and combine all results
        const seenProducts = new Set();
        
        for (const response of responses) {
          console.log(`Processing results for ${response.retailer}: ${response.products.length} products`);
          // CRITICAL FIX: Use the actual totalCount from each retailer response
          // Don't add them together since that would double-count, instead use the combined unique products count
          
          response.products.forEach(product => {
            // Use product URL as unique identifier to avoid duplicates
            const productId = product.url || product.href || product.id;
            if (productId && !seenProducts.has(productId)) {
              seenProducts.add(productId);
              combinedProducts.push(product);
            }
          });
        }
        
        // CRITICAL FIX: Set totalProductCount to the actual number of unique combined products
        totalProductCount = combinedProducts.length;
        
        console.log('Combined unique products:', combinedProducts.length);
        console.log('Total product count (corrected):', totalProductCount);
        
        // Update page content with merged results
        this.updatePageContentWithMergedResults(combinedProducts, totalProductCount, false);
        this.updateURL(this.buildFilterURL());
        this.hideLoadingState();
      }
      
    } catch (error) {
      console.error('Error in performAjaxFilter:', error);
      this.hideLoadingState();
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Fetch all products for a specific retailer across all pages
   */
  async fetchAllProductsForRetailer(retailer) {
    console.log(`=== FETCHING ALL PRODUCTS FOR ${retailer} ===`);
    
    let allProducts = [];
    let currentPage = 1;
    let hasMorePages = true;
    let totalCount = 0;
    
    while (hasMorePages && currentPage <= 50) { // Safety limit
      try {
        console.log(`Fetching page ${currentPage} for ${retailer}...`);
        
        // CRITICAL FIX: Use section_id for proper Ajax response
        const url = `/collections/all?filter.p.tag=${encodeURIComponent(retailer)}&page=${currentPage}&section_id=main-collection-product-grid`;
        console.log('Request URL:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        if (!response.ok) {
          console.error(`HTTP error for ${retailer} page ${currentPage}:`, response.status);
          break;
        }
        
        const html = await response.text();
        console.log(`Received HTML for ${retailer} page ${currentPage}, length:`, html.length);
        
        const parsed = this.parseFilterResponse(html);
        console.log(`Parsed ${parsed.products.length} products from ${retailer} page ${currentPage}`);
        console.log(`Has pagination: ${parsed.hasPagination}, Has next page: ${parsed.hasNextPage}`);
        
        if (parsed.products.length === 0) {
          console.log(`No products found on page ${currentPage} for ${retailer}, stopping pagination`);
          hasMorePages = false;
        } else {
          allProducts = allProducts.concat(parsed.products);
          totalCount = parsed.productCount || totalCount;
          
          // CRITICAL FIX: Properly check for next page
          hasMorePages = parsed.hasNextPage && currentPage < 50;
          console.log(`Page ${currentPage} complete. Has more pages: ${hasMorePages}`);
          currentPage++;
        }
        
      } catch (error) {
        console.error(`Error fetching ${retailer} page ${currentPage}:`, error);
        hasMorePages = false;
      }
    }
    
    console.log(`=== COMPLETED FETCH FOR ${retailer} ===`);
    console.log(`Total products found: ${allProducts.length}`);
    console.log(`Total count: ${totalCount}`);
    
    return {
      products: allProducts,
      totalCount: totalCount,
      retailer: retailer
    };
  }
  
  /**
   * Fetch filtered products for a specific retailer (or all products if no retailer)
   */
  async fetchFilteredProducts(retailer = null) {
    const params = new URLSearchParams();
    
    if (retailer) {
      params.append('filter.p.tag', retailer);
      console.log('Fetching products for retailer:', retailer);
    } else {
      console.log('Fetching all products (no filter)');
    }
    
    // Get current sort parameter
    const currentSort = new URLSearchParams(window.location.search).get('sort_by');
    if (currentSort) {
      params.set('sort_by', currentSort);
      console.log('Added sort parameter:', currentSort);
    }
    
    // Build section URL for Ajax request
    const sectionUrl = `/collections/all?${params.toString()}&section_id=main-collection-product-grid`;
    console.log('Fetching from URL:', sectionUrl);
    
    const response = await fetch(sectionUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.text();
  }
  
  /**
   * Parse filter response HTML and extract products, count, and pagination
   */
  parseFilterResponse(html) {
    console.log('=== PARSING FILTER RESPONSE ===');
    console.log('HTML length:', html.length);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // CRITICAL FIX: Dawn theme Ajax responses have different structure
    // The response might be the entire page or just a section
    
    let productElements = [];
    
    // Try multiple approaches to find products in Dawn theme structure
    console.log('=== TRYING MULTIPLE PRODUCT SELECTORS ===');
    
    // Approach 1: Look for Dawn's standard product grid items
    const productSelectors = [
      'li.grid__item .card-wrapper',
      '.grid__item .card-wrapper', 
      'li.grid__item',
      '.grid__item',
      '.product-item',
      '.card-wrapper',
      '[data-product-id]'
    ];
    
    for (const selector of productSelectors) {
      const foundProducts = doc.querySelectorAll(selector);
      console.log(`Selector "${selector}" found: ${foundProducts.length} products`);
      
      if (foundProducts.length > 0) {
        productElements = Array.from(foundProducts);
        console.log(`✅ Successfully found ${productElements.length} products using selector: ${selector}`);
        break;
      }
    }
    
    // If no products found, try to find the main collection content
    if (productElements.length === 0) {
      console.log('=== NO PRODUCTS FOUND - CHECKING MAIN CONTENT ===');
      
      // Look for the main collection section
      const mainSection = doc.querySelector('#main-collection-product-grid, .collection, main');
      if (mainSection) {
        console.log('Found main section, searching within it...');
        
        for (const selector of productSelectors) {
          const foundProducts = mainSection.querySelectorAll(selector);
          console.log(`Main section selector "${selector}" found: ${foundProducts.length} products`);
          
          if (foundProducts.length > 0) {
            productElements = Array.from(foundProducts);
            console.log(`✅ Successfully found ${productElements.length} products in main section using: ${selector}`);
            break;
          }
        }
      }
    }
    
    // Final fallback: look for any element with product-related classes or attributes
    if (productElements.length === 0) {
      console.log('=== FINAL FALLBACK - LOOKING FOR ANY PRODUCT ELEMENTS ===');
      const fallbackProducts = doc.querySelectorAll('[class*="product"], [class*="card"], [data-product]');
      console.log(`Fallback found: ${fallbackProducts.length} potential product elements`);
      
      if (fallbackProducts.length > 0) {
        productElements = Array.from(fallbackProducts);
        console.log(`✅ Using fallback: ${productElements.length} product elements`);
      }
    }
    
    // CRITICAL FIX: Convert DOM elements to proper product objects with URLs
    console.log('=== CONVERTING DOM ELEMENTS TO PRODUCT OBJECTS ===');
    const products = productElements.map((element, index) => {
      // Find the product link within the element
      const productLink = element.tagName === 'A' ? element : element.querySelector('a[href*="/products/"]');
      const productUrl = productLink ? productLink.getAttribute('href') : null;
      
      // Extract product handle from URL
      const productHandle = productUrl ? productUrl.split('/products/')[1]?.split('?')[0] : null;
      
      // Find product title
      const titleElement = element.querySelector('.card__heading a, .product-title, h3 a, .card__content h3 a, a[href*="/products/"]');
      const productTitle = titleElement ? titleElement.textContent.trim() : '';
      
      // Find product price
      const priceElement = element.querySelector('.price, .product-price, .card__content .price');
      const productPrice = priceElement ? priceElement.textContent.trim() : '';
      
      if (index < 3) { // Debug first 3 products
        console.log(`Product ${index + 1}:`, {
          url: productUrl,
          handle: productHandle,
          title: productTitle,
          price: productPrice
        });
      }
      
      return {
        element: element.outerHTML,
        url: productUrl,
        href: productUrl, // Alternative property name for compatibility
        id: productHandle, // Use handle as ID
        handle: productHandle,
        title: productTitle,
        price: productPrice
      };
    });
    
    // Filter out products without valid URLs (these would be invalid anyway)
    const validProducts = products.filter(product => product.url && product.url.includes('/products/'));
    console.log(`Valid products with URLs: ${validProducts.length} out of ${products.length}`);
    
    // Extract product count from the response
    let productCount = validProducts.length;
    
    // Try to find the actual product count from the page
    const countSelectors = [
      '.collection__title',
      '[data-product-count]',
      '.facets__summary',
      'h2'
    ];
    
    for (const selector of countSelectors) {
      const countElement = doc.querySelector(selector);
      if (countElement && countElement.textContent.includes('product')) {
        const match = countElement.textContent.match(/(\d+)\s+product/);
        if (match) {
          const extractedCount = parseInt(match[1]);
          console.log(`Found product count from ${selector}: ${extractedCount}`);
          productCount = extractedCount;
          break;
        }
      }
    }
    
    // Check for pagination
    const pagination = doc.querySelector('.pagination, [aria-label*="pagination"]');
    const hasPagination = !!pagination;
    
    console.log(`=== PARSE RESULTS ===`);
    console.log(`Product elements found: ${productElements.length}`);
    console.log(`Valid products with URLs: ${validProducts.length}`);
    console.log(`Product count: ${productCount}`);
    console.log(`Has pagination: ${hasPagination}`);
    
    if (validProducts.length > 0) {
      console.log('Sample product object:', {
        url: validProducts[0].url,
        handle: validProducts[0].handle,
        title: validProducts[0].title.substring(0, 50) + '...'
      });
    }
    
    return {
      products: validProducts,
      productCount: productCount,
      hasPagination: hasPagination
    };
  }
  
  /**
   * Build filter URL with unique parameters
   */
  buildFilterURL(baseURL = '/collections/all') {
    console.log('Building filter URL with active filters:', this.activeFilters);
    
    const url = new URL(baseURL, window.location.origin);
    
    // Remove any existing filter parameters to avoid duplicates
    url.searchParams.delete('filter.p.tag');
    url.searchParams.delete('filter.v.price.gte');
    url.searchParams.delete('filter.v.price.lte');
    
    // Add unique active filters
    const uniqueFilters = [...new Set(this.activeFilters)];
    uniqueFilters.forEach(filter => {
      url.searchParams.append('filter.p.tag', filter);
    });
    
    // ENHANCED: Preserve existing sort and other valid parameters
    const currentParams = new URLSearchParams(window.location.search);
    
    // Preserve sort parameter
    if (currentParams.has('sort_by')) {
      const sortValue = currentParams.get('sort_by');
      if (sortValue && sortValue.trim() !== '') {
        url.searchParams.set('sort_by', sortValue);
        console.log('Preserved sort parameter:', sortValue);
      }
    }
    
    // Preserve other valid filter parameters (but not empty price filters)
    for (const [key, value] of currentParams.entries()) {
      if (key.startsWith('filter.') && 
          !key.includes('filter.p.tag') && 
          !key.includes('filter.v.price') && 
          value && value.trim() !== '') {
        url.searchParams.set(key, value);
        console.log('Preserved filter parameter:', key, '=', value);
      }
    }
    
    const finalURL = url.pathname + url.search;
    console.log('Built filter URL:', finalURL);
    return finalURL;
  }
  
  /**
   * Update page content with merged results from multiple retailers
   */
  updatePageContentWithMergedResults(combinedProducts, totalProductCount, hasPagination) {
    console.log('=== UPDATING PAGE WITH MERGED RESULTS ===');
    console.log('Products to display:', combinedProducts.length);
    console.log('Total count:', totalProductCount);
    
    try {
      // CRITICAL FIX: Find the correct product grid container (not navigation menu)
      let productGrid = null;
      
      // Try multiple selectors in order of preference for Dawn theme product grids
      const gridSelectors = [
        'ul.product-grid',
        'ul.grid.product-grid', 
        '#main-collection-product-grid ul.grid',
        '.collection ul.grid',
        'ul.grid:not([role="list"])', // Exclude navigation menus
        'ul[class*="product-grid"]',
        'ul[class*="grid"]:not(.menu-drawer__menu)', // Exclude drawer menus
        '.product-grid',
        '.collection .grid'
      ];
      
      for (const selector of gridSelectors) {
        const foundGrid = document.querySelector(selector);
        if (foundGrid) {
          // Additional validation: make sure this isn't a navigation menu
          const isNavigationMenu = foundGrid.classList.contains('menu-drawer__menu') || 
                                 foundGrid.classList.contains('list-menu') ||
                                 foundGrid.getAttribute('role') === 'list' ||
                                 foundGrid.closest('nav') ||
                                 foundGrid.closest('.menu-drawer');
          
          if (!isNavigationMenu) {
            productGrid = foundGrid;
            console.log(`✅ Product grid found with selector: ${selector}`);
            console.log('Grid element:', foundGrid);
            console.log('Grid classes:', foundGrid.className);
            break;
          } else {
            console.log(`❌ Skipped navigation menu with selector: ${selector}`);
          }
        }
      }
      
      // If no proper grid found, create one
      if (!productGrid) {
        console.log('❌ No existing product grid found, creating new one...');
        
        // Find the main content area to insert the grid
        const mainContent = document.querySelector('#main-collection-product-grid, .collection, main');
        if (mainContent) {
          // Create a new Dawn-style product grid
          productGrid = document.createElement('ul');
          productGrid.className = 'product-grid grid product-grid grid--2-col-tablet-down grid--4-col-desktop';
          productGrid.setAttribute('role', 'list');
          
          // Insert after any existing content
          const existingContent = mainContent.querySelector('.collection__title, .facets, h2');
          if (existingContent) {
            existingContent.parentNode.insertBefore(productGrid, existingContent.nextSibling);
          } else {
            mainContent.appendChild(productGrid);
          }
          
          console.log('✅ Created new Dawn product grid');
        } else {
          console.error('❌ Could not find main content area to create product grid');
          return;
        }
      }
      
      if (combinedProducts.length > 0) {
        console.log('=== PRESERVING DAWN GRID STRUCTURE ===');
        console.log('Grid classes before update:', productGrid.className);
        
        // Clear existing products while preserving container
        while (productGrid.firstChild) {
          productGrid.removeChild(productGrid.firstChild);
        }
        console.log('✅ Grid container preserved, children cleared');
        
        // Add new products from combined results
        combinedProducts.forEach((product, index) => {
          try {
            // Parse the product HTML and extract the grid item
            const parser = new DOMParser();
            const productDoc = parser.parseFromString(product.element, 'text/html');
            const gridItem = productDoc.querySelector('li.grid__item, .grid__item, .card-wrapper');
            
            if (gridItem) {
              // If it's not already a li.grid__item, wrap it
              let listItem;
              if (gridItem.tagName === 'LI') {
                listItem = gridItem.cloneNode(true);
              } else {
                listItem = document.createElement('li');
                listItem.className = 'grid__item';
                listItem.appendChild(gridItem.cloneNode(true));
              }
              
              productGrid.appendChild(listItem);
            } else {
              console.warn(`Product ${index + 1} missing grid item structure`);
            }
          } catch (error) {
            console.error(`Error adding product ${index + 1}:`, error);
          }
        });
        
        console.log(`✅ Added ${combinedProducts.length} products to Dawn grid structure`);
        
        // Make sure the grid is visible
        productGrid.style.display = '';
        productGrid.style.opacity = '1';
        productGrid.style.visibility = 'visible';
      } else {
        console.log('No products to display');
        
        // Clear the grid but keep the container
        while (productGrid.firstChild) {
          productGrid.removeChild(productGrid.firstChild);
        }
        
        // Add a "no products found" message
        const noProductsMessage = document.createElement('li');
        noProductsMessage.className = 'grid__item grid__item--full-width';
        noProductsMessage.innerHTML = '<p>No products found matching your filters.</p>';
        productGrid.appendChild(noProductsMessage);
      }
      
      // Update product count displays
      this.updateProductCount(totalProductCount);
      
      console.log('✅ Page content updated with merged results');
      
    } catch (error) {
      console.error('Error updating page content:', error);
    }
  }

  /**
   * Update product count displays
   */
  updateProductCount(count) {
    console.log('Product count updated:', count + ' products');
    
    // Update main product count heading
    const productCountHeading = document.querySelector('h2[class*="product"], .collection__title, [data-product-count]');
    if (productCountHeading) {
      productCountHeading.textContent = `${count} products`;
      console.log('Main count heading updated:', count + ' products');
    }
    
    // ENHANCED: Fix for "0 of X products" issue
    // Update status elements including those with "X of Y" format
    const statusElements = document.querySelectorAll('status, [role="status"], .facets__summary, #ProductCountDesktop, #ProductCount');
    statusElements.forEach(element => {
      if (element && element.textContent && element.textContent.includes('product')) {
        // Handle "X of Y products" format
        if (element.textContent.includes(' of ')) {
          const totalMatch = element.textContent.match(/of\s+(\d+)\s+products/i);
          if (totalMatch && totalMatch[1]) {
            const totalProducts = totalMatch[1];
            element.textContent = `${count} of ${totalProducts} products`;
            console.log('Fixed "X of Y" status element:', `${count} of ${totalProducts} products`);
          } else {
            element.textContent = `${count} products`;
            console.log('Status element updated (no total):', count + ' products');
          }
        } else {
          element.textContent = `${count} products`;
          console.log('Status element updated:', count + ' products');
        }
      }
    });
  }
  
  /**
   * Show loading state
   */
  showLoadingState() {
    console.log('=== SHOWING LOADING STATE ===');
    const productGrid = document.querySelector('ul.product-grid, ul.grid.product-grid');
    console.log('Product grid found for loading state:', !!productGrid);
    if (productGrid) {
      productGrid.style.opacity = '0.5';
      productGrid.style.pointerEvents = 'none';
      console.log('Loading state applied: opacity=0.5, pointerEvents=none');
    } else {
      console.error('Product grid not found for loading state!');
    }
    
    // CRITICAL FIX: Also manage Dawn's native loading overlay
    const collectionContainer = document.querySelector('.collection');
    console.log('Collection container found for loading class:', !!collectionContainer);
    if (collectionContainer) {
      collectionContainer.classList.add('loading');
      console.log('Dawn loading class added to collection container');
    } else {
      console.error('Collection container not found for loading class!');
    }
    
    console.log('=== END SHOWING LOADING STATE ===');
  }
  
  /**
   * Hide loading state
   */
  hideLoadingState() {
    console.log('=== HIDING LOADING STATE ===');
    
    // ENHANCED: More comprehensive grid selection for hiding loading state
    const gridSelectors = [
      'ul.product-grid',
      'ul.grid.product-grid', 
      'ul[class*="product-grid"]',
      'ul[class*="grid"]',
      '.collection ul.grid',
      '#main-collection-product-grid ul.grid',
      'ul.grid', // Added broader selector
      '.product-grid', // Added class-only selector
      '.grid' // Added most generic selector
    ];
    
    let productGrid = null;
    for (const selector of gridSelectors) {
      productGrid = document.querySelector(selector);
      if (productGrid) {
        console.log(`Product grid found for hiding loading state with: ${selector}`);
        break;
      }
    }
    
    if (productGrid) {
      // CRITICAL FIX: Ensure all loading-related styles are completely removed
      productGrid.style.opacity = '1';
      productGrid.style.pointerEvents = '';
      productGrid.style.display = '';
      productGrid.style.filter = ''; // Remove any filter effects
      productGrid.style.visibility = 'visible';
      
      // ENHANCED: Also remove loading state from all child elements
      const gridItems = productGrid.querySelectorAll('li, .grid__item, .card-wrapper');
      gridItems.forEach(item => {
        item.style.opacity = '1';
        item.style.filter = '';
        item.style.visibility = 'visible';
      });
      
      console.log('✅ Loading state removed: opacity=1, pointerEvents restored, display restored');
    } else {
      console.error('❌ Product grid not found for hiding loading state!');
    }
    
    // ENHANCED: Remove loading state from ALL possible containers
    const containerSelectors = [
      '.collection', 
      '#main-collection-product-grid', 
      'main .shopify-section',
      '.main-content',
      '#MainContent',
      'main'
    ];
    
    containerSelectors.forEach(selector => {
      const container = document.querySelector(selector);
      if (container) {
        container.classList.remove('loading');
        // CRITICAL FIX: Also remove any inline loading styles
        container.style.opacity = '';
        container.style.filter = '';
        container.style.pointerEvents = '';
        console.log(`✅ Loading class and styles removed from: ${selector}`);
      }
    });
    
    // ENHANCED: Remove any loading indicators and overlays
    const loadingElements = document.querySelectorAll('.loading-indicator, .spinner, [data-loading], .loading-overlay, .ajax-loading');
    loadingElements.forEach(indicator => {
      indicator.remove();
      console.log('✅ Removed loading element:', indicator.className);
    });
    
    // CRITICAL FIX: Force removal of any stuck CSS loading states
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      img.style.opacity = '';
      img.style.filter = '';
    });
    
    // ENHANCED: Force a repaint to ensure visual changes take effect
    if (productGrid) {
      productGrid.style.transform = 'translateZ(0)';
      setTimeout(() => {
        productGrid.style.transform = '';
      }, 10);
    }
    
    console.log('=== END HIDING LOADING STATE ===');
  }

  /**
   * Check and synchronize URL state if needed
   */
  checkAndSyncURLState() {
    const urlParams = new URLSearchParams(window.location.search);
    const retailerTags = urlParams.getAll('filter.p.tag').filter(tag => tag && tag.trim() !== '');
    
    // If URL has filters but our state doesn't, update our state
    if (retailerTags.length > 0 && this.activeFilters.length === 0) {
      console.log('🔄 URL SYNC: Found filters in URL but not in state, updating...');
      console.log('URL filters:', retailerTags);
      console.log('Current state:', this.activeFilters);
      
      this.activeFilters = retailerTags;
      this.updateUI();
      
      // ENHANCED: Check product count display and update if needed
      this.checkAndFixProductCountDisplay();
      
      // ENHANCED: Ensure Ajax filter is triggered to update product display
      console.log('🚀 Triggering Ajax filter after state recovery...');
      setTimeout(() => {
        this.performAjaxFilter();
      }, 150); // Small delay to ensure UI is updated first
      
      console.log('✅ State synchronized with URL');
      return true;
    }
    
    // ENHANCED: Even if state is synchronized, check product count display
    this.checkAndFixProductCountDisplay();
    
    console.log('✅ URL state already synchronized');
    return false;
  }

  /**
   * Check and fix product count display if showing incorrect values
   */
  checkAndFixProductCountDisplay() {
    console.log('🔍 Checking product count display...');
    
    // Check if product count elements show "0 of X products"
    const productCountElements = document.querySelectorAll('#ProductCountDesktop, #ProductCount');
    let needsFixing = false;
    
    productCountElements.forEach(element => {
      if (element && element.textContent && element.textContent.includes('0 of ')) {
        console.log('Found incorrect product count display:', element.textContent);
        needsFixing = true;
      }
    });
    
    // If we have active filters but product count shows 0, fix it
    if (needsFixing && this.activeFilters.length > 0) {
      console.log('🔧 Fixing incorrect product count display...');
      
      // Get the product grid to count actual products
      const productGrid = document.querySelector('ul.product-grid, ul.grid.product-grid');
      if (productGrid) {
        const actualProductCount = productGrid.querySelectorAll('li.grid__item').length;
        console.log('Actual product count from grid:', actualProductCount);
        
        if (actualProductCount > 0) {
          // Update the product count with actual count
          this.updateProductCount(actualProductCount);
        } else {
          // If no products visible yet, set a minimum placeholder value
          // This will be updated correctly when Ajax completes
          console.log('No products in grid yet, setting minimum placeholder count');
          this.updateProductCount(1);
        }
      }
    }
  }

  /**
   * Check if a tag is a valid retailer
   */
  isValidRetailer(tag) {
    // Get all available retailer options from the checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="filter.p.tag"]');
    const validRetailers = Array.from(checkboxes).map(cb => cb.value);
    return validRetailers.includes(tag);
  }

  /**
   * Update page content with filtered results
   */
  updatePageContent(html, productCount, hasPagination) {
    console.log('=== UPDATING PAGE CONTENT ===');
    console.log('Product count:', productCount);
    console.log('Has pagination:', hasPagination);
    
    try {
      // DAWN ARCHITECTURE PRESERVATION: Find the actual product grid container
      // Dawn uses a ul.product-grid with specific grid classes
      const mainContent = document.querySelector('ul.product-grid, ul.grid.product-grid');
      console.log('Product grid selector found:', !!mainContent);
      console.log('Product grid classes:', mainContent ? mainContent.className : 'not found');
      
      if (mainContent && html) {
        // Parse the HTML response to extract the new product grid
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newProductGrid = doc.querySelector('ul.product-grid, ul.grid.product-grid');
        
        if (newProductGrid) {
          // CRITICAL: Preserve Dawn's grid structure by only replacing children
          // This maintains the essential CSS classes on the <ul> element
          const gridClasses = mainContent.className;
          console.log('Preserving grid classes:', gridClasses);
          
          // Clear existing products while preserving container
          while (mainContent.firstChild) {
            mainContent.removeChild(mainContent.firstChild);
          }
          
          // Add new products from the response
          const newItems = newProductGrid.querySelectorAll('li.grid__item');
          newItems.forEach(item => {
            mainContent.appendChild(item.cloneNode(true));
          });
          
          console.log('✅ Product grid updated while preserving Dawn structure');
          console.log('✅ Grid classes maintained:', mainContent.className);
        } else {
          console.error('New product grid not found in response HTML');
        }
        
        // Update product count
        this.updateProductCount(productCount);
        
        // Handle pagination
        if (hasPagination) {
          const paginationElement = document.querySelector('.pagination, nav[aria-label="Pagination"]');
          if (paginationElement) {
            paginationElement.style.display = 'block';
          }
        }
        
        // Apply image standardization after content update
        setTimeout(() => {
          this.applyImageStandardization();
        }, 100);
        
      } else {
        console.error('Main content container or HTML not found');
      }
    } catch (error) {
      console.error('Error updating page content:', error);
    }
    
    console.log('=== END UPDATING PAGE CONTENT ===');
  }

  /**
   * Update URL in browser history
   */
  updateURL(url) {
    console.log('=== UPDATING URL ===');
    console.log('New URL:', url);
    
    try {
      if (url !== window.location.pathname + window.location.search) {
        window.history.replaceState({}, '', url);
        console.log('URL updated successfully');
      } else {
        console.log('URL already matches, no update needed');
      }
    } catch (error) {
      console.error('Error updating URL:', error);
    }
    
    console.log('=== END UPDATING URL ===');
  }

  /**
   * COMPREHENSIVE IMAGE STANDARDIZATION SYSTEM
   * This system actively applies image standardization after every Ajax operation
   * to ensure consistency across all filter states and DOM updates
   */
  
  /**
   * Apply comprehensive image standardization to all product images
   */
  applyImageStandardization() {
    console.log('=== APPLYING COMPREHENSIVE IMAGE STANDARDIZATION ===');
    
    try {
      // Find all product images using comprehensive selectors
      const imageSelectors = [
        '.card__media img',
        '.card__media .media img',
        '#product-grid .card__media img',
        '.collection .card__media img',
        '.product-grid .card__media img',
        'ul.grid .card__media img',
        '.grid__item .card__media img',
        '.card-wrapper .card__media img',
        '[class*="card"] img',
        '.product-card img'
      ];
      
      let totalImagesProcessed = 0;
      
      imageSelectors.forEach(selector => {
        const images = document.querySelectorAll(selector);
        console.log(`Found ${images.length} images with selector: ${selector}`);
        
        images.forEach((img, index) => {
          // Apply standardization styles directly via JavaScript
          img.style.border = '1px solid #e5e5e5';
          img.style.borderRadius = '0';
          img.style.boxSizing = 'border-box';
          img.style.objectFit = 'cover';
          
          // CRITICAL: Apply size standardization (portrait ratio)
          // Find the parent card element and apply --ratio-percent
          const cardElement = img.closest('.card, .card__inner, .card-wrapper');
          if (cardElement) {
            cardElement.style.setProperty('--ratio-percent', '125%');
            console.log(`Applied portrait ratio to card element for image ${index + 1}`);
          }
          
          // Also apply to the media container
          const mediaElement = img.closest('.card__media, .media');
          if (mediaElement) {
            mediaElement.style.setProperty('--ratio-percent', '125%');
            console.log(`Applied portrait ratio to media element for image ${index + 1}`);
          }
          
          // Ensure the image loads properly
          if (!img.complete) {
            img.addEventListener('load', () => {
              img.style.border = '1px solid #e5e5e5';
              img.style.borderRadius = '0';
              img.style.boxSizing = 'border-box';
              img.style.objectFit = 'cover';
              
              // Reapply size standardization on load
              const cardEl = img.closest('.card, .card__inner, .card-wrapper');
              if (cardEl) {
                cardEl.style.setProperty('--ratio-percent', '125%');
              }
              const mediaEl = img.closest('.card__media, .media');
              if (mediaEl) {
                mediaEl.style.setProperty('--ratio-percent', '125%');
              }
            });
          }
          
          totalImagesProcessed++;
        });
      });
      
      // Also apply to hover state images
      const hoverImages = document.querySelectorAll('.card__media .media--hover img, .card__media .media:last-child img');
      hoverImages.forEach(img => {
        img.style.border = '1px solid #e5e5e5';
        img.style.borderRadius = '0';
        img.style.boxSizing = 'border-box';
        img.style.objectFit = 'cover';
        
        // Apply size standardization to hover images too
        const cardElement = img.closest('.card, .card__inner, .card-wrapper');
        if (cardElement) {
          cardElement.style.setProperty('--ratio-percent', '125%');
        }
        const mediaElement = img.closest('.card__media, .media');
        if (mediaElement) {
          mediaElement.style.setProperty('--ratio-percent', '125%');
        }
        
        totalImagesProcessed++;
      });
      
      // Apply container adjustments to prevent layout shifts
      const mediaContainers = document.querySelectorAll('.card__media, .card__media .media');
      mediaContainers.forEach(container => {
        container.style.boxSizing = 'border-box';
        // Ensure portrait ratio is applied to all media containers
        if (!container.style.getPropertyValue('--ratio-percent')) {
          container.style.setProperty('--ratio-percent', '125%');
        }
      });
      
      console.log(`✅ Image standardization applied to ${totalImagesProcessed} images`);
      console.log(`✅ Container adjustments applied to ${mediaContainers.length} containers`);
      console.log(`✅ Portrait ratio (125%) applied to all images and containers`);
      
    } catch (error) {
      console.error('Error applying image standardization:', error);
    }
    
    console.log('=== END APPLYING IMAGE STANDARDIZATION ===');
  }
  
  /**
   * Set up mutation observer to watch for DOM changes and reapply image standardization
   */
  setupImageStandardizationObserver() {
    console.log('=== SETTING UP IMAGE STANDARDIZATION OBSERVER ===');
    
    // Create a mutation observer to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      let shouldReapplyStandardization = false;
      
      mutations.forEach((mutation) => {
        // Check if new nodes were added that might contain images
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node contains product images
              if (node.querySelector && (
                node.querySelector('.card__media img') ||
                node.querySelector('.product-card img') ||
                node.classList.contains('card-wrapper') ||
                node.classList.contains('grid__item')
              )) {
                shouldReapplyStandardization = true;
              }
            }
          });
        }
      });
      
      if (shouldReapplyStandardization) {
        console.log('🔄 DOM changes detected, reapplying image standardization...');
        // Use a small delay to ensure DOM is fully updated
        setTimeout(() => {
          this.applyImageStandardization();
        }, 100);
      }
    });
    
    // Start observing the product grid for changes
    const productGrid = document.querySelector('#product-grid, .collection, .grid');
    if (productGrid) {
      observer.observe(productGrid, {
        childList: true,
        subtree: true
      });
      console.log('✅ Image standardization observer started');
    } else {
      console.error('❌ Product grid not found for observer');
    }
    
    // Store observer reference for cleanup if needed
    this.imageObserver = observer;
    
    console.log('=== END SETTING UP IMAGE STANDARDIZATION OBSERVER ===');
  }

  /**
   * Force clear any stuck loading states (called on initialization)
   */
  forceCleanupLoadingStates() {
    console.log('=== FORCE CLEANUP LOADING STATES ===');
    
    // This method ensures any stuck loading states from previous sessions are cleared
    this.hideLoadingState();
    
    // Additional cleanup for common stuck states
    const allGrids = document.querySelectorAll('ul.grid, .product-grid, .grid');
    allGrids.forEach(grid => {
      grid.style.opacity = '';
      grid.style.filter = '';
      grid.style.pointerEvents = '';
      grid.classList.remove('loading', 'ajax-loading');
    });
    
    // Remove any overlay elements that might be stuck
    const overlays = document.querySelectorAll('[style*="opacity: 0.5"], [style*="opacity:0.5"]');
    overlays.forEach(element => {
      if (element.style.opacity === '0.5') {
        element.style.opacity = '';
        console.log('✅ Cleared stuck opacity 0.5 from element:', element.tagName);
      }
    });
    
    console.log('=== END FORCE CLEANUP ===');
  }
}

// Initialize the Ajax filters system
console.log('Ajax Filters JavaScript loading...');
new AjaxFilters(); 
console.log('Ajax Filters JavaScript loaded successfully');