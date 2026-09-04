# Engineering Tasks & Roadmap — AuraCraft Studio
## Epics, User Stories, Engineering Tasks & Acceptance Criteria

---

## 📌 Epic Overview & Roadmap

| Epic | Title | Priority | Status |
| :--- | :--- | :---: | :---: |
| **EPIC-1** | Automated Multi-Tier Dynamic Pricing Engine | P0 | Completed |
| **EPIC-2** | SKU Generation & Product Metadata Manager | P0 | Completed |
| **EPIC-3** | LocalStorage Collection Gallery & Persistence Layer | P1 | Completed |
| **EPIC-4** | Backup, Restore & Shareable URL Engine | P1 | Completed |
| **EPIC-5** | UI Refinements & Printable Spec Sheets | P2 | Planned |

---

## 🎯 EPIC-1: Automated Multi-Tier Dynamic Pricing Engine

### User Story:
> *As a store owner or customer, I want the bracelet price to calculate automatically in real time based on the selected stones, bead count, packaging, logistics, and operational margins, so that I get an immediate, transparent, and accurate price quote.*

### Tasks & Sub-Tasks:

- [x] **TASK-1.1: Stone Unit Price Catalog Integration**
  - **Description**: Embed unit prices for all 24 stones into `STONES_DB` in `app.js` using `AuraSources Price - Stone Price.csv`.
  - **Sub-tasks**:
    - Add `unitPrice: 1.25` for Black Obsidian, `1.50` for Lava Marble, `2.50` for Green Aventurine/Jade, Tiger Eye, Rose Quartz, `3.25` for Raw Pyrite, `9.00` for Citrine, and `10.00` for all other 17 stones.
    - Display stone unit prices directly on catalog hover and deep-dive cards.
  - **Acceptance Criteria**: Every stone has an explicit `unitPrice` property matching the CSV.

- [x] **TASK-1.2: Cost Breakdown & Dynamic Pricing Engine**
  - **Description**: Create `PricingEngine` class encapsulating the multi-tier cost logic with 100% configurable parameters and `localStorage` persistence.
  - **Sub-tasks**:
    - Implement `calculateRawGemsCost(beads, customRates)`: Sum of `(Stone Quantity × Unit Price)`.
    - Implement configurable packaging components: Certificate, Jute Bag, Cord/Elastic, Box with Printing.
    - Implement configurable logistics components: Shipment, Security Sticker, Shipment Bag.
    - Implement configurable operating overheads: Return/Damage Reserve, Marketing Base, Dynamic Discount % (e.g. 10% of MRP).
    - Implement configurable profit: Target Profit (fixed ₹ or % markup) and MRP Rounding Anchor mode.
    - Implement `saveConfig()`, `loadConfig()`, and `resetToDefaults()`.
  - **Acceptance Criteria**: All cost parameters can be customized and restored to factory CSV defaults.

- [x] **TASK-1.3: Live Price Ticker & Header Summary Widget**
  - **Description**: Add real-time price badge to the top studio header and stage controls.
  - **Sub-tasks**:
    - Display `Selling Price: ₹XXX` with discount MRP badge and quick settings button.
    - Update instantaneously whenever a bead is changed, added, or removed.
  - **Acceptance Criteria**: Price updates in $< 16\text{ms}$ with smooth transition.

- [x] **TASK-1.4: Detailed Cost Breakdown & Cost Settings Modal**
  - **Description**: Add interactive dual-tab modal containing Cost Breakdown Waterfall and Cost Settings Configurator.
  - **Sub-tasks**:
    - **Tab 1 (Breakdown)**: Render itemized stone cost table and multi-tier cost waterfall.
    - **Tab 2 (Cost Settings)**: Form with editable inputs for all packaging, logistics, overheads, margins, and individual stone unit rates.
    - Add "Save Custom Config" and "Reset to CSV Defaults" buttons.
  - **Acceptance Criteria**: Changing any input updates prices across the application immediately and persists locally.

---

## 🎯 EPIC-2: SKU Generation & Product Metadata Manager

### User Story:
> *As a jewelry artisan/brand manager, I want custom bracelet designs to be automatically assigned standard SKU codes with customizable product titles, category tags, and lifecycle statuses, so that I can manage my product catalog efficiently.*

### Tasks & Sub-Tasks:

- [x] **TASK-2.1: Deterministic SKU Generator**
  - **Description**: Implement `SKUManager.generateSKU(beads, size, cord)` algorithm in `app.js`.
  - **Sub-tasks**:
    - Analyze primary 1-2 dominant stones in the bracelet (e.g. `CIT` for Citrine, `AME` for Amethyst).
    - Format SKU: `AC-[STONE1]-[STONE2]-[BITS]B-[SIZE]MM-[VARIANT]`.
    - Provide 1-click "Copy SKU" button.
  - **Acceptance Criteria**: Returns clean, deterministic SKU strings like `AC-CIT-AME-22B-8MM-001`.

- [x] **TASK-2.2: Product Metadata Editor Card**
  - **Description**: Add Product Information panel to the studio sidebar.
  - **Sub-tasks**:
    - Input for Product Title (default: e.g. *"Solar Abundance & Manifestation Bracelet"*).
    - Auto-generate title button with magic wand icon based on dominant stones.
    - Category tag selector (`Wealth`, `Protection`, `Love`, `Chakra`, `Clarity`, `Royal`, `Custom`).
    - Lifecycle status selector (`Active`, `Draft`, `Sample`, `Archived`).
  - **Acceptance Criteria**: Changes update product state and are reflected in export/save actions.

---

## 🎯 EPIC-3: LocalStorage Collection Gallery & Persistence Layer

### User Story:
> *As a user, I want to save multiple custom bracelet designs locally in my browser and browse them in a visual collection gallery, so that I can revisit, edit, or duplicate past designs anytime without losing my work.*

### Tasks & Sub-Tasks:

- [x] **TASK-3.1: LocalStorage Data Access Layer**
  - **Description**: Build `StorageManager` class handling CRUD operations for saved collections.
  - **Sub-tasks**:
    - Implement `saveProduct(product)`, `getProduct(id)`, `getAllProducts()`, `deleteProduct(id)`, `duplicateProduct(id)`.
    - Local storage quota health checker and default signature showroom presets seeding.
  - **Acceptance Criteria**: Collection persists across browser reloads, tab closes, and computer restarts.

- [x] **TASK-3.2: "My Collections" Visual Gallery Modal**
  - **Description**: Build visual modal displaying saved designs in responsive grid cards.
  - **Sub-tasks**:
    - Live thumbnail canvas preview of each saved bracelet.
    - Display product title, auto-generated SKU, bead count, and calculated selling price.
    - Status badges (*Active*, *Draft*, *Sample*, *Archived*).
    - Quick actions: *Load into Studio*, *Duplicate*, *Delete*.
  - **Acceptance Criteria**: Clicking "Load into Studio" hydrates the canvas and all studio controls instantly.

- [x] **TASK-3.3: Search & Filter Collection**
  - **Description**: Real-time search bar and category pills within the Collection Gallery.
  - **Sub-tasks**:
    - Search by SKU, title, or stone name.
    - Filter by category tag (`Wealth`, `Protection`, `Love`, `Chakra`, `Clarity`, `Royal`, `Custom`) or lifecycle status.
  - **Acceptance Criteria**: Gallery filters dynamically as user types.

---

## 🎯 EPIC-4: Backup, Restore & Shareable URL Engine

### User Story:
> *As a designer or customer, I want to export/import my collection as JSON files and share direct links with others, so that I can collaborate, transfer designs across devices, and prevent data loss.*

### Tasks & Sub-Tasks:

- [x] **TASK-4.1: JSON Full Backup Export**
  - **Description**: Export entire local collection or single SKU as a downloadable JSON file.
  - **Sub-tasks**:
    - Trigger `auracraft_backup_[DATE].json` download with timestamped filename.
    - Include full bead sequences, sizing, cord type, SKUs, titles, and pricing snapshots.
  - **Acceptance Criteria**: Clean JSON download without data truncation.

- [x] **TASK-4.2: JSON Restore & Import Engine**
  - **Description**: Upload parser for JSON backup files with validation.
  - **Sub-tasks**:
    - Drag-and-drop dropzone or file selector in the Backup/Restore modal.
    - Validate JSON schema and detect duplicate SKUs.
    - Support both *Merge with Existing* and *Replace Collection* modes.
  - **Acceptance Criteria**: Successfully restores complete collection from backup JSON.

- [x] **TASK-4.3: Shareable URL Hash Generator (`#design=...`)**
  - **Description**: Serialize bracelet state into a compact Base64/URI-encoded URL hash parameter.
  - **Sub-tasks**:
    - Encode bead array, bead diameter, cord, SKU, and title into `#design=[PAYLOAD]`.
    - On page load, detect hash parameter and auto-hydrate the studio state.
  - **Acceptance Criteria**: Opening the generated URL in an incognito window or new device loads the exact custom bracelet immediately.

---

## 🎯 EPIC-5: UI Refinements & Printable Spec Sheets

### User Story:
> *As a jewelry brand or artisan, I want a clean, professional printable specification sheet with high-resolution bracelet graphics, SKU barcode, BOM, and cost breakdown, so that I can send it to manufacturing or include it with orders.*

### Tasks & Sub-Tasks:

- [x] **TASK-5.1: Printable Product Spec Sheet**
  - **Description**: CSS `@media print` layout and PDF generation preview.
  - **Sub-tasks**:
    - High-res 1600x1600 bracelet render.
    - SKU code and simulated barcode / QR code.
    - Full Bill of Materials (BOM) stone quantity table.
    - Landed cost and selling price breakdown.
  - **Acceptance Criteria**: Clean, professional printout matching fine jewelry manufacturing standards.

- [x] **TASK-5.2: Notification & Feedback Polish**
  - **Description**: Refined non-intrusive toast alerts for all collection, pricing, and share actions.
  - **Acceptance Criteria**: Toast appears for 2.5s with clear status feedback.

---

## 🎯 EPIC-6: Multi-Page Modular Workspace & Adjustable Clean UI Architecture

### User Story:
> *As a designer, merchandiser, or customer, I want a clean, organized, multi-page application with adjustable workspace panels and dedicated views for Designing, Material Exploration, Pricing & Margins, Collections, Manufacturing Specs, and Sharing/Backups, so that I am not overwhelmed by having all tools crammed into a single screen, while retaining every single feature and session capability.*

### Tasks & Sub-Tasks:

- [x] **TASK-6.1: Primary Navigation Bar & Multi-View Router Engine**
  - **Description**: Top-level navigation bar with 6 dedicated full-page luxury views.
  - **Sub-tasks**:
    - Primary view switcher: Studio Designer, Gemstones Catalog, Pricing Studio, Collections Gallery, Manufacturing Spec Sheet, and Share & Backup Hub.
    - Seamless SPA view-switching without page reloads.
  - **Acceptance Criteria**: Switching views transitions smoothly and updates URL state.

- [x] **TASK-6.2: Adjustable & Collapsible Studio Workspace Layout**
  - **Description**: Collapsible sidebars and Zen / Focus Mode for the 3D visual canvas.
  - **Sub-tasks**:
    - Collapse/expand toggle controls for left and right panels.
    - Full-screen Zen mode button for uncluttered designing.
    - Internal tab switching for sidebars (Stones vs Presets, SKU Metadata vs BOM).
  - **Acceptance Criteria**: Canvas dynamically scales and responds to sidebar toggling.

- [x] **TASK-6.3: Dedicated Full-Page Luxury Views (Zero Feature Removal)**
  - **Description**: Convert modal-bound utilities into spacious, elegant dedicated pages.
  - **Sub-tasks**:
    - Full-page Gemstones Library with 24-stone explorer.
    - Full-page Pricing Studio with live waterfall & cost configurator.
    - Full-page Collections Gallery with live search & filters.
    - Full-page Manufacturing Spec Sheet with barcode & print trigger.
    - Full-page Share & Backup Hub with dropzone & URL generator.
  - **Acceptance Criteria**: 100% of existing features accessible with enhanced space and typography.

- [x] **TASK-6.4: Reactive Cross-View Synchronization & Global Shortcuts**
  - **Description**: Instant state synchronization across views and numeric keyboard navigation (`1`-`6`, `F`).
  - **Acceptance Criteria**: Changes made in Studio immediately update all other views.

---

## 🧪 Verification & Testing Plan

1. **Pricing Calculation Verification**:
   - Verify standard 26-stone bracelet against CSV values:
     - Gems Cost: ₹260.00
     - Base Cost: ₹310.00
     - Total Shipment Cost: ₹57.00
     - Overheads: ₹160.00
     - Profit: ₹200.00
     - Total Product Cost / Selling Price: ₹727.00
     - Recommended MRP: ₹749.00
   - Verify custom combinations with low-cost stones (e.g. Lava ₹1.50, Obsidian ₹1.25, Jade ₹2.50).
2. **State & URL Hash Roundtrip Test**:
   - Save custom bracelet $\to$ generate URL $\to$ open in fresh browser session $\to$ verify 100% parity.
3. **Backup & Restore Roundtrip Test**:
   - Create 5 custom bracelets $\to$ export JSON $\to$ clear `localStorage` $\to$ import JSON $\to$ verify all 5 bracelets restore with intact thumbnails and pricing.
4. **Multi-View Navigation & Panel Collapse Test**:
   - Switch between all 6 views and verify 100% state persistence and responsiveness.

