/**
 * Pure Node.js Runtime Simulation for AuraCraft Studio
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Lightweight DOM element class
class Element {
  constructor(tagName, id = '', className = '') {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.className = className;
    this.classList = {
      _classes: new Set(className.split(' ').filter(Boolean)),
      add: (...cls) => cls.forEach(c => this.classList._classes.add(c)),
      remove: (...cls) => cls.forEach(c => this.classList._classes.delete(c)),
      contains: (c) => this.classList._classes.has(c),
      toggle: (c, force) => {
        if (force === true) this.classList.add(c);
        else if (force === false) this.classList.remove(c);
        else if (this.classList.contains(c)) this.classList.remove(c);
        else this.classList.add(c);
      }
    };
    this.style = {
      setProperty: (k, v) => { this.style[k] = v; },
      getPropertyValue: (k) => this.style[k] || ''
    };
    this.dataset = {};
    this.attributes = {};
    this.listeners = {};
    this.children = [];
    this.parentNode = null;
    this.textContent = '';
    this.value = '';
    this.innerHTML = '';
    this.width = 800;
    this.height = 800;
    this.options = [];
    this.selectedIndex = 0;
  }

  addEventListener(event, handler) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  }

  querySelector(sel) {
    if (sel.startsWith('.')) {
      const cls = sel.slice(1);
      const findIn = (node) => {
        for (const ch of node.children) {
          if (ch.classList && ch.classList.contains(cls)) return ch;
          const found = findIn(ch);
          if (found) return found;
        }
        return null;
      };
      // If innerHTML created virtual element, return a mock element
      const found = findIn(this);
      if (found) return found;
      const mockEl = new Element('div', '', cls);
      return mockEl;
    }
    return new Element('div');
  }

  querySelectorAll(sel) {
    return [];
  }

  click() {
    if (this.listeners['click']) {
      this.listeners['click'].forEach(fn => fn({ preventDefault: () => {}, stopPropagation: () => {}, target: this }));
    }
  }

  dispatchEvent(event, data = {}) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(fn => fn({ preventDefault: () => {}, stopPropagation: () => {}, target: this, ...data }));
    }
  }

  appendChild(child) {
    this.children.push(child);
    child.parentNode = this;
    return child;
  }

  getBoundingClientRect() {
    return { left: 0, top: 0, width: 800, height: 800 };
  }

  getContext() {
    return {
      clearRect: () => {},
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      arc: () => {},
      ellipse: () => {},
      rect: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      bezierCurveTo: () => {},
      quadraticCurveTo: () => {},
      clip: () => {},
      fill: () => {},
      stroke: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
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
      strokeStyle: '',
      globalAlpha: 1
    };
  }

  toDataURL() {
    return 'data:image/png;base64,mock';
  }
}

// Parse IDs and classes from HTML
const elementsById = new Map();
const allElements = [];

// Extract elements with id="..."
const idRegex = /<([a-zA-Z0-9-]+)[^>]*id=["']([^"']+)["'][^>]*>/g;
let match;
while ((match = idRegex.exec(html)) !== null) {
  const tag = match[1];
  const id = match[2];
  const el = new Element(tag, id);
  // Extract data attributes
  const fullTag = match[0];
  const dataRegex = /data-([a-zA-Z0-9-]+)=["']([^"']+)["']/g;
  let dMatch;
  while ((dMatch = dataRegex.exec(fullTag)) !== null) {
    el.dataset[dMatch[1]] = dMatch[2];
  }
  const classMatch = fullTag.match(/class=["']([^"']+)["']/);
  if (classMatch) {
    el.className = classMatch[1];
    classMatch[1].split(' ').filter(Boolean).forEach(c => el.classList.add(c));
  }
  elementsById.set(id, el);
  allElements.push(el);
}

// Extract remaining elements with data-view or data-subtab
const dataRegex = /<([a-zA-Z0-9-]+)[^>]*data-(view|subtab|preset|size|cat|bg)=["']([^"']+)["'][^>]*>/g;
while ((match = dataRegex.exec(html)) !== null) {
  const tag = match[1];
  const fullTag = match[0];
  const idMatch = fullTag.match(/id=["']([^"']+)["']/);
  if (!idMatch) {
    const el = new Element(tag);
    el.dataset[match[2]] = match[3];
    const classMatch = fullTag.match(/class=["']([^"']+)["']/);
    if (classMatch) {
      el.className = classMatch[1];
      classMatch[1].split(' ').filter(Boolean).forEach(c => el.classList.add(c));
    }
    allElements.push(el);
  }
}

let domContentLoadedHandler = null;
const mockDocument = {
  getElementById: (id) => elementsById.get(id) || null,
  querySelector: (sel) => {
    if (sel.startsWith('#')) return elementsById.get(sel.slice(1)) || null;
    if (sel.includes('[data-view=')) {
      const vMatch = sel.match(/data-view=["']?([^"'\]]+)/);
      if (vMatch) return allElements.find(e => e.dataset.view === vMatch[1]) || null;
    }
    if (sel.startsWith('.')) {
      const cls = sel.slice(1).split('.')[0];
      return allElements.find(e => e.classList.contains(cls)) || null;
    }
    return null;
  },
  querySelectorAll: (sel) => {
    if (sel.includes('.nav-tab-btn')) {
      return allElements.filter(e => e.classList.contains('nav-tab-btn'));
    }
    if (sel.includes('.settings-subtab-btn')) {
      return allElements.filter(e => e.classList.contains('settings-subtab-btn'));
    }
    if (sel.includes('.modal-tab-btn')) {
      return allElements.filter(e => e.classList.contains('modal-tab-btn'));
    }
    if (sel.includes('.subtab-btn')) {
      return allElements.filter(e => e.classList.contains('subtab-btn'));
    }
    if (sel.includes('.app-view')) {
      return allElements.filter(e => e.classList.contains('app-view'));
    }
    if (sel.includes('.segment-btn')) {
      return allElements.filter(e => e.classList.contains('segment-btn'));
    }
    if (sel.includes('.cat-tab')) {
      return allElements.filter(e => e.classList.contains('cat-tab'));
    }
    if (sel.includes('.tool-mode-btn')) {
      return allElements.filter(e => e.classList.contains('tool-mode-btn'));
    }
    if (sel.includes('.preset-chip')) {
      return allElements.filter(e => e.classList.contains('preset-chip'));
    }
    if (sel.includes('.catalog-pill') || sel.includes('.col-pill') || sel.includes('.rates-pill')) {
      return allElements.filter(e => e.classList.contains('catalog-pill') || e.classList.contains('col-pill') || e.classList.contains('rates-pill'));
    }
    return [];
  },
  createElement: (tag) => new Element(tag),
  documentElement: new Element('html'),
  body: new Element('body'),
  addEventListener: (evt, handler) => {
    if (evt === 'DOMContentLoaded') domContentLoadedHandler = handler;
  }
};

const mockLocalStorage = {
  _data: {},
  getItem: (k) => mockLocalStorage._data[k] || null,
  setItem: (k, v) => { mockLocalStorage._data[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorage._data[k]; },
  clear: () => { mockLocalStorage._data = {}; }
};

let printCalled = false;
const sandbox = {
  document: mockDocument,
  window: {
    location: { hash: '', href: 'http://localhost:8080/' },
    addEventListener: () => {},
    print: () => { printCalled = true; },
    localStorage: mockLocalStorage,
    navigator: { platform: 'MacIntel', clipboard: { writeText: () => Promise.resolve() } },
    document: mockDocument
  },
  localStorage: mockLocalStorage,
  navigator: { platform: 'MacIntel', clipboard: { writeText: () => Promise.resolve() } },
  console: console,
  setTimeout: (fn, delay) => fn(),
  clearTimeout: () => {},
  history: { replaceState: () => {} },
  Math: Math,
  Date: Date,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  JSON: JSON,
  Array: Array,
  Object: Object,
  String: String,
  Number: Number,
  Boolean: Boolean,
  Set: Set,
  Map: Map,
  Promise: Promise
};

vm.createContext(sandbox);

console.log('--- EXECUTING RUNTIME SIMULATION ---');

try {
  vm.runInContext(js, sandbox);
  console.log('✔ app.js parsed and executed in sandbox.');
  if (domContentLoadedHandler) {
    domContentLoadedHandler();
    console.log('✔ DOMContentLoaded fired successfully.');
  }
} catch (err) {
  console.error('❌ FATAL execution error in app.js:', err);
  process.exit(1);
}

const studio = sandbox.window.studio || sandbox.studio;
if (!studio) {
  console.error('❌ studio instance was not initialized');
  process.exit(1);
}
console.log('✔ BraceletStudio instantiated cleanly.');

// Test 1: Navigation Tabs (3 Dedicated Screens)
console.log('\n[Test 1] Testing 3-Screen Navigation Tabs...');
const views = ['collections', 'settings', 'studio'];
views.forEach(v => {
  const btn = mockDocument.querySelector(`.nav-tab-btn[data-view="${v}"]`);
  if (!btn) throw new Error(`Missing button for ${v}`);
  btn.click();
  if (studio.currentView !== v) throw new Error(`Current view should be ${v}, got ${studio.currentView}`);
  const viewEl = mockDocument.getElementById(`view-${v}`);
  if (!viewEl || !viewEl.classList.contains('active')) throw new Error(`View element #view-${v} not active`);
  console.log(`  ✓ Nav tab switched to '${v}' cleanly (active view: ${studio.currentView})`);
});

// Test 2: Settings Subtabs (Pricing & Backup)
console.log('\n[Test 2] Testing Settings Subtabs (Pricing vs Backup)...');
studio.switchView('settings');
const subtabPricingBtn = mockDocument.getElementById('btn-settings-tab-pricing');
const subtabBackupBtn = mockDocument.getElementById('btn-settings-tab-backup');
const panePricing = mockDocument.getElementById('pane-settings-pricing');
const paneBackup = mockDocument.getElementById('pane-settings-backup');

subtabBackupBtn.click();
if (paneBackup.style.display === 'none' || panePricing.style.display !== 'none') {
  throw new Error('Switching to Backup subtab failed');
}
console.log('  ✓ Switched to Backup & Restore Hub subtab');

subtabPricingBtn.click();
if (panePricing.style.display === 'none' || paneBackup.style.display !== 'none') {
  throw new Error('Switching to Pricing subtab failed');
}
console.log('  ✓ Switched to Pricing & Cost Configurator subtab');

// Test 3: Collapsible Sidebars
console.log('\n[Test 3] Testing Side Drawer Collapse Buttons...');
studio.switchView('studio');
const leftCollapseBtn = mockDocument.getElementById('btn-collapse-left-sidebar');
const leftExpandBtn = mockDocument.getElementById('btn-expand-left-sidebar');
const rightCollapseBtn = mockDocument.getElementById('btn-collapse-right-sidebar');
const rightExpandBtn = mockDocument.getElementById('btn-expand-right-sidebar');
const studioMain = mockDocument.getElementById('view-studio');

leftCollapseBtn.click();
if (!studio.isPaletteCollapsed || !studioMain.classList.contains('palette-collapsed')) {
  throw new Error('Left collapse failed');
}
console.log('  ✓ Left sidebar collapsed');

leftExpandBtn.click();
if (studio.isPaletteCollapsed || studioMain.classList.contains('palette-collapsed')) {
  throw new Error('Left expand failed');
}
console.log('  ✓ Left sidebar expanded');

rightCollapseBtn.click();
if (!studio.isDetailsCollapsed || !studioMain.classList.contains('details-collapsed')) {
  throw new Error('Right collapse failed');
}
console.log('  ✓ Right sidebar collapsed');

rightExpandBtn.click();
if (studio.isDetailsCollapsed || studioMain.classList.contains('details-collapsed')) {
  throw new Error('Right expand failed');
}
console.log('  ✓ Right sidebar expanded');

// Test 4: Zen Mode Toggle
console.log('\n[Test 4] Testing Zen Mode...');
const zenBtn = mockDocument.getElementById('btn-toggle-zen-mode');
zenBtn.click();
if (!studio.isZenMode || !studioMain.classList.contains('zen-mode')) {
  throw new Error('Zen mode activation failed');
}
console.log('  ✓ Zen mode enabled');
zenBtn.click();
if (studio.isZenMode || studioMain.classList.contains('zen-mode')) {
  throw new Error('Zen mode deactivation failed');
}
console.log('  ✓ Zen mode disabled');

// Test 5: Design Inspector Combined BOM & Cost Waterfall Breakdown
console.log('\n[Test 5] Testing Design Inspector Combined BOM & Cost Waterfall Breakdown...');
studio.switchView('studio');
const bomSubtabBtn = mockDocument.getElementById('subtab-btn-bom');
bomSubtabBtn.click();

const bomPane = mockDocument.getElementById('pane-details-bom');
if (bomPane.style.display === 'none') {
  throw new Error('BOM pane failed to open in Design Inspector');
}
const waterfallPrice = mockDocument.getElementById('sidebar-waterfall-price');
const gemsTotal = mockDocument.getElementById('sidebar-tier-gems-total');
const pkgTotal = mockDocument.getElementById('sidebar-tier-pkg-total');
const profitVal = mockDocument.getElementById('sidebar-tier-profit-val');

if (!waterfallPrice || !waterfallPrice.textContent.includes('₹')) {
  throw new Error('Sidebar waterfall price not populated');
}
if (!gemsTotal || !gemsTotal.textContent.includes('₹')) {
  throw new Error('Sidebar gems total not populated');
}
console.log(`  ✓ Waterfall & BOM populated in Design Inspector: Price ${waterfallPrice.textContent}, Gems: ${gemsTotal.textContent}, Profit: ${profitVal.textContent}`);

// Test 6: Settings Stone Unit Rates Custom Overrides Matrix
console.log('\n[Test 6] Testing Enhanced Stone Rates Matrix in Settings...');
studio.switchView('settings');
const ratesGrid = mockDocument.getElementById('full-stone-rates-grid');
if (!ratesGrid || ratesGrid.children.length === 0) {
  throw new Error('Enhanced stone rates matrix not populated');
}
console.log(`  ✓ Stone rates matrix rendered with ${ratesGrid.children.length} stone cards`);

const ratesSearch = mockDocument.getElementById('full-stone-rates-search');
ratesSearch.value = 'Citrine';
ratesSearch.dispatchEvent('input');
console.log(`  ✓ Stone rates search filtered results: ${ratesGrid.children.length} matching card(s)`);
ratesSearch.value = '';
ratesSearch.dispatchEvent('input');

const resetAllRatesBtn = mockDocument.getElementById('btn-reset-all-stone-rates');
resetAllRatesBtn.click();
console.log('  ✓ Reset All Rates button handled cleanly');

// Test 7: Collections Live Canvas Previews
console.log('\n[Test 7] Testing Collections Live Canvas Previews...');
studio.switchView('collections');
const colGrid = mockDocument.getElementById('full-col-grid');
if (!colGrid || colGrid.children.length === 0) {
  throw new Error('Collections grid not populated');
}
console.log(`  ✓ Collections grid rendered with ${colGrid.children.length} saved product cards`);

// Test 8: Sidebar Resizers
console.log('\n[Test 8] Testing Sidebar Resizer Gutters...');
const leftResizer = mockDocument.getElementById('resizer-left');
const rightResizer = mockDocument.getElementById('resizer-right');
if (!leftResizer || !rightResizer) {
  throw new Error('Sidebar resizers missing from DOM');
}
leftResizer.dispatchEvent('pointerdown', { pointerId: 1, clientX: 320 });
leftResizer.dispatchEvent('pointermove', { pointerId: 1, clientX: 380 });
leftResizer.dispatchEvent('pointerup', { pointerId: 1 });
console.log('  ✓ Left sidebar resizer pointer drag executed');

rightResizer.dispatchEvent('pointerdown', { pointerId: 2, clientX: 700 });
rightResizer.dispatchEvent('pointermove', { pointerId: 2, clientX: 640 });
rightResizer.dispatchEvent('pointerup', { pointerId: 2 });
console.log('  ✓ Right sidebar resizer pointer drag executed');

// Test 9: Share Modal Dialog
console.log('\n[Test 9] Testing Share Modal Dialog...');
const shareBtn = mockDocument.getElementById('btn-open-share-modal');
const shareModal = mockDocument.getElementById('share-modal');
const shareInput = mockDocument.getElementById('share-link-input');
shareBtn.click();
if (shareModal.style.display !== 'flex') {
  throw new Error('Share modal dialog failed to open');
}
if (!shareInput || !shareInput.value.includes('#design=')) {
  throw new Error('Share link was not generated with #design=');
}
console.log(`  ✓ Share Modal Dialog opened with link: ${shareInput.value.slice(0, 45)}...`);

// Test 10: Print Manufacturing Spec Sheet
console.log('\n[Test 10] Testing Print Spec Sheet...');
const headerPrintBtn = mockDocument.getElementById('btn-header-print-specs');
printCalled = false;
headerPrintBtn.click();
if (!printCalled) throw new Error('window.print was not called from header print button');
console.log('  ✓ Header Print button triggered window.print()');

console.log('\n🎉 ALL 3-SCREEN RUNTIME SIMULATION TESTS COMPLETED SUCCESSFULLY!');
