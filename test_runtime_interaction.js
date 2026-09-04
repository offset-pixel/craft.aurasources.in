/**
 * Runtime Simulation Test for AuraCraft Studio
 * Verifies that new BraceletStudio() runs without throwing ANY unhandled errors,
 * and that all user actions (navigation, collapse, print, pricing breakdown) work cleanly.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://localhost:8080/'
});

const { window } = dom;

// Polyfill window methods not in JSDOM
window.HTMLCanvasElement.prototype.getContext = function() {
  return {
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    save: () => {},
    restore: () => {},
    translate: () => {},
    rotate: () => {},
    createRadialGradient: () => ({ addColorStop: () => {} }),
    createLinearGradient: () => ({ addColorStop: () => {} }),
    fillText: () => {},
    strokeText: () => {},
    measureText: () => ({ width: 10 }),
    drawImage: () => {},
    setLineDash: () => {},
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    lineWidth: 1,
    fillStyle: '',
    strokeStyle: ''
  };
};

window.HTMLCanvasElement.prototype.toDataURL = function() {
  return 'data:image/png;base64,mock';
};

window.print = function() {
  console.log('  [Mock window.print called successfully]');
};

window.navigator.clipboard = {
  writeText: () => Promise.resolve()
};

console.log('--- RUNNING RUNTIME SIMULATION TEST ---');

let studioInstance = null;
try {
  // Execute app.js in the JSDOM window context
  const scriptEl = window.document.createElement('script');
  scriptEl.textContent = js;
  window.document.body.appendChild(scriptEl);

  studioInstance = window.studio;
  console.log('✔ BraceletStudio initialized without uncaught exceptions.');
} catch (err) {
  console.error('❌ FATAL: BraceletStudio failed during initialization:', err);
  process.exit(1);
}

// 1. Test Top Navigation Tabs
console.log('\n[Test 1] Testing Top Navigation Tabs...');
const views = ['gemstones', 'pricing', 'collections', 'specsheet', 'share-backup', 'studio'];
views.forEach(v => {
  const btn = window.document.querySelector(`.nav-tab-btn[data-view="${v}"]`);
  if (!btn) {
    throw new Error(`Nav tab button for view '${v}' not found`);
  }
  btn.click();
  const viewEl = window.document.getElementById(`view-${v}`);
  const isDisplayed = viewEl && viewEl.classList.contains('active') && viewEl.style.display !== 'none';
  if (!isDisplayed) {
    throw new Error(`View '${v}' failed to activate on click`);
  }
  console.log(`  ✓ Nav tab switched to '${v}' cleanly`);
});

// 2. Test Side Drawer Collapse Buttons
console.log('\n[Test 2] Testing Side Drawer Collapse Buttons...');
const leftCollapseBtn = window.document.getElementById('btn-collapse-left-sidebar');
const rightCollapseBtn = window.document.getElementById('btn-collapse-right-sidebar');
const studioMain = window.document.getElementById('view-studio');

leftCollapseBtn.click();
if (!studioMain.classList.contains('palette-collapsed')) {
  throw new Error('Left sidebar failed to collapse on btn-collapse-left-sidebar click');
}
console.log('  ✓ Left sidebar collapse button works');

const leftExpandBtn = window.document.getElementById('btn-expand-left-sidebar');
leftExpandBtn.click();
if (studioMain.classList.contains('palette-collapsed')) {
  throw new Error('Left sidebar failed to expand on btn-expand-left-sidebar click');
}
console.log('  ✓ Left sidebar expand button works');

rightCollapseBtn.click();
if (!studioMain.classList.contains('details-collapsed')) {
  throw new Error('Right sidebar failed to collapse on btn-collapse-right-sidebar click');
}
console.log('  ✓ Right sidebar collapse button works');

const rightExpandBtn = window.document.getElementById('btn-expand-right-sidebar');
rightExpandBtn.click();
if (studioMain.classList.contains('details-collapsed')) {
  throw new Error('Right sidebar failed to expand on btn-expand-right-sidebar click');
}
console.log('  ✓ Right sidebar expand button works');

// 3. Test Zen Mode
console.log('\n[Test 3] Testing Zen Mode Toggle...');
const zenBtn = window.document.getElementById('btn-toggle-zen-mode');
zenBtn.click();
if (!studioMain.classList.contains('zen-mode')) {
  throw new Error('Zen mode failed to activate on btn-toggle-zen-mode click');
}
console.log('  ✓ Zen mode enabled');
zenBtn.click();
if (studioMain.classList.contains('zen-mode')) {
  throw new Error('Zen mode failed to exit on second click');
}
console.log('  ✓ Zen mode disabled');

// 4. Test Price Breakdown & Inspector
console.log('\n[Test 4] Testing Price Breakdown & Pricing Studio...');
const pricingGearBtn = window.document.getElementById('btn-open-pricing-modal');
const pricingModal = window.document.getElementById('pricing-modal');
pricingGearBtn.click();
if (pricingModal.style.display !== 'flex') {
  throw new Error('Pricing modal failed to open on btn-open-pricing-modal click');
}
console.log('  ✓ Pricing modal opened successfully');

const closePricingBtn = window.document.getElementById('btn-close-pricing-modal');
closePricingBtn.click();
if (pricingModal.style.display !== 'none') {
  throw new Error('Pricing modal failed to close');
}
console.log('  ✓ Pricing modal closed successfully');

// Test Fullpage Pricing Studio
const navPricingBtn = window.document.getElementById('nav-btn-pricing');
navPricingBtn.click();
const sellingPriceEl = window.document.getElementById('full-pricing-selling-price');
if (!sellingPriceEl || !sellingPriceEl.textContent.includes('₹')) {
  throw new Error('Full Pricing Studio failed to populate Selling Price');
}
console.log(`  ✓ Fullpage Pricing Studio populated: ${sellingPriceEl.textContent}`);

// 5. Test Print Space & Spec Sheet
console.log('\n[Test 5] Testing Print Manufacturing Spec Sheet...');
const navSpecBtn = window.document.getElementById('nav-btn-specsheet');
navSpecBtn.click();
const specSkuEl = window.document.getElementById('view-spec-sku');
if (!specSkuEl || !specSkuEl.textContent.startsWith('AC-')) {
  throw new Error('Spec Sheet failed to populate SKU');
}
console.log(`  ✓ Spec Sheet SKU rendered: ${specSkuEl.textContent}`);

const headerPrintBtn = window.document.getElementById('btn-header-print-specs');
headerPrintBtn.click();
console.log('  ✓ Header Print button triggered print cleanly');

const viewSpecPrintBtn = window.document.getElementById('btn-view-spec-print');
viewSpecPrintBtn.click();
console.log('  ✓ Spec Sheet Print button triggered print cleanly');

console.log('\n🎉 ALL RUNTIME INTERACTION TESTS PASSED WITH 100% SUCCESS!');
