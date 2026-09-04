# Product Requirement Document (PRD) — AuraCraft Studio
## Interactive Gemstone Bracelet Studio, SKU Management & Automated Pricing Engine

---

## 1. Executive Summary & Vision

**AuraCraft** is a luxury, browser-based interactive design and eCommerce studio for custom gemstone bracelets. It bridges metaphysical crystal craft with precision jewelry configuration, automated manufacturing-cost calculations, product SKU management, persistent collections, and cross-device sharing.

The platform provides artisans, jewelry brands, and customers with an uncluttered, photorealistic canvas visualizer, automatic price calculations based on authentic raw gemstone costs and operational overheads, and full data portability without requiring a backend database.

---

## 2. Core User Personas

| Persona | Goal | Key Feature Needs |
| :--- | :--- | :--- |
| **Custom Jewelry Designer / Artisan** | Design bespoke gemstone bracelets, test color palettes & bead counts. | 3D-feel canvas visualizer, drag & drop, symmetry tools, chakra balance meters. |
| **Brand Owner / Store Admin** | Catalog SKUs, compute dynamic pricing & profit margins, manage inventory specs. | Automatic price calculations based on CSV formulas, SKU generator, BOM export, printable spec sheets. |
| **eCommerce Customer / Buyer** | Customize bracelets to fit exact wrist size, inspect stone healing properties, share designs. | Wrist circumference calculator, stone encyclopedia, shareable URL links. |

---

## 3. Detailed Feature Specifications

### 3.1. Photorealistic Gemstone Canvas Engine
- **Procedural Shaders for 24 Authentic Materials**:
  - *Crystals*: Citrine, Amethyst, Lapis Lazuli, Red Jasper, Red Aventurine, Green Aventurine / Jade, Clear Quartz, Rose Quartz, Sunstone, Sodalite, Firoza (Turquoise), Moss Agate, Amber.
  - *Protective & Special*: Tiger Eye (chatoyancy), Raw Pyrite (metallic brass glint), Hematite (mirror gunmetal), Black Obsidian (glossy volcanic glass), Lava Marble (porous craters), Cat Eyes (luminous slit).
  - *Precious*: Blue Sapphire, Ruby, Green Radiance Emerald.
  - *Accents & Amulets*: Evil Eyes (concentric Nazar eye rings), Blade / Spacer Charm (metallic bevel).
- **Physical Bracelet Geometry**:
  - Dynamic bead count ("Bits"): 14 to 32 beads.
  - Bead diameters: 6mm, 8mm, 10mm, 12mm.
  - Estimated wrist circumference calculation: $\approx (\text{Bits} \times (\text{Diameter} + 0.4)) / 10 \text{ cm}$.
  - Custom cord types: Clear Elastic, Black Braided Silk, Metallic Gold Wire, Metallic Silver Wire, Sacred Red Thread, Tan Leather.
  - 360° rotation, left-to-right symmetry mirror, bead slot numbering, linear sequence ribbon.

---

### 3.2. Automated Multi-Tier Pricing Engine
Derived directly from the project's financial cost breakdown specifications (`AuraSources Price - Price Backdown.csv` & `AuraSources Price - Stone Price.csv`).

#### 3.2.1. Stone Unit Price Catalog (`Stone Price.csv`)
| Gemstone / Material | Unit Cost (₹) | Category |
| :--- | :--- | :--- |
| **Black Obsidian** | ₹1.25 | Protective Volcanic Glass |
| **Lava Marble** | ₹1.50 | Basaltic Porous Stone |
| **Green Aventurine / Jade** | ₹2.50 | Prosperity Crystal |
| **Tiger Eye** | ₹2.50 | Chatoyant Protective Stone |
| **Rose Quartz** | ₹2.50 | Heart Crystal |
| **Raw Pyrite** | ₹3.25 | Metallic Abundance Stone |
| **Citrine** | ₹9.00 | Golden Solar Crystal |
| **Amethyst** | ₹10.00 | Spiritual Quartz |
| **Lapis Lazuli** | ₹10.00 | Celestial Royal Stone |
| **Red Jasper** | ₹10.00 | Grounding Nurturer |
| **Red Aventurine** | ₹10.00 | Vitality Quartz |
| **Hematite** | ₹10.00 | Gunmetal Mind Shield |
| **Clear Quartz** | ₹10.00 | Master Healer Quartz |
| **Sunstone** | ₹10.00 | Solar Schiller Gem |
| **Sodalite** | ₹10.00 | Denim Indigo Stone |
| **Firoza (Turquoise)** | ₹10.00 | Sky Talisman |
| **Evil Eyes (Amulet)** | ₹10.00 | Nazar Glass Protection Bead |
| **Moss Agate** | ₹10.00 | Dendritic Botanical Gem |
| **Cat Eyes** | ₹10.00 | Chatoyant Vision Gem |
| **Blade / Spacer** | ₹10.00 | Metallic Accent Spacer |
| **Blue Sapphire** | ₹10.00 | Celestial Royal Gem |
| **Ruby** | ₹10.00 | Crimson Corundum |
| **Green Radiance Emerald** | ₹10.00 | Beryl Radiance Gem |
| **Amber** | ₹10.00 | Fossilized Sun Resin |

#### 3.2.2. Cost Stack & Pricing Formulas (`Price Backdown.csv`)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Raw Gems Cost = Sum of (Stone Quantity × Unit Cost)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Packaging & Materials Cost = ₹50                         │
│    • Certificate: ₹5                                        │
│    • Gift/Jute Bag: ₹15                                     │
│    • High-Tensile Elastic / Cord: ₹10                       │
│    • Box with Custom Brand Printing: ₹20                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Product Base Cost (Raw Manufacturing Cost)               │
│    = Raw Gems Cost + Packaging Cost (₹50)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Total Logistics & Shipment Cost = ₹57                    │
│    • Courier Shipment: ₹45                                  │
│    • Security Sticker: ₹2                                   │
│    • Tamper-proof Shipment Bag: ₹10                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Operating Overheads & Reserves                           │
│    • Return & Damage Reserve: ₹50                           │
│    • Marketing Acquisition Base: ₹50                        │
│    • 10% Discount & Promo Allowance: Dynamic (10% of MRP)   │
│      Formula: Discount Allowance = 0.10 × MRP               │
│    • Subtotal Overheads = ₹100 + (10% of MRP)               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Total Landed Product Cost = Base Cost + Logistics + Ovh. │
│    = (Raw Gems + ₹50) + ₹57 + [₹100 + (10% of MRP)]         │
│    = Raw Gems Cost + ₹207 + (10% of MRP)                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Final Selling Price = Total Landed Cost + Profit Margin  │
│    = Total Landed Cost + ₹200 (Default Target Profit)       │
│    = Raw Gems Cost + ₹407 + (10% of MRP)                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. Recommended MRP (Maximum Retail Price)                   │
│    = Dynamic Anchor Price: Selling Price / (1 - 0.10)       │
│      Rounded up to clean retail anchor (e.g., ₹749, ₹799)   │
│    • Discount Allowance = 10% of MRP (e.g. ₹75 on ₹749 MRP) │
└─────────────────────────────────────────────────────────────┘
```

> [!NOTE]
> **Full Parameter Configurability**:
> 100% of the cost components above (Packaging, Logistics, Overheads, Discount %, Target Profit, MRP Rounding Anchor, and individual Stone Unit Rates) are fully configurable by the user/admin via a dedicated **Cost Settings Configurator** with `localStorage` persistence and a 1-click **"Reset to CSV Defaults"** capability.

---

### 3.3. SKU & Product Catalog Management
- **Deterministic SKU Generation Algorithm**:
  - Pattern: `AC-[PRIMARY_STONE_1]-[PRIMARY_STONE_2]-[BITS]B-[SIZE]MM-[VARIANT]`
  - Example: `AC-CIT-AME-22B-8MM-001` (AuraCraft • Citrine / Amethyst • 22 Beads • 8mm • Variant 001).
- **Product Metadata Entity**:
  - `id`: Unique UUID / timestamp identifier.
  - `sku`: Standardized product SKU string.
  - `title`: User-friendly product title (e.g., *"Solar Abundance & Intuition Bracelet"*).
  - `category`: Primary intent tag (`Wealth`, `Protection`, `Love`, `Chakra`, `Zodiac`, `Custom`).
  - `status`: Lifecycle tag (`Active`, `Draft`, `Sample`, `Archived`).
  - `beads`: Array of stone IDs.
  - `beadSize`: 6, 8, 10, or 12 mm.
  - `cordType`: Cord identifier string.
  - `pricing`: Snapshot of gems cost, base cost, landed cost, selling price, and MRP.
  - `createdAt` / `updatedAt`: ISO Timestamps.

---

### 3.4. LocalStorage Collection & Persistence
- **Storage Schema**: Key `auracraft_collections` storing a JSON serialized array of Product Metadata Entities.
- **Visual Card Gallery Modal**:
  - Live mini canvas rendering of each saved bracelet.
  - Search by SKU, title, or stone name; filter by intent category or status.
  - 1-click **Load into Studio**, **Duplicate**, **Edit Metadata**, and **Delete**.
  - Local storage quota health monitoring.

---

### 3.5. Backup, Restore & Cross-Device Sharing
- **Full JSON Backup & Export**:
  - One-click download of `auracraft_backup_[DATE].json` containing the entire catalog, saved designs, and pricing presets.
- **JSON Restore & Merge Engine**:
  - Drag-and-drop file upload with schema verification, conflict detection, and *Merge* or *Replace* options.
- **Compressed Shareable URL Hash (`#design=...`)**:
  - Encodes the complete bracelet state (bead sequence, diameter, cord, SKU, title) into a URL hash parameter.
  - Instant cross-device hydration without server-side storage dependencies.
- **Printable Specification Sheet**:
  - Print / PDF layout including high-resolution canvas render, SKU barcode, Bill of Materials, and cost breakdown tree.

---

## 4. Technical Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Presentation Layer (UI)                   │
│  • HTML5 Canvas Stage  • Minimal Graphite / Champagne CSS3  │
│  • Floating Toolbars   • Modals (Pricing, Collection, Share) │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                   AuraCraft Application Core                 │
├──────────────────────────────┬───────────────────────────────┤
│ • BraceletCanvasEngine       │ Procedural bead rendering &   │
│                              │ 3D spherical lighting         │
├──────────────────────────────┼───────────────────────────────┤
│ • PricingEngine              │ Real-time CSV pricing matrix, │
│                              │ landed cost, margins & MRP    │
├──────────────────────────────┼───────────────────────────────┤
│ • SKUManager                 │ Deterministic SKU generation  │
│                              │ & metadata management         │
├──────────────────────────────┼───────────────────────────────┤
│ • StorageManager             │ LocalStorage CRUD, JSON       │
│                              │ export/import & URL hashing   │
└──────────────────────────────┴───────────────────────────────┘
```

---

## 5. Success Metrics & Non-Functional Requirements
1. **Performance**: Real-time canvas redraw and pricing calculation in $< 16\text{ms}$ (60 FPS).
2. **Portability**: 100% client-side functionality with zero backend API dependencies.
3. **Accuracy**: Precise cost calculation matching CSV reference outputs down to ₹0.01 precision.
4. **Usability**: Clean, uncluttered modern luxury UI adhering to fine jewelry studio aesthetics.
