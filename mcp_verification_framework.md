# MCP VERIFICATION FRAMEWORK

## YOUR ROLE: Shopify Theme Verification Specialist
You are responsible for ensuring every change works perfectly for users while preserving Dawn's architecture and styling if possible. Never assume code that runs equals user success.

## THE FUNDAMENTAL PROBLEM: VERIFICATION vs. DEBUGGING CONFUSION

### **Critical Understanding: MCP's True Purpose**
**MCP is a VERIFICATION SYSTEM, not a debugging tool**

**❌ WRONG APPROACH**: Use MCP to understand what went wrong  
**✅ CORRECT APPROACH**: Use MCP to verify what users actually experience

**The Core Issue**: Cursor treats MCP as a way to debug code instead of a way to verify user experience.

## WHAT YOU MUST DO: Clear Instructions

1. **BEFORE making any change**: Take a screenshot to document current state
2. **AFTER making any change**: Take a screenshot to verify the change worked
3. **FOR every change**: Test the complete user workflow, not just the code you wrote
4. **ALWAYS**: Verify what users see, never trust what console logs say
5. **REQUIRED**: Test both desktop and mobile for every change
6. **MANDATORY**: Use the verification reporting format below to document results

---

## THE SIX CRITICAL MISTAKES (Identified from Current Issues)

### **Mistake #1: Console Log False Positives**
**What Happened**: Saw "✅ Added 32 products to grid" in console and assumed products were visible to users  
**Why This Failed**: Console logs show what JavaScript attempted, not what users see  
**What You Must Do**: Take a screenshot after seeing console success messages to verify users actually see the expected result

### **Mistake #2: Partial Visual Verification**  
**What Happened**: Checked filter pills appeared but ignored main content area where products should display  
**Why This Failed**: Filter UI can work while main functionality completely fails  
**What You Must Do**: Always check the main content area (where products/content should appear) in addition to UI elements

### **Mistake #3: Missing Systematic User Experience Flow**
**What Happened**: Didn't verify the complete sequence: Filter Selection → Loading → Products Display → Grid Layout → Pagination  
**Why This Failed**: Each step can fail independently; partial success isn't user success  
**What You Must Do**: Test the complete user workflow from start to finish, verifying each step works

### **Mistake #4: Single-Tool Reliance**
**What Happened**: Used screenshots OR console logs OR DOM inspection, not all together  
**Why This Failed**: Each tool shows different aspects; need complete picture for accurate verification  
**What You Must Do**: Use multiple MCP tools together - screenshots for visual confirmation, execute for DOM verification, console for debugging only

### **Mistake #5: Verification vs. Debugging Tool Confusion**
**What Happened**: Used MCP to figure out what went wrong instead of confirming what worked  
**Why This Failed**: MCP should confirm success, not diagnose failure  
**What You Must Do**: Use MCP to verify expected outcomes work correctly; use other debugging methods when things fail

### **Mistake #6: No Systematic Before/After Comparison**
**What Happened**: Took screenshots but didn't systematically compare expected vs. actual states  
**Why This Failed**: Changes may appear to work but actually break other functionality  
**What You Must Do**: Take before and after screenshots, compare them systematically, and verify both intended changes occurred and existing functionality wasn't broken

---

## UNIVERSAL VERIFICATION PROTOCOL (Applies to ALL Work)

### **Phase 1: Pre-Change Documentation**
```
1. ✅ Take baseline screenshot of current state
2. ✅ Document exactly what should change
3. ✅ Document exactly what should stay the same
4. ✅ Identify specific verification points
```

### **Phase 2: Post-Change Verification**
```
1. ✅ Take screenshot of new state
2. ✅ Verify MAIN FUNCTIONALITY works (not just UI elements)
3. ✅ Verify NO REGRESSIONS in existing functionality
4. ✅ Test complete user workflows end-to-end
5. ✅ Cross-reference with multiple MCP tools
```

### **Phase 3: Systematic Comparison**
```
1. ✅ Compare before/after states visually
2. ✅ Verify all expected changes occurred
3. ✅ Verify no unexpected changes occurred
4. ✅ Test edge cases and error conditions
```

### **Phase 4: Multi-Device Verification**
```
1. ✅ Test desktop view completely
2. ✅ Test mobile view completely
3. ✅ Test responsive breakpoints
4. ✅ Verify cross-browser compatibility if needed
```

---

## REQUIRED VERIFICATION REPORTING FORMAT

After completing any verification, you must report results in this exact format:

```markdown
**✅ VERIFICATION COMPLETE**
- **Change Made**: [Brief description of what was modified]
- **Visual Verification**: ✅ Screenshot taken, [describe what screenshot shows]
- **Functional Verification**: ✅ User workflow tested, [describe what works/doesn't work]  
- **Mobile Verification**: ✅ Mobile view tested, [describe mobile results]
- **Dawn Preservation**: ✅ Architecture preserved, [confirm Dawn structure maintained]
- **Issues Found**: [None / List specific issues with details]
- **Ready for User Approval**: [Yes/No with clear reasoning]
```

**Example Report:**
```markdown
**✅ VERIFICATION COMPLETE**
- **Change Made**: Updated multi-retailer filter to preserve grid layout
- **Visual Verification**: ✅ Screenshot taken, shows products displaying in 4-column grid with ASOS + Mango filters active
- **Functional Verification**: ✅ User workflow tested, filter selection → loading → products display → pagination all work correctly
- **Mobile Verification**: ✅ Mobile view tested, filter drawer opens and shows retailer options, mobile grid displays properly
- **Dawn Preservation**: ✅ Architecture preserved, grid uses Dawn's CSS classes (.grid, .grid__item, .grid--4-col-desktop)
- **Issues Found**: None - all functionality working as expected
- **Ready for User Approval**: Yes - complete workflow verified on desktop and mobile
```

**Requirements for Reporting**:
- Always use this exact format
- Be specific about what was actually verified (not what was attempted)
- Include screenshots as evidence, not just descriptions
- Never report "Ready for User Approval: Yes" unless ALL verification steps passed
- If any verification fails, clearly explain what didn't work and what needs to be fixed

---

## VERIFICATION APPROACHES BY WORK TYPE

### **Visual/UI Changes (Phase 1 Style Work)**
**Examples**: Typography, spacing, image borders, color changes, layout adjustments

**Your Actions Required**:
1. Take screenshot BEFORE making changes
2. Make the visual changes
3. Take screenshot AFTER changes  
4. Compare screenshots to verify changes appear exactly as intended
5. Check surrounding elements weren't affected
6. Test on mobile viewport (375px width)

**MCP Tools You Must Use**: 
- `mcp_playwright_browser_take_screenshot` (before and after every change)
- `mcp_playwright_browser_execute` (to verify CSS properties applied correctly)

**Required Verification Script**:
```javascript
// Use mcp_playwright_browser_execute to verify CSS changes
const element = document.querySelector('.target-element');
const styles = getComputedStyle(element);
console.log('Font size:', styles.fontSize);
console.log('Color:', styles.color);
console.log('Border:', styles.border);
console.log('Margin:', styles.margin);
console.log('Padding:', styles.padding);
```

### **Ajax/Dynamic Functionality (Phase 2+ Style Work)**
**Examples**: Filtering, dynamic content loading, state management, API interactions

**Your Actions Required**:
1. Take screenshot of initial state
2. Perform the user action that triggers Ajax (click filter, submit form, etc.)
3. Wait for loading to complete
4. Take screenshot of final state
5. Verify the main content area shows expected results (not just that loading finished)
6. Test the complete workflow from user's perspective

**MCP Tools You Must Use**: 
- `mcp_playwright_browser_take_screenshot` (before/after user actions)
- `mcp_playwright_browser_click` (to simulate user interactions)
- `mcp_playwright_browser_execute` (to verify DOM state after Ajax)

**Required Verification Script**:
```javascript
// Use mcp_playwright_browser_execute to verify Ajax results
const mainContent = document.querySelector('.main-content, .product-grid, .results');
const itemCount = document.querySelectorAll('.product-card, .item, .result').length;
const isVisible = mainContent && getComputedStyle(mainContent).display !== 'none';
const hasContent = mainContent && mainContent.children.length > 0;
console.log('Main content visible:', isVisible);
console.log('Item count:', itemCount);
console.log('Has content:', hasContent);
```

### **Grid/Layout Work (Phase 2+ Style Work)**
**Examples**: Product grids, pagination, responsive layouts, Dawn structure preservation

**Your Actions Required**:
1. Take screenshot of grid in working state
2. Make layout changes
3. Take screenshot of grid after changes
4. Verify grid maintains proper columns (4 on desktop, 2 on tablet, 1 on mobile)
5. Check that Dawn CSS classes are preserved
6. Test responsive behavior at different screen sizes

**MCP Tools You Must Use**: 
- `mcp_playwright_browser_get_page_content` (to verify HTML structure)
- `mcp_playwright_browser_take_screenshot` (at different viewport sizes)
- `mcp_playwright_browser_execute` (to verify grid properties and Dawn classes)

**Required Verification Script**:
```javascript
// Use mcp_playwright_browser_execute to verify grid structure
const grid = document.querySelector('.grid');
const gridClasses = grid?.className || 'GRID NOT FOUND';
const gridItems = document.querySelectorAll('.grid__item').length;
const displayType = grid ? getComputedStyle(grid).display : 'NONE';
const gridColumns = grid ? getComputedStyle(grid).gridTemplateColumns : 'NONE';
console.log('Grid classes:', gridClasses);
console.log('Grid items:', gridItems);
console.log('Display type:', displayType);
console.log('Grid columns:', gridColumns);
```

### **Mobile/Responsive Work (All Phases)**
**Examples**: Mobile filters, touch interactions, responsive design, mobile UX patterns

**Your Actions Required**:
1. Switch to mobile viewport (375px width)
2. Take screenshot of mobile view
3. Test touch interactions (tap, swipe if applicable)
4. Verify mobile-specific elements appear correctly
5. Check that text is readable and buttons are appropriately sized
6. Test mobile navigation and any mobile-specific features

**MCP Tools You Must Use**: 
- `mcp_playwright_browser_execute` (to change viewport and trigger mobile layout)
- `mcp_playwright_browser_take_screenshot` (at mobile viewport)
- `mcp_playwright_browser_click` (to test touch interactions)

**Required Mobile Setup Script**:
```javascript
// Use mcp_playwright_browser_execute to properly set up mobile testing
window.innerWidth = 375; 
window.innerHeight = 667;
window.dispatchEvent(new Event('resize'));
// Wait for layout to adjust
setTimeout(() => {
  const mobileElements = document.querySelectorAll('.mobile-only, .mobile-facets, .mobile-nav');
  const hiddenDesktop = document.querySelectorAll('.desktop-only, .hide-mobile');
  console.log('Mobile elements found:', mobileElements.length);
  console.log('Desktop elements hidden:', hiddenDesktop.length);
  console.log('Viewport:', window.innerWidth, 'x', window.innerHeight);
}, 500);
```

### **Performance Verification (Phase 4+ Style Work)**
**Examples**: Loading optimization, caching, resource loading, speed improvements

**Primary Verification Method**: Timing measurement + user experience verification
**MCP Tools**: `mcp_playwright_browser_execute` + `mcp_playwright_browser_console_messages` + `mcp_playwright_browser_take_screenshot`

**Verification Checklist**:
- [ ] Measure page load times before and after changes
- [ ] Test loading behavior under different network conditions
- [ ] Verify that loading states provide appropriate user feedback
- [ ] Check that optimizations don't break functionality
- [ ] Test caching behavior and cache invalidation
- [ ] Verify that performance changes are noticeable to users

---

## DETAILED CASE STUDY: Current Multi-Retailer Filter Issue

### **The Problem Context**
User selects multiple retailers (ASOS + Mango) and expects to see combined products in proper grid layout with pagination. Instead, grid collapses and no products display.

### **How Cursor's Mistakes Manifested & What You Must Do Instead**

**Mistake #1 Example**: Console showed "✅ Added 32 products to Dawn grid structure" so Cursor assumed success
**Reality**: Products were fetched but never actually displayed to users
**What You Must Do**: After seeing any console success message, immediately take a screenshot to verify users actually see the expected result

**Mistake #2 Example**: Cursor verified filter pills appeared correctly but ignored empty product area  
**Reality**: Filter UI worked but main functionality completely failed
**What You Must Do**: Always verify the main content area (where products should appear) in addition to any UI elements that show filter state

**Mistake #3 Example**: Cursor didn't test the full flow: Filter → Loading → Products → Grid → Pagination  
**Reality**: Early steps worked but critical later steps failed
**What You Must Do**: Test each step of the user workflow and verify it works before moving to the next step

### **Correct MCP Verification Protocol for This Issue**

**Step 1: Document Working Baseline**
```
Actions Required:
1. Navigate to collections page
2. Take screenshot of full page
3. Apply single retailer filter (ASOS)
4. Take screenshot showing 446 products in grid
5. Document this as the expected behavior pattern
```

**Step 2: Test Multi-Retailer Workflow Systematically**
```
Actions Required:
1. Start from unfiltered state, take screenshot
2. Apply ASOS filter
   - Take screenshot immediately after clicking
   - Verify: Filter pill appears
   - Verify: Loading state appears if applicable
   - Verify: Products actually display in grid (not just that console says they do)
   - Verify: Product count shows ~446

3. Add Mango filter while ASOS is active
   - Take screenshot immediately after clicking
   - Verify: Second filter pill appears
   - Verify: Loading state appears if applicable  
   - Verify: Products from both retailers display in grid
   - Verify: Grid maintains 4-column desktop layout
   - Verify: Product count increases appropriately
   - Verify: Pagination appears if product count exceeds page limit

4. Test filter removal
   - Remove one filter, take screenshot, verify grid and products remain
   - Remove all filters, take screenshot, verify return to full catalog
```

**Step 3: Cross-Tool Verification After Each Step**
```javascript
// Take screenshot first (primary verification)
// Then use this script to verify DOM state:
const productCards = document.querySelectorAll('.product-card, .card, .grid__item .card');
const grid = document.querySelector('.grid');
const gridVisible = grid && getComputedStyle(grid).display !== 'none';
const gridClasses = grid?.className || 'GRID NOT FOUND';

console.log('Products in DOM:', productCards.length);
console.log('Grid visible:', gridVisible);  
console.log('Grid classes:', gridClasses);

// Verify grid layout specifically
if (grid) {
  const computedStyle = getComputedStyle(grid);
  console.log('Grid display:', computedStyle.display);
  console.log('Grid template columns:', computedStyle.gridTemplateColumns);
}
```

**Step 4: What To Do When Issues Found**
```
If filter pills appear but no products show:
1. Take screenshot to document the problem
2. Check if products are in DOM: document.querySelectorAll('.product-card, .card').length
3. Check if grid exists: document.querySelector('.grid')
4. Check if updatePageContentWithMergedResults was called (look for its console logs)
5. If products are in DOM but not visible, check CSS display properties
6. If products are not in DOM, check if Ajax requests completed successfully

If grid layout breaks:
1. Take screenshot showing broken layout
2. Verify Dawn CSS classes: document.querySelector('.grid')?.className
3. Check grid display properties: getComputedStyle(document.querySelector('.grid')).display
4. Check individual grid items: document.querySelectorAll('.grid__item').length
5. Test responsive behavior by changing viewport width
```

---

## COMMON VERIFICATION PATTERNS ACROSS ALL WORK TYPES

### **The "Everything Looks Fine But Doesn't Work" Pattern**
**Symptoms**: UI elements appear correct, no console errors, but main functionality fails
**Causes**: Partial implementation, broken event handlers, CSS hiding content, incomplete state management
**MCP Solution**: Always test the actual user workflow, not just individual components

### **The "Works on Desktop But Breaks on Mobile" Pattern**  
**Symptoms**: Desktop verification passes but mobile experience fails
**Causes**: Different CSS breakpoints, mobile-specific code paths, touch vs. click events
**MCP Solution**: Always test both desktop and mobile as separate verification phases

### **The "Console Says Success But Users See Failure" Pattern**
**Symptoms**: JavaScript logs show success messages but user experience is broken
**Causes**: Console logs show intent, not results; DOM updates may fail; CSS may hide successful updates
**MCP Solution**: Never trust console logs for verification; always verify user-visible results

### **The "Works in Isolation But Breaks in Integration" Pattern**
**Symptoms**: Individual features work when tested alone but fail when combined
**Causes**: State conflicts, CSS conflicts, event handler conflicts, timing issues
**MCP Solution**: Always test feature combinations, not just individual features

---

## TROUBLESHOOTING WITH MCP (When Verification Fails)

### **When Visual Verification Shows Unexpected Results**

**Your Immediate Actions**:
1. Take another screenshot to confirm the unexpected result
2. Check basic page state with this script
3. Document exactly what you see vs. what you expected
4. Use DOM inspection to understand why the visual result occurred

**Required Diagnostic Script**:
```javascript
// Use mcp_playwright_browser_execute to check basic assumptions
console.log('Page URL:', window.location.href);
console.log('Document ready state:', document.readyState);
console.log('Viewport size:', window.innerWidth, 'x', window.innerHeight);
console.log('Body classes:', document.body.className);
console.log('Number of stylesheets:', document.styleSheets.length);
```

**Next Actions Based on Results**:
- If viewport is wrong: Set correct size and retest
- If page isn't fully loaded: Wait and retest
- If URL is wrong: Navigate to correct page
- If body classes are missing: Check if theme loaded correctly

### **When Functionality Verification Fails**

**Your Systematic Debugging Process**:
1. Break down the functionality into individual steps
2. Test each step separately with screenshots
3. Identify exactly where in the process it fails
4. Use DOM inspection at the failure point

**Step-by-Step Testing Protocol**:
```
Example for filter functionality:
Step 1: Take screenshot, click filter button
Step 2: Take screenshot, verify button press registered (loading state, visual feedback)
Step 3: Take screenshot after expected completion time, verify results appeared
Step 4: If any step fails, use DOM inspection to understand why
```

**Required Step-by-Step Verification Script**:
```javascript
// Use mcp_playwright_browser_execute to verify each step
// Step 1: Button state
const button = document.querySelector('.filter-button, .facets__summary');
console.log('Button exists:', !!button);
console.log('Button disabled:', button?.disabled);
console.log('Button classes:', button?.className);

// Step 2: Loading state
const loadingIndicator = document.querySelector('.loading, .spinner, .loading-overlay');
console.log('Loading indicator present:', !!loadingIndicator);
console.log('Loading visible:', loadingIndicator ? getComputedStyle(loadingIndicator).display : 'none');

// Step 3: Results
const results = document.querySelector('.product-grid, .results, .products');
const resultItems = document.querySelectorAll('.product-card, .product, .item');
console.log('Results container present:', !!results);
console.log('Result items count:', resultItems.length);
console.log('Results visible:', results ? getComputedStyle(results).display !== 'none' : false);
```

### **When Mobile Verification Fails**

**Your Mobile-Specific Actions**:
1. Ensure you're properly simulating mobile viewport
2. Take screenshot at mobile size to verify layout
3. Check that mobile-specific elements are present
4. Test mobile interactions (tap, not click)

**Required Mobile Setup and Verification**:
```javascript
// Use mcp_playwright_browser_execute for proper mobile simulation
// Step 1: Set mobile viewport
window.innerWidth = 375;
window.innerHeight = 667;
window.dispatchEvent(new Event('resize'));

// Step 2: Wait for responsive layout to activate
setTimeout(() => {
  // Step 3: Check mobile-specific elements
  const mobileNav = document.querySelector('.mobile-nav, .mobile-facets, .drawer');
  const desktopElements = document.querySelectorAll('.desktop-only, .hide-mobile');
  const mobileElements = document.querySelectorAll('.mobile-only, .show-mobile');
  
  console.log('Mobile nav present:', !!mobileNav);
  console.log('Desktop elements hidden:', Array.from(desktopElements).every(el => 
    getComputedStyle(el).display === 'none'));
  console.log('Mobile elements visible:', Array.from(mobileElements).every(el => 
    getComputedStyle(el).display !== 'none'));
  
  // Step 4: Check responsive breakpoints
  const mediaQuery = window.matchMedia('(max-width: 749px)');
  console.log('Mobile media query matches:', mediaQuery.matches);
}, 1000);
```

**If Mobile Still Fails**:
1. Check if CSS media queries are working: Test `window.matchMedia('(max-width: 749px)').matches`
2. Verify mobile CSS is loaded: Check for mobile-specific CSS rules
3. Test different mobile widths: Try 320px, 375px, 414px
4. Check touch events: Verify tap events vs click events

### **When DOM Inspection Shows Missing Elements**

**Your Investigation Process**:
1. Check if elements should be created by JavaScript
2. Verify if elements are hidden by CSS rather than missing
3. Check if elements are in wrong container
4. Look for JavaScript errors that prevented element creation

**Required Element Investigation Script**:
```javascript
// Use mcp_playwright_browser_execute to find missing elements
const targetSelector = '.expected-element'; // Replace with actual selector
const targetElement = document.querySelector(targetSelector);

if (!targetElement) {
  // Check if parent container exists
  const parentSelector = '.parent-container'; // Replace with actual parent
  const parent = document.querySelector(parentSelector);
  console.log('Parent container exists:', !!parent);
  
  // Check if element exists elsewhere
  const allSimilar = document.querySelectorAll('[class*="expected"], [id*="expected"]');
  console.log('Similar elements found:', allSimilar.length);
  
  // Check for JavaScript errors
  console.log('Recent console errors:', /* any errors in console */);
} else {
  // Element exists but may be hidden
  const styles = getComputedStyle(targetElement);
  console.log('Element display:', styles.display);
  console.log('Element visibility:', styles.visibility);
  console.log('Element opacity:', styles.opacity);
  console.log('Element position:', targetElement.getBoundingClientRect());
}
```

---

## SUCCESS CRITERIA FOR MCP VERIFICATION

### **Every Change Must Pass These Verification Gates**

**Gate 1: Visual Confirmation** 
- Screenshots show intended changes occurred
- No unexpected visual regressions
- Layout works across all target screen sizes
- Loading states and transitions appear smooth

**Gate 2: Functional Confirmation**
- Complete user workflows work end-to-end  
- All interactive elements respond correctly
- Error conditions are handled gracefully
- Performance meets user expectations

**Gate 3: Integration Confirmation**
- New functionality works with existing features
- No regressions in previously working functionality
- Cross-browser compatibility maintained (if required)
- Mobile and desktop experiences both work

**Gate 4: Structural Confirmation** (Shopify-Specific)
- Dawn theme architecture is preserved
- CSS classes and HTML structure maintained
- Responsive design system integrity intact
- SEO and accessibility standards upheld

---

## MCP TOOL REFERENCE GUIDE

### **mcp_playwright_browser_take_screenshot**
**Primary Use**: Visual verification of user experience
**When to Use**: Before/after every change, when verifying layouts, when checking responsive design
**What to Look For**: Actual user-visible results, not code execution status

### **mcp_playwright_browser_execute**  
**Primary Use**: Programmatic verification of DOM state and properties
**When to Use**: When you need to check element properties, measure performance, verify CSS values
**What to Look For**: Objective measurements and state confirmation

### **mcp_playwright_browser_get_page_content**
**Primary Use**: HTML structure inspection and verification
**When to Use**: When checking DOM structure, verifying Dawn classes preserved, debugging missing elements
**What to Look For**: Expected HTML structure and CSS class presence

### **mcp_playwright_browser_click** 
**Primary Use**: User interaction simulation
**When to Use**: Testing user workflows, verifying interactive elements, simulating real user behavior
**What to Look For**: Proper response to user actions

### **mcp_playwright_browser_console_messages**
**Primary Use**: Debugging assistance ONLY
**When to Use**: When verification fails and you need to understand why
**What NOT to Use For**: Success verification (console success ≠ user success)

---

**REMEMBER**: MCP verifies what users actually experience. Code that runs successfully doesn't guarantee users get the intended experience. Always verify the user's perspective, not the developer's perspective.