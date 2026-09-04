// test_responsive.js - Responsive Architecture & Multi-Device Verification Suite
const fs = require('fs');
const path = require('path');

console.log('--- RUNNING RESPONSIVE & MULTI-DEVICE VERIFICATION SUITE ---\n');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

let passCount = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  ❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
  passCount++;
}

// 1. HTML Markup Checks
console.log('[TEST 1] Checking HTML Responsive Elements & Drawer Backdrop...');
assert(html.includes('id="mobile-drawer-backdrop"'), 'Mobile drawer backdrop markup exists in index.html');
assert(html.includes('id="mobile-stage-bar"'), 'Mobile stage bottom action bar exists in index.html');
assert(html.includes('id="btn-mobile-open-stones"'), 'Mobile Stones drawer toggle button exists in index.html');
assert(html.includes('id="btn-mobile-open-inspector"'), 'Mobile Inspector drawer toggle button exists in index.html');
assert(html.includes('id="btn-mobile-bits-quick"'), 'Mobile quick bits stepper button exists in index.html');
assert(html.includes('id="mobile-bits-label"'), 'Mobile bits display label element exists');

// 2. CSS Media Queries and Responsive Rules
console.log('\n[TEST 2] Checking CSS Media Queries & Breakpoint Rules...');
assert(css.includes('@media (max-width: 1200px)'), '1200px breakpoint exists for compact laptops');
assert(css.includes('@media (max-width: 992px)'), '992px breakpoint exists for tablets');
assert(css.includes('@media (max-width: 768px)'), '768px breakpoint exists for mobile stage-first layout');
assert(css.includes('@media (max-width: 480px)'), '480px breakpoint exists for extra-small phones');
assert(css.includes('@media (max-width: 360px)'), '360px/300px breakpoint exists for ultra-compact mobile screens');
assert(css.includes('.mobile-drawer-backdrop'), 'CSS rule for .mobile-drawer-backdrop defined');
assert(css.includes('.palette-sidebar.mobile-open'), 'CSS rule for .palette-sidebar.mobile-open defined');
assert(css.includes('.details-sidebar.mobile-open'), 'CSS rule for .details-sidebar.mobile-open defined');
assert(css.includes('.mobile-stage-bar'), 'CSS rule for .mobile-stage-bar defined');
assert(css.includes('.mobile-bar-btn'), 'CSS rule for .mobile-bar-btn defined');
assert(css.includes('@media (hover: none) and (pointer: coarse)'), 'Touch target optimization rule defined');

// 3. JavaScript Controller Logic
console.log('\n[TEST 3] Checking JavaScript Mobile & Touch Handling in app.js...');
assert(js.includes('bindMobileEvents()'), 'bindMobileEvents method defined in app.js');
assert(js.includes('btnMobileStones'), 'Mobile stones drawer button listener handled');
assert(js.includes('btnMobileInspector'), 'Mobile inspector drawer button listener handled');
assert(js.includes('btnMobileBits'), 'Mobile bits quick stepper handled');
assert(js.includes('mobile-bits-label'), 'mobile-bits-label dynamic update handled in syncDOMState');
assert(js.includes("canvas.addEventListener('touchstart'"), 'Canvas touchstart event listener registered');
assert(js.includes("canvas.addEventListener('touchmove'"), 'Canvas touchmove event listener registered');
assert(js.includes("canvas.addEventListener('touchend'"), 'Canvas touchend event listener registered');
assert(js.includes("window.addEventListener('resize'"), 'Window resize listener registered for responsive canvas');
assert(js.includes("window.addEventListener('orientationchange'"), 'Device orientation change listener registered');

console.log(`\n🎉 ALL ${passCount}/${totalTests} RESPONSIVE VERIFICATION TESTS PASSED SUCCESSFULLY!`);
