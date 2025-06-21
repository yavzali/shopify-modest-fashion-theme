/**
 * Client-Side Pagination for Merged Results
 * Preserves Dawn's pagination structure and styling while enabling pagination for merged multi-retailer results
 * 
 * DAWN ARCHITECTURE PRESERVATION:
 * - Uses Dawn's exact pagination HTML structure from snippets/pagination.liquid
 * - Maintains Dawn's pagination CSS classes and styling
 * - Preserves Dawn's responsive grid system
 * - Integrates with existing Sub-Issue 1.1 and 1.2 fixes
 */

class ClientSidePagination {
  constructor() {
    this.currentPage = 1;
    this.productsPerPage = 16; // Dawn's default
    this.allProducts = [];
    this.totalProducts = 0;
    this.totalPages = 0;
    
    console.log('ClientSidePagination initialized');
  }

  /**
   * Initialize pagination with merged results
   * @param {Array} products - Array of product objects with .element property
   * @param {number} totalCount - Total number of products
   */
  initialize(products, totalCount) {
    console.log('=== INITIALIZING CLIENT-SIDE PAGINATION ===');
    console.log('Total products (display count):', totalCount);
    console.log('Unique products (actual):', products ? products.length : 0);
    console.log('Products per page:', this.productsPerPage);
    
    this.allProducts = products || [];
    this.totalProducts = totalCount || this.allProducts.length;
    
    // CRITICAL FIX: Base pagination on ACTUAL unique products, not display count
    // This ensures pagination works for ANY filter combination
    this.totalPages = Math.ceil(this.allProducts.length / this.productsPerPage);
    this.currentPage = 1;
    
    console.log('FIXED: Total pages calculated based on unique products:', this.totalPages);
    console.log(`FIXED: Can paginate ${this.allProducts.length} unique products into ${this.totalPages} pages`);
    
    // Show first page
    this.showPage(1);
    
    // Render pagination controls
    this.renderPaginationControls();
    
    console.log('=== CLIENT-SIDE PAGINATION INITIALIZED ===');
  }

  /**
   * Display products for a specific page
   * @param {number} pageNumber - Page number to display
   */
  showPage(pageNumber) {
    console.log(`=== SHOWING PAGE ${pageNumber} ===`);
    
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      console.warn('Invalid page number:', pageNumber);
      return;
    }
    
    this.currentPage = pageNumber;
    
    // CRITICAL FIX: Calculate product range for ANY filter combination
    const startIndex = (pageNumber - 1) * this.productsPerPage;
    
    // CRITICAL FIX: Check if we're beyond the actual array length
    if (startIndex >= this.allProducts.length) {
      console.error(`Page ${pageNumber} is beyond available products. startIndex=${startIndex}, allProducts.length=${this.allProducts.length}`);
      // Show empty page with message
      this.updateProductGrid([]);
      this.renderPaginationControls();
      return;
    }
    
    // CRITICAL FIX: Ensure we don't slice beyond actual array length
    const actualEndIndex = Math.min(startIndex + this.productsPerPage, this.allProducts.length);
    const pageProducts = this.allProducts.slice(startIndex, actualEndIndex);
    
    // CRITICAL FIX: Show actual products being displayed
    const actualDisplayEnd = startIndex + pageProducts.length;
    console.log(`FIXED: Showing products ${startIndex + 1}-${actualDisplayEnd} of ${this.totalProducts} (${pageProducts.length} products on this page)`);
    console.log(`DEBUG: startIndex=${startIndex}, actualEndIndex=${actualEndIndex}, allProducts.length=${this.allProducts.length}, totalProducts=${this.totalProducts}`);
    
    // Update the product grid with page products
    this.updateProductGrid(pageProducts);
    
    // Update pagination controls
    this.updatePaginationControls();
    
    // Update product count to show current page info
    this.updateProductCountForPage();
    
    // Scroll to top of product grid
    this.scrollToProductGrid();
    
    console.log(`=== PAGE ${pageNumber} DISPLAYED ===`);
  }

  /**
   * Update the product grid with current page products
   * Preserves Dawn's grid structure and Sub-Issue 1.1/1.2 fixes
   */
  updateProductGrid(pageProducts) {
    console.log('=== UPDATING PRODUCT GRID FOR CURRENT PAGE ===');
    
    const productGrid = document.querySelector('#product-grid');
    const collectionContainer = document.querySelector('.collection');
    
    if (!productGrid) {
      console.error('Product grid not found');
      return;
    }
    
    // PRESERVE SUB-ISSUE 1.1 FIX: Ensure Dawn's page-width container constraint
    if (collectionContainer && !collectionContainer.classList.contains('page-width')) {
      collectionContainer.classList.add('page-width');
      console.log('✅ SUB-ISSUE 1.1 FIX: Maintained page-width class');
    }
    
    // PRESERVE DAWN GRID CLASSES: Ensure proper Dawn grid classes are maintained
    if (!productGrid.className.includes('grid product-grid')) {
      productGrid.className = 'grid product-grid grid--2-col-tablet-down grid--4-col-desktop';
      console.log('✅ GRID FIX: Maintained proper Dawn grid classes');
    }
    
    // Clear existing items
    productGrid.innerHTML = '';
    
    // Add products for current page
    pageProducts.forEach((product, index) => {
      if (product && product.element) {
        // Parse the product HTML to extract the grid item
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = product.element;
        
        // Look for existing grid item or create one
        let gridItem = tempDiv.querySelector('li.grid__item');
        if (!gridItem) {
          // Create a proper Dawn grid item structure
          gridItem = document.createElement('li');
          gridItem.className = 'grid__item scroll-trigger animate--slide-in';
          gridItem.setAttribute('data-cascade', '');
          gridItem.style.setProperty('--animation-order', index + 1);
          
          // Move the product content into the grid item
          const productContent = tempDiv.firstElementChild;
          if (productContent) {
            gridItem.appendChild(productContent);
          }
        }
        
        // PRESERVE SUB-ISSUE 1.2 FIX: Maintain Dawn's image size standardization
        const cardElements = gridItem.querySelectorAll('.card, .card__inner');
        cardElements.forEach(cardEl => {
          if (!cardEl.style.getPropertyValue('--ratio-percent')) {
            cardEl.style.setProperty('--ratio-percent', '125%');
          }
        });
        
        // Append the properly structured grid item
        productGrid.appendChild(gridItem);
      }
    });
    
    console.log(`✅ Product grid updated with ${pageProducts.length} products`);
    console.log('✅ Dawn architecture and existing fixes preserved');
  }

  /**
   * Render Dawn's pagination controls
   * Uses exact structure from snippets/pagination.liquid
   */
  renderPaginationControls() {
    console.log('=== RENDERING PAGINATION CONTROLS ===');
    
    if (this.totalPages <= 1) {
      // Hide pagination if only one page
      const existingPagination = document.querySelector('.pagination-wrapper');
      if (existingPagination) {
        existingPagination.style.display = 'none';
      }
      return;
    }
    
    // CRITICAL FIX: Ensure pagination CSS is loaded
    this.ensurePaginationCSSLoaded();
    
    // Find or create pagination container
    let paginationContainer = document.querySelector('.pagination-wrapper');
    const productGrid = document.querySelector('#product-grid');
    
    if (!paginationContainer && productGrid) {
      // Create pagination container after product grid
      paginationContainer = document.createElement('div');
      paginationContainer.className = 'pagination-wrapper';
      paginationContainer.setAttribute('data-page', this.currentPage);
      productGrid.parentNode.insertBefore(paginationContainer, productGrid.nextSibling);
    }
    
    if (!paginationContainer) {
      console.error('Could not create pagination container');
      return;
    }
    
    // Generate Dawn's pagination HTML structure
    const paginationHTML = this.generateDawnPaginationHTML();
    paginationContainer.innerHTML = paginationHTML;
    paginationContainer.style.display = 'block';
    
    // Add event listeners with delegation
    this.addPaginationEventListeners();
    
    console.log('✅ Dawn pagination controls rendered');
    console.log('Current page:', this.currentPage, 'Total pages:', this.totalPages);
  }

  /**
   * Ensure pagination CSS is loaded
   * CRITICAL: Inject CSS directly since external file loading may fail
   */
  ensurePaginationCSSLoaded() {
    // Check if pagination CSS is already injected
    if (document.querySelector('#client-pagination-css')) {
      console.log('✅ Pagination CSS already loaded');
      return;
    }
    
    // Inject CSS directly to ensure it loads immediately
    const style = document.createElement('style');
    style.id = 'client-pagination-css';
    style.textContent = `
      .pagination-wrapper {
        margin-top: 4rem;
      }
      
      @media screen and (min-width: 990px) {
        .pagination-wrapper {
          margin-top: 5rem;
        }
      }
      
      .pagination__list {
        display: flex !important;
        flex-wrap: wrap;
        justify-content: center;
        list-style: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .pagination__list > li {
        flex: 1 0 4.4rem;
        max-width: 4.4rem;
        display: block !important;
      }
      
      .pagination__list > li:not(:last-child) {
        margin-right: 1rem;
      }
      
      .pagination__item {
        color: rgb(var(--color-foreground));
        display: inline-flex !important;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 4.4rem;
        width: 100%;
        padding: 0;
        text-decoration: none;
      }
      
      a.pagination__item:hover::after {
        height: 0.1rem;
      }
      
      .pagination__item .icon-caret {
        height: 0.6rem;
      }
      
      .pagination__item--current::after {
        height: 0.1rem;
      }
      
      .pagination__item--current::after,
      .pagination__item:hover::after {
        content: '';
        display: block;
        width: 2rem;
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        background-color: currentColor;
      }
      
      .pagination__item--next .icon {
        margin-left: -0.2rem;
        transform: rotate(90deg);
      }
      
      .pagination__item--next:hover .icon {
        transform: rotate(90deg) scale(1.07);
      }
      
      .pagination__item--prev .icon {
        margin-right: -0.2rem;
        transform: rotate(-90deg);
      }
      
      .pagination__item--prev:hover .icon {
        transform: rotate(-90deg) scale(1.07);
      }
      
      .pagination__item-arrow:hover::after {
        display: none;
      }
    `;
    
    document.head.appendChild(style);
    console.log('✅ Pagination CSS injected directly');
  }

  /**
   * Generate Dawn's pagination HTML structure
   * Replicates the exact structure from snippets/pagination.liquid
   */
  generateDawnPaginationHTML() {
    const pages = this.generatePageNumbers();
    let html = `
      <nav class="pagination" role="navigation" aria-label="Pagination">
        <ul class="pagination__list list-unstyled" role="list">
    `;
    
    // Previous button
    if (this.currentPage > 1) {
      html += `
        <li>
          <a href="#" 
             class="pagination__item pagination__item--next pagination__item-arrow link motion-reduce"
             data-page="${this.currentPage - 1}"
             aria-label="Previous page">
            <span class="svg-wrapper">
              <svg viewBox="0 0 10 6" class="icon icon-caret">
                <path fill-rule="evenodd" clip-rule="evenodd" d="m9 5-4-4-4 4h8z" fill="currentColor">
              </svg>
            </span>
          </a>
        </li>
      `;
    }
    
    // Page numbers
    pages.forEach(page => {
      if (page === '...') {
        html += `<li><span class="pagination__item">...</span></li>`;
      } else if (page === this.currentPage) {
        html += `
          <li>
            <a role="link" 
               aria-disabled="true" 
               class="pagination__item pagination__item--current light" 
               aria-current="page"
               aria-label="Page ${page}">
              ${page}
            </a>
          </li>
        `;
      } else {
        html += `
          <li>
            <a href="#" 
               class="pagination__item link" 
               data-page="${page}"
               aria-label="Page ${page}">
              ${page}
            </a>
          </li>
        `;
      }
    });
    
    // Next button
    if (this.currentPage < this.totalPages) {
      html += `
        <li>
          <a href="#" 
             class="pagination__item pagination__item--prev pagination__item-arrow link motion-reduce"
             data-page="${this.currentPage + 1}"
             aria-label="Next page">
            <span class="svg-wrapper">
              <svg viewBox="0 0 10 6" class="icon icon-caret">
                <path fill-rule="evenodd" clip-rule="evenodd" d="m1 1 4 4 4-4H1z" fill="currentColor">
              </svg>
            </span>
          </a>
        </li>
      `;
    }
    
    html += `
        </ul>
      </nav>
    `;
    
    return html;
  }

  /**
   * Generate page numbers array with ellipsis logic
   * Similar to Shopify's pagination logic
   */
  generatePageNumbers() {
    const pages = [];
    const maxVisible = 7; // Maximum visible page numbers
    
    if (this.totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex logic for ellipsis
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < this.totalPages) {
        if (end < this.totalPages - 1) pages.push('...');
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  /**
   * Add event listeners to pagination controls
   * Uses event delegation for better performance and reliability
   */
  addPaginationEventListeners() {
    // Remove existing listeners first
    const paginationWrapper = document.querySelector('.pagination-wrapper');
    if (!paginationWrapper) return;
    
    // Remove existing event listener if any
    if (this.paginationClickHandler) {
      paginationWrapper.removeEventListener('click', this.paginationClickHandler);
    }
    
    // Create new click handler with proper binding
    this.paginationClickHandler = (e) => {
      // Find the clicked pagination item
      const clickedItem = e.target.closest('.pagination__item[data-page]');
      if (!clickedItem) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const pageNumber = parseInt(clickedItem.getAttribute('data-page'));
      console.log('Pagination click detected:', pageNumber, 'Current page:', this.currentPage);
      
      if (pageNumber && pageNumber !== this.currentPage && pageNumber >= 1 && pageNumber <= this.totalPages) {
        console.log('Navigating to page:', pageNumber);
        this.showPage(pageNumber);
      }
    };
    
    // Add event listener with delegation
    paginationWrapper.addEventListener('click', this.paginationClickHandler);
    
    console.log('✅ Pagination event listeners added');
  }

  /**
   * Update pagination controls for current page
   */
  updatePaginationControls() {
    const paginationContainer = document.querySelector('.pagination-wrapper');
    if (paginationContainer && this.totalPages > 1) {
      paginationContainer.setAttribute('data-page', this.currentPage);
      
      // Re-render pagination to update current page styling
      const paginationHTML = this.generateDawnPaginationHTML();
      paginationContainer.innerHTML = paginationHTML;
      
      // Re-add event listeners
      this.addPaginationEventListeners();
    }
  }

  /**
   * Update product count to show current page information
   * CRITICAL FIX: Works for ANY filter combination
   */
  updateProductCountForPage() {
    const startProduct = (this.currentPage - 1) * this.productsPerPage + 1;
    
    // CRITICAL FIX: Calculate actual end product based on what's actually displayed
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const actualProductsOnPage = Math.min(this.productsPerPage, this.allProducts.length - startIndex);
    const endProduct = startProduct + actualProductsOnPage - 1;
    
    // Update Dawn's product count element
    const productCountSpan = document.querySelector('#ProductCountDesktop');
    if (productCountSpan) {
      productCountSpan.textContent = `${this.totalProducts} products`;
    }
    
    console.log(`FIXED: Showing products ${startProduct}-${endProduct} of ${this.totalProducts} (${actualProductsOnPage} products on this page)`);
  }

  /**
   * Scroll to product grid when page changes
   */
  scrollToProductGrid() {
    const productGrid = document.querySelector('#product-grid');
    if (productGrid) {
      // Smooth scroll to top of product grid
      productGrid.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  /**
   * Get current page info
   */
  getCurrentPageInfo() {
    return {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalProducts: this.totalProducts,
      productsPerPage: this.productsPerPage
    };
  }

  /**
   * Destroy pagination (for cleanup)
   */
  destroy() {
    const paginationContainer = document.querySelector('.pagination-wrapper');
    if (paginationContainer) {
      // Remove event listeners
      if (this.paginationClickHandler) {
        paginationContainer.removeEventListener('click', this.paginationClickHandler);
        this.paginationClickHandler = null;
      }
      paginationContainer.style.display = 'none';
    }
    
    this.allProducts = [];
    this.totalProducts = 0;
    this.totalPages = 0;
    this.currentPage = 1;
    
    console.log('Client-side pagination destroyed');
  }
}

// Export for use in other modules
window.ClientSidePagination = ClientSidePagination; 