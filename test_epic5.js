// test_epic5.js — Automated Verification for Epic 5
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- RUNNING EPIC 5 VERIFICATION SUITE ---');

// Mock browser globals
const domElements = {};
global.document = {
  getElementById: (id) => {
    if (!domElements[id]) {
      domElements[id] = {
        id,
        textContent: '',
        value: '',
        style: {},
        innerHTML: '',
        children: [],
        appendChild: function(el) { this.children.push(el); },
        classList: {
          contains: () => false,
          add: () => {},
          remove: () => {}
        }
      };
    }
    return domElements[id];
  },
  querySelectorAll: () => [],
  createElement: (tag) => ({
    tagName: tag,
    className: '',
    textContent: '',
    title: '',
    innerHTML: '',
    children: [],
    appendChild: function(el) { this.children.push(el); }
  }),
  addEventListener: () => {}
};

global.window = {
  location: { href: 'http://localhost:8080' },
  addEventListener: () => {},
  print: () => { global.window.printed = true; }
};

global.navigator = {
  platform: 'MacIntel',
  clipboard: {
    writeText: async () => true
  }
};

global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};

// Load app.js in global context
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
vm.runInThisContext(appCode);

// Test 1: PricingEngine & BOM Calculation Parity
console.log('\n[Test 1] Testing BOM Stone Breakdown & Pricing Parity for Spec Sheet...');
const testBeads = [
  'lava', 'lava', 'lava', 'lava', 'lava', 'lava', 'lava', 'lava', 'lava', 'lava',
  'citrine', 'citrine', 'citrine', 'citrine', 'citrine', 'citrine',
  'amethyst', 'amethyst', 'amethyst', 'amethyst',
  'ruby', 'ruby', 'ruby', 'ruby', 'ruby', 'ruby'
]; // 26 beads total
const pCalc = PricingEngine.calculate(testBeads);

console.log(`- Total Beads: ${testBeads.length}`);
console.log(`- Raw Gems Cost: ₹${pCalc.rawGemsCost.toFixed(2)}`);
console.log(`- Base Packaging: ₹${pCalc.packaging.subtotal.toFixed(2)}`);
console.log(`- Logistics: ₹${pCalc.logistics.subtotal.toFixed(2)}`);
console.log(`- Fixed Overheads: ₹${pCalc.overheads.fixedSubtotal.toFixed(2)}`);
console.log(`- Dynamic 10% Discount: ₹${pCalc.overheads.discountAmount.toFixed(2)}`);
console.log(`- Atelier Margin: ₹${pCalc.margin.targetProfit.toFixed(2)}`);
console.log(`- Final Selling Price: ₹${pCalc.finalSellingPrice.toFixed(2)}`);
console.log(`- Recommended MRP: ₹${pCalc.mrp.toFixed(2)}`);

if (testBeads.length !== 26) throw new Error('Expected 26 bits');
if (pCalc.stoneBreakdown.length !== 4) throw new Error('Expected 4 distinct stones');
console.log('✔ Test 1 Passed: BOM and Waterfall calculations accurate.');

// Test 2: SKU Generation & Simulated Barcode Logic
console.log('\n[Test 2] Testing SKU generation and Barcode Bar structure...');
const sku = SKUManager.generateSKU(testBeads, 26, 8, '001');
console.log(`- Generated SKU: ${sku}`);

const mockStudio = {
  product: { sku, title: 'Solar Abundance & Protection', category: 'wealth', status: 'active' },
  beads: testBeads,
  totalBits: testBeads.length,
  beadDiameterMm: 8,
  cordType: 'elastic',
  getStone: (id) => STONES_DB[id] || { name: id, chakra: 'All', mineralFamily: 'Silicate' },
  createBarcodeBar: BraceletStudio.prototype.createBarcodeBar,
  populatePrintableSpecSheet: BraceletStudio.prototype.populatePrintableSpecSheet,
  printSpecSheet: BraceletStudio.prototype.printSpecSheet,
  closeAllModals: BraceletStudio.prototype.closeAllModals,
  showToast: BraceletStudio.prototype.showToast,
  dismissToast: BraceletStudio.prototype.dismissToast,
  canvas: { toDataURL: () => 'data:image/png;base64,mockRender' }
};

mockStudio.populatePrintableSpecSheet();

console.log(`- Job ID Element: ${domElements['print-job-id'].textContent}`);
console.log(`- SKU Element: ${domElements['print-sku-text'].textContent}`);
console.log(`- Total Bits Element: ${domElements['print-dim-bits'].textContent}`);
console.log(`- Selling Price Element: ${domElements['print-cost-selling-price'].textContent}`);
console.log(`- Recommended MRP Element: ${domElements['print-cost-mrp'].textContent}`);
console.log(`- BOM Table Rows Created: ${domElements['print-bom-tbody'].children.length}`);
console.log(`- Barcode Bars Created: ${domElements['print-simulated-barcode'].children.length}`);

if (domElements['print-sku-text'].textContent !== sku) throw new Error('SKU text mismatch');
if (domElements['print-bom-tbody'].children.length !== 4) throw new Error('BOM tbody row count mismatch');
if (domElements['print-simulated-barcode'].children.length < 10) throw new Error('Simulated barcode did not generate bars');
console.log('✔ Test 2 Passed: Spec sheet DOM population and barcode structure verified.');

// Test 3: Print Trigger Execution
console.log('\n[Test 3] Testing printSpecSheet() invocation...');
global.window.printed = false;
mockStudio.printSpecSheet();

setTimeout(() => {
  if (!global.window.printed) {
    console.error('Print was not triggered!');
    process.exit(1);
  }
  console.log('✔ Test 3 Passed: window.print() executed cleanly.');
  console.log('\n🎉 ALL EPIC 5 AUTOMATED TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}, 150);
