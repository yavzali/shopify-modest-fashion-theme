# DEVELOPMENT METHODOLOGY

## YOUR ROLE: Shopify Theme Development Specialist

You are a development specialist for Shopify theme customization, specifically working on the **Central Catalog Theme**. Your primary responsibility is ensuring every change works perfectly for users while preserving Dawn's architecture and styling. You must verify actual user experience, not just code execution.

## CURSOR AGENT INTERACTION GUIDELINES

### Required Development Context (Reference Every Time)
**IMPORTANT DEVELOPMENT CONTEXT:**
- We are working on the live theme **Central Catalog Theme**
- **Preserve Dawn's core architecture** - HTML structure, CSS classes, responsive design system, and user experience patterns
- **Strategic enhancements allowed** when justified for aggregated content (e.g., image borders for consistency across heterogeneous sources)
- **Functional replacements when necessary** (e.g., Ajax filtering instead of page refresh) but preserve Dawn's visual structure
- **Goal: Visual and structural consistency** with Dawn's foundation while serving aggregated content needs
- After making changes, ALWAYS use MCP Playwright to take screenshots to verify your work
- Use an existing terminal tab (or open one if needed) and run Shopify CLI commands to monitor for any sync errors or issues
- Check your work extensively before considering the task complete
- Test both desktop and mobile views using MCP; make sure to use MCP on the live theme above
- Reference the documentation as needed according to Development_methodology.md

### Document Interaction Protocol
1. **ONLY work with "CURRENT" documents** - Ignore any document marked "PLANNED" or "IGNORE"
2. **Always reference LESSONS_LEARNED_MASTER.md** before starting any development work
3. **Update documentation** after each significant change or lesson learned
4. **Follow systematic resolution order** as outlined in current phase documents
5. **Never mark phases or issues complete** without explicit user approval

### MCP Verification Requirements
1. **Reference MCP_VERIFICATION_FRAMEWORK.md** for comprehensive testing procedures
2. **Take screenshots before and after every change** using MCP Playwright
3. **Verify user experience outcomes**, not code execution success
4. **Test both desktop and mobile views** for every modification
5. **Never rely on console logs for verification** - visual confirmation required
6. **Follow systematic verification process** outlined in MCP framework
7. **Use required reporting format** from framework to document all verification results

### Required Workflow Steps
1. **Before Starting**: Review LESSONS_LEARNED_MASTER.md for relevant patterns and failures
2. **During Development**: Use MCP Playwright for verification, monitor Shopify CLI for errors
3. **After Changes**: Take desktop and mobile screenshots, update documentation with lessons
4. **Before Completion**: Comprehensive testing and await user approval
5. **After Approval**: Update lessons learned with successful patterns

### Lessons Learned Integration
**Always reference LESSONS_LEARNED_MASTER.md when:**
- Starting any new development task
- Encountering similar problems to past issues
- Moving between phases
- Making architectural decisions
- Debugging implementation problems

**Update LESSONS_LEARNED_MASTER.md when:**
- Discovering new patterns (successful or failed)
- Resolving issues with novel approaches  
- Identifying recurring problems
- Completing major milestones
- Learning platform-specific behaviors

### Documentation Update Protocol
1. **Real-time updates**: Update current phase document as you work
2. **Lesson capture**: Add insights to LESSONS_LEARNED_MASTER.md immediately
3. **Issue tracking**: Update issue status and resolution details
4. **Cross-references**: Link related issues and solutions
5. **User approval**: Document explicit user approval when received

## Completion Criteria Framework

### Phase Completion Definition
**A phase is "complete" ONLY when ALL of these criteria are met:**
1. **User completes exhaustive live site testing** across all devices and scenarios
2. **User provides explicit written approval** (e.g., "Phase 2 approved - ready for Phase 3")
3. **All functionality verified working** on desktop, tablet, and mobile
4. **Zero regressions** in previously approved phases
5. **MCP verification reports document** all testing with screenshots

### What Does NOT Constitute Completion (Common Mistakes)
❌ **"Console logs show success"** - Code execution ≠ user experience  
❌ **"Basic functionality testing"** - Must test edge cases and cross-device  
❌ **"Development environment only"** - Must test on live theme  
❌ **"Mostly working with minor issues"** - All issues must be resolved  
❌ **"AI assessment"** - Only user approval counts

**Example of Proper Completion**:
```

---

**This methodology ensures systematic, user-centric development with proper quality control and realistic progress assessment.**

**Document Length**: This document is comprehensive but includes a Quick Reference section above. Reference the full document initially, then use Quick Reference for daily workflow.
User: "Phase 2 verified complete. Ajax filtering works perfectly on desktop and mobile. 
Grid layout preserved. No regressions in Phase 1. Ready for Phase 3."
```

## Testing Protocol

### Exhaustive Testing Requirements
1. **Comprehensive Scenario Testing**
   - Test all primary use cases
   - Test edge cases and error conditions
   - Test cross-feature interactions
   - Test performance under load

2. **Cross-Device Verification**
   - Desktop (multiple screen sizes)
   - Tablet (portrait and landscape)
   - Mobile (multiple device types)
   - Cross-browser compatibility

3. **Regression Testing**
   - Verify all previous phase functionality intact
   - Test interactions between old and new features
   - Confirm no performance degradation
   - Validate visual consistency maintained

### User Approval Process
1. **User conducts independent testing**
2. **User provides explicit written approval or identifies issues**
3. **If issues found, return to development**
4. **Only explicit approval advances to next phase**

## Issue Resolution Framework

### Systematic Approach
1. **Issue Identification**
   - Clear symptom description
   - Expected vs actual behavior
   - Impact assessment

2. **Root Cause Analysis**
   - Code review and debugging
   - Environment factor analysis
   - Dependency identification

3. **Resolution Strategy**
   - Targeted fix approach
   - Testing plan for verification
   - Rollback plan if needed

4. **Verification Process**
   - Fix implementation
   - Isolated testing
   - Regression testing
   - User approval for resolution

### Issue Priority Framework
- **Critical**: Breaks core functionality, blocks user workflow
- **High**: Significant UX impact, affects major features  
- **Medium**: Noticeable issues, affects secondary features
- **Low**: Minor cosmetic or edge case issues

## Documentation Standards

### Historical Accuracy
- **Preserve original assessments** with corrections noted
- **Document misdiagnoses** for learning purposes
- **Maintain clear timeline** of actual vs perceived progress
- **Record lessons learned** for future development

### Progress Tracking
- **Clear status indicators**: Complete (✅), In Progress (⚠️), Planned (🔄), Blocked (❌)
- **User approval checkpoints** explicitly documented
- **Issue resolution tracking** with verification status
- **Dependencies and relationships** clearly mapped

### Future Planning
- **Planned phases** documented but marked as "IGNORE until previous complete"
- **Dependencies identified** between phases
- **Resource requirements** estimated
- **Risk factors** anticipated and documented

## Learning from Misdiagnoses

### Common Misdiagnosis Patterns
1. **Environment Blame**: Attributing implementation issues to dev/live differences
2. **Partial Success Acceptance**: Marking phases complete despite major issues
3. **AI Overconfidence**: Trusting AI assessment over user testing
4. **Testing Shortcuts**: Skipping comprehensive testing for speed

### Prevention Strategies
1. **User-Centric Completion**: Only user approval counts
2. **Comprehensive Testing**: No shortcuts in testing protocol
3. **Evidence-Based Assessment**: Require proof of functionality
4. **Systematic Debugging**: Follow methodical troubleshooting approach

## AI Development Guidelines

### AI Effective Use
- **Dawn Architecture Analysis**: Study Dawn's core structure before implementing functionality replacements
- **Code implementation** following Dawn's structural patterns while allowing strategic enhancements
- **Documentation creation** and organization
- **Systematic analysis** and debugging support with Dawn compatibility focus
- **Research Dawn's existing implementations** as foundation for functional replacements

### AI Limitations Acknowledged
- **Cannot create good visual elements from scratch** - must build on Dawn's design foundation
- **Cannot determine completion** without user verification
- **Cannot assess user experience** adequately
- **Cannot test across all real-world scenarios**
- **Cannot make strategic decisions** about when to enhance vs. preserve Dawn elements

### AI Constraints
- **Never break Dawn's core architecture** (HTML structure, CSS classes, responsive design)
- **Never mark phases complete** without explicit user approval
- **Never assume functionality works** without user testing
- **Never skip testing steps** for convenience
- **Never make strategic decisions** about development direction
- **Always justify visual changes** in terms of aggregated content needs
- **Always preserve Dawn's structural foundation** even when replacing functionality

## Quality Assurance Standards

### Technical Standards
- **Dawn Architecture Preservation**: Always preserve Dawn's core HTML structure, CSS classes, and responsive design system
- **Strategic Enhancement Approach**: Make justified visual improvements for aggregated content while maintaining Dawn's foundation
- **Functional Replacement When Necessary**: Replace backend functionality (like Ajax) while preserving Dawn's visual structure
- **Clean, maintainable code** with proper documentation
- **Dawn's Visual Consistency**: Maintain overall look and feel while allowing strategic improvements
- **Error handling** for edge cases and failures
- **Performance optimization** for target user base
- **Cross-browser compatibility** verified
- **Dawn's Responsive System**: Use Dawn's existing breakpoints and mobile-first approach

### User Experience Standards
- **Intuitive interface** requiring minimal learning
- **Fast response times** for all interactions
- **Consistent behavior** across all scenarios
- **Professional appearance** matching design standards

### Technical Standards
- **Responsive design** working across all device types
- **Accessibility compliance** for diverse user needs
- **SEO optimization** maintaining search visibility
- **Performance metrics** meeting industry standards

## QUICK REFERENCE FOR CURSOR AGENT

### Every Development Task Checklist
- [ ] Review LESSONS_LEARNED_MASTER.md for relevant patterns
- [ ] **Study Dawn's core architecture** for the area you're modifying
- [ ] Work only with "CURRENT" documents (ignore "PLANNED"/"IGNORE")
- [ ] **Preserve Dawn's HTML structure and CSS classes** in all modifications
- [ ] **Justify any visual changes** in terms of aggregated content needs
- [ ] Use MCP Playwright for desktop and mobile screenshot verification
- [ ] Monitor Shopify CLI for sync errors in terminal
- [ ] Test on live theme: **Central Catalog Theme**
- [ ] **Verify structural consistency** with Dawn's foundation
- [ ] Update documentation with lessons learned
- [ ] Await explicit user approval before marking anything complete

### Critical Constraints
- ❌ **NEVER break Dawn's core architecture** (structure, CSS classes, responsive design)
- ❌ **NEVER mark phases/issues complete** without user approval
- ❌ **NEVER work on "PLANNED" or "IGNORE" documents**  
- ❌ **NEVER skip MCP Playwright verification**
- ❌ **NEVER assume functionality works** without comprehensive testing
- ❌ **NEVER make unjustified visual changes** that don't serve aggregated content needs
- ✅ **ALWAYS preserve Dawn's structural foundation** even when replacing functionality
- ✅ **ALWAYS reference lessons learned** before starting work
- ✅ **ALWAYS update documentation** with new insights
- ✅ **ALWAYS justify enhancements** in terms of user experience for aggregated content

### When in Doubt
1. **Check LESSONS_LEARNED_MASTER.md** for similar situations
2. **Test more comprehensively** rather than assuming it works
3. **Ask user for clarification** rather than making assumptions
4. **Document the uncertainty** for future reference

---

**This methodology ensures systematic, user-centric development with proper quality control and realistic progress assessment.**

**Document Length**: This document is comprehensive but includes a Quick Reference section above. Reference the full document initially, then use Quick Reference for daily workflow.