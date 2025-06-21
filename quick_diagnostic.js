// Quick Diagnostic Script for Ajax Filters Investigation - SIMPLIFIED SYSTEM TEST
console.log('🔍 TESTING SIMPLIFIED AJAX FILTERS SYSTEM');

// Test 1: System Initialization
console.log('\n=== TEST 1: SYSTEM INITIALIZATION ===');
console.log('AjaxFilters class exists:', typeof AjaxFilters !== 'undefined');
console.log('Instance exists:', !!window.ajaxFiltersInstance);

if (window.ajaxFiltersInstance) {
    const instance = window.ajaxFiltersInstance;
    console.log('Initialized:', instance.initialized);
    console.log('Active filters:', JSON.stringify(instance.activeFilters));
    console.log('Is loading:', instance.isLoading);
    console.log('✅ No complex feature flags or state tracking');
}

// Test 2: DOM Elements Detection
console.log('\n=== TEST 2: DOM ELEMENTS ===');
const selectors = [
    '#Details-retailer-filter .facets__summary-label',
    '#Details-retailer-filter .facets__header .facets__selected', 
    '#Details-retailer-filter summary',
    '#ajax-filter-pills',
    '.active-facets.active-facets-desktop',
    'input[name="filter.p.tag"]'
];

selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    console.log(`${selector}: ${elements.length} found`);
});

// Test 3: Flicker Fix Test - Single Retailer
console.log('\n=== TEST 3: FLICKER FIX TEST - SINGLE RETAILER ===');
const checkbox = document.querySelector('input[name="filter.p.tag"]');
if (checkbox) {
    console.log('Found checkbox:', checkbox.value);
    console.log('Initial state:', checkbox.checked);
    
    // Test click
    const wasChecked = checkbox.checked;
    console.log('Simulating click...');
    checkbox.click();
    
    setTimeout(() => {
        console.log('After click state:', checkbox.checked);
        console.log('State changed:', wasChecked !== checkbox.checked);
        
        if (window.ajaxFiltersInstance) {
            console.log('Active filters after click:', JSON.stringify(window.ajaxFiltersInstance.activeFilters));
        }
        
        // Test flicker fix - single retailer should use Dawn's native handling
        setTimeout(() => {
            const summaryLabel = document.querySelector('#Details-retailer-filter .facets__summary-label .facets__selected');
            if (summaryLabel) {
                console.log('Filter button text:', summaryLabel.textContent);
                console.log('✅ UI should show filter count WITHOUT FLICKER');
            }
            
            const pillsContainer = document.querySelector('#ajax-filter-pills, .active-facets.active-facets-desktop');
            if (pillsContainer) {
                const pills = pillsContainer.querySelectorAll('.ajax-filter-pill');
                console.log('Filter pills found:', pills.length);
                console.log('✅ Pills should appear IMMEDIATELY without flicker');
                console.log('🎯 FLICKER TEST: Watch for smooth, immediate pill appearance');
            }
            
            // Test dropdown closing
            const dropdown = document.querySelector('#Details-retailer-filter');
            if (dropdown) {
                const isOpen = dropdown.hasAttribute('open');
                console.log('Dropdown open status:', isOpen);
                console.log('✅ Dropdown should be CLOSED after single retailer selection');
            }
        }, 100);
    }, 100);
} else {
    console.log('❌ No checkbox found');
}

// Test 4: Multi-Retailer Test
console.log('\n=== TEST 4: MULTI-RETAILER TEST ===');
setTimeout(() => {
    const checkboxes = document.querySelectorAll('input[name="filter.p.tag"]');
    if (checkboxes.length >= 2) {
        console.log('Testing multi-retailer selection...');
        
        // Select first checkbox if not already selected
        if (!checkboxes[0].checked) {
            console.log('Selecting first retailer:', checkboxes[0].value);
            checkboxes[0].click();
        }
        
        // Wait then select second checkbox
        setTimeout(() => {
            if (!checkboxes[1].checked) {
                console.log('Selecting second retailer:', checkboxes[1].value);
                checkboxes[1].click();
                
                setTimeout(() => {
                    if (window.ajaxFiltersInstance) {
                        console.log('Final active filters:', JSON.stringify(window.ajaxFiltersInstance.activeFilters));
                        console.log('✅ Should show multiple retailers with OR logic');
                    }
                }, 100);
            }
        }, 500);
    } else {
        console.log('Not enough checkboxes for multi-retailer test');
    }
}, 1000);

console.log('\n🔍 SIMPLIFIED SYSTEM TEST COMPLETE');
console.log('💡 Watch for UI updates and filter functionality');
console.log('💡 To run again: copy and paste this script in console'); 