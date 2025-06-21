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
    console.log('AjaxFilters: Performing initialization...');
    
    // Debug: Check if key elements exist
    this.debugElementExistence();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Update filter state from URL on page load
    this.updateFilterStateFromURL();
    
    // Set up aggressive URL monitoring for HotReload interference
    this.setupPeriodicURLCheck();
    
    // Add additional delayed URL checks to handle HotReload timing issues
    setTimeout(() => {
      console.log('🕐 DELAYED URL CHECK (5s): Checking for missed URL parameters...');
      this.checkAndSyncURLState();
    }, 5000);
    
    setTimeout(() => {
      console.log('🕐 DELAYED URL CHECK (10s): Final check for missed URL parameters...');
      this.checkAndSyncURLState();
    }, 10000);
    
    this.initialized = true;
    console.log('AjaxFilters: Initialization complete');
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
    
    // Get all retailer tags from URL and remove duplicates using Set
    const allRetailerTags = urlParams.getAll('filter.p.tag');
    const uniqueRetailerTags = [...new Set(allRetailerTags)].filter(tag => tag && tag.trim() !== '');
    
    console.log('All retailer tags from URL (including duplicates):', allRetailerTags);
    console.log('Unique retailer tags from URL:', uniqueRetailerTags);
    
    // Validate that these are actual retailer values
    const validRetailerTags = uniqueRetailerTags.filter(tag => {
      const isValid = this.isValidRetailer(tag);
      if (!isValid) {
        console.log('Invalid retailer tag found:', tag);
      }
      return isValid;
    });
    
    console.log('Valid retailer tags:', validRetailerTags);
    console.log('Current active filters before update:', this.activeFilters);
    
    // Check if URL state matches current JavaScript state
    const currentFiltersSet = new Set(this.activeFilters);
    const urlFiltersSet = new Set(validRetailerTags);
    
    const setsEqual = currentFiltersSet.size === urlFiltersSet.size && 
                     [...currentFiltersSet].every(filter => urlFiltersSet.has(filter));
    
    if (setsEqual) {
      console.log('✅ Filter state already matches URL');
    } else {
      console.log('🔄 Updating filter state to match URL');
      console.log('Current filters:', [...currentFiltersSet]);
      console.log('URL filters:', [...urlFiltersSet]);
      
      this.activeFilters = validRetailerTags;
      this.updateUI();
    }
    
    console.log('Final active filters:', this.activeFilters);
    
    // SUB-ISSUE 1.3 FIX: Auto-trigger Ajax filter if we have active filters from URL
    if (this.activeFilters.length > 0) {
      console.log('🚀 AUTO-TRIGGERING Ajax filter for URL-loaded filters');
      // Use setTimeout to ensure DOM is fully ready
      setTimeout(() => {
        this.performAjaxFilter();
      }, 100);
    }
    
    console.log('=== END UPDATING FILTER STATE FROM URL ===');
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
        const fetchPromises = this.activeFilters.map(async (retailer) => {
          console.log('Starting fetch for retailer:', retailer);
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
          totalProductCount += response.totalCount;
          
          response.products.forEach(product => {
            // Use product URL as unique identifier to avoid duplicates
            const productId = product.url || product.href || product.id;
            if (productId && !seenProducts.has(productId)) {
              seenProducts.add(productId);
              combinedProducts.push(product);
            }
          });
        }
        
        console.log('Combined unique products:', combinedProducts.length);
        console.log('Total product count from all retailers:', totalProductCount);
        
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
   * Fetch ALL products for a specific retailer (all pages)
   */
  async fetchAllProductsForRetailer(retailer) {
    console.log(`Fetching ALL products for retailer: ${retailer}`);
    
    let allProducts = [];
    let currentPage = 1;
    let hasMorePages = true;
    let totalCount = 0;
    const maxPages = 10; // Limit to 10 pages to prevent timeouts
    
    while (hasMorePages && currentPage <= maxPages) {
      console.log(`Fetching page ${currentPage} for ${retailer}`);
      
      const url = `/collections/all?filter.p.tag=${encodeURIComponent(retailer)}&page=${currentPage}&section_id=main-collection-product-grid`;
      console.log('Fetching from URL:', url);
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const result = this.parseFilterResponse(html);
        
        if (currentPage === 1) {
          totalCount = result.productCount; // Get total count from first page
        }
        
        if (result.products && result.products.length > 0) {
          allProducts = allProducts.concat(result.products);
          console.log(`Page ${currentPage}: ${result.products.length} products, total so far: ${allProducts.length}`);
          
          // Check if there are more pages
          hasMorePages = result.hasPagination && result.products.length > 0;
          currentPage++;
          
          // If we've reached the max pages, use the total count for accurate display
          if (currentPage > maxPages && hasMorePages) {
            console.log(`Reached maximum page limit (${maxPages}), stopping. Total count will be: ${totalCount}`);
            hasMorePages = false;
          }
        } else {
          hasMorePages = false;
        }
      } catch (error) {
        console.error(`Error fetching page ${currentPage} for ${retailer}:`, error);
        hasMorePages = false;
      }
    }
    
    console.log(`Finished fetching products for ${retailer}: ${allProducts.length} products (total count: ${totalCount})`);
    
    return {
      products: allProducts,
      totalCount: totalCount
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
    console.log('Parsing filter response, HTML length:', html.length);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract products
    const productElements = doc.querySelectorAll('.card-wrapper, .product-card, [data-product-id], li[class*="grid__item"]');
    const products = Array.from(productElements).map(element => {
      // Extract product data
      const productLink = element.querySelector('a[href*="/products/"]');
      const productTitle = element.querySelector('.card__heading a, .product-title, h3 a');
      const productPrice = element.querySelector('.price, .product-price');
      
      return {
        element: element.outerHTML,
        url: productLink ? productLink.getAttribute('href') : null,
        handle: productLink ? productLink.getAttribute('href').split('/products/')[1]?.split('?')[0] : null,
        title: productTitle ? productTitle.textContent.trim() : '',
        price: productPrice ? productPrice.textContent.trim() : ''
      };
    });
    
    // Extract product count - try multiple selectors
    let productCount = 0;
    const productCountSelectors = [
      '#ProductCountDesktop', 
      '#ProductCount', 
      '.collection-product-count',
      'h2[class*="product"]',
      '.collection__title',
      '[data-product-count]',
      'status h2',
      '.facets__summary h2'
    ];
    
    for (const selector of productCountSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        const match = text.match(/(\d+)/);
        if (match) {
          productCount = parseInt(match[1]);
          console.log(`Found product count ${productCount} using selector: ${selector}`);
          break;
        }
      }
    }
    
    // Fallback to products length if no count found
    if (productCount === 0) {
      productCount = products.length;
      console.log(`Using products length as count: ${productCount}`);
    }
    
    // Extract pagination
    const paginationElement = doc.querySelector('.pagination-wrapper, nav[aria-label="Pagination"], .pagination');
    const hasPagination = !!paginationElement;
    
    console.log('Parsed response:', {
      products: products.length,
      productCount: productCount,
      hasPagination: hasPagination
    });
    
    return {
      products,
      productCount,
      hasPagination,
      html: html
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
    
    // Add unique active filters
    const uniqueFilters = [...new Set(this.activeFilters)];
    uniqueFilters.forEach(filter => {
      url.searchParams.append('filter.p.tag', filter);
    });
    
    // Preserve existing sort parameters
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has('sort_by')) {
      url.searchParams.set('sort_by', currentParams.get('sort_by'));
    }
    
    const finalURL = url.pathname + url.search;
    console.log('Built filter URL:', finalURL);
    return finalURL;
  }
  
  /**
   * Update page content with merged results from multiple retailers
   * SUB-ISSUE 1.3 FIX: Now uses client-side pagination for merged results
   */
  updatePageContentWithMergedResults(combinedProducts, totalCount, hasPagination) {
    console.log('=== UPDATING PAGE WITH MERGED RESULTS (WITH PAGINATION) ===');
    console.log('Products to display:', combinedProducts.length);
    console.log('Total count:', totalCount);
    
    try {
      // DAWN ARCHITECTURE PRESERVATION: Find Dawn's collection container structure
      const collectionContainer = document.querySelector('.collection');
      const productGrid = document.querySelector('#product-grid');
      
      if (productGrid) {
        console.log('=== PRESERVING DAWN GRID STRUCTURE ===');
        console.log('Grid classes before update:', productGrid.className);
        
        // CRITICAL FIX 1: Ensure Dawn's page-width container constraint (SUB-ISSUE 1.1 FIX)
        if (collectionContainer) {
          if (!collectionContainer.classList.contains('page-width')) {
            collectionContainer.classList.add('page-width');
            console.log('✅ SUB-ISSUE 1.1 FIX: Added page-width class to collection container');
          }
          
          const collectionContent = collectionContainer.parentElement;
          if (collectionContent && !collectionContent.classList.contains('page-width')) {
            collectionContent.classList.add('page-width');
            console.log('✅ SUB-ISSUE 1.1 FIX: Added page-width class to collection content wrapper');
          }
        }
        
        // CRITICAL FIX 2: Ensure proper Dawn grid classes are maintained
        if (!productGrid.className.includes('grid product-grid')) {
          productGrid.className = 'grid product-grid grid--2-col-tablet-down grid--4-col-desktop';
          console.log('✅ GRID FIX: Applied proper Dawn grid classes to prevent layout collapse');
        }
        
        // SUB-ISSUE 1.3 FIX: Initialize client-side pagination for merged results
        if (combinedProducts.length > 0) {
          console.log('=== INITIALIZING CLIENT-SIDE PAGINATION ===');
          
          // Initialize or get existing pagination instance
          if (!this.clientPagination) {
            this.clientPagination = new window.ClientSidePagination();
          }
          
          // Initialize pagination with all products
          this.clientPagination.initialize(combinedProducts, totalCount);
          
          console.log('✅ SUB-ISSUE 1.3 FIX: Client-side pagination initialized');
          console.log(`✅ Total pages: ${this.clientPagination.getCurrentPageInfo().totalPages}`);
          
        } else {
          // No products found - show empty state
          productGrid.innerHTML = '<li class="grid__item"><p>No products found matching your filters.</p></li>';
          
          // Hide pagination for empty results
          const paginationElement = document.querySelector('.pagination-wrapper');
          if (paginationElement) {
            paginationElement.style.display = 'none';
          }
        }
        
      } else {
        console.error('Product grid container not found');
      }
      
      // CRITICAL FIX 4: Update product count using Dawn's existing structure
      this.updateProductCountDawnNative(totalCount);
      
      // CRITICAL FIX 5: Ensure proper Dawn spacing between filter pills and grid
      this.ensureDawnSpacing();
      
      // Apply comprehensive image standardization after content update
      // Delay to ensure DOM is fully updated with preserved structure
      setTimeout(() => {
        this.applyImageStandardization();
      }, 150);
      
      console.log('✅ Merged results with pagination updated successfully');
    } catch (error) {
      console.error('Error updating merged results with pagination:', error);
    }
    
    console.log('=== END UPDATING PAGE WITH MERGED RESULTS ===');
  }

  /**
   * Update product count using Dawn's native structure (DAWN ARCHITECTURE PRESERVATION)
   */
  updateProductCountDawnNative(count) {
    console.log('=== UPDATING PRODUCT COUNT USING DAWN NATIVE STRUCTURE ===');
    console.log('Product count:', count + ' products');
    
    // DAWN PRESERVATION: Target the exact element that aligns with Sort by dropdown
    // This is the horizontal layout product count that sits in the same row as the sort dropdown
    const productCountSpan = document.querySelector('#ProductCountDesktop');
    if (productCountSpan) {
      productCountSpan.textContent = `${count} products`;
      console.log('✅ Dawn native product count updated (horizontal layout):', count + ' products');
      return;
    }
    
    // Fallback: Look for the product count text container
    const productCountText = document.querySelector('.product-count .product-count__text');
    if (productCountText) {
      // Update the span inside the text container
      let span = productCountText.querySelector('span');
      if (!span) {
        span = document.createElement('span');
        span.id = 'ProductCountDesktop';
        productCountText.appendChild(span);
      }
      span.textContent = `${count} products`;
      
      // Apply Dawn styling to the h2 element
      productCountText.style.fontSize = '1.4rem';
      productCountText.style.lineHeight = 'calc(1 + 0.5 / var(--font-body-scale))';
      productCountText.style.margin = '0';
      
      console.log('✅ Dawn native product count updated (created span with styling):', count + ' products');
      return;
    }
    
    // Additional fallback: Look for vertical layout product count
    const productCountVertical = document.querySelector('.product-count-vertical .product-count__text #ProductCountDesktop');
    if (productCountVertical) {
      productCountVertical.textContent = `${count} products`;
      console.log('✅ Dawn native product count updated (vertical layout):', count + ' products');
      return;
    }
    
    console.log('⚠️ No Dawn product count element found, using generic update');
    this.updateProductCount(count);
    
    console.log('=== END UPDATING PRODUCT COUNT ===');
  }

  /**
   * Update product count displays (LEGACY - for fallback only)
   */
  updateProductCount(count) {
    console.log('Product count updated:', count + ' products');
    
    // Update main product count heading
    const productCountHeading = document.querySelector('h2[class*="product"], .collection__title, [data-product-count]');
    if (productCountHeading) {
      productCountHeading.textContent = `${count} products`;
      console.log('Main count heading updated:', count + ' products');
    }
    
    // Update status elements
    const statusElements = document.querySelectorAll('status, [role="status"], .facets__summary');
    statusElements.forEach(element => {
      if (element.textContent.includes('product')) {
        element.textContent = `${count} products`;
        console.log('Status element updated:', count + ' products');
      }
    });
  }
  
  /**
   * Show loading state
   */
  showLoadingState() {
    console.log('=== SHOWING LOADING STATE ===');
    const productGrid = document.querySelector('#product-grid, .collection');
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
    const productGrid = document.querySelector('#product-grid, .collection');
    console.log('Product grid found for hiding loading state:', !!productGrid);
    if (productGrid) {
      productGrid.style.opacity = '1';
      productGrid.style.pointerEvents = 'auto';
      console.log('Loading state removed: opacity=1, pointerEvents=auto');
    } else {
      console.error('Product grid not found for hiding loading state!');
    }
    
    // CRITICAL FIX: Also manage Dawn's native loading overlay
    const collectionContainer = document.querySelector('.collection');
    console.log('Collection container found for removing loading class:', !!collectionContainer);
    if (collectionContainer) {
      collectionContainer.classList.remove('loading');
      console.log('Dawn loading class removed from collection container');
    } else {
      console.error('Collection container not found for removing loading class!');
    }
    
    // ADDITIONAL FAILSAFE: Directly hide the loading overlay element
    const loadingOverlay = document.querySelector('.loading-overlay');
    console.log('Loading overlay element found:', !!loadingOverlay);
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
      console.log('Loading overlay directly hidden with display: none');
    } else {
      console.log('No loading overlay element found to hide');
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
      
      console.log('✅ State synchronized with URL');
      return true;
    }
    
    console.log('✅ URL state already synchronized');
    return false;
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
    console.log('=== UPDATING PAGE CONTENT (SINGLE RETAILER) ===');
    console.log('Product count:', productCount);
    console.log('Has pagination:', hasPagination);
    
    try {
      // SUB-ISSUE 1.3 FIX: Cleanup client-side pagination when switching to single retailer
      if (this.clientPagination) {
        this.clientPagination.destroy();
        this.clientPagination = null;
        console.log('✅ SUB-ISSUE 1.3 FIX: Client-side pagination cleaned up for single retailer');
      }
      
      // DAWN ARCHITECTURE PRESERVATION: Find the main product grid container
      const mainContent = document.querySelector('#product-grid');
      if (mainContent && html) {
        // Parse the HTML response to extract the new product items
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newProductGrid = doc.querySelector('#product-grid');
        
        if (newProductGrid) {
          const newItems = newProductGrid.querySelectorAll('li.grid__item');
          
          console.log(`Found ${newItems.length} new product items to insert`);
          console.log('Preserving Dawn grid classes:', mainContent.className);
          
          // Clear existing items while preserving the ul.grid container
          mainContent.innerHTML = '';
          
          // Insert new items while maintaining Dawn's structure AND size standardization
          newItems.forEach(item => {
            const clonedItem = item.cloneNode(true);
            
            // CRITICAL: Preserve Dawn's image size standardization
            // Find all card elements that should have the --ratio-percent property
            const cardElements = clonedItem.querySelectorAll('.card, .card__inner');
            cardElements.forEach(cardEl => {
              // Ensure portrait ratio is applied (0.8 ratio = 125% height)
              if (!cardEl.style.getPropertyValue('--ratio-percent')) {
                cardEl.style.setProperty('--ratio-percent', '125%');
                console.log('Applied portrait ratio to card element');
              }
            });
            
            mainContent.appendChild(clonedItem);
          });
          
          console.log('✅ Product grid updated while preserving Dawn architecture');
          console.log('✅ Dawn grid classes maintained:', mainContent.className);
          console.log('✅ Image size standardization preserved');
        } else {
          console.error('Could not find product grid in response');
        }
      } else {
        console.error('Main product grid container not found');
      }
      
      // Update product count displays
      this.updateProductCount(productCount);
      
      // Apply comprehensive image standardization after content update
      // Delay to ensure DOM is fully updated with preserved structure
      setTimeout(() => {
        this.applyImageStandardization();
      }, 150);
      
      console.log('Page content updated successfully with Dawn architecture preservation');
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
   * Ensure proper Dawn spacing between filter pills and product grid (DAWN ARCHITECTURE PRESERVATION)
   */
  ensureDawnSpacing() {
    console.log('=== ENSURING DAWN SPACING STRUCTURE ===');
    
    try {
      // Find Dawn's active facets container and product grid container
      const activeFacets = document.querySelector('.active-facets');
      const productGridContainer = document.querySelector('.product-grid-container, #ProductGridContainer');
      
      if (activeFacets && productGridContainer) {
        // Ensure Dawn's native margin-bottom is preserved on active facets
        // Dawn typically uses 1.5rem to 2rem spacing between facets and grid
        if (!activeFacets.style.marginBottom) {
          activeFacets.style.marginBottom = '2rem';
          console.log('✅ SPACING FIX: Applied Dawn native spacing below filter pills');
        }
        
        // Ensure the product grid container has proper top spacing
        if (!productGridContainer.style.marginTop) {
          productGridContainer.style.marginTop = '1rem';
          console.log('✅ SPACING FIX: Applied Dawn native spacing above product grid');
        }
      } else {
        console.log('⚠️ Dawn spacing elements not found - using fallback spacing');
        
        // Fallback: Apply spacing to the product grid directly
        const productGrid = document.querySelector('#product-grid');
        if (productGrid && !productGrid.style.marginTop) {
          productGrid.style.marginTop = '2rem';
          console.log('✅ SPACING FIX: Applied fallback spacing to product grid');
        }
      }
      
    } catch (error) {
      console.error('Error ensuring Dawn spacing:', error);
    }
    
    console.log('=== END ENSURING DAWN SPACING ===');
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
}

// Initialize the Ajax filters system
console.log('Ajax Filters JavaScript loading...');
new AjaxFilters(); 
console.log('Ajax Filters JavaScript loaded successfully'); 