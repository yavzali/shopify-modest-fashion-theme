/**
 * Phase 2A: Ajax Infrastructure + Retailer Filter - INLINE VERSION
 * 
 * This system provides Ajax functionality for the inline retailer filter.
 * The filter HTML is now inline in the facets.liquid template.
 */

class AjaxFilters {
  constructor() {
    this.activeFilters = new Map();
    this.isLoading = false;
    
    // Initialize immediately - filter is inline in template
    this.init();
  }
  
  /**
   * Initialize the Ajax filters system
   */
  init() {
    console.log('AjaxFilters: Initializing with inline filter...');
    
    // Check if we're on a collection page
    if (!window.location.pathname.includes('/collections/')) {
      console.log('AjaxFilters: Not on collection page, skipping initialization');
      return;
    }
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Update filter state based on current URL
    this.updateFilterStateFromURL();
    
    console.log('AjaxFilters: Initialization complete');
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Use event delegation for better performance and dynamic content handling
    document.addEventListener('change', (e) => {
      if (e.target.matches('#Details-retailer-filter input[type="checkbox"]')) {
        this.handleRetailerFilterChange(e);
      }
      
      // Handle sort dropdown changes
      if (e.target.matches('#SortBy')) {
        this.handleSortChange(e);
      }
    });

    // Handle summary clicks for retailer filter
    document.addEventListener('click', (e) => {
      if (e.target.closest('#Details-retailer-filter summary')) {
        this.updateRetailerFilterState();
      }
    });
    
    console.log('Event listeners set up successfully');
  }
  
  /**
   * Update filter state from current URL
   */
  updateFilterStateFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const retailerTags = urlParams.getAll('filter.p.tag');
    
    if (retailerTags.length > 0) {
      this.activeFilters.set('retailer', retailerTags);
      
      // Update checkboxes to reflect current state
      retailerTags.forEach(tag => {
        const checkbox = document.querySelector(`#Details-retailer-filter input[value="${tag}"]`);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.closest('.facet-checkbox').classList.add('active');
        }
      });
      
      // Update the filter summary
      this.updateRetailerFilterState();
    }
    
    console.log('Filter state updated from URL:', this.activeFilters);
  }
  
  /**
   * Handle retailer filter checkbox changes
   */
  handleRetailerFilterChange(event) {
    const checkbox = event.target;
    const retailerKey = checkbox.value;
    
    console.log('Retailer filter changed:', retailerKey, checkbox.checked);
    
    // Update active filters
    if (!this.activeFilters.has('retailer')) {
      this.activeFilters.set('retailer', []);
    }
    
    const activeRetailers = this.activeFilters.get('retailer');
    
    if (checkbox.checked) {
      if (!activeRetailers.includes(retailerKey)) {
        activeRetailers.push(retailerKey);
      }
      checkbox.closest('.facet-checkbox').classList.add('active');
    } else {
      const index = activeRetailers.indexOf(retailerKey);
      if (index > -1) {
        activeRetailers.splice(index, 1);
      }
      checkbox.closest('.facet-checkbox').classList.remove('active');
    }
    
    // Clean up empty arrays
    if (activeRetailers.length === 0) {
      this.activeFilters.delete('retailer');
    }
    
    // Update UI and perform Ajax request
    this.updateRetailerFilterState();
    this.performAjaxFilter();
  }
  
  /**
   * Update retailer filter UI state
   */
  updateRetailerFilterState() {
    const retailerFilters = this.activeFilters.get('retailer') || [];
    const count = retailerFilters.length;
    
    // Update the summary label
    const summary = document.querySelector('#Details-retailer-filter summary');
    if (summary) {
      const selectedSpan = summary.querySelector('.facets__selected');
      
      if (selectedSpan) {
        if (count > 0) {
          selectedSpan.textContent = `(${count})`;
          selectedSpan.classList.remove('hidden');
          summary.setAttribute('aria-label', `Retailer (${count} filter${count > 1 ? 's' : ''} selected)`);
        } else {
          selectedSpan.textContent = '(0)';
          selectedSpan.classList.add('hidden');
          summary.setAttribute('aria-label', 'Retailer (0 filter selected)');
        }
      }
    }
    
    console.log('Retailer filter state updated:', count, 'filters active');
  }
  
  /**
   * Perform Ajax filtering request
   */
  async performAjaxFilter() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.showLoadingState();
    
    try {
      const filterParams = [];
      
      // Add retailer filters
      const retailerFilters = this.activeFilters.get('retailer');
      if (retailerFilters && retailerFilters.length > 0) {
        retailerFilters.forEach(retailer => {
          filterParams.push(`filter.p.tag=${retailer}`);
        });
      }
      
      // Get current sort parameter
      const currentSort = new URLSearchParams(window.location.search).get('sort_by');
      if (currentSort) {
        filterParams.push(`sort_by=${currentSort}`);
      }
      
      // Build filter URL
      const filterUrl = `/collections/all${filterParams.length > 0 ? '?' + filterParams.join('&') : ''}`;
      
      console.log('Performing Ajax filter request:', filterUrl);
      
      // Update URL
      window.history.pushState({}, '', filterUrl);
      
      // Fetch new content
      const response = await fetch(`${filterUrl}&section_id=main-collection-product-grid`);
      const html = await response.text();
      
      // Parse the response and update the product grid
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newProductGrid = doc.querySelector('#product-grid');
      const currentProductGrid = document.querySelector('#product-grid');
      
      if (newProductGrid && currentProductGrid) {
        currentProductGrid.innerHTML = newProductGrid.innerHTML;
      }
      
      console.log('Ajax filter request completed');
      
    } catch (error) {
      console.error('Ajax filter error:', error);
    } finally {
      this.isLoading = false;
      this.hideLoadingState();
    }
  }
  
  /**
   * Show loading state
   */
  showLoadingState() {
    const productGrid = document.querySelector('#product-grid');
    if (productGrid) {
      productGrid.style.opacity = '0.5';
      productGrid.style.pointerEvents = 'none';
    }
    
    // Show loading spinner if it exists
    const loadingSpinner = document.querySelector('.loading-spinner, .loading-overlay');
    if (loadingSpinner) {
      loadingSpinner.style.display = 'block';
    }
  }
  
  /**
   * Hide loading state
   */
  hideLoadingState() {
    const productGrid = document.querySelector('#product-grid');
    if (productGrid) {
      productGrid.style.opacity = '1';
      productGrid.style.pointerEvents = 'auto';
    }
    
    // Hide loading spinner
    const loadingSpinner = document.querySelector('.loading-spinner, .loading-overlay');
    if (loadingSpinner) {
      loadingSpinner.style.display = 'none';
    }
  }
  
  /**
   * Handle sort dropdown changes
   */
  handleSortChange(event) {
    const sortValue = event.target.value;
    console.log('Sort changed to:', sortValue);
    
    // Update URL with new sort parameter
    const url = new URL(window.location);
    url.searchParams.set('sort_by', sortValue);
    
    // Preserve existing filters
    const retailerFilters = this.activeFilters.get('retailer');
    if (retailerFilters && retailerFilters.length > 0) {
      url.searchParams.delete('filter.p.tag');
      retailerFilters.forEach(retailer => {
        url.searchParams.append('filter.p.tag', retailer);
      });
    }
    
    // Navigate to new URL
    window.location.href = url.toString();
  }
}

// Initialize the Ajax filters system
new AjaxFilters(); 