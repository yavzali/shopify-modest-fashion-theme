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
        const result = await this.fetchFilteredProducts();
        this.updatePageContentWithMergedResults(result.products, result.productCount, result.hasPagination);
        this.updateURL('/collections/all');
        
        // Apply comprehensive image standardization after content update
        setTimeout(() => {
          this.applyImageStandardization();
        }, 150);
        
        this.hideLoadingState();
      } else if (this.activeFilters.length === 1) {
        // CRITICAL FIX: Single filter - use comprehensive fetch to get ALL products and correct total count
        const retailer = this.activeFilters[0];
        console.log('Single filter active, fetching products for retailer:', retailer);
        
        // RATE LIMITING FIX: Use safer fetching with limits
        const result = await this.fetchAllProductsForRetailer(retailer);
        console.log('Single retailer result:', {
          products: result.products.length,
          totalCount: result.totalCount,
          retailer: result.retailer
        });
        
        // CRITICAL FIX: Use the comprehensive result with proper pagination
        // Show first 16 products but display correct total count and enable pagination
        const productsToShow = result.products.slice(0, 16);
        const hasPagination = result.products.length > 16;
        
        console.log('Displaying for single filter:', {
          productsToShow: productsToShow.length,
          totalAvailable: result.products.length,
          totalCount: result.totalCount,
          hasPagination: hasPagination
        });
        
        // Update page with first 16 products but show correct total count
        this.updatePageContentWithSingleFilterResults(productsToShow, result.totalCount, result.products.length, hasPagination);
        this.updateURL(this.buildFilterURL());
        
        // Apply comprehensive image standardization after content update
        setTimeout(() => {
          this.applyImageStandardization();
        }, 150);
        
        this.hideLoadingState();
      } else {
        // RATE LIMITING FIX: Multiple filters - use SEQUENTIAL processing instead of parallel
        console.log('Multiple filters active, using SEQUENTIAL OR logic (RATE LIMIT SAFE):', this.activeFilters);
        
        // CRITICAL FIX: Process retailers sequentially to prevent rate limiting
        const responses = [];
        for (let i = 0; i < this.activeFilters.length; i++) {
          const retailer = this.activeFilters[i];
          console.log(`Processing retailer ${i + 1}/${this.activeFilters.length}: ${retailer}`);
          
          // RATE LIMITING: Add 1-second delay between retailers (except first)
          if (i > 0) {
            console.log(`⏱️ Rate limiting delay: waiting 1 second before ${retailer}...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
          try {
            const allProducts = await this.fetchAllProductsForRetailer(retailer);
            console.log(`✅ Completed fetch for ${retailer}: ${allProducts.products.length} products`);
            responses.push({
              retailer: retailer,
              products: allProducts.products,
              totalCount: allProducts.totalCount
            });
          } catch (error) {
            console.error(`❌ Error fetching products for ${retailer}:`, error);
            responses.push({
              retailer: retailer,
              products: [],
              totalCount: 0
            });
          }
        }
        
        console.log('✅ Completed sequential processing for all retailers:', responses.length);
        
        // Process and combine all results
        const seenProducts = new Set();
        
        for (const response of responses) {
          console.log(`Processing results for ${response.retailer}: ${response.products.length} products`);
          
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
        
        console.log('✅ Combined unique products:', combinedProducts.length);
        console.log('✅ Total product count (corrected):', totalProductCount);
        
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
    console.log(`=== FETCHING PRODUCTS FOR ${retailer} (RATE LIMIT SAFE) ===`);
    
    let allProducts = [];
    let currentPage = 1;
    let hasMorePages = true;
    let totalCount = 0;
    let firstPageTotalCount = 0; // Store the total count from the first page
    
    // RATE LIMITING FIX: Reduce from 50 to 5 pages maximum per retailer
    // This reduces requests from 100 to 10 for 2 retailers (90% reduction)
    const MAX_PAGES_PER_RETAILER = 5;
    
    while (hasMorePages && currentPage <= MAX_PAGES_PER_RETAILER) {
      try {
        console.log(`Fetching page ${currentPage}/${MAX_PAGES_PER_RETAILER} for ${retailer}...`);
        
        // CRITICAL FIX: For first page, get full page to extract total count
        // For subsequent pages, use section_id for performance
        let url;
        if (currentPage === 1) {
          // First page: Get full page to extract total count
          url = `/collections/all?filter.p.tag=${encodeURIComponent(retailer)}&page=${currentPage}`;
          console.log('First page URL (full page):', url);
        } else {
          // Subsequent pages: Use section_id for performance
          url = `/collections/all?filter.p.tag=${encodeURIComponent(retailer)}&page=${currentPage}&section_id=main-collection-product-grid`;
          console.log('Subsequent page URL (section only):', url);
        }
        
        // RATE LIMITING FIX: Add retry logic for 429 errors
        const response = await this.fetchWithRetry(url, 0);
        
        if (!response.ok) {
          console.error(`HTTP error for ${retailer} page ${currentPage}:`, response.status);
          break;
        }
        
        const html = await response.text();
        console.log(`Received HTML for ${retailer} page ${currentPage}, length:`, html.length);
        
        const parsed = this.parseFilterResponse(html);
        console.log(`Parsed ${parsed.products.length} products from ${retailer} page ${currentPage}`);
        console.log(`Product count from response: ${parsed.productCount}`);
        
        // CRITICAL: Store the total count from the first page response
        if (currentPage === 1 && parsed.productCount > 0) {
          firstPageTotalCount = parsed.productCount;
          totalCount = firstPageTotalCount;
          console.log(`✅ Stored TOTAL count from first page: ${firstPageTotalCount}`);
        }
        
        if (parsed.products.length === 0) {
          console.log(`No products found on page ${currentPage} for ${retailer}, stopping pagination`);
          hasMorePages = false;
        } else {
          allProducts = allProducts.concat(parsed.products);
          
          // CRITICAL FIX: Properly check for next page
          hasMorePages = parsed.hasPagination && currentPage < MAX_PAGES_PER_RETAILER && parsed.products.length >= 16;
          console.log(`Page ${currentPage} complete. Products on page: ${parsed.products.length}, Has more pages: ${hasMorePages}`);
          
          // RATE LIMITING: Add small delay between pages of same retailer
          if (hasMorePages && currentPage > 1) {
            console.log('⏱️ Adding 500ms delay between pages...');
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          
          currentPage++;
        }
        
      } catch (error) {
        console.error(`Error fetching ${retailer} page ${currentPage}:`, error);
        hasMorePages = false;
      }
    }
    
    // CRITICAL: Use the total count from the first page, not the number of fetched products
    const finalTotalCount = firstPageTotalCount > 0 ? firstPageTotalCount : allProducts.length;
    
    console.log(`=== COMPLETED FETCH FOR ${retailer} (RATE LIMIT SAFE) ===`);
    console.log(`Total products fetched: ${allProducts.length} (limited to ${MAX_PAGES_PER_RETAILER} pages)`);
    console.log(`Total count (from Shopify): ${finalTotalCount}`);
    console.log(`Pages processed: ${currentPage - 1}/${MAX_PAGES_PER_RETAILER}`);
    
    return {
      products: allProducts,
      totalCount: finalTotalCount, // Use the Shopify total count, not fetched count
      retailer: retailer
    };
  }

  /**
   * RATE LIMITING FIX: Fetch with retry logic for 429 errors
   */
  async fetchWithRetry(url, retryCount = 0) {
    const MAX_RETRIES = 3;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      // RATE LIMITING: Handle 429 errors with exponential backoff
      if (response.status === 429) {
        if (retryCount < MAX_RETRIES) {
          const retryAfter = response.headers.get('Retry-After') || Math.pow(2, retryCount + 1);
          console.log(`🚨 Rate limited (429). Retrying in ${retryAfter} seconds... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          return this.fetchWithRetry(url, retryCount + 1);
        } else {
          console.error(`❌ Max retries exceeded for rate limiting on: ${url}`);
          throw new Error(`Rate limit exceeded after ${MAX_RETRIES} retries`);
        }
      }
      
      return response;
      
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        const delay = Math.pow(2, retryCount + 1);
        console.log(`🔄 Network error. Retrying in ${delay} seconds... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
        return this.fetchWithRetry(url, retryCount + 1);
      } else {
        console.error(`❌ Max retries exceeded for: ${url}`, error);
        throw error;
      }
    }
  }
  
  /**
   * Fetch filtered products from Shopify
   */
  async fetchFilteredProducts(retailer = null) {
    try {
      // CRITICAL FIX: Build proper URL without section_id parameter
      // The section_id parameter was causing malformed responses that couldn't be parsed
      let url = this.buildFilterURL();
      
      // Add retailer filter if specified
      if (retailer) {
        const urlObj = new URL(url, window.location.origin);
        urlObj.searchParams.set('filter.p.tag', retailer);
        url = urlObj.pathname + urlObj.search;
      }
      
      // ENHANCED: Preserve sort parameter from current URL
      const currentParams = new URLSearchParams(window.location.search);
      if (currentParams.has('sort_by')) {
        const urlObj = new URL(url, window.location.origin);
        urlObj.searchParams.set('sort_by', currentParams.get('sort_by'));
        url = urlObj.pathname + urlObj.search;
        console.log('Added sort parameter:', currentParams.get('sort_by'));
      }
      
      console.log('Fetching from URL:', url);
      
      // RATE LIMITING FIX: Use retry logic for 429 errors
      const response = await this.fetchWithRetry(url, 0);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const html = await response.text();
      return this.parseFilterResponse(html);
      
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      throw error;
    }
  }

  /**
   * ENHANCED: Parse filter response with improved Shopify structure handling
   */
  parseFilterResponse(html) {
    console.log('=== PARSING FILTER RESPONSE ===');
    console.log('HTML length:', html.length);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // CRITICAL FIX: Enhanced parsing for Shopify's actual response structure
    let productElements = [];
    let productCount = 0;
    
    console.log('=== ENHANCED SHOPIFY STRUCTURE PARSING ===');
    
    // First, try to find the complete product grid structure
    const productGridSelectors = [
      'ul.product-grid li.grid__item',
      'ul.grid.product-grid li.grid__item', 
      '.collection ul.grid li.grid__item',
      '#main-collection-product-grid ul.grid li.grid__item',
      '.shopify-section ul.grid li.grid__item'
    ];
    
    for (const selector of productGridSelectors) {
      const foundProducts = doc.querySelectorAll(selector);
      console.log(`Grid selector "${selector}" found: ${foundProducts.length} products`);
      
      if (foundProducts.length > 0) {
        productElements = Array.from(foundProducts);
        console.log(`✅ Successfully found ${productElements.length} products using: ${selector}`);
        break;
      }
    }
    
    // If no products found in grid structure, try alternative approaches
    if (productElements.length === 0) {
      console.log('=== TRYING ALTERNATIVE PRODUCT SELECTORS ===');
      
      const alternativeSelectors = [
        '.grid__item .card-wrapper',
        '.grid__item',
        '.product-item',
        '.card-wrapper',
        '[data-product-id]',
        'article.card-wrapper',
        '.card.product-card'
      ];
      
      for (const selector of alternativeSelectors) {
        const foundProducts = doc.querySelectorAll(selector);
        console.log(`Alternative selector "${selector}" found: ${foundProducts.length} products`);
        
        if (foundProducts.length > 0) {
          productElements = Array.from(foundProducts);
          console.log(`✅ Found products using alternative selector: ${selector}`);
          break;
        }
      }
    }
    
    // Extract product count from various possible locations
    const countSelectors = [
      '.collection__title',
      '[data-product-count]',
      '.facets__summary',
      '.collection-product-count', 
      'h1',
      'h2',
      '.collection-hero__title',
      '.page-header h1',
      '.page-title'
    ];
    
    let totalProductCount = 0; // Total available products
    let currentPageCount = 0;  // Products on current page
    
    for (const selector of countSelectors) {
      const countElement = doc.querySelector(selector);
      if (countElement && countElement.textContent) {
        const text = countElement.textContent;
        console.log(`Checking count text from ${selector}: "${text}"`);
        
        // ENHANCED: Look for total count patterns first
        // Pattern 1: "446 products" (total count)
        const totalMatch = text.match(/^(\d+)\s+products?$/i);
        if (totalMatch) {
          totalProductCount = parseInt(totalMatch[1]);
          console.log(`Found TOTAL product count from ${selector}: ${totalProductCount}`);
          break;
        }
        
        // Pattern 2: "Showing 16 of 446 products" (extract the total)
        const showingMatch = text.match(/showing\s+\d+\s+of\s+(\d+)\s+products?/i);
        if (showingMatch) {
          totalProductCount = parseInt(showingMatch[1]);
          console.log(`Found TOTAL from "showing X of Y" pattern in ${selector}: ${totalProductCount}`);
          break;
        }
        
        // Pattern 3: "16 of 446 products" (extract the total)
        const ofMatch = text.match(/\d+\s+of\s+(\d+)\s+products?/i);
        if (ofMatch) {
          totalProductCount = parseInt(ofMatch[1]);
          console.log(`Found TOTAL from "X of Y" pattern in ${selector}: ${totalProductCount}`);
          break;
        }
        
        // Pattern 4: "16 products" (current page count - fallback)
        const currentMatch = text.match(/(\d+)\s+products?/i);
        if (currentMatch && currentPageCount === 0) {
          currentPageCount = parseInt(currentMatch[1]);
          console.log(`Found current page count from ${selector}: ${currentPageCount}`);
        }
        
        // Pattern 5: "Showing 16" (current page count)
        const showingCurrentMatch = text.match(/showing\s+(\d+)/i);
        if (showingCurrentMatch && currentPageCount === 0) {
          currentPageCount = parseInt(showingCurrentMatch[1]);
          console.log(`Found current page count from "showing X" in ${selector}: ${currentPageCount}`);
        }
      }
    }
    
    // CRITICAL FIX: If we found a total count, use it; otherwise use current page count as fallback
    if (totalProductCount > 0) {
      productCount = totalProductCount;
      console.log(`✅ Using TOTAL product count: ${productCount}`);
    } else if (currentPageCount > 0) {
      productCount = currentPageCount;
      console.log(`⚠️ Using current page count as fallback: ${productCount}`);
    } else {
      productCount = productElements.length;
      console.log(`⚠️ Using product elements count as final fallback: ${productCount}`);
    }
    
    // ENHANCED: Convert DOM elements to product objects with better extraction
    console.log('=== CONVERTING DOM ELEMENTS TO PRODUCT OBJECTS ===');
    const products = productElements.map((element, index) => {
      // Enhanced product link extraction
      let productLink = null;
      let productUrl = null;
      
      // Try multiple approaches to find the product link
      if (element.tagName === 'A' && element.href && element.href.includes('/products/')) {
        productLink = element;
        productUrl = element.href;
      } else {
        // Look for product links within the element
        const linkSelectors = [
          'a[href*="/products/"]',
          '.card__link',
          '.product-link',
          '.card__heading a',
          'h3 a',
          '.card__content a'
        ];
        
        for (const linkSelector of linkSelectors) {
          const link = element.querySelector(linkSelector);
          if (link && link.href && link.href.includes('/products/')) {
            productLink = link;
            productUrl = link.href;
            break;
          }
        }
      }
      
      // Extract product handle from URL
      const productHandle = productUrl ? 
        productUrl.split('/products/')[1]?.split('?')[0]?.split('#')[0] : null;
      
      // Enhanced title extraction
      let productTitle = '';
      const titleSelectors = [
        '.card__heading a',
        '.product-title',
        'h3 a',
        '.card__content h3 a',
        '.card__content h3',
        'h3',
        '.card__link',
        'a[href*="/products/"]'
      ];
      
      for (const titleSelector of titleSelectors) {
        const titleElement = element.querySelector(titleSelector);
        if (titleElement && titleElement.textContent.trim()) {
          productTitle = titleElement.textContent.trim();
          break;
        }
      }
      
      // Enhanced price extraction
      let productPrice = '';
      const priceSelectors = [
        '.price',
        '.product-price',
        '.card__content .price',
        '.price__regular',
        '.price__sale',
        '[class*="price"]'
      ];
      
      for (const priceSelector of priceSelectors) {
        const priceElement = element.querySelector(priceSelector);
        if (priceElement && priceElement.textContent.trim()) {
          productPrice = priceElement.textContent.trim();
          break;
        }
      }
      
      const product = {
        element: element.outerHTML,
        url: productUrl,
        href: productUrl,
        id: productHandle,
        handle: productHandle,
        title: productTitle,
        price: productPrice
      };
      
      // Debug first few products
      if (index < 3) {
        console.log(`Product ${index + 1}:`, {
          url: productUrl,
          handle: productHandle,
          title: productTitle.substring(0, 50) + (productTitle.length > 50 ? '...' : ''),
          price: productPrice
        });
      }
      
      return product;
    });
    
    // Filter valid products (must have URL and title)
    const validProducts = products.filter(product => 
      product.url && 
      product.url.includes('/products/') && 
      product.title && 
      product.title.trim() !== ''
    );
    
    console.log(`Valid products with URLs and titles: ${validProducts.length} out of ${products.length}`);
    
    // Check for pagination
    const paginationSelectors = [
      '.pagination',
      '[aria-label*="pagination"]',
      '.pagination-wrapper',
      'nav[role="navigation"]'
    ];
    
    let hasPagination = false;
    for (const paginationSelector of paginationSelectors) {
      if (doc.querySelector(paginationSelector)) {
        hasPagination = true;
        console.log(`Found pagination using selector: ${paginationSelector}`);
        break;
      }
    }
    
    console.log(`=== ENHANCED PARSE RESULTS ===`);
    console.log(`Product elements found: ${productElements.length}`);
    console.log(`Valid products: ${validProducts.length}`);
    console.log(`Product count: ${productCount}`);
    console.log(`Has pagination: ${hasPagination}`);
    
    // CRITICAL: If no valid products found, this is likely a parsing error
    if (productElements.length > 0 && validProducts.length === 0) {
      console.error('❌ PARSING ERROR: Found product elements but no valid products');
      console.error('This suggests the HTML structure is different than expected');
      
      // Log the first product element for debugging
      if (productElements.length > 0) {
        console.error('First product element HTML:', productElements[0].outerHTML.substring(0, 500));
      }
    }
    
    return {
      products: validProducts,
      productCount: Math.max(productCount, validProducts.length), // Use the higher number
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
   * Update page content with merged results for multi-retailer filtering
   */
  updatePageContentWithMergedResults(combinedProducts, totalProductCount, hasPagination) {
    console.log('=== UPDATING PAGE CONTENT WITH MERGED RESULTS ===');
    console.log('Combined products:', combinedProducts.length);
    console.log('Total count:', totalProductCount);
    
    try {
      // CRITICAL FIX: SURGICAL cleanup instead of aggressive/nuclear cleanup
      console.log('🎯 SURGICAL CLEANUP: Removing only product grid content...');
      
      // Strategy 1: Find the main product grid container first
      let mainProductGrid = null;
      const mainGridSelectors = [
        '#main-collection-product-grid ul.product-grid',
        'ul.product-grid.grid',
        'ul.collection__products',
        'ul[data-grid="collection"]',
        '.collection ul.grid'
      ];
      
      for (const selector of mainGridSelectors) {
        mainProductGrid = document.querySelector(selector);
        if (mainProductGrid) {
          console.log(`✅ Found main product grid: ${selector}`);
          break;
        }
      }
      
      if (mainProductGrid) {
        // SURGICAL: Only clear the contents of the existing grid, preserve the container
        console.log('🎯 Clearing existing product grid contents (preserving container)');
        mainProductGrid.innerHTML = '';
        
        // Update the grid's data attributes
        mainProductGrid.setAttribute('data-products-count', totalProductCount.toString());
        
      } else {
        // If no existing grid found, we need to create one, but do it safely
        console.log('⚠️ No existing product grid found, creating new one safely...');
        
        // Find a safe container that won't break the page
        const safeContainer = document.querySelector('#main-collection-product-grid') || 
                            document.querySelector('.collection') ||
                            document.querySelector('#MainContent');
        
        if (safeContainer) {
          // Create new grid
          mainProductGrid = document.createElement('ul');
          mainProductGrid.className = 'product-grid grid product-grid grid--2-col-tablet-down grid--4-col-desktop';
          mainProductGrid.setAttribute('role', 'list');
          mainProductGrid.setAttribute('data-grid', 'collection');
          mainProductGrid.setAttribute('data-products-count', totalProductCount.toString());
          
          safeContainer.appendChild(mainProductGrid);
          console.log('✅ Created new product grid safely');
        } else {
          console.error('❌ Cannot find safe container for product grid');
          return;
        }
      }
      
      // Strategy 2: Remove only existing pagination (safely)
      const existingPagination = document.querySelector('nav[aria-label*="Pagination"], .pagination');
      if (existingPagination) {
        console.log('🗑️ Removing existing pagination');
        existingPagination.remove();
      }
      
      // Now safely add products to the preserved/created grid
      if (combinedProducts.length > 0) {
        console.log('=== ADDING PRODUCTS TO PRESERVED GRID ===');
        
        combinedProducts.forEach((product, index) => {
          try {
            // Parse the product HTML and extract the grid item
            const parser = new DOMParser();
            const productDoc = parser.parseFromString(product.element, 'text/html');
            const gridItem = productDoc.querySelector('li.grid__item, .grid__item, .card-wrapper, li');
            
            if (gridItem) {
              // If it's not already a li.grid__item, wrap it properly
              let listItem;
              if (gridItem.tagName === 'LI') {
                listItem = gridItem.cloneNode(true);
                // Ensure proper Dawn grid item classes
                if (!listItem.classList.contains('grid__item')) {
                  listItem.classList.add('grid__item');
                }
              } else {
                listItem = document.createElement('li');
                listItem.className = 'grid__item';
                listItem.appendChild(gridItem.cloneNode(true));
              }
              
              mainProductGrid.appendChild(listItem);
            } else {
              console.warn(`Product ${index + 1} missing grid item structure`);
            }
          } catch (error) {
            console.error(`Error adding product ${index + 1}:`, error);
          }
        });
        
        console.log(`✅ Added ${combinedProducts.length} products to preserved grid`);
        
      } else {
        console.log('No products to display, adding empty state message');
        
        // Add a "no products found" message
        const noProductsMessage = document.createElement('li');
        noProductsMessage.className = 'grid__item grid__item--full-width';
        noProductsMessage.innerHTML = '<p>No products found matching your filters.</p>';
        mainProductGrid.appendChild(noProductsMessage);
      }
      
      // Update product count display safely
      this.updateProductCount(totalProductCount);
      
      console.log('✅ SURGICAL UPDATE COMPLETE - Page structure preserved');
      
    } catch (error) {
      console.error('❌ Error in updatePageContentWithMergedResults:', error);
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

  /**
   * Update page content with single filter results showing proper pagination and total count
   */
  updatePageContentWithSingleFilterResults(productsToShow, totalCount, totalAvailable, hasPagination) {
    console.log('=== UPDATING PAGE CONTENT WITH SINGLE FILTER RESULTS ===');
    console.log('Products to show:', productsToShow.length);
    console.log('Total count (from Shopify):', totalCount);
    console.log('Total available (fetched):', totalAvailable);
    console.log('Has pagination:', hasPagination);
    
    try {
      // ENHANCED CLEANUP: More aggressive cleanup to prevent duplicates
      console.log('🧹 CLEANUP: Removing existing product grids and pagination...');
      
      // Remove ALL existing pagination elements
      const paginationSelectors = [
        '.pagination',
        '.pagination-wrapper', 
        '.facets__pagination',
        '.collection__pagination',
        '[data-pagination]',
        'nav[role="navigation"]',
        '.pagination-nav'
      ];
      
      paginationSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          console.log(`Removing pagination element: ${selector}`);
          el.remove();
        });
      });
      
      // CRITICAL FIX: Remove the original Dawn product grid completely
      const productGridSelectors = [
        '#main-collection-product-grid ul.grid',
        '.collection__products',
        '.product-grid',
        '.grid--product-grid',
        '[data-product-grid]',
        '.collection-product-grid',
        'ul.product-grid',
        'ul.grid.product-grid'
      ];
      
      productGridSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          console.log(`Removing existing product grid: ${selector}`);
          el.remove();
        });
      });
      
      // Find the main content container
      const contentContainer = document.querySelector('#main-collection-product-grid') || 
                              document.querySelector('.collection') ||
                              document.querySelector('.main-content') ||
                              document.querySelector('main');
      
      if (!contentContainer) {
        console.error('Could not find main content container');
        return;
      }
      
      console.log('Found content container:', contentContainer.className || contentContainer.tagName);
      
      // CRITICAL FIX: Create new product grid with proper Dawn theme structure
      const newProductGrid = document.createElement('ul');
      newProductGrid.className = 'grid product-grid grid--2-col-tablet grid--4-col-desktop';
      newProductGrid.id = 'ajax-single-filter-grid';
      
      console.log('Creating product grid with', productsToShow.length, 'products');
      
      // CRITICAL FIX: Add products to the grid using the correct HTML from product.element
      productsToShow.forEach((product, index) => {
        const productElement = document.createElement('li');
        productElement.className = 'grid__item';
        
        // CRITICAL FIX: Use product.element which contains the actual HTML
        if (product && typeof product === 'object' && product.element) {
          // Product is an object with element property containing HTML
          productElement.innerHTML = product.element;
          console.log(`Added product ${index + 1} from product.element`);
        } else if (typeof product === 'string') {
          // Product is already HTML string
          productElement.innerHTML = product;
          console.log(`Added product ${index + 1} from string`);
        } else {
          console.error(`Product ${index + 1} has unexpected format:`, typeof product, product);
          // Skip this product
          return;
        }
        
        newProductGrid.appendChild(productElement);
      });
      
      // Insert the new grid into the content container
      contentContainer.appendChild(newProductGrid);
      console.log('✅ New product grid inserted with', newProductGrid.children.length, 'products');
      
      // Update the product count display with correct format
      this.updateSingleFilterProductCount(productsToShow.length, totalCount);
      
      // Add pagination if needed
      if (hasPagination && totalCount > productsToShow.length) {
        const totalPages = Math.ceil(totalCount / productsToShow.length);
        this.createSingleFilterPagination(contentContainer, totalAvailable, totalCount);
        console.log(`Added pagination: ${totalPages} pages`);
      }
      
      // CRITICAL FIX: Apply image standardization to the new products
      this.applyImageStandardization();
      
      console.log('✅ Single filter content updated successfully');
      
    } catch (error) {
      console.error('Error updating single filter content:', error);
    }
  }

  /**
   * Create pagination for single filter results
   */
  createSingleFilterPagination(container, totalAvailable, totalCount) {
    console.log('Creating single filter pagination...', { totalAvailable, totalCount });
    
    // Calculate pagination info
    const itemsPerPage = 16;
    const totalPages = Math.ceil(totalAvailable / itemsPerPage);
    const currentPage = 1; // Always start on page 1 for single filter
    
    console.log('Pagination calculation:', { totalPages, currentPage, itemsPerPage, totalAvailable });
    
    // Only create pagination if there are multiple pages
    if (totalPages <= 1) {
      console.log('Only 1 page, skipping pagination creation');
      return;
    }
    
    // CRITICAL FIX: Find the correct container for pagination insertion
    // Try multiple selectors to find the product list container
    let productList = document.querySelector('[data-product-list]');
    if (!productList) {
      productList = document.querySelector('.product-grid');
    }
    if (!productList) {
      productList = document.querySelector('.collection-product-list');
    }
    if (!productList) {
      productList = document.querySelector('ul[role="list"]');
    }
    if (!productList) {
      // Try to find any list containing product items
      productList = document.querySelector('ul.grid, .product-list, .collection-grid');
    }
    if (!productList) {
      // Last resort: find any ul that contains product-related elements
      const allUls = document.querySelectorAll('ul');
      for (const ul of allUls) {
        if (ul.querySelector('[href*="/products/"]') || ul.querySelector('.product-item, .product-card')) {
          productList = ul;
          break;
        }
      }
    }
    
    if (!productList) {
      console.error('❌ Pagination container not found');
      console.log('Available containers:', {
        'data-product-list': document.querySelectorAll('[data-product-list]').length,
        'product-grid': document.querySelectorAll('.product-grid').length,
        'collection-product-list': document.querySelectorAll('.collection-product-list').length,
        'ul[role="list"]': document.querySelectorAll('ul[role="list"]').length,
        'all ul elements': document.querySelectorAll('ul').length
      });
      return;
    }
    
    console.log('✅ Found product list container:', productList.tagName, productList.className);
    
    // Remove any existing pagination first
    const existingPagination = document.querySelector('.pagination-wrapper, .pagination');
    if (existingPagination) {
      existingPagination.remove();
    }
    
    // Create pagination wrapper that matches Dawn theme structure
    const paginationWrapper = document.createElement('nav');
    paginationWrapper.setAttribute('role', 'navigation');
    paginationWrapper.setAttribute('aria-label', 'Pagination');
    paginationWrapper.className = 'pagination-wrapper';
    paginationWrapper.style.cssText = 'margin: 2rem 0; text-align: center; border-top: 1px solid #e5e5e5; padding-top: 2rem;';
    
    const paginationList = document.createElement('ul');
    paginationList.className = 'pagination-list';
    paginationList.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 0.5rem; list-style: none; margin: 0; padding: 0;';
    
    // Add Previous button (disabled for page 1)
    const prevItem = document.createElement('li');
    const prevButton = document.createElement('span');
    prevButton.textContent = 'Previous';
    prevButton.className = 'pagination-item pagination-prev disabled';
    prevButton.style.cssText = 'padding: 0.5rem 1rem; border: 1px solid #ddd; background: #f5f5f5; color: #999; border-radius: 4px;';
    prevItem.appendChild(prevButton);
    paginationList.appendChild(prevItem);
    
    // Add page numbers (show first few pages)
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      const pageItem = document.createElement('li');
      const pageButton = document.createElement('a');
      pageButton.href = '#';
      pageButton.textContent = i;
      pageButton.className = i === currentPage ? 'pagination-item current' : 'pagination-item';
      pageButton.style.cssText = i === currentPage 
        ? 'padding: 0.5rem 1rem; border: 1px solid #333; background: #333; color: white; text-decoration: none; border-radius: 4px; display: block;'
        : 'padding: 0.5rem 1rem; border: 1px solid #ddd; background: white; color: #333; text-decoration: none; border-radius: 4px; display: block; transition: all 0.2s;';
      pageButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`Page ${i} clicked - functionality to be implemented`);
      });
      pageButton.addEventListener('mouseenter', () => {
        if (i !== currentPage) {
          pageButton.style.background = '#f0f0f0';
        }
      });
      pageButton.addEventListener('mouseleave', () => {
        if (i !== currentPage) {
          pageButton.style.background = 'white';
        }
      });
      pageItem.appendChild(pageButton);
      paginationList.appendChild(pageItem);
    }
    
    // Add ellipsis if there are more pages
    if (totalPages > 5) {
      const ellipsisItem = document.createElement('li');
      const ellipsisSpan = document.createElement('span');
      ellipsisSpan.textContent = '...';
      ellipsisSpan.className = 'pagination-item ellipsis';
      ellipsisSpan.style.cssText = 'padding: 0.5rem 1rem; color: #666;';
      ellipsisItem.appendChild(ellipsisSpan);
      paginationList.appendChild(ellipsisItem);
      
      // Add last page
      const lastPageItem = document.createElement('li');
      const lastPageButton = document.createElement('a');
      lastPageButton.href = '#';
      lastPageButton.textContent = totalPages;
      lastPageButton.className = 'pagination-item';
      lastPageButton.style.cssText = 'padding: 0.5rem 1rem; border: 1px solid #ddd; background: white; color: #333; text-decoration: none; border-radius: 4px; display: block; transition: all 0.2s;';
      lastPageButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`Page ${totalPages} clicked - functionality to be implemented`);
      });
      lastPageButton.addEventListener('mouseenter', () => {
        lastPageButton.style.background = '#f0f0f0';
      });
      lastPageButton.addEventListener('mouseleave', () => {
        lastPageButton.style.background = 'white';
      });
      lastPageItem.appendChild(lastPageButton);
      paginationList.appendChild(lastPageItem);
    }
    
    // Add Next button
    const nextItem = document.createElement('li');
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.textContent = 'Next';
    nextButton.className = 'pagination-item pagination-next';
    nextButton.style.cssText = 'padding: 0.5rem 1rem; border: 1px solid #333; background: #333; color: white; text-decoration: none; border-radius: 4px; display: block; transition: all 0.2s;';
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Next page clicked - functionality to be implemented');
    });
    nextButton.addEventListener('mouseenter', () => {
      nextButton.style.background = '#555';
    });
    nextButton.addEventListener('mouseleave', () => {
      nextButton.style.background = '#333';
    });
    nextItem.appendChild(nextButton);
    paginationList.appendChild(nextItem);
    
    paginationWrapper.appendChild(paginationList);
    
    // Insert pagination after the product list
    productList.insertAdjacentElement('afterend', paginationWrapper);
    
    console.log('✅ Pagination created and inserted with', totalPages, 'pages');
  }

  /**
   * Update product count for single filter to show "X of Y products" format
   */
  updateSingleFilterProductCount(displayedCount, totalCount) {
    console.log('Updating single filter product count:', { displayedCount, totalCount });
    
    // CRITICAL FIX: Use multiple selectors to find the status element
    // Try different approaches to find the status element
    let statusElement = document.querySelector('status[role="status"]');
    if (!statusElement) {
      statusElement = document.querySelector('status');
    }
    if (!statusElement) {
      // Try to find by the text content pattern
      const allStatusElements = document.querySelectorAll('*');
      for (const element of allStatusElements) {
        if (element.textContent && element.textContent.includes('of') && element.textContent.includes('products')) {
          statusElement = element;
          break;
        }
      }
    }
    
    if (statusElement) {
      const newText = `${displayedCount} of ${totalCount} products`;
      statusElement.textContent = newText;
      console.log('✅ Status element updated:', newText);
      console.log('✅ Status element found with selector:', statusElement.tagName, statusElement.getAttribute('role'));
    } else {
      console.error('❌ Status element not found for count update');
      // Log all potential status elements for debugging
      const possibleElements = document.querySelectorAll('status, [role="status"], .product-count, .results-count');
      console.log('Available status-like elements:', possibleElements);
    }
    
    // Also update any other product count displays that might exist
    const productCountElements = document.querySelectorAll('[data-product-count], .product-count, .results-count');
    productCountElements.forEach(element => {
      element.textContent = `${displayedCount} of ${totalCount} products`;
    });
  }

  /**
   * Generate pagination HTML for single filter results
   */
  generatePaginationHtml(currentPage, totalPages) {
    console.log(`Generating pagination: page ${currentPage} of ${totalPages}`);
    
    let paginationHtml = '<nav class="pagination" role="navigation" aria-label="Pagination">';
    paginationHtml += '<ul class="pagination__list list-unstyled" role="list">';
    
    // Previous page
    if (currentPage > 1) {
      paginationHtml += `<li><a href="#" class="pagination__item pagination__item--prev" data-page="${currentPage - 1}">Previous</a></li>`;
    }
    
    // Page numbers (show first few, current, and last few)
    const showPages = [];
    
    // Always show first page
    if (totalPages > 0) showPages.push(1);
    
    // Show pages around current page
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      if (!showPages.includes(i)) showPages.push(i);
    }
    
    // Always show last page
    if (totalPages > 1 && !showPages.includes(totalPages)) {
      showPages.push(totalPages);
    }
    
    // Sort and add ellipsis where needed
    showPages.sort((a, b) => a - b);
    
    for (let i = 0; i < showPages.length; i++) {
      const page = showPages[i];
      
      // Add ellipsis if there's a gap
      if (i > 0 && showPages[i] - showPages[i-1] > 1) {
        paginationHtml += '<li><span class="pagination__item">…</span></li>';
      }
      
      if (page === currentPage) {
        paginationHtml += `<li><span class="pagination__item pagination__item--current" aria-current="page">${page}</span></li>`;
      } else {
        paginationHtml += `<li><a href="#" class="pagination__item" data-page="${page}">${page}</a></li>`;
      }
    }
    
    // Next page
    if (currentPage < totalPages) {
      paginationHtml += `<li><a href="#" class="pagination__item pagination__item--next" data-page="${currentPage + 1}">Next</a></li>`;
    }
    
    paginationHtml += '</ul></nav>';
    
    return paginationHtml;
  }
}

// Initialize the Ajax filters system
console.log('Ajax Filters JavaScript loading...');
new AjaxFilters(); 
console.log('Ajax Filters JavaScript loaded successfully');