/**
 * AuraCraft — Luxury Gemstone Bracelet Studio
 * Interactive Canvas & Dynamic Multi-Tier Pricing Engine (Epic 1)
 */

// ============================================================================
// 1. Gemstone Database (All 24 Materials with CSV Baseline Unit Rates)
// ============================================================================
const STONES_DB = [
  {
    id: 'citrine',
    name: 'Citrine',
    unitPrice: 9.00,
    category: 'crystals',
    chakra: 'Solar Plexus',
    chakraColor: '#ecc94b',
    zodiac: 'Aries, Gemini, Leo',
    element: 'Fire',
    alias: "The Merchant's Stone",
    description: "Carries the power of the sun. Excellent for manifestation, abundance, personal willpower, and mental clarity.",
    affirmation: "I radiate joyful optimism, wealth, and boundless confidence.",
    baseColor: '#e5a522',
    highlightColor: '#fff3b0',
    deepColor: '#8f5c0b',
    glowColor: 'rgba(245, 180, 50, 0.45)',
    type: 'gem'
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Crown & Third Eye',
    chakraColor: '#9f7aea',
    zodiac: 'Aquarius, Pisces, Virgo',
    element: 'Air / Spirit',
    alias: 'Stone of Spiritual Awakening',
    description: "A master tranquilizer stone providing peaceful meditation, emotional equilibrium, sobriety, and psychic intuition.",
    affirmation: "My mind is calm, clear, and attuned to higher wisdom.",
    baseColor: '#6d3f9e',
    highlightColor: '#d6b3ff',
    deepColor: '#2b1049',
    glowColor: 'rgba(159, 122, 234, 0.4)',
    type: 'gem'
  },
  {
    id: 'lapis-lazuli',
    name: 'Lapis Lazuli',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Throat & Third Eye',
    chakraColor: '#3182ce',
    zodiac: 'Sagittarius, Libra',
    element: 'Water / Air',
    alias: 'Stone of Royalty & Truth',
    description: "Deep celestial blue flecked with golden pyrite. Awakens truthful self-expression, royal wisdom, and enlightenment.",
    affirmation: "I speak my truth with clarity, honour, and conviction.",
    baseColor: '#1d3e8f',
    highlightColor: '#6b92e8',
    deepColor: '#0a1740',
    glowColor: 'rgba(37, 99, 235, 0.4)',
    type: 'lapis'
  },
  {
    id: 'red-jasper',
    name: 'Red Jasper',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Root',
    chakraColor: '#e53e3e',
    zodiac: 'Aries, Scorpio',
    element: 'Earth / Fire',
    alias: 'Supreme Nurturer',
    description: "Grounding, deeply stabilizing red stone that sustains during stressful times, fortifying stamina and courage.",
    affirmation: "I am firmly grounded, energized, and protected.",
    baseColor: '#9b2c2c',
    highlightColor: '#df6666',
    deepColor: '#4c1212',
    glowColor: 'rgba(229, 62, 62, 0.35)',
    type: 'opaque'
  },
  {
    id: 'red-aventurine',
    name: 'Red Aventurine',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Root & Sacral',
    chakraColor: '#ed8936',
    zodiac: 'Aries, Cancer',
    element: 'Fire',
    alias: 'Stone of Vitality & Manifestation',
    description: "Fiery shimmering quartz containing hematite and mica platelets, igniting passion, vitality, and creativity.",
    affirmation: "My passion fuels inspired creative action and limitless vitality.",
    baseColor: '#c05621',
    highlightColor: '#fbd38d',
    deepColor: '#652b19',
    glowColor: 'rgba(237, 137, 54, 0.4)',
    type: 'shimmer'
  },
  {
    id: 'green-aventurine',
    name: 'Green Aventurine / Jade',
    unitPrice: 2.50,
    category: 'crystals',
    chakra: 'Heart',
    chakraColor: '#38a169',
    zodiac: 'Taurus, Virgo',
    element: 'Earth',
    alias: 'Stone of Opportunity',
    description: "The luckiest of all crystals, associated with prosperity, emotional heart healing, and joyful serendipity.",
    affirmation: "I attract endless good fortune, love, and growth into my life.",
    baseColor: '#2f855a',
    highlightColor: '#9ae6b4',
    deepColor: '#1c4532',
    glowColor: 'rgba(72, 187, 120, 0.4)',
    type: 'jade'
  },
  {
    id: 'tiger-eye',
    name: 'Tiger Eye',
    unitPrice: 2.50,
    category: 'protective',
    chakra: 'Solar Plexus & Root',
    chakraColor: '#d69e2e',
    zodiac: 'Capricorn, Leo',
    element: 'Earth / Fire',
    alias: 'The Golden Shapeshifter',
    description: "Famous for its silky golden-brown chatoyancy bands. Enhances focus, unshakeable courage, and sharp discernment.",
    affirmation: "I am courageous, focused, and confident in my power.",
    baseColor: '#78350f',
    highlightColor: '#fbbf24',
    deepColor: '#341505',
    glowColor: 'rgba(217, 119, 6, 0.4)',
    type: 'tigereye'
  },
  {
    id: 'raw-pyrite',
    name: 'Raw Pyrite',
    unitPrice: 3.25,
    category: 'protective',
    chakra: 'Solar Plexus',
    chakraColor: '#d4af37',
    zodiac: 'Leo',
    element: 'Earth / Fire',
    alias: "Fool's Gold (Abundance Shield)",
    description: "Gleaming brassy-gold metallic stone. Creates a defensive energy shield while drawing financial prosperity.",
    affirmation: "I welcome wealth, magnetic opportunity, and divine protection.",
    baseColor: '#b49742',
    highlightColor: '#fff5c0',
    deepColor: '#594411',
    glowColor: 'rgba(212, 175, 55, 0.5)',
    type: 'pyrite'
  },
  {
    id: 'hematite',
    name: 'Hematite',
    unitPrice: 10.00,
    category: 'protective',
    chakra: 'Root',
    chakraColor: '#718096',
    zodiac: 'Aquarius, Aries',
    element: 'Earth',
    alias: 'The Mirror Mind Shield',
    description: "High-sheen gunmetal metallic stone. Deflects negative energies and tethers scattered wandering thoughts to Earth.",
    affirmation: "I am centered, fully present, and protected by an unyielding shield.",
    baseColor: '#334155',
    highlightColor: '#cbd5e1',
    deepColor: '#0f172a',
    glowColor: 'rgba(148, 163, 184, 0.35)',
    type: 'hematite'
  },
  {
    id: 'clear-quartz',
    name: 'Clear Quartz',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Crown (All Chakras)',
    chakraColor: '#e2e8f0',
    zodiac: 'All Zodiac Signs',
    element: 'Spirit',
    alias: 'The Master Healer',
    description: "Pure prismatic quartz crystal that amplifies the vibrational frequency of all adjacent stones and crystal intentions.",
    affirmation: "My thoughts are crystal clear, pure, and aligned with light.",
    baseColor: '#e0f2fe',
    highlightColor: '#ffffff',
    deepColor: '#94a3b8',
    glowColor: 'rgba(255, 255, 255, 0.5)',
    type: 'clear-quartz'
  },
  {
    id: 'rose-quartz',
    name: 'Rose Quartz',
    unitPrice: 2.50,
    category: 'crystals',
    chakra: 'Heart',
    chakraColor: '#ed64a6',
    zodiac: 'Taurus, Libra',
    element: 'Water',
    alias: 'Stone of Unconditional Love',
    description: "Gentle translucent pink crystal of tenderness, universal love, emotional healing, compassion, and inner peace.",
    affirmation: "My heart is open to giving and receiving unconditional love.",
    baseColor: '#f472b6',
    highlightColor: '#fdf2f8',
    deepColor: '#9d174d',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    type: 'rose-quartz'
  },
  {
    id: 'sunstone',
    name: 'Sunstone',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Sacral & Solar Plexus',
    chakraColor: '#f6ad55',
    zodiac: 'Leo, Libra',
    element: 'Fire',
    alias: 'Stone of Benevolent Leadership',
    description: "Peachy-gold stone filled with copper inclusions that glitter like sunbursts, cultivating leadership and optimism.",
    affirmation: "I let my inner light and personal power shine brightly.",
    baseColor: '#ea580c',
    highlightColor: '#ffedd5',
    deepColor: '#7c2d12',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    type: 'sunstone'
  },
  {
    id: 'sodalite',
    name: 'Sodalite',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Throat & Third Eye',
    chakraColor: '#4299e1',
    zodiac: 'Sagittarius',
    element: 'Water / Air',
    alias: 'Stone of Logic & Intuition',
    description: "Royal denim blue laced with stark white calcite veins. Unites logical analysis with spiritual intuition.",
    affirmation: "I trust my intuition and express my knowledge with clarity.",
    baseColor: '#1e3a8a',
    highlightColor: '#bfdbfe',
    deepColor: '#0f172a',
    glowColor: 'rgba(30, 58, 138, 0.4)',
    type: 'sodalite'
  },
  {
    id: 'black-obsidian',
    name: 'Black Obsidian',
    unitPrice: 1.25,
    category: 'protective',
    chakra: 'Root',
    chakraColor: '#2d3748',
    zodiac: 'Scorpio, Sagittarius',
    element: 'Fire / Earth',
    alias: 'Volcanic Soul Mirror',
    description: "Glossy jet-black natural volcanic glass. Powerful psychic vacuum cleaner that cleanses auric cords and smog.",
    affirmation: "I release all negative attachments and stand strong in my light.",
    baseColor: '#0f172a',
    highlightColor: '#475569',
    deepColor: '#020617',
    glowColor: 'rgba(30, 41, 59, 0.6)',
    type: 'obsidian'
  },
  {
    id: 'firoza',
    name: 'Firoza (Turquoise)',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Throat',
    chakraColor: '#38b2ac',
    zodiac: 'Sagittarius, Pisces',
    element: 'Earth / Air',
    alias: 'Sacred Sky Talisman',
    description: "Revered sacred stone of cyan-turquoise hues with dark matrix webbing. Wards against misfortune and travel hazards.",
    affirmation: "I am protected, prosperous, and connected to the heavens.",
    baseColor: '#0891b2',
    highlightColor: '#67e8f9',
    deepColor: '#164e63',
    glowColor: 'rgba(8, 145, 178, 0.45)',
    type: 'turquoise'
  },
  {
    id: 'evil-eyes',
    name: 'Evil Eyes (Amulet)',
    unitPrice: 10.00,
    category: 'accents',
    chakra: 'Third Eye',
    chakraColor: '#3182ce',
    zodiac: 'All Zodiac Signs',
    element: 'Spirit',
    alias: 'Nazar Protection Talisman',
    description: "Classic ocular glass amulet featuring concentric sapphire, sky blue, and white rings with a central pupil to repel ill-wishes.",
    affirmation: "Envy and harm bounce off my aura; only harmony enters.",
    baseColor: '#1d4ed8',
    highlightColor: '#ffffff',
    deepColor: '#020617',
    glowColor: 'rgba(29, 78, 216, 0.5)',
    type: 'evileye'
  },
  {
    id: 'lava-marble',
    name: 'Lava Marble',
    unitPrice: 1.50,
    category: 'protective',
    chakra: 'Root',
    chakraColor: '#4a5568',
    zodiac: 'Taurus, Cancer',
    element: 'Fire / Earth',
    alias: 'Volcanic Core Stone',
    description: "Porous basaltic volcanic stone with natural micro-craters. Superb for grounding fierce primal emotions and diffusing essential oils.",
    affirmation: "I channel raw primal power into serene stability.",
    baseColor: '#18181b',
    highlightColor: '#3f3f46',
    deepColor: '#09090b',
    glowColor: 'rgba(39, 39, 42, 0.4)',
    type: 'lavastone'
  },
  {
    id: 'moss-agate',
    name: 'Moss Agate',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Heart',
    chakraColor: '#2f855a',
    zodiac: 'Virgo, Gemini',
    element: 'Earth',
    alias: 'Gardener’s Earth Amulet',
    description: "Translucent quartz laced with dendritic forest-green moss minerals. Inspires new beginnings, botanical vitality, and wealth.",
    affirmation: "I grow in harmony with nature and blossom with abundance.",
    baseColor: '#14532d',
    highlightColor: '#86efac',
    deepColor: '#052e16',
    glowColor: 'rgba(20, 83, 45, 0.4)',
    type: 'mossagate'
  },
  {
    id: 'cat-eyes',
    name: 'Cat Eyes',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Solar Plexus',
    chakraColor: '#d69e2e',
    zodiac: 'Gemini, Leo',
    element: 'Air / Fire',
    alias: 'Chatoyant Vision Gem',
    description: "Translucent stone displaying a sharp, luminous slit of light across its center, bringing good luck and sharp intuition.",
    affirmation: "I see through illusion with razor-sharp perception and grace.",
    baseColor: '#a16207',
    highlightColor: '#fef08a',
    deepColor: '#451a03',
    glowColor: 'rgba(161, 98, 7, 0.45)',
    type: 'cateyes'
  },
  {
    id: 'blade',
    name: 'Blade / Charm',
    unitPrice: 10.00,
    category: 'accents',
    chakra: 'Root',
    chakraColor: '#a0aec0',
    zodiac: 'All Zodiac Signs',
    element: 'Metal / Air',
    alias: 'Sleek Metallic Accent',
    description: "Sleek faceted metallic spacer bead that adds modern luxury contrast and separates gemstone vibrational signatures.",
    affirmation: "I cut away stagnation and maintain pristine energetic boundaries.",
    baseColor: '#94a3b8',
    highlightColor: '#ffffff',
    deepColor: '#334155',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    type: 'blade'
  },
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire',
    unitPrice: 10.00,
    category: 'precious',
    chakra: 'Third Eye & Throat',
    chakraColor: '#2b6cb0',
    zodiac: 'Virgo, Libra, Sagittarius',
    element: 'Water',
    alias: 'Stone of Celestial Destiny',
    description: "Magnificent royal sapphire of deep celestial brilliance. Brings mental discipline, prophetic insight, and celestial blessings.",
    affirmation: "My mind is focused, disciplined, and guided by celestial truth.",
    baseColor: '#1e40af',
    highlightColor: '#93c5fd',
    deepColor: '#0c1a40',
    glowColor: 'rgba(30, 64, 175, 0.55)',
    type: 'precious-sapphire'
  },
  {
    id: 'ruby',
    name: 'Ruby',
    unitPrice: 10.00,
    category: 'precious',
    chakra: 'Root & Heart',
    chakraColor: '#c53030',
    zodiac: 'Aries, Leo, Scorpio',
    element: 'Fire',
    alias: 'The King of Precious Gems',
    description: "Radiant crimson pigeon-blood corundum stone glowing with passionate life-force energy, romantic fervor, and royal sovereignty.",
    affirmation: "I am ablaze with passion, vitality, and royal confidence.",
    baseColor: '#be123c',
    highlightColor: '#fda4af',
    deepColor: '#4c0519',
    glowColor: 'rgba(190, 18, 60, 0.55)',
    type: 'precious-ruby'
  },
  {
    id: 'emerald',
    name: 'Green Radiance Emerald',
    unitPrice: 10.00,
    category: 'precious',
    chakra: 'Heart',
    chakraColor: '#276749',
    zodiac: 'Taurus, Gemini, Aries',
    element: 'Earth',
    alias: 'Stone of Successful Love',
    description: "Glorious luminous green beryl prized through centuries for fostering unconditional love, harmony, and youthful rebirth.",
    affirmation: "My heart radiates pure harmony, eternal abundance, and joy.",
    baseColor: '#047857',
    highlightColor: '#a7f3d0',
    deepColor: '#022c22',
    glowColor: 'rgba(4, 120, 87, 0.55)',
    type: 'precious-emerald'
  },
  {
    id: 'amber',
    name: 'Amber',
    unitPrice: 10.00,
    category: 'crystals',
    chakra: 'Sacral & Solar Plexus',
    chakraColor: '#dd6b20',
    zodiac: 'Leo, Aquarius',
    element: 'Earth / Fire',
    alias: 'Fossilized Golden Sunlight',
    description: "Ancient fossilized tree resin holding prehistoric solar vitality. Draws disease and sorrow out of the physical body.",
    affirmation: "I draw upon ancient Earth wisdom for healing and warmth.",
    baseColor: '#b45309',
    highlightColor: '#fef3c7',
    deepColor: '#451a03',
    glowColor: 'rgba(180, 83, 9, 0.5)',
    type: 'amber'
  }
];

// Curated Design Presets
const PRESETS = {
  chakra: [
    'amethyst', 'blue-sapphire', 'sodalite', 'green-aventurine', 'citrine', 'red-aventurine', 'red-jasper', 'hematite'
  ],
  wealth: [
    'raw-pyrite', 'citrine', 'tiger-eye', 'green-aventurine', 'citrine', 'raw-pyrite', 'amber'
  ],
  protection: [
    'black-obsidian', 'lava-marble', 'evil-eyes', 'hematite', 'tiger-eye', 'blade'
  ],
  love: [
    'rose-quartz', 'emerald', 'green-aventurine', 'ruby', 'rose-quartz', 'clear-quartz'
  ],
  clarity: [
    'clear-quartz', 'amethyst', 'lapis-lazuli', 'sodalite', 'blade'
  ],
  royal: [
    'blue-sapphire', 'ruby', 'emerald', 'amber', 'raw-pyrite'
  ]
};

// ============================================================================
// 2. PricingEngine (Epic 1: 100% Configurable Multi-Tier Pricing Logic)
// ============================================================================
const DEFAULT_PRICING_CONFIG = {
  packaging: {
    certificate: 5.00,
    giftBag: 15.00,
    elastic: 10.00,
    boxPrinting: 20.00
  },
  logistics: {
    shipment: 45.00,
    sticker: 2.00,
    shipmentBag: 10.00
  },
  overheads: {
    returnDamage: 50.00,
    marketingBase: 50.00,
    discountPct: 0.10 // 10% of MRP
  },
  margin: {
    targetProfit: 200.00,
    mrpAnchorMode: '49_99' // '49_99' | 'nearest_50' | 'nearest_10' | 'exact'
  },
  stoneRates: {} // Custom stone ID overrides
};

class PricingEngine {
  static STORAGE_KEY = 'auracraft_pricing_config';
  static config = PricingEngine.loadConfig();

  static loadConfig() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(PricingEngine.STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            packaging: { ...DEFAULT_PRICING_CONFIG.packaging, ...parsed.packaging },
            logistics: { ...DEFAULT_PRICING_CONFIG.logistics, ...parsed.logistics },
            overheads: { ...DEFAULT_PRICING_CONFIG.overheads, ...parsed.overheads },
            margin: { ...DEFAULT_PRICING_CONFIG.margin, ...parsed.margin },
            stoneRates: { ...DEFAULT_PRICING_CONFIG.stoneRates, ...parsed.stoneRates }
          };
        }
      }
    } catch (e) {
      console.warn('Could not read pricing config from localStorage, using defaults:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_PRICING_CONFIG));
  }

  static saveConfig(newConfig) {
    PricingEngine.config = JSON.parse(JSON.stringify(newConfig));
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(PricingEngine.STORAGE_KEY, JSON.stringify(PricingEngine.config));
      }
    } catch (e) {
      console.error('Failed to persist pricing config:', e);
    }
  }

  static resetToDefaults() {
    PricingEngine.config = JSON.parse(JSON.stringify(DEFAULT_PRICING_CONFIG));
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(PricingEngine.STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to reset pricing config:', e);
    }
  }

  static getStoneRate(stoneId) {
    if (PricingEngine.config.stoneRates && PricingEngine.config.stoneRates[stoneId] !== undefined) {
      return parseFloat(PricingEngine.config.stoneRates[stoneId]);
    }
    const stone = STONES_DB.find(s => s.id === stoneId);
    return stone ? stone.unitPrice : 10.00;
  }

  static roundToAnchor(val, mode = '49_99') {
    val = Math.max(0, val);
    switch (mode) {
      case 'nearest_10':
        return Math.ceil(val / 10) * 10 - 1;
      case 'nearest_50':
        return Math.ceil(val / 50) * 50 - 1;
      case 'exact':
        return Math.round(val * 100) / 100;
      case '49_99':
      default: {
        // Round to nearest ending in 49 or 99
        const base = Math.floor(val / 100) * 100;
        const rem = val - base;
        if (rem <= 49) return base + 49;
        if (rem <= 99) return base + 99;
        return base + 149;
      }
    }
  }

  static calculate(beads = [], customConfig = null) {
    const cfg = customConfig || PricingEngine.config;

    // 1. Raw Gems Cost & Stone Breakdown
    const stoneCounts = {};
    beads.forEach(id => stoneCounts[id] = (stoneCounts[id] || 0) + 1);

    let rawGemsCost = 0;
    const stoneBreakdown = [];

    Object.entries(stoneCounts).forEach(([id, count]) => {
      const stone = STONES_DB.find(s => s.id === id) || { name: id, unitPrice: 10.00 };
      const rate = (cfg.stoneRates && cfg.stoneRates[id] !== undefined) ? parseFloat(cfg.stoneRates[id]) : stone.unitPrice;
      const lineTotal = count * rate;
      rawGemsCost += lineTotal;

      stoneBreakdown.push({
        id,
        name: stone.name,
        unitPrice: rate,
        count,
        total: lineTotal
      });
    });

    // Sort stones by total descending
    stoneBreakdown.sort((a, b) => b.total - a.total);

    // 2. Packaging & Materials Subtotal
    const pkg = cfg.packaging || DEFAULT_PRICING_CONFIG.packaging;
    const packagingSubtotal = (pkg.certificate || 0) + (pkg.giftBag || 0) + (pkg.elastic || 0) + (pkg.boxPrinting || 0);

    // 3. Product Base Cost (Raw Manufacturing)
    const productBaseCost = rawGemsCost + packagingSubtotal;

    // 4. Logistics & Delivery Subtotal
    const log = cfg.logistics || DEFAULT_PRICING_CONFIG.logistics;
    const logisticsSubtotal = (log.shipment || 0) + (log.sticker || 0) + (log.shipmentBag || 0);

    // 5. Operating Overheads (Fixed Base)
    const ovh = cfg.overheads || DEFAULT_PRICING_CONFIG.overheads;
    const fixedOverheads = (ovh.returnDamage || 0) + (ovh.marketingBase || 0);
    const discountPct = parseFloat(ovh.discountPct ?? 0.10);

    // 6. Target Profit
    const margin = cfg.margin || DEFAULT_PRICING_CONFIG.margin;
    const targetProfit = parseFloat(margin.targetProfit ?? 200.00);

    // 7. Base Subtotal before Discount
    const baseSubtotalBeforeDiscount = productBaseCost + logisticsSubtotal + fixedOverheads + targetProfit;

    // 8. Recommended MRP calculation
    const rawMRP = discountPct < 1 ? (baseSubtotalBeforeDiscount / (1 - discountPct)) : baseSubtotalBeforeDiscount;
    const mrp = PricingEngine.roundToAnchor(rawMRP, margin.mrpAnchorMode || '49_99');

    // 9. Dynamic Discount Amount (10% of MRP)
    const discountAmount = Math.round(mrp * discountPct * 100) / 100;

    // 10. Total Landed Cost
    const totalLandedCost = productBaseCost + logisticsSubtotal + fixedOverheads + discountAmount;

    // 11. Final Selling Price
    const finalSellingPrice = totalLandedCost + targetProfit;
    const savingsAmount = Math.max(0, Math.round((mrp - finalSellingPrice) * 100) / 100);
    const savingsPct = mrp > 0 ? Math.round((savingsAmount / mrp) * 100) : 0;

    return {
      rawGemsCost: Math.round(rawGemsCost * 100) / 100,
      stoneBreakdown,
      packaging: {
        certificate: pkg.certificate,
        giftBag: pkg.giftBag,
        elastic: pkg.elastic,
        boxPrinting: pkg.boxPrinting,
        subtotal: packagingSubtotal
      },
      productBaseCost: Math.round(productBaseCost * 100) / 100,
      logistics: {
        shipment: log.shipment,
        sticker: log.sticker,
        shipmentBag: log.shipmentBag,
        subtotal: logisticsSubtotal
      },
      overheads: {
        returnDamage: ovh.returnDamage,
        marketingBase: ovh.marketingBase,
        discountPct,
        discountAmount,
        fixedSubtotal: fixedOverheads,
        totalSubtotal: fixedOverheads + discountAmount
      },
      margin: {
        targetProfit,
        mrpAnchorMode: margin.mrpAnchorMode
      },
      totalLandedCost: Math.round(totalLandedCost * 100) / 100,
      finalSellingPrice: Math.round(finalSellingPrice * 100) / 100,
      mrp: Math.round(mrp * 100) / 100,
      savingsAmount,
      savingsPct
    };
  }
}

// ============================================================================
// 3. Product & SKU Management Engine (Epic 2)
// ============================================================================
const STONE_SKU_CODES = {
  'citrine': 'CIT',
  'amethyst': 'AME',
  'lapis-lazuli': 'LAP',
  'red-jasper': 'RJA',
  'red-aventurine': 'RAV',
  'green-aventurine': 'GAV',
  'tiger-eye': 'TIG',
  'raw-pyrite': 'PYR',
  'hematite': 'HEM',
  'clear-quartz': 'QUA',
  'rose-quartz': 'RQU',
  'sunstone': 'SUN',
  'sodalite': 'SOD',
  'black-obsidian': 'OBS',
  'firoza': 'TUR',
  'evil-eyes': 'EYE',
  'lava-marble': 'LAV',
  'moss-agate': 'MOS',
  'cat-eyes': 'CAT',
  'blade': 'BLD',
  'blue-sapphire': 'SAP',
  'ruby': 'RUB',
  'emerald': 'EME',
  'amber': 'AMB'
};

class SKUManager {
  static getStoneCode(stoneId) {
    if (!stoneId) return 'MIX';
    return STONE_SKU_CODES[stoneId] || stoneId.substring(0, 3).toUpperCase();
  }

  static getDominantStones(beads) {
    if (!beads || beads.length === 0) return [{ id: 'citrine', count: 0 }];
    const counts = {};
    beads.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count);
  }

  static generateSKU(beads, totalBits = 22, beadDiameterMm = 8, variant = '001') {
    const dominant = this.getDominantStones(beads);
    const primaryCode = this.getStoneCode(dominant[0]?.id);
    const secondaryCode = dominant.length > 1 ? this.getStoneCode(dominant[1]?.id) : primaryCode;
    const bits = totalBits || beads.length || 22;
    const size = beadDiameterMm || 8;
    const varCode = String(variant).padStart(3, '0');
    return `AC-${primaryCode}-${secondaryCode}-${bits}B-${size}MM-${varCode}`;
  }

  static generateTitle(beads, totalBits, beadDiameterMm) {
    const dominant = this.getDominantStones(beads);
    const primaryId = dominant[0]?.id || 'citrine';
    const primaryStone = STONES_DB.find(s => s.id === primaryId) || { name: 'Gemstone' };
    const secondaryId = dominant.length > 1 ? dominant[1].id : null;
    const secondaryStone = secondaryId ? STONES_DB.find(s => s.id === secondaryId) : null;

    const THEME_MAP = {
      'citrine': 'Solar Abundance & Manifestation',
      'amethyst': 'Spiritual Serenity & Wisdom',
      'lapis-lazuli': 'Royal Truth & Enlightenment',
      'red-jasper': 'Root Vitality & Courage',
      'red-aventurine': 'Creative Fire & Vitality',
      'green-aventurine': 'Serendipity & Heart Prosperity',
      'tiger-eye': 'Courage & Grounded Focus',
      'raw-pyrite': 'Golden Wealth & Protection',
      'hematite': 'Grounding & Energy Shield',
      'clear-quartz': 'Master Clarity & Amplification',
      'rose-quartz': 'Unconditional Love & Harmony',
      'sunstone': 'Solar Radiance & Joy',
      'sodalite': 'Harmonious Intuition & Truth',
      'black-obsidian': 'Negative Energy Shield',
      'firoza': 'Sacred Wisdom & Safe Voyage',
      'evil-eyes': 'Aura Ward & Good Fortune',
      'lava-marble': 'Volcanic Strength & Rebirth',
      'moss-agate': 'Earth Grounding & Renewal',
      'cat-eyes': 'Mystic Aura & Intuitive Vision',
      'blade': 'Apex Precision & Willpower',
      'blue-sapphire': 'Celestial Royalty & Truth',
      'ruby': 'Royal Passion & Crown Vitality',
      'emerald': 'Empress Radiance & Heart Wealth',
      'amber': 'Ancient Light & Primordial Healing'
    };

    const theme = THEME_MAP[primaryId] || 'Energy Harmony';
    if (secondaryStone && secondaryStone.id !== primaryId && dominant[1].count > 1) {
      return `${primaryStone.name} & ${secondaryStone.name} ${theme} Bracelet`;
    }
    return `${primaryStone.name} ${theme} Bracelet`;
  }

  static determineCategory(beads) {
    const dominant = this.getDominantStones(beads);
    const primaryId = dominant[0]?.id || 'citrine';
    const CATEGORY_MAP = {
      'citrine': 'wealth',
      'raw-pyrite': 'wealth',
      'green-aventurine': 'wealth',
      'moss-agate': 'wealth',
      'sunstone': 'wealth',
      'red-aventurine': 'wealth',
      'black-obsidian': 'protection',
      'hematite': 'protection',
      'evil-eyes': 'protection',
      'tiger-eye': 'protection',
      'lava-marble': 'protection',
      'red-jasper': 'protection',
      'rose-quartz': 'love',
      'sodalite': 'clarity',
      'clear-quartz': 'clarity',
      'blade': 'clarity',
      'cat-eyes': 'clarity',
      'firoza': 'clarity',
      'amethyst': 'chakra',
      'lapis-lazuli': 'chakra',
      'emerald': 'royal',
      'ruby': 'royal',
      'blue-sapphire': 'royal',
      'amber': 'royal'
    };
    return CATEGORY_MAP[primaryId] || 'custom';
  }
}

// ============================================================================
// 4. LocalStorage Collection Persistence Engine (Epic 3)
// ============================================================================
class StorageManager {
  static STORAGE_KEY = 'auracraft_collections';

  static getAll() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(StorageManager.STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) {
      console.error('StorageManager.getAll failed:', e);
    }
    return [];
  }

  static getById(id) {
    const all = StorageManager.getAll();
    return all.find(item => item.id === id) || null;
  }

  static save(productData) {
    try {
      const all = StorageManager.getAll();
      const now = new Date().toISOString();
      let savedItem = null;

      if (productData.id) {
        const idx = all.findIndex(item => item.id === productData.id);
        if (idx !== -1) {
          savedItem = {
            ...all[idx],
            ...productData,
            updatedAt: now
          };
          all[idx] = savedItem;
        }
      }

      if (!savedItem) {
        const id = productData.id || `ac_prod_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        savedItem = {
          ...productData,
          id,
          createdAt: now,
          updatedAt: now
        };
        all.unshift(savedItem);
      }

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(all));
      }
      return savedItem;
    } catch (e) {
      console.error('StorageManager.save failed:', e);
      return null;
    }
  }

  static delete(id) {
    try {
      const all = StorageManager.getAll();
      const filtered = all.filter(item => item.id !== id);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(filtered));
      }
      return true;
    } catch (e) {
      console.error('StorageManager.delete failed:', e);
      return false;
    }
  }

  static duplicate(id) {
    try {
      const original = StorageManager.getById(id);
      if (!original) return null;

      const all = StorageManager.getAll();
      const variantNumber = all.length + 1;
      const newSku = SKUManager.generateSKU(original.beads, original.totalBits, original.beadDiameterMm, variantNumber);

      const clone = {
        ...JSON.parse(JSON.stringify(original)),
        id: `ac_prod_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        title: `${original.title} (Copy)`,
        sku: newSku,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      all.unshift(clone);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(all));
      }
      return clone;
    } catch (e) {
      console.error('StorageManager.duplicate failed:', e);
      return null;
    }
  }

  static getCount() {
    return StorageManager.getAll().length;
  }

  static seedDefaultsIfEmpty() {
    const existing = StorageManager.getAll();
    if (existing.length === 0) {
      const defaultProducts = [
        {
          id: 'ac_prod_seed_wealth',
          title: 'Citrine & Amethyst Solar Abundance Bracelet',
          sku: 'AC-CIT-AME-22B-8MM-001',
          category: 'wealth',
          status: 'active',
          beads: PRESETS.wealth ? Array.from({ length: 22 }, (_, i) => PRESETS.wealth[i % PRESETS.wealth.length]) : ['citrine', 'amethyst'],
          totalBits: 22,
          beadDiameterMm: 8,
          cordType: 'elastic',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'ac_prod_seed_protection',
          title: 'Obsidian & Hematite Royal Shield Bracelet',
          sku: 'AC-OBS-HEM-22B-8MM-001',
          category: 'protection',
          status: 'active',
          beads: PRESETS.protection ? Array.from({ length: 22 }, (_, i) => PRESETS.protection[i % PRESETS.protection.length]) : ['black-obsidian', 'hematite', 'tiger-eye'],
          totalBits: 22,
          beadDiameterMm: 8,
          cordType: 'elastic',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'ac_prod_seed_chakra',
          title: '7-Chakra Alignment Master Energy Bracelet',
          sku: 'AC-AME-LAP-22B-8MM-001',
          category: 'chakra',
          status: 'active',
          beads: PRESETS.chakra ? Array.from({ length: 22 }, (_, i) => PRESETS.chakra[i % PRESETS.chakra.length]) : ['amethyst', 'lapis-lazuli', 'green-aventurine'],
          totalBits: 22,
          beadDiameterMm: 8,
          cordType: 'elastic',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(defaultProducts));
      }
    }
  }
}

// ============================================================================
// 5. Shareable URL Hash Serialization Engine (Epic 4)
// ============================================================================
class ShareEngine {
  static serialize(studio) {
    const payload = {
      v: 1, // Version
      t: studio.product?.title || 'Custom Gemstone Bracelet',
      s: studio.product?.sku || 'AC-CUS-001',
      cat: studio.product?.category || 'wealth',
      st: studio.product?.status || 'active',
      b: studio.beads || [],
      n: studio.totalBits || 22,
      d: studio.beadDiameterMm || 8,
      c: studio.cordType || 'elastic'
    };
    try {
      const jsonStr = JSON.stringify(payload);
      const encoded = (typeof btoa !== 'undefined') ? btoa(encodeURIComponent(jsonStr)) : (typeof Buffer !== 'undefined' ? Buffer.from(encodeURIComponent(jsonStr)).toString('base64') : '');
      return encoded;
    } catch (e) {
      console.error('ShareEngine.serialize failed:', e);
      return '';
    }
  }

  static deserialize(hashStr) {
    try {
      if (!hashStr) return null;
      const cleanHash = hashStr.replace(/^#?design=/, '').trim();
      if (!cleanHash) return null;
      const jsonStr = (typeof atob !== 'undefined') ? decodeURIComponent(atob(cleanHash)) : (typeof Buffer !== 'undefined' ? decodeURIComponent(Buffer.from(cleanHash, 'base64').toString('utf8')) : '');
      const payload = JSON.parse(jsonStr);

      if (!payload || !Array.isArray(payload.b) || payload.b.length === 0) {
        return null;
      }
      return payload;
    } catch (e) {
      console.error('ShareEngine.deserialize failed:', e);
      return null;
    }
  }

  static generateShareUrl(studio) {
    const hashPayload = ShareEngine.serialize(studio);
    const baseUrl = (typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://auracraft.app/');
    return `${baseUrl}#design=${hashPayload}`;
  }
}

// ============================================================================
// 6. JSON Backup & Restore Engine (Epic 4)
// ============================================================================
class BackupEngine {
  static exportFullBackup() {
    const backupData = {
      app: 'AuraCraft Studio',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      pricingConfig: PricingEngine.config,
      collections: StorageManager.getAll()
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const filename = `auracraft_backup_${new Date().toISOString().slice(0, 10)}.json`;
    
    if (typeof document !== 'undefined') {
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
  }

  static exportActiveProduct(studio) {
    const p = studio.pricing || PricingEngine.calculate(studio.beads);
    const productData = {
      app: 'AuraCraft Single Design',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      product: {
        title: studio.product.title,
        sku: studio.product.sku,
        category: studio.product.category,
        status: studio.product.status,
        beads: [...studio.beads],
        totalBits: studio.totalBits,
        beadDiameterMm: studio.beadDiameterMm,
        cordType: studio.cordType,
        pricing: {
          finalSellingPrice: p.finalSellingPrice,
          mrp: p.mrp,
          rawGemsCost: p.rawGemsCost
        }
      }
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(productData, null, 2));
    const cleanSku = (studio.product.sku || 'design').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `auracraft_${cleanSku}_${Date.now()}.json`;

    if (typeof document !== 'undefined') {
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }
  }

  static parseAndValidate(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { valid: false, error: 'File does not contain a valid JSON object.' };
      }

      let items = [];
      if (Array.isArray(parsed.collections)) {
        items = parsed.collections;
      } else if (parsed.product && Array.isArray(parsed.product.beads)) {
        items = [parsed.product];
      } else if (Array.isArray(parsed)) {
        items = parsed;
      } else if (Array.isArray(parsed.beads)) {
        items = [parsed];
      } else {
        return { valid: false, error: 'No valid AuraCraft collections or product records found.' };
      }

      const validItems = items.filter(item => Array.isArray(item.beads) && item.beads.length > 0);
      if (validItems.length === 0) {
        return { valid: false, error: 'JSON does not contain any valid bracelet bead sequences.' };
      }

      return {
        valid: true,
        items: validItems,
        pricingConfig: parsed.pricingConfig || null,
        count: validItems.length
      };
    } catch (e) {
      return { valid: false, error: `JSON Parse error: ${e.message}` };
    }
  }

  static restoreBackup(validatedData, mode = 'merge') {
    if (!validatedData || !validatedData.valid || !Array.isArray(validatedData.items)) {
      return { success: false, error: 'Invalid data provided to restore.' };
    }

    try {
      if (validatedData.pricingConfig) {
        PricingEngine.saveConfig(validatedData.pricingConfig);
      }

      if (mode === 'replace') {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(validatedData.items));
        }
        return { success: true, count: validatedData.items.length, mode: 'replace' };
      } else {
        const existing = StorageManager.getAll();
        let addedCount = 0;
        let updatedCount = 0;

        validatedData.items.forEach(incoming => {
          const matchIdx = existing.findIndex(ex => ex.id === incoming.id || (ex.sku && ex.sku === incoming.sku));
          if (matchIdx !== -1) {
            existing[matchIdx] = { ...existing[matchIdx], ...incoming, updatedAt: new Date().toISOString() };
            updatedCount++;
          } else {
            const newId = incoming.id || `ac_prod_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
            existing.unshift({
              ...incoming,
              id: newId,
              createdAt: incoming.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            addedCount++;
          }
        });

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(StorageManager.STORAGE_KEY, JSON.stringify(existing));
        }
        return { success: true, added: addedCount, updated: updatedCount, total: existing.length, mode: 'merge' };
      }
    } catch (e) {
      console.error('BackupEngine.restoreBackup error:', e);
      return { success: false, error: e.message };
    }
  }
}

// ============================================================================
// 7. Application State Management
// ============================================================================
class BraceletStudio {
  constructor() {
    this.currentProductId = null; // Track loaded collection ID (Epic 3)
    this.stagedBackupData = null; // Staged JSON backup import state (Epic 4)
    this.totalBits = 22; // Bead count
    this.beadDiameterMm = 8; // Size in mm
    this.cordType = 'elastic';
    this.activeStoneId = 'citrine';
    this.toolMode = 'place'; // 'place' | 'fill' | 'alternate'
    this.alternateSecondaryId = 'amethyst';
    
    // Product & SKU metadata (Epic 2)
    this.product = {
      title: 'Solar Abundance & Manifestation Bracelet',
      sku: 'AC-CIT-AME-22B-8MM-001',
      category: 'wealth',
      status: 'active',
      isCustomTitle: false,
      isCustomSKU: false,
      variant: '001'
    };

    // Bead array: stores stone ID for each bead slot (0 to totalBits - 1)
    this.beads = [];
    this.rotationAngle = 0; // In radians for 3D inspection
    this.showLabels = false;
    this.glowEnabled = false; // Clean, non-glittery look by default
    this.hoveredBeadIndex = -1;
    this.selectedBeadIndex = 0;

    // Multi-View Routing & Collapsible Workspace State (Epic 6)
    this.currentView = 'studio'; // 'studio' | 'gemstones' | 'pricing' | 'collections' | 'specsheet' | 'share-backup'
    this.isPaletteCollapsed = false;
    this.isDetailsCollapsed = false;
    this.isZenMode = false;

    // Pricing snapshot
    this.pricing = null;

    // History for Undo / Redo
    this.history = [];
    this.historyIndex = -1;

    // Drag-and-drop state
    this.draggedStoneId = null;

    // Setup Canvas
    this.canvas = document.getElementById('bracelet-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.init();
  }

  init() {
    // Seed default collection designs if storage is empty
    StorageManager.seedDefaultsIfEmpty();

    // Populate default beads with balanced preset
    this.applyPreset('wealth', false);
    this.saveHistoryState();

    this.renderStonesCatalog();
    this.bindEvents();
    this.initViewRouter();
    this.initSidebarResizers();
    this.initAuthGate();
    this.updateUI();
    this.updateCollectionCountBadge();
    this.drawBracelet();

    // Check for incoming shareable URL hash (#design=...) (Epic 4)
    this.checkAndHydrateUrlHash();
  }

  // ============================================================================
  // History (Undo / Redo)
  // ============================================================================
  saveHistoryState() {
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push({
      beads: [...this.beads],
      totalBits: this.totalBits,
      beadDiameterMm: this.beadDiameterMm,
      cordType: this.cordType,
      product: { ...this.product }
    });
    this.historyIndex = this.history.length - 1;
    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreHistoryState(this.history[this.historyIndex]);
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreHistoryState(this.history[this.historyIndex]);
    }
  }

  restoreHistoryState(state) {
    this.totalBits = state.totalBits;
    this.beadDiameterMm = state.beadDiameterMm;
    this.cordType = state.cordType;
    this.beads = [...state.beads];
    if (state.product) {
      this.product = { ...state.product };
    }
    
    document.getElementById('bits-slider').value = this.totalBits;
    document.getElementById('cord-type-select').value = this.cordType;
    document.querySelectorAll('#bead-size-selector .segment-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.size) === this.beadDiameterMm);
    });

    this.updateUI();
    this.drawBracelet();
    this.updateUndoRedoButtons();
  }

  updateUndoRedoButtons() {
    const undoBtn = document.getElementById('btn-undo');
    const redoBtn = document.getElementById('btn-redo');
    if (undoBtn) undoBtn.disabled = this.historyIndex <= 0;
    if (redoBtn) redoBtn.disabled = this.historyIndex >= this.history.length - 1;
  }

  // ============================================================================
  // Bead Manipulation Methods
  // ============================================================================
  setTotalBits(newCount) {
    newCount = Math.max(14, Math.min(32, parseInt(newCount)));
    if (newCount === this.totalBits) return;

    if (newCount > this.totalBits) {
      while (this.beads.length < newCount) {
        this.beads.push(this.activeStoneId);
      }
    } else {
      this.beads = this.beads.slice(0, newCount);
    }

    this.totalBits = newCount;
    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();
  }

  setBeadAt(index, stoneId) {
    if (index >= 0 && index < this.totalBits) {
      this.beads[index] = stoneId;
      this.saveHistoryState();
      this.updateUI();
      this.drawBracelet();
    }
  }

  fillAllBeads(stoneId) {
    this.beads = Array(this.totalBits).fill(stoneId);
    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();
    this.showToast(`Applied ${this.getStone(stoneId).name} to all beads.`);
  }

  applyAlternatingPattern(stoneA, stoneB) {
    this.beads = Array.from({ length: this.totalBits }, (_, i) => i % 2 === 0 ? stoneA : stoneB);
    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();
    this.showToast(`Applied alternating rhythm (${this.getStone(stoneA).name} & ${this.getStone(stoneB).name}).`);
  }

  applyPreset(presetKey, shouldSaveHistory = true) {
    const pattern = PRESETS[presetKey];
    if (!pattern) return;

    this.beads = Array.from({ length: this.totalBits }, (_, i) => pattern[i % pattern.length]);
    if (shouldSaveHistory) {
      this.saveHistoryState();
    }
    this.updateUI();
    this.drawBracelet();
    this.showToast(`Loaded ${presetKey.toUpperCase()} preset.`);
  }

  applySymmetryMirror() {
    const half = Math.floor(this.totalBits / 2);
    for (let i = 0; i < half; i++) {
      this.beads[this.totalBits - 1 - i] = this.beads[i];
    }
    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();
    this.showToast('Mirrored bracelet symmetry.');
  }

  shiftBeads(direction) {
    if (direction === 'left') {
      const first = this.beads.shift();
      this.beads.push(first);
    } else {
      const last = this.beads.pop();
      this.beads.unshift(last);
    }
    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();
  }

  randomizeHarmonious() {
    const shuffledStones = [...STONES_DB].sort(() => 0.5 - Math.random());
    const paletteSubset = shuffledStones.slice(0, Math.floor(Math.random() * 3) + 3).map(s => s.id);
    
    this.beads = Array.from({ length: this.totalBits }, () => {
      return paletteSubset[Math.floor(Math.random() * paletteSubset.length)];
    });
    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();
    this.showToast('Generated harmonious blend.');
  }

  clearBracelet() {
    this.beads = Array(this.totalBits).fill('clear-quartz');
    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();
    this.showToast('Reset to Clear Quartz.');
  }

  getStone(id) {
    return STONES_DB.find(s => s.id === id) || STONES_DB[0];
  }

  // ============================================================================
  // Canvas Drawing & Shaders Engine
  // ============================================================================
  // ============================================================================
  // Canvas Drawing & Shaders Engine (Supports Custom Beads/Sizes for Thumbs)
  // ============================================================================
  drawBracelet(targetCanvas = this.canvas, customBackground = null, customBeads = null, customBits = null, customDiameter = null, customCord = null) {
    const ctx = targetCanvas.getContext('2d');
    const width = targetCanvas.width;
    const height = targetCanvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const beads = customBeads || this.beads;
    const count = customBits || (customBeads ? customBeads.length : this.totalBits);
    const diameter = customDiameter || this.beadDiameterMm;
    const cord = customCord || this.cordType;

    ctx.clearRect(0, 0, width, height);

    if (customBackground === 'dark' || (!customBackground && targetCanvas === this.canvas)) {
      ctx.fillStyle = '#090b0e';
      ctx.fillRect(0, 0, width, height);
    } else if (customBackground === 'light') {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, width, height);
    }

    const baseRadius = (width * 0.35);
    const beadRadiusPx = (13 + (diameter - 6) * 2.8) * (width / 800);

    // 1. Draw Cord
    this.drawCord(ctx, centerX, centerY, baseRadius, cord);

    // 2. Compute bead coordinates
    const beadSlots = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * ((Math.PI * 2) / count)) + this.rotationAngle - Math.PI / 2;
      const x = centerX + Math.cos(angle) * baseRadius;
      const y = centerY + Math.sin(angle) * (baseRadius * 0.96);
      const z = Math.sin(angle); 
      beadSlots.push({ index: i, stoneId: beads[i] || 'citrine', x, y, angle, z });
    }

    beadSlots.sort((a, b) => a.z - b.z);

    // 3. Render Subtle Bead Shadows
    beadSlots.forEach(slot => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(slot.x + 2, slot.y + 4, beadRadiusPx * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.filter = 'blur(4px)';
      ctx.fill();
      ctx.restore();
    });

    // 4. Render Beads with Natural Satin Shading
    beadSlots.forEach(slot => {
      const stone = this.getStone(slot.stoneId);
      const isHovered = (targetCanvas === this.canvas && slot.index === this.hoveredBeadIndex);
      const isSelected = (targetCanvas === this.canvas && slot.index === this.selectedBeadIndex);

      this.renderRealisticBead(ctx, slot.x, slot.y, beadRadiusPx, stone, isHovered, isSelected);

      if (this.showLabels && targetCanvas === this.canvas) {
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = `500 ${Math.max(10, beadRadiusPx * 0.55)}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 3;
        ctx.fillText(slot.index + 1, slot.x, slot.y);
        ctx.restore();
      }
    });

    if (targetCanvas === this.canvas) {
      this.renderedSlots = beadSlots;
    }
  }

  drawCord(ctx, cx, cy, radius, customCord = null) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.96, 0, 0, Math.PI * 2);

    const cord = customCord || this.cordType;
    switch (cord) {
      case 'black-braided':
        ctx.strokeStyle = '#27272a';
        ctx.lineWidth = 3.5;
        ctx.setLineDash([3, 2]);
        break;
      case 'gold-metallic':
        ctx.strokeStyle = '#b8944d';
        ctx.lineWidth = 2.5;
        break;
      case 'silver-metallic':
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2.5;
        break;
      case 'sacred-red':
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 2.8;
        break;
      case 'leather-brown':
        ctx.strokeStyle = '#573012';
        ctx.lineWidth = 3.5;
        break;
      case 'elastic':
      default:
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        break;
    }

    ctx.stroke();
    ctx.restore();
  }

  renderRealisticBead(ctx, x, y, r, stone, isHovered, isSelected) {
    ctx.save();

    if (this.glowEnabled) {
      const glow = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 1.3);
      glow.addColorStop(0, stone.glowColor);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 1.3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();

    this.drawBeadMaterial(ctx, x, y, r, stone);

    const lightX = x - r * 0.35;
    const lightY = y - r * 0.35;

    const sphereShade = ctx.createRadialGradient(lightX, lightY, r * 0.1, x, y, r);
    sphereShade.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    sphereShade.addColorStop(0.4, 'rgba(255, 255, 255, 0.02)');
    sphereShade.addColorStop(0.75, 'rgba(0, 0, 0, 0.25)');
    sphereShade.addColorStop(1, 'rgba(0, 0, 0, 0.6)');

    ctx.fillStyle = sphereShade;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Clean Specular Highlight
    ctx.beginPath();
    ctx.ellipse(x - r * 0.3, y - r * 0.32, r * 0.22, r * 0.14, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, r * 0.94, Math.PI * 0.2, Math.PI * 0.45);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = r * 0.08;
    ctx.stroke();

    ctx.restore();

    if (isSelected || isHovered) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, r + 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected ? '#c9a96e' : 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.stroke();
      ctx.restore();
    }
  }

  drawBeadMaterial(ctx, x, y, r, stone) {
    const baseGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    baseGrad.addColorStop(0, stone.highlightColor);
    baseGrad.addColorStop(0.5, stone.baseColor);
    baseGrad.addColorStop(1, stone.deepColor);
    ctx.fillStyle = baseGrad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    switch (stone.type) {
      case 'tigereye': {
        ctx.save();
        ctx.rotate(0.3);
        const bandGrad = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
        bandGrad.addColorStop(0, 'rgba(251, 191, 36, 0.8)');
        bandGrad.addColorStop(0.3, 'rgba(120, 53, 15, 0.9)');
        bandGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.85)');
        bandGrad.addColorStop(0.7, 'rgba(69, 26, 3, 0.95)');
        bandGrad.addColorStop(1, 'rgba(217, 119, 6, 0.8)');
        ctx.fillStyle = bandGrad;
        ctx.fillRect(x - r * 1.5, y - r * 1.5, r * 3, r * 3);
        ctx.restore();
        break;
      }
      case 'lapis': {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        ctx.ellipse(x + r * 0.2, y - r * 0.1, r * 0.4, r * 0.15, 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffd700';
        const speckles = [[-0.3, -0.2], [0.1, 0.3], [-0.1, 0.1], [0.35, -0.15], [-0.25, 0.35]];
        speckles.forEach(([dx, dy]) => {
          ctx.beginPath();
          ctx.arc(x + dx * r, y + dy * r, r * 0.06, 0, Math.PI * 2);
          ctx.fill();
        });
        break;
      }
      case 'evileye': {
        ctx.fillStyle = '#1e3a8a';
        ctx.beginPath();
        ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, r * 0.65, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(x, y, r * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#09090b';
        ctx.beginPath();
        ctx.arc(x, y, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'lavastone': {
        ctx.fillStyle = '#09090b';
        const craters = [
          [-0.3, -0.3, 0.12], [0.2, -0.4, 0.09], [0, 0.1, 0.15],
          [-0.4, 0.2, 0.1], [0.3, 0.3, 0.11], [-0.1, -0.2, 0.08]
        ];
        craters.forEach(([cx, cy, cr]) => {
          ctx.beginPath();
          ctx.arc(x + cx * r, y + cy * r, r * cr, 0, Math.PI * 2);
          ctx.fill();
        });
        break;
      }
      case 'turquoise': {
        ctx.strokeStyle = 'rgba(24, 24, 27, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x - r * 0.6, y - r * 0.2);
        ctx.lineTo(x - r * 0.1, y + r * 0.1);
        ctx.lineTo(x + r * 0.4, y - r * 0.3);
        ctx.moveTo(x - r * 0.1, y + r * 0.1);
        ctx.lineTo(x + r * 0.2, y + r * 0.5);
        ctx.stroke();
        break;
      }
      case 'mossagate': {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
        ctx.strokeStyle = '#052e16';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x - r * 0.5, y + r * 0.4);
        ctx.quadraticCurveTo(x, y, x + r * 0.3, y - r * 0.4);
        ctx.moveTo(x - r * 0.1, y + r * 0.1);
        ctx.lineTo(x + r * 0.4, y + r * 0.2);
        ctx.stroke();
        break;
      }
      case 'cateyes': {
        ctx.save();
        const slitGrad = ctx.createLinearGradient(x - r * 0.4, y, x + r * 0.4, y);
        slitGrad.addColorStop(0, 'rgba(254, 240, 138, 0)');
        slitGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
        slitGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = slitGrad;
        ctx.fillRect(x - r * 0.4, y - r, r * 0.8, r * 2);
        ctx.restore();
        break;
      }
      case 'blade': {
        ctx.fillStyle = '#64748b';
        ctx.fillRect(x - r * 0.3, y - r, r * 0.6, r * 2);
        ctx.strokeStyle = '#c9a96e';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - r * 0.3, y - r, r * 0.6, r * 2);
        break;
      }
      case 'clear-quartz': {
        const rainbow = ctx.createLinearGradient(x - r * 0.5, y - r * 0.5, x + r * 0.5, y + r * 0.5);
        rainbow.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
        rainbow.addColorStop(0.3, 'rgba(234, 179, 8, 0.2)');
        rainbow.addColorStop(0.6, 'rgba(34, 197, 94, 0.2)');
        rainbow.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
        ctx.fillStyle = rainbow;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
        break;
      }
      case 'pyrite': {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - r * 0.3, y - r * 0.3, r * 0.5, r * 0.5);
        ctx.strokeRect(x + r * 0.1, y + r * 0.1, r * 0.4, r * 0.4);
        break;
      }
      case 'amber': {
        ctx.fillStyle = 'rgba(254, 243, 199, 0.4)';
        ctx.beginPath();
        ctx.arc(x + r * 0.15, y + r * 0.1, r * 0.15, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
    }
  }

  // =========================================================================  // UI & Catalog Rendering
  // ============================================================================
  renderStonesCatalog(searchQuery = '') {
    const grid = document.getElementById('stones-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const query = (searchQuery || '').trim().toLowerCase();

    const filtered = STONES_DB.filter(stone => {
      if (!query) return true;
      return (
        stone.name.toLowerCase().includes(query) ||
        (stone.chakra && stone.chakra.toLowerCase().includes(query)) ||
        (stone.alias && stone.alias.toLowerCase().includes(query))
      );
    });

    const badge = document.getElementById('stone-count-badge');
    if (badge) badge.textContent = `${filtered.length} Stones`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 32px 8px; color: var(--text-subtle);">
          <i class="fa-solid fa-gem" style="font-size: 1.8rem; opacity: 0.35; margin-bottom: 8px;"></i>
          <p style="font-size: 0.78rem;">No stones found matching "${query}"</p>
        </div>
      `;
      return;
    }

    filtered.forEach(stone => {
      const card = document.createElement('div');
      card.className = `stone-card ${stone.id === this.activeStoneId ? 'active' : ''}`;
      card.dataset.stoneId = stone.id;
      card.draggable = true;

      const miniCanvas = document.createElement('canvas');
      miniCanvas.width = 40;
      miniCanvas.height = 40;
      miniCanvas.className = 'stone-bubble';
      const mctx = miniCanvas.getContext('2d');
      this.renderRealisticBead(mctx, 20, 20, 16, stone, false, false);

      const effectiveRate = PricingEngine.getStoneRate(stone.id);

      card.innerHTML = `
        <div class="stone-title">${stone.name}</div>
        <div class="stone-card-rate">₹${effectiveRate.toFixed(effectiveRate % 1 === 0 ? 0 : 2)}</div>
      `;
      const titleEl = card.querySelector ? card.querySelector('.stone-title') : null;
      if (titleEl && card.insertBefore) {
        card.insertBefore(miniCanvas, titleEl);
      } else if (card.appendChild) {
        card.appendChild(miniCanvas);
      }

      card.addEventListener('click', () => {
        this.selectStone(stone.id);
        if (this.toolMode === 'fill') {
          this.fillAllBeads(stone.id);
        } else if (this.toolMode === 'alternate') {
          this.applyAlternatingPattern(stone.id, this.alternateSecondaryId);
        }
      });

      card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        this.draggedStoneId = stone.id;
        if (e.dataTransfer && e.dataTransfer.setData) {
          e.dataTransfer.setData('text/plain', stone.id);
        }
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        this.draggedStoneId = null;
      });

      grid.appendChild(card);
    });

    this.updateActiveStoneUI();
  }

  selectStone(stoneId) {
    this.alternateSecondaryId = this.activeStoneId;
    this.activeStoneId = stoneId;
    this.updateActiveStoneUI();

    document.querySelectorAll('.stone-card').forEach(c => {
      c.classList.toggle('active', c.dataset.stoneId === stoneId);
    });

    const stone = this.getStone(stoneId);
    if (stone) this.updateDeepDiveCard(stone);
  }

  updateActiveStoneUI() {
    const stone = this.getStone(this.activeStoneId);
    if (!stone) return;
    const effectiveRate = PricingEngine.getStoneRate(stone.id);

    const nameEl = document.getElementById('active-stone-name');
    if (nameEl) nameEl.textContent = stone.name;
    const subEl = document.getElementById('active-stone-subtitle');
    if (subEl) subEl.textContent = `${stone.chakra} • ${stone.alias || 'Natural Crystal'}`;
    const priceEl = document.getElementById('active-stone-price-tag');
    if (priceEl) priceEl.textContent = `₹${effectiveRate.toFixed(2)}`;
    
    const bannerBubble = document.getElementById('active-stone-preview-bubble');
    if (bannerBubble) {
      bannerBubble.innerHTML = '';
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 34;
      bCanvas.height = 34;
      bCanvas.className = 'active-stone-bubble-canvas';
      const bctx = bCanvas.getContext('2d');
      this.renderRealisticBead(bctx, 17, 17, 14, stone, false, false);
      bannerBubble.appendChild(bCanvas);
    }
  }

  updateDeepDiveCard(stone) {
    const effectiveRate = PricingEngine.getStoneRate(stone.id);
    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };
    setTxt('deepdive-name', stone.name);
    setTxt('deepdive-price', `₹${effectiveRate.toFixed(2)} / bead`);
    setTxt('deepdive-alias', stone.alias);
    setTxt('deepdive-desc', stone.description);
    setTxt('deepdive-chakra', stone.chakra);
    setTxt('deepdive-zodiac', stone.zodiac);
    setTxt('deepdive-element', stone.element);
    setTxt('deepdive-affirmation', `"${stone.affirmation}"`);

    const thumb = document.getElementById('deepdive-thumb');
    if (thumb) {
      thumb.innerHTML = '';
      const dCanvas = document.createElement('canvas');
      dCanvas.width = 40;
      dCanvas.height = 40;
      const dctx = dCanvas.getContext('2d');
      this.renderRealisticBead(dctx, 20, 20, 16, stone, false, false);
      thumb.appendChild(dCanvas);
    }
  }

  // ============================================================================
  // Energy Balance & Dynamic Pricing (Epic 1) & Product SKU (Epic 2)
  // ============================================================================
  updateUI() {
    // 1. Calculate dynamic multi-tier pricing
    this.pricing = PricingEngine.calculate(this.beads);

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };
    const setHtml = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };

    // Update Header Ticker
    setTxt('header-selling-price', this.pricing.finalSellingPrice.toFixed(0));
    setTxt('header-mrp-strike', `MRP ₹${this.pricing.mrp.toFixed(0)}`);
    setTxt('header-discount-tag', `Save ₹${this.pricing.savingsAmount.toFixed(0)} (${this.pricing.savingsPct}%)`);

    // Update Sidebar Pricing Quick Card
    setTxt('sidebar-selling-price', this.pricing.finalSellingPrice.toFixed(0));
    setTxt('sidebar-mrp-text', `MRP ₹${this.pricing.mrp.toFixed(0)}`);
    setTxt('sidebar-save-badge', `Save ₹${this.pricing.savingsAmount.toFixed(0)} (${this.pricing.savingsPct}%)`);
    setTxt('sidebar-gems-cost', `₹${this.pricing.rawGemsCost.toFixed(2)}`);
    setTxt('sidebar-pkg-cost', `₹${(this.pricing.packaging.subtotal + this.pricing.logistics.subtotal).toFixed(2)}`);
    setTxt('sidebar-ship-cost', `₹${this.pricing.margin.targetProfit.toFixed(2)}`);

    // 2. Product SKU & Metadata Sync (Epic 2)
    this.product.sku = SKUManager.generateSKU(this.beads, this.totalBits, this.beadDiameterMm, this.product.variant || '001');
    if (!this.product.isCustomTitle) {
      this.product.title = SKUManager.generateTitle(this.beads, this.totalBits, this.beadDiameterMm);
    }
    
    setTxt('product-sku-badge', this.product.sku);

    const titleInput = document.getElementById('product-title-input');
    if (titleInput && !this.product.isCustomTitle) {
      titleInput.value = this.product.title;
    }

    const catSelect = document.getElementById('product-category-select');
    if (catSelect) {
      catSelect.value = this.product.category;
    }

    const statusSelect = document.getElementById('product-status-select');
    if (statusSelect) {
      statusSelect.value = this.product.status;
    }

    const statusBadge = document.getElementById('product-status-badge');
    if (statusBadge) {
      statusBadge.className = `status-badge ${this.product.status}`;
      statusBadge.textContent = this.product.status.charAt(0).toUpperCase() + this.product.status.slice(1);
    }

    // 3. Bits Count display
    setTxt('bits-count-display', `${this.totalBits} Beads`);
    setTxt('mobile-bits-label', `${this.totalBits} Beads`);
    setTxt('bom-total-bits', `${this.totalBits} Beads`);

    const approxCircumference = ((this.totalBits * (this.beadDiameterMm + 0.4)) / 10).toFixed(1);
    let fitCategory = 'Medium';
    if (approxCircumference < 16.5) fitCategory = 'XS';
    else if (approxCircumference < 18) fitCategory = 'Small (S)';
    else if (approxCircumference < 19.5) fitCategory = 'Medium (M)';
    else if (approxCircumference < 21) fitCategory = 'Large (L)';
    else fitCategory = 'XL';

    setHtml('wrist-size-text', `~${approxCircumference} cm (${fitCategory})`);
    setTxt('bom-size-text', `${this.beadDiameterMm}mm (~${approxCircumference} cm)`);

    // 4. Sequence ribbon
    this.renderSequenceRibbon();

    // 5. BOM list & Chakra balance
    this.renderBOMAndEnergy();

    // 6. Waterfall Breakdown in Design Inspector
    this.renderSidebarWaterfall();
  }

  renderSequenceRibbon() {
    const ribbon = document.getElementById('sequence-ribbon');
    if (!ribbon) return;
    ribbon.innerHTML = '';

    this.beads.forEach((stoneId, idx) => {
      const stone = this.getStone(stoneId);
      const item = document.createElement('div');
      item.className = `ribbon-bead-item ${idx === this.selectedBeadIndex ? 'active-slot' : ''}`;
      item.title = `Slot #${idx + 1}: ${stone.name} (₹${PricingEngine.getStoneRate(stoneId).toFixed(2)})`;
      
      const sCanvas = document.createElement('canvas');
      sCanvas.width = 24;
      sCanvas.height = 24;
      const sctx = sCanvas.getContext('2d');
      this.renderRealisticBead(sctx, 12, 12, 9.5, stone, false, false);
      item.appendChild(sCanvas);

      item.addEventListener('click', () => {
        this.selectedBeadIndex = idx;
        this.setBeadAt(idx, this.activeStoneId);
      });

      ribbon.appendChild(item);
    });
  }

  renderBOMAndEnergy() {
    const counts = {};
    const chakraCounts = {
      'Root': 0, 'Sacral': 0, 'Solar Plexus': 0, 'Heart': 0, 'Throat': 0, 'Third Eye': 0, 'Crown': 0
    };
    const elementCounts = { 'Fire': 0, 'Earth': 0, 'Water': 0, 'Air': 0, 'Spirit': 0 };

    this.beads.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
      const st = this.getStone(id);

      Object.keys(chakraCounts).forEach(chk => {
        if (st.chakra.includes(chk)) chakraCounts[chk]++;
      });

      Object.keys(elementCounts).forEach(el => {
        if (st.element.includes(el)) elementCounts[el]++;
      });
    });

    const bomList = document.getElementById('bom-list');
    if (bomList) {
      bomList.innerHTML = '';
      Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([id, qty]) => {
        const st = this.getStone(id);
        const rate = PricingEngine.getStoneRate(id);
        const item = document.createElement('div');
        item.className = 'bom-item';
        item.innerHTML = `
          <div class="bom-stone-info">
            <span class="bom-mini-dot" style="background: ${st.baseColor}"></span>
            <span>${st.name} <small style="color: var(--text-subtle)">(₹${rate})</small></span>
          </div>
          <span class="bom-count">${qty}x <small style="color: var(--accent-gold-light)">= ₹${(qty * rate).toFixed(1)}</small></span>
        `;
        bomList.appendChild(item);
      });
    }

    const sortedElements = Object.entries(elementCounts).sort((a, b) => b[1] - a[1]);
    const topElements = sortedElements.slice(0, 2).map(e => e[0]).join(' & ');
    const domEl = document.getElementById('dominant-element-text');
    if (domEl) domEl.textContent = topElements || 'Balanced';

    const chakraBarsContainer = document.getElementById('chakra-bars');
    if (chakraBarsContainer) {
      chakraBarsContainer.innerHTML = '';
      const chakraColors = {
        'Root': '#e53e3e',
        'Sacral': '#ed8936',
        'Solar Plexus': '#ecc94b',
        'Heart': '#48bb78',
        'Throat': '#38b2ac',
        'Third Eye': '#4299e1',
        'Crown': '#9f7aea'
      };

      Object.entries(chakraCounts).forEach(([chkName, count]) => {
        const pct = Math.round((count / this.totalBits) * 100);
        const bar = document.createElement('div');
        bar.className = 'chakra-bar-item';
        bar.innerHTML = `
          <span class="chakra-name">${chkName}</span>
          <div class="chakra-track">
            <div class="chakra-fill" style="width: ${pct}%; background: ${chakraColors[chkName]}"></div>
          </div>
          <span class="chakra-pct">${pct}%</span>
        `;
        chakraBarsContainer.appendChild(bar);
      });
    }
  }

  renderSidebarWaterfall() {
    const p = this.pricing || PricingEngine.calculate(this.beads);
    const setVal = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setVal('sidebar-waterfall-price', `₹${p.finalSellingPrice.toFixed(2)}`);

    // Tier 1: Raw Gems
    setVal('sidebar-tier-gems-total', `₹${p.rawGemsCost.toFixed(2)}`);
    const tbody = document.getElementById('sidebar-tier-gems-tbody');
    if (tbody) {
      tbody.innerHTML = '';
      p.stoneBreakdown.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${s.name}</strong></td>
          <td>₹${s.unitPrice.toFixed(2)}</td>
          <td>${s.count}</td>
          <td><strong>₹${s.total.toFixed(2)}</strong></td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Tier 2: Packaging
    setVal('sidebar-tier-pkg-total', `₹${p.packaging.subtotal.toFixed(2)}`);
    setVal('sidebar-pkg-cert-val', `₹${p.packaging.certificate.toFixed(2)}`);
    setVal('sidebar-pkg-bag-val', `₹${p.packaging.giftBag.toFixed(2)}`);
    setVal('sidebar-pkg-cord-val', `₹${p.packaging.elastic.toFixed(2)}`);
    setVal('sidebar-pkg-box-val', `₹${p.packaging.boxPrinting.toFixed(2)}`);

    // Tier 3: Logistics
    setVal('sidebar-tier-log-total', `₹${p.logistics.subtotal.toFixed(2)}`);
    setVal('sidebar-log-ship-val', `₹${p.logistics.shipment.toFixed(2)}`);
    setVal('sidebar-log-stick-val', `₹${p.logistics.sticker.toFixed(2)}`);
    setVal('sidebar-log-bag-val', `₹${p.logistics.shipmentBag.toFixed(2)}`);

    // Tier 4: Overheads
    setVal('sidebar-tier-ovh-total', `₹${p.overheads.totalSubtotal.toFixed(2)}`);
    setVal('sidebar-ovh-dam-val', `₹${p.overheads.returnDamage.toFixed(2)}`);
    setVal('sidebar-ovh-mkt-val', `₹${p.overheads.marketingBase.toFixed(2)}`);
    setVal('sidebar-ovh-disc-val', `₹${p.overheads.discountAmount.toFixed(2)}`);

    // Tier 5: Target Profit Margin & Anchor
    setVal('sidebar-tier-profit-val', `₹${p.margin.targetProfit.toFixed(2)}`);
    setVal('sidebar-profit-row', `₹${p.margin.targetProfit.toFixed(2)}`);
    setVal('sidebar-final-selling-row', `₹${p.finalSellingPrice.toFixed(2)}`);
    setVal('sidebar-final-mrp-row', `₹${p.mrp.toFixed(2)}`);
  }

  initSidebarResizers() {
    const leftResizer = document.getElementById('resizer-left');
    const rightResizer = document.getElementById('resizer-right');
    const studioMain = document.querySelector('.studio-main');
    if (!studioMain) return;

    // Load persisted widths from localStorage
    try {
      const savedLeftW = localStorage.getItem('auracraft_left_w');
      const savedRightW = localStorage.getItem('auracraft_right_w');
      if (savedLeftW) {
        document.documentElement.style.setProperty('--left-sidebar-w', `${savedLeftW}px`);
      }
      if (savedRightW) {
        document.documentElement.style.setProperty('--right-sidebar-w', `${savedRightW}px`);
      }
    } catch (e) {}

    // Left Resizer: Gemstone Palette
    if (leftResizer) {
      let isDragging = false;
      let startX = 0;
      let startW = 320;

      const getLeftW = () => {
        if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
          return parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--left-sidebar-w')) || 320;
        }
        return 320;
      };

      const onPointerDown = (e) => {
        if (this.isPaletteCollapsed || this.isZenMode) return;
        isDragging = true;
        startX = e.clientX || 0;
        startW = getLeftW();
        leftResizer.classList.add('is-resizing');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        if (leftResizer.setPointerCapture) leftResizer.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const deltaX = (e.clientX || 0) - startX;
        const newW = Math.max(220, Math.min(480, startW + deltaX));
        document.documentElement.style.setProperty('--left-sidebar-w', `${newW}px`);
      };

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        leftResizer.classList.remove('is-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        try {
          if (leftResizer.releasePointerCapture) leftResizer.releasePointerCapture(e.pointerId);
        } catch (err) {}
        const finalW = getLeftW();
        try {
          localStorage.setItem('auracraft_left_w', finalW);
        } catch (err) {}
        this.drawBracelet();
      };

      leftResizer.addEventListener('pointerdown', onPointerDown);
      leftResizer.addEventListener('pointermove', onPointerMove);
      leftResizer.addEventListener('pointerup', onPointerUp);
      leftResizer.addEventListener('pointercancel', onPointerUp);
    }

    // Right Resizer: Design Inspector
    if (rightResizer) {
      let isDragging = false;
      let startX = 0;
      let startW = 330;

      const getRightW = () => {
        if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
          return parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--right-sidebar-w')) || 330;
        }
        return 330;
      };

      const onPointerDown = (e) => {
        if (this.isDetailsCollapsed || this.isZenMode) return;
        isDragging = true;
        startX = e.clientX || 0;
        startW = getRightW();
        rightResizer.classList.add('is-resizing');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        if (rightResizer.setPointerCapture) rightResizer.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const deltaX = startX - (e.clientX || 0); // dragging left increases width
        const newW = Math.max(240, Math.min(520, startW + deltaX));
        document.documentElement.style.setProperty('--right-sidebar-w', `${newW}px`);
      };

      const onPointerUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        rightResizer.classList.remove('is-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        try {
          if (rightResizer.releasePointerCapture) rightResizer.releasePointerCapture(e.pointerId);
        } catch (err) {}
        const finalW = getRightW();
        try {
          localStorage.setItem('auracraft_right_w', finalW);
        } catch (err) {}
        this.drawBracelet();
      };

      rightResizer.addEventListener('pointerdown', onPointerDown);
      rightResizer.addEventListener('pointermove', onPointerMove);
      rightResizer.addEventListener('pointerup', onPointerUp);
      rightResizer.addEventListener('pointercancel', onPointerUp);
    }
  }

  // ============================================================================
  // Event Listeners & Interaction Engine
  // ============================================================================
  bindEvents() {
    const bitsSlider = document.getElementById('bits-slider');
    if (bitsSlider) bitsSlider.addEventListener('input', (e) => this.setTotalBits(e.target.value));
    
    const decBitsBtn = document.getElementById('btn-decrement-bits');
    if (decBitsBtn) decBitsBtn.addEventListener('click', () => this.setTotalBits(this.totalBits - 1));
    const incBitsBtn = document.getElementById('btn-increment-bits');
    if (incBitsBtn) incBitsBtn.addEventListener('click', () => this.setTotalBits(this.totalBits + 1));

    document.querySelectorAll('#bead-size-selector .segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#bead-size-selector .segment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.beadDiameterMm = parseInt(btn.dataset.size);
        this.saveHistoryState();
        this.updateUI();
        this.drawBracelet();
      });
    });

    const cordSelect = document.getElementById('cord-type-select');
    if (cordSelect) {
      cordSelect.addEventListener('change', (e) => {
        this.cordType = e.target.value;
        const bomCord = document.getElementById('bom-cord-text');
        if (bomCord) bomCord.textContent = cordSelect.options[cordSelect.selectedIndex]?.text || this.cordType;
        this.saveHistoryState();
        this.drawBracelet();
      });
    }

    const searchInput = document.getElementById('stone-search-input');
    const clearSearchBtn = document.getElementById('btn-clear-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (clearSearchBtn) clearSearchBtn.style.display = val ? 'block' : 'none';
        this.renderStonesCatalog(val);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        this.renderStonesCatalog('');
      });
    }

    document.querySelectorAll('.tool-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tool-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.toolMode = btn.dataset.mode;
        const statusText = document.getElementById('stage-status-text');
        if (statusText) {
          statusText.textContent = 
            this.toolMode === 'fill' ? 'Fill Mode: Click any stone to fill all beads' :
            this.toolMode === 'alternate' ? 'Alternate Mode: Click any stone to apply alternating rhythm' :
            'Select & Place Mode: Click bead slot to apply selected stone';
        }
      });
    });

    const rotLeftBtn = document.getElementById('btn-rotate-left');
    if (rotLeftBtn) {
      rotLeftBtn.addEventListener('click', () => {
        this.rotationAngle -= Math.PI / 12;
        this.drawBracelet();
      });
    }
    const rotRightBtn = document.getElementById('btn-rotate-right');
    if (rotRightBtn) {
      rotRightBtn.addEventListener('click', () => {
        this.rotationAngle += Math.PI / 12;
        this.drawBracelet();
      });
    }
    const symBtn = document.getElementById('btn-symmetry-mirror');
    if (symBtn) symBtn.addEventListener('click', () => this.applySymmetryMirror());
    
    const labelBtn = document.getElementById('btn-toggle-labels');
    if (labelBtn) {
      labelBtn.addEventListener('click', () => {
        this.showLabels = !this.showLabels;
        labelBtn.classList.toggle('active', this.showLabels);
        this.drawBracelet();
      });
    }

    const glowBtn = document.getElementById('btn-toggle-glow');
    if (glowBtn) {
      glowBtn.addEventListener('click', () => {
        this.glowEnabled = !this.glowEnabled;
        glowBtn.classList.toggle('active', this.glowEnabled);
        this.drawBracelet();
      });
    }

    const shiftLeftBtn = document.getElementById('btn-shift-left');
    if (shiftLeftBtn) shiftLeftBtn.addEventListener('click', () => this.shiftBeads('left'));
    const shiftRightBtn = document.getElementById('btn-shift-right');
    if (shiftRightBtn) shiftRightBtn.addEventListener('click', () => this.shiftBeads('right'));

    const undoBtn = document.getElementById('btn-undo');
    if (undoBtn) undoBtn.addEventListener('click', () => this.undo());
    const redoBtn = document.getElementById('btn-redo');
    if (redoBtn) redoBtn.addEventListener('click', () => this.redo());
    const randBtn = document.getElementById('btn-randomize');
    if (randBtn) randBtn.addEventListener('click', () => this.randomizeHarmonious());
    const clearBtn = document.getElementById('btn-clear-all');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearBracelet());
    const deepdiveBtn = document.getElementById('btn-deepdive-apply-all');
    if (deepdiveBtn) deepdiveBtn.addEventListener('click', () => this.fillAllBeads(this.activeStoneId));

    // Product & SKU Event Listeners (Epic 2)
    const titleInput = document.getElementById('product-title-input');
    if (titleInput) {
      titleInput.addEventListener('input', (e) => {
        this.product.title = e.target.value;
        this.product.isCustomTitle = true;
      });
    }

    const autoTitleBtn = document.getElementById('btn-auto-title');
    if (autoTitleBtn) {
      autoTitleBtn.addEventListener('click', () => {
        this.product.isCustomTitle = false;
        this.product.title = SKUManager.generateTitle(this.beads, this.totalBits, this.beadDiameterMm);
        if (titleInput) titleInput.value = this.product.title;
        this.showToast('Product title auto-generated!');
      });
    }

    const copySkuBtn = document.getElementById('btn-copy-sku');
    if (copySkuBtn) {
      copySkuBtn.addEventListener('click', () => {
        if (this.product.sku) {
          navigator.clipboard.writeText(this.product.sku).then(() => {
            this.showToast(`SKU ${this.product.sku} copied to clipboard!`);
          });
        }
      });
    }

    const catSelect = document.getElementById('product-category-select');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.product.category = e.target.value;
      });
    }

    const statusSelect = document.getElementById('product-status-select');
    const statusBadge = document.getElementById('product-status-badge');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        this.product.status = e.target.value;
        if (statusBadge) {
          statusBadge.className = `status-badge ${this.product.status}`;
          statusBadge.textContent = this.product.status.charAt(0).toUpperCase() + this.product.status.slice(1);
        }
      });
    }

    this.bindCanvasEvents();
    this.bindModalEvents();
    this.bindPricingInspectorEvents();
  }

  bindCanvasEvents() {
    const canvas = this.canvas;
    const hoverCard = document.getElementById('bead-hover-card');

    const getCanvasCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        clientX: e.clientX,
        clientY: e.clientY
      };
    };

    const findBeadAtCoord = (cx, cy) => {
      if (!this.renderedSlots) return -1;
      const beadRadiusPx = (13 + (this.beadDiameterMm - 6) * 2.8) * (canvas.width / 800);
      for (const slot of this.renderedSlots) {
        const dx = cx - slot.x;
        const dy = cy - slot.y;
        if (Math.sqrt(dx * dx + dy * dy) <= beadRadiusPx * 1.3) {
          return slot.index;
        }
      }
      return -1;
    };

    canvas.addEventListener('mousemove', (e) => {
      const coords = getCanvasCoords(e);
      const slotIndex = findBeadAtCoord(coords.x, coords.y);

      if (slotIndex !== this.hoveredBeadIndex) {
        this.hoveredBeadIndex = slotIndex;
        this.drawBracelet();

        if (slotIndex !== -1) {
          const stone = this.getStone(this.beads[slotIndex]);
          const rate = PricingEngine.getStoneRate(stone.id);
          document.getElementById('hover-stone-title').textContent = stone.name;
          document.getElementById('hover-stone-price').textContent = `₹${rate.toFixed(2)}`;
          document.getElementById('hover-stone-desc').textContent = stone.alias;
          document.getElementById('hover-stone-slot').textContent = `Slot #${slotIndex + 1}`;
          document.getElementById('hover-stone-chakra').textContent = stone.chakra;

          const icon = document.getElementById('hover-stone-icon');
          icon.innerHTML = '';
          const hCanvas = document.createElement('canvas');
          hCanvas.width = 28;
          hCanvas.height = 28;
          this.renderRealisticBead(hCanvas.getContext('2d'), 14, 14, 11, stone, false, false);
          icon.appendChild(hCanvas);

          hoverCard.style.display = 'flex';
          const containerRect = document.getElementById('canvas-viewport').getBoundingClientRect();
          hoverCard.style.left = `${coords.clientX - containerRect.left}px`;
          hoverCard.style.top = `${coords.clientY - containerRect.top}px`;
        } else {
          hoverCard.style.display = 'none';
        }
      }
    });

    canvas.addEventListener('mouseleave', () => {
      this.hoveredBeadIndex = -1;
      hoverCard.style.display = 'none';
      this.drawBracelet();
    });

    canvas.addEventListener('click', (e) => {
      const coords = getCanvasCoords(e);
      const slotIndex = findBeadAtCoord(coords.x, coords.y);
      if (slotIndex !== -1) {
        this.selectedBeadIndex = slotIndex;
        this.setBeadAt(slotIndex, this.activeStoneId);
      }
    });

    // Touch Event Support on Canvas for Mobile & Tablet Devices
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchMoved = false;
        
        const coords = getCanvasCoords(touch);
        const slotIndex = findBeadAtCoord(coords.x, coords.y);
        if (slotIndex !== -1) {
          this.hoveredBeadIndex = slotIndex;
          this.drawBracelet();
        }
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length === 1) {
        const touch = e.touches[0];
        const dist = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
        if (dist > 8) touchMoved = true;
      }
    }, { passive: true });

    canvas.addEventListener('touchend', (e) => {
      if (!touchMoved && e.changedTouches && e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const coords = getCanvasCoords(touch);
        const slotIndex = findBeadAtCoord(coords.x, coords.y);
        if (slotIndex !== -1) {
          this.selectedBeadIndex = slotIndex;
          this.setBeadAt(slotIndex, this.activeStoneId);
          this.hoveredBeadIndex = -1;
          this.drawBracelet();
        }
      } else {
        this.hoveredBeadIndex = -1;
        this.drawBracelet();
      }
    }, { passive: true });

    canvas.addEventListener('dragover', (e) => e.preventDefault());
    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      const stoneId = e.dataTransfer.getData('text/plain') || this.draggedStoneId;
      if (stoneId) {
        const coords = getCanvasCoords(e);
        const slotIndex = findBeadAtCoord(coords.x, coords.y);
        if (slotIndex !== -1) {
          this.setBeadAt(slotIndex, stoneId);
        }
      }
    });

    // Initialize Mobile-Specific Responsive Drawers & Gestures
    this.bindMobileEvents();
  }

  // ============================================================================
  // Pricing Inspector & Cost Configurator Modal (Epic 1)
  // ============================================================================
  bindPricingInspectorEvents() {
    const pricingModal = document.getElementById('pricing-modal');
    const openBtn = document.getElementById('btn-open-pricing-modal');
    const tickerBadge = document.getElementById('header-price-ticker');
    const sidebarInfoBtn = document.getElementById('btn-sidebar-pricing-info');
    const closeBtn = document.getElementById('btn-close-pricing-modal');
    const cancelBtn = document.getElementById('btn-cancel-pricing-modal');
    const saveConfigBtn = document.getElementById('btn-save-pricing-config');
    const resetDefaultsBtn = document.getElementById('btn-reset-pricing-defaults');

    const openModal = () => {
      this.populatePricingInspectorModal();
      pricingModal.style.display = 'flex';
    };

    if (openBtn) openBtn.addEventListener('click', (e) => { e.stopPropagation(); openModal(); });
    if (tickerBadge) tickerBadge.addEventListener('click', openModal);
    if (sidebarInfoBtn) sidebarInfoBtn.addEventListener('click', openModal);

    if (closeBtn) closeBtn.addEventListener('click', () => pricingModal.style.display = 'none');
    if (cancelBtn) cancelBtn.addEventListener('click', () => pricingModal.style.display = 'none');

    // Tab Switching inside Pricing Modal
    document.querySelectorAll('#pricing-modal .modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#pricing-modal .modal-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        document.getElementById('pricing-pane-breakdown').style.display = (tab === 'breakdown') ? 'block' : 'none';
        document.getElementById('pricing-pane-config').style.display = (tab === 'config') ? 'block' : 'none';
      });
    });

    // Save Custom Configuration
    if (saveConfigBtn) {
      saveConfigBtn.addEventListener('click', () => {
        const newConfig = {
          packaging: {
            certificate: parseFloat(document.getElementById('cfg-pkg-cert').value) || 0,
            giftBag: parseFloat(document.getElementById('cfg-pkg-bag').value) || 0,
            elastic: parseFloat(document.getElementById('cfg-pkg-string').value) || 0,
            boxPrinting: parseFloat(document.getElementById('cfg-pkg-box').value) || 0
          },
          logistics: {
            shipment: parseFloat(document.getElementById('cfg-ship-rate').value) || 0,
            sticker: parseFloat(document.getElementById('cfg-ship-sticker').value) || 0,
            shipmentBag: parseFloat(document.getElementById('cfg-ship-bag').value) || 0
          },
          overheads: {
            returnDamage: parseFloat(document.getElementById('cfg-ovh-damage').value) || 0,
            marketingBase: parseFloat(document.getElementById('cfg-ovh-marketing').value) || 0,
            discountPct: (parseFloat(document.getElementById('cfg-ovh-discount-pct').value) || 10) / 100
          },
          margin: {
            targetProfit: parseFloat(document.getElementById('cfg-target-profit').value) || 0,
            mrpAnchorMode: document.getElementById('cfg-mrp-anchor').value
          },
          stoneRates: {}
        };

        // Collect custom stone rates
        document.querySelectorAll('.stone-rate-input-item input').forEach(input => {
          const stoneId = input.dataset.stoneId;
          const rate = parseFloat(input.value);
          if (!isNaN(rate)) {
            newConfig.stoneRates[stoneId] = rate;
          }
        });

        PricingEngine.saveConfig(newConfig);
        this.renderStonesCatalog();
        this.selectStone(this.activeStoneId);
        this.updateUI();
        this.populatePricingInspectorModal();
        this.showToast('Custom pricing configuration applied and saved locally!');
      });
    }

    // Reset to CSV Defaults
    if (resetDefaultsBtn) {
      resetDefaultsBtn.addEventListener('click', () => {
        PricingEngine.resetToDefaults();
        this.renderStonesCatalog();
        this.selectStone(this.activeStoneId);
        this.updateUI();
        this.populatePricingInspectorModal();
        this.showToast('Pricing reset to factory CSV defaults.');
      });
    }
  }

  populatePricingInspectorModal() {
    const p = PricingEngine.calculate(this.beads);
    const cfg = PricingEngine.config;

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    // 1. Summary Banner
    setTxt('modal-selling-price', `₹${p.finalSellingPrice.toFixed(2)}`);
    setTxt('modal-mrp-price', `₹${p.mrp.toFixed(2)}`);
    setTxt('modal-profit-val', `₹${p.margin.targetProfit.toFixed(2)}`);
    setTxt('modal-mrp-sub', `Anchor (Save ₹${p.savingsAmount.toFixed(0)} on ${(p.overheads.discountPct * 100).toFixed(0)}% promo)`);

    // 2. Tier 1: Raw Gems
    setTxt('tier-gems-total', `₹${p.rawGemsCost.toFixed(2)}`);
    const tbody = document.getElementById('tier-gems-tbody');
    if (tbody) {
      tbody.innerHTML = '';
      p.stoneBreakdown.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="color: #fff; font-weight: 500;">${item.name}</td>
          <td>₹${item.unitPrice.toFixed(2)}</td>
          <td style="color: var(--accent-gold-light); font-weight: 600;">${item.count}</td>
          <td style="font-family: 'Space Grotesk', monospace; font-weight: 600; color: #fff;">₹${item.total.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    // 3. Tier 2: Packaging
    setTxt('tier-pkg-total', `₹${p.packaging.subtotal.toFixed(2)}`);
    setTxt('val-pkg-cert', `₹${p.packaging.certificate.toFixed(2)}`);
    setTxt('val-pkg-bag', `₹${p.packaging.giftBag.toFixed(2)}`);
    setTxt('val-pkg-string', `₹${p.packaging.elastic.toFixed(2)}`);
    setTxt('val-pkg-box', `₹${p.packaging.boxPrinting.toFixed(2)}`);

    // 4. Tier 3: Logistics
    setTxt('tier-ship-total', `₹${p.logistics.subtotal.toFixed(2)}`);
    setTxt('val-ship-rate', `₹${p.logistics.shipment.toFixed(2)}`);
    setTxt('val-ship-sticker', `₹${p.logistics.sticker.toFixed(2)}`);
    setTxt('val-ship-bag', `₹${p.logistics.shipmentBag.toFixed(2)}`);

    // 5. Tier 4: Overheads & Margin
    setTxt('tier-ovh-total', `₹${(p.overheads.totalSubtotal + p.margin.targetProfit).toFixed(2)}`);
    setTxt('val-ovh-damage', `₹${p.overheads.returnDamage.toFixed(2)}`);
    setTxt('val-ovh-marketing', `₹${p.overheads.marketingBase.toFixed(2)}`);
    setTxt('val-ovh-discount', `₹${p.overheads.discountAmount.toFixed(2)} (${(p.overheads.discountPct * 100).toFixed(0)}% of MRP)`);
    setTxt('val-ovh-profit', `₹${p.margin.targetProfit.toFixed(2)}`);

    // 6. Populate Config Form Inputs with current values
    if (cfg && cfg.packaging) {
      setVal('cfg-pkg-cert', cfg.packaging.certificate);
      setVal('cfg-pkg-bag', cfg.packaging.giftBag);
      setVal('cfg-pkg-string', cfg.packaging.elastic);
      setVal('cfg-pkg-box', cfg.packaging.boxPrinting);
    }
    if (cfg && cfg.logistics) {
      setVal('cfg-ship-rate', cfg.logistics.shipment);
      setVal('cfg-ship-sticker', cfg.logistics.sticker);
      setVal('cfg-ship-bag', cfg.logistics.shipmentBag);
    }
    if (cfg && cfg.overheads) {
      setVal('cfg-ovh-damage', cfg.overheads.returnDamage);
      setVal('cfg-ovh-marketing', cfg.overheads.marketingBase);
      setVal('cfg-ovh-discount-pct', Math.round((cfg.overheads.discountPct || 0.10) * 100));
    }
    if (cfg && cfg.margin) {
      setVal('cfg-target-profit', cfg.margin.targetProfit);
      setVal('cfg-mrp-anchor', cfg.margin.mrpAnchorMode || '49_99');
    }

    // 7. Stone Rates Form Grid
    const stoneRatesGrid = document.getElementById('config-stone-rates-grid');
    if (stoneRatesGrid) {
      stoneRatesGrid.innerHTML = '';
      STONES_DB.forEach(stone => {
        const rate = (cfg.stoneRates && cfg.stoneRates[stone.id] !== undefined) ? cfg.stoneRates[stone.id] : stone.unitPrice;
        const item = document.createElement('div');
        item.className = 'stone-rate-input-item';
        item.innerHTML = `
          <span title="${stone.name}">${stone.name}</span>
          <input type="number" step="0.25" min="0" data-stone-id="${stone.id}" value="${rate}">
        `;
        stoneRatesGrid.appendChild(item);
      });
    }
  }

  // ============================================================================
  // Modals (HD Export & Summary)
  // ============================================================================
  bindModalEvents() {
    const exportModal = document.getElementById('export-modal');
    const summaryModal = document.getElementById('summary-modal');
    let exportBackground = 'dark';

    const exportBtn = document.getElementById('btn-export-png');
    const closeExportBtn = document.getElementById('btn-close-export-modal');
    const cancelExportBtn = document.getElementById('btn-cancel-export');
    const downloadImgBtn = document.getElementById('btn-download-image');
    const orderSummaryBtn = document.getElementById('btn-order-summary');
    const closeSummaryBtn = document.getElementById('btn-close-summary-modal');
    const finishModalBtn = document.getElementById('btn-finish-modal');
    const copyRecipeBtn = document.getElementById('btn-copy-recipe');
    const printSpecsBtn = document.getElementById('btn-print-specs');

    if (exportBtn && exportModal) {
      exportBtn.addEventListener('click', () => {
        this.renderExportPreview(exportBackground);
        exportModal.style.display = 'flex';
      });
    }

    if (closeExportBtn && exportModal) closeExportBtn.addEventListener('click', () => exportModal.style.display = 'none');
    if (cancelExportBtn && exportModal) cancelExportBtn.addEventListener('click', () => exportModal.style.display = 'none');

    document.querySelectorAll('#export-bg-options .segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#export-bg-options .segment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        exportBackground = btn.dataset.bg;
        this.renderExportPreview(exportBackground);
      });
    });

    if (downloadImgBtn && exportModal) {
      downloadImgBtn.addEventListener('click', () => {
        const hdCanvas = document.createElement('canvas');
        hdCanvas.width = 1600;
        hdCanvas.height = 1600;
        this.drawBracelet(hdCanvas, exportBackground);

        const link = document.createElement('a');
        link.download = `AuraCraft-Custom-Bracelet-${Date.now()}.png`;
        link.href = hdCanvas.toDataURL('image/png');
        link.click();
        this.showToast('High-definition bracelet render exported!');
        exportModal.style.display = 'none';
      });
    }

    if (orderSummaryBtn && summaryModal) {
      orderSummaryBtn.addEventListener('click', () => {
        this.populateSummaryModal();
        summaryModal.style.display = 'flex';
      });
    }

    if (closeSummaryBtn && summaryModal) closeSummaryBtn.addEventListener('click', () => summaryModal.style.display = 'none');
    if (finishModalBtn && summaryModal) finishModalBtn.addEventListener('click', () => summaryModal.style.display = 'none');

    if (copyRecipeBtn) {
      copyRecipeBtn.addEventListener('click', () => {
        const p = this.pricing || PricingEngine.calculate(this.beads);
        const recipeText = `AuraCraft Custom Bracelet Specification:
Product Title: ${this.product.title}
SKU: ${this.product.sku}
Category: ${this.product.category.toUpperCase()} | Lifecycle Status: ${this.product.status.toUpperCase()}
Total Beads: ${this.totalBits} (${this.beadDiameterMm}mm)
Cord Material: ${this.cordType}
Selling Price: ₹${p.finalSellingPrice.toFixed(0)} (MRP: ₹${p.mrp.toFixed(0)})
Stone Composition:
${p.stoneBreakdown.map(s => `- ${s.name}: ${s.count}x (₹${s.unitPrice.toFixed(2)}/ea = ₹${s.total.toFixed(2)})`).join('\n')}
Raw Gems Cost: ₹${p.rawGemsCost.toFixed(2)} | Packaging: ₹${p.packaging.subtotal.toFixed(2)} | Delivery: ₹${p.logistics.subtotal.toFixed(2)}
Studio URL: ${window.location.href}`;

        navigator.clipboard.writeText(recipeText).then(() => {
          this.showToast('Product Recipe & SKU specs copied to clipboard!');
        });
      });
    }

    if (printSpecsBtn) {
      printSpecsBtn.addEventListener('click', () => {
        this.printSpecSheet();
      });
    }

    // ============================================================================
    // Collection Gallery Modal Events (Epic 3)
    // ============================================================================
    const collectionsModal = document.getElementById('collections-modal');
    const openCollectionsBtn = document.getElementById('btn-open-collections');
    const saveToColBtn = document.getElementById('btn-save-to-collection');
    const modalSaveBtn = document.getElementById('btn-modal-save-current');
    const emptySaveBtn = document.getElementById('btn-empty-save-current');
    const closeColBtn = document.getElementById('btn-close-collections-modal');
    const doneColBtn = document.getElementById('btn-done-collections-modal');
    const colSearchInput = document.getElementById('collection-search-input');
    const colClearSearch = document.getElementById('btn-clear-collection-search');
    const colStatusFilter = document.getElementById('collection-status-filter');

    if (openCollectionsBtn) {
      openCollectionsBtn.addEventListener('click', () => {
        this.openCollectionsModal();
      });
    }

    if (saveToColBtn) {
      saveToColBtn.addEventListener('click', () => {
        this.saveCurrentDesign();
      });
    }

    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', () => {
        this.saveCurrentDesign();
      });
    }

    if (emptySaveBtn) {
      emptySaveBtn.addEventListener('click', () => {
        this.saveCurrentDesign();
      });
    }

    if (closeColBtn) closeColBtn.addEventListener('click', () => collectionsModal.style.display = 'none');
    if (doneColBtn) doneColBtn.addEventListener('click', () => collectionsModal.style.display = 'none');

    // Category Filter Pills in Collection Modal
    document.querySelectorAll('#collection-cat-pills .col-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#collection-cat-pills .col-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderCollectionGrid();
      });
    });

    // Status Filter Dropdown
    if (colStatusFilter) {
      colStatusFilter.addEventListener('change', () => {
        this.renderCollectionGrid();
      });
    }

    // Search Input
    if (colSearchInput) {
      colSearchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (colClearSearch) colClearSearch.style.display = val ? 'block' : 'none';
        this.renderCollectionGrid();
      });
    }

    if (colClearSearch) {
      colClearSearch.addEventListener('click', () => {
        if (colSearchInput) colSearchInput.value = '';
        colClearSearch.style.display = 'none';
        this.renderCollectionGrid();
      });
    }

    // ============================================================================
    // Share Modal & Backup/Restore Events (Epic 4)
    // ============================================================================
    const shareModal = document.getElementById('share-modal');
    const shareBtn = document.getElementById('btn-share-design');
    const headerShareBtn = document.getElementById('btn-open-share-modal');
    const closeShareBtn = document.getElementById('btn-close-share-modal');
    const doneShareBtn = document.getElementById('btn-done-share-modal');
    const copyShareLinkBtn = document.getElementById('btn-copy-share-link');

    if (shareBtn) shareBtn.addEventListener('click', () => this.openShareModal());
    if (headerShareBtn) headerShareBtn.addEventListener('click', () => this.openShareModal());
    if (closeShareBtn) closeShareBtn.addEventListener('click', () => shareModal.style.display = 'none');
    if (doneShareBtn) doneShareBtn.addEventListener('click', () => shareModal.style.display = 'none');

    if (copyShareLinkBtn) {
      copyShareLinkBtn.addEventListener('click', () => {
        const linkInput = document.getElementById('share-link-input');
        if (linkInput && linkInput.value) {
          navigator.clipboard.writeText(linkInput.value).then(() => {
            this.showToast('Shareable link copied to clipboard!');
          });
        }
      });
    }

    // Backup & Restore Modal
    const backupModal = document.getElementById('backup-modal');
    const openBackupBtn = document.getElementById('btn-open-backup-modal');
    const closeBackupBtn = document.getElementById('btn-close-backup-modal');
    const cancelBackupBtn = document.getElementById('btn-cancel-backup-modal');

    if (openBackupBtn) openBackupBtn.addEventListener('click', () => this.openBackupModal());
    if (closeBackupBtn) closeBackupBtn.addEventListener('click', () => backupModal.style.display = 'none');
    if (cancelBackupBtn) cancelBackupBtn.addEventListener('click', () => backupModal.style.display = 'none');

    // Tabs inside Backup Modal
    document.querySelectorAll('#backup-modal .modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#backup-modal .modal-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.getElementById('backup-pane-export').style.display = (tab === 'export') ? 'block' : 'none';
        document.getElementById('backup-pane-import').style.display = (tab === 'import') ? 'block' : 'none';
      });
    });

    // Settings View Subtabs (Pricing vs Backup)
    document.querySelectorAll('#settings-subtabs .settings-subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) this.switchSettingsTab(tab);
      });
    });

    // Export Buttons
    const downloadFullBackupBtn = document.getElementById('btn-download-full-backup');
    if (downloadFullBackupBtn) {
      downloadFullBackupBtn.addEventListener('click', () => {
        BackupEngine.exportFullBackup();
        this.showToast('Full collection JSON backup downloaded!');
      });
    }

    const downloadActiveProductBtn = document.getElementById('btn-download-active-product');
    if (downloadActiveProductBtn) {
      downloadActiveProductBtn.addEventListener('click', () => {
        BackupEngine.exportActiveProduct(this);
        this.showToast('Active design JSON exported!');
      });
    }

    // Full Settings Backup / Export Buttons
    const fullExportAllBtn = document.getElementById('btn-full-export-all-json');
    if (fullExportAllBtn) {
      fullExportAllBtn.addEventListener('click', () => {
        BackupEngine.exportFullBackup();
        this.showToast('Full collection JSON backup downloaded!');
      });
    }

    const fullExportSingleBtn = document.getElementById('btn-full-export-single-json');
    if (fullExportSingleBtn) {
      fullExportSingleBtn.addEventListener('click', () => {
        BackupEngine.exportActiveProduct(this);
        this.showToast('Active design JSON exported!');
      });
    }

    // Full Dropzone in Settings
    const fullDropzone = document.getElementById('full-import-dropzone');
    const fullBackupInput = document.getElementById('full-backup-file-input');
    const fullBrowseBackupBtn = document.getElementById('btn-full-browse-backup');
    const fullExecuteRestoreBtn = document.getElementById('btn-full-execute-restore');

    if (fullBrowseBackupBtn && fullBackupInput) {
      fullBrowseBackupBtn.addEventListener('click', () => fullBackupInput.click());
    }
    if (fullBackupInput) {
      fullBackupInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleFullBackupFileSelect(e.target.files[0]);
        }
      });
    }
    if (fullDropzone) {
      fullDropzone.addEventListener('click', () => {
        if (fullBackupInput) fullBackupInput.click();
      });
      fullDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fullDropzone.classList.add('dragover');
      });
      fullDropzone.addEventListener('dragleave', () => fullDropzone.classList.remove('dragover'));
      fullDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        fullDropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleFullBackupFileSelect(e.dataTransfer.files[0]);
        }
      });
    }
    if (fullExecuteRestoreBtn) {
      fullExecuteRestoreBtn.addEventListener('click', () => {
        this.executeFullBackupRestore();
      });
    }

    // File Upload & Dropzone for Restore
    const fileInput = document.getElementById('backup-file-input');
    const browseFileBtn = document.getElementById('btn-browse-backup-file');
    const dropzone = document.getElementById('import-dropzone');
    const executeRestoreBtn = document.getElementById('btn-execute-restore');

    if (browseFileBtn && fileInput) {
      browseFileBtn.addEventListener('click', () => fileInput.click());
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleBackupFileSelect(e.target.files[0]);
        }
      });
    }

    if (dropzone) {
      dropzone.addEventListener('click', () => {
        if (fileInput) fileInput.click();
      });
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleBackupFileSelect(e.dataTransfer.files[0]);
        }
      });
    }

    if (executeRestoreBtn) {
      executeRestoreBtn.addEventListener('click', () => {
        this.executeBackupRestore();
      });
    }

    // Header Print Spec Sheet Action (Epic 5)
    const headerPrintBtn = document.getElementById('btn-header-print-specs');
    if (headerPrintBtn) {
      headerPrintBtn.addEventListener('click', () => {
        this.printSpecSheet();
      });
    }

    // Toast Close Button (Epic 5)
    const toastCloseBtn = document.getElementById('btn-toast-close');
    if (toastCloseBtn) {
      toastCloseBtn.addEventListener('click', () => {
        this.dismissToast();
      });
    }

    // ============================================================================
    // 3-Screen View Navigation Tabs & Return Buttons
    // ============================================================================
    document.querySelectorAll('#view-nav-tabs .nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) this.switchView(view);
      });
    });

    const returnBtns = [
      'btn-gemstones-return-studio',
      'btn-pricing-return-studio',
      'btn-view-spec-return-studio',
      'btn-share-hub-return-studio',
      'btn-settings-return-studio',
      'btn-full-col-new-design'
    ];
    returnBtns.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => this.switchView('studio'));
    });

    // ============================================================================
    // Collapsible Sidebars & Zen Mode Controls (Epic 6)
    // ============================================================================
    const btnCollapseLeft = document.getElementById('btn-collapse-left-sidebar');
    const btnExpandLeft = document.getElementById('btn-expand-left-sidebar');
    const btnCollapseRight = document.getElementById('btn-collapse-right-sidebar');
    const btnExpandRight = document.getElementById('btn-expand-right-sidebar');
    const btnZenMode = document.getElementById('btn-toggle-zen-mode');

    if (btnCollapseLeft) btnCollapseLeft.addEventListener('click', () => this.togglePaletteSidebar(true));
    if (btnExpandLeft) btnExpandLeft.addEventListener('click', () => this.togglePaletteSidebar(false));
    if (btnCollapseRight) btnCollapseRight.addEventListener('click', () => this.toggleDetailsSidebar(true));
    if (btnExpandRight) btnExpandRight.addEventListener('click', () => this.toggleDetailsSidebar(false));
    if (btnZenMode) btnZenMode.addEventListener('click', () => this.toggleZenMode());

    // ============================================================================
    // Sidebar Internal Subtabs (Epic 6)
    // ============================================================================
    document.querySelectorAll('#details-subtabs .subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#details-subtabs .subtab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const subtab = btn.dataset.subtab;
        document.querySelectorAll('#details-sidebar .subtab-pane').forEach(p => p.style.display = 'none');
        const target = document.getElementById(`pane-${subtab}`);
        if (target) target.style.display = 'flex';
      });
    });

    const sidebarPricingInfoBtn = document.getElementById('btn-sidebar-pricing-info');
    if (sidebarPricingInfoBtn) {
      sidebarPricingInfoBtn.addEventListener('click', () => this.switchView('pricing'));
    }

    const sidebarCopyRecipeBtn = document.getElementById('btn-sidebar-copy-recipe');
    if (sidebarCopyRecipeBtn) {
      sidebarCopyRecipeBtn.addEventListener('click', () => {
        const p = this.pricing || PricingEngine.calculate(this.beads);
        const recipeText = `AuraCraft Custom Bracelet Recipe
Title: ${this.product.title}
SKU: ${this.product.sku}
Category: ${this.product.category} | Status: ${this.product.status}
Bits: ${this.totalBits} beads | Size: ${this.beadDiameterMm}mm | Cord: ${this.cordType}
Price: ₹${p.finalSellingPrice.toFixed(2)} (MRP: ₹${p.mrp.toFixed(2)})
Bead Sequence: ${this.beads.map((b, i) => `#${i + 1}:${b}`).join(', ')}`;
        navigator.clipboard.writeText(recipeText).then(() => {
          this.showToast('Product Recipe copied to clipboard!', 'success');
        });
      });
    }

    // ============================================================================
    // Gemstones Full Catalog View Events (Epic 6)
    // ============================================================================
    const fullStoneSearch = document.getElementById('full-stone-search-input');
    const fullClearSearch = document.getElementById('btn-full-clear-search');
    if (fullStoneSearch) {
      fullStoneSearch.addEventListener('input', (e) => {
        const val = e.target.value;
        if (fullClearSearch) fullClearSearch.style.display = val ? 'block' : 'none';
        const activeCat = document.querySelector('#catalog-cat-pills .catalog-pill.active')?.dataset.cat || 'all';
        this.renderFullGemstonesCatalog(activeCat, val);
      });
    }
    if (fullClearSearch) {
      fullClearSearch.addEventListener('click', () => {
        if (fullStoneSearch) fullStoneSearch.value = '';
        fullClearSearch.style.display = 'none';
        const activeCat = document.querySelector('#catalog-cat-pills .catalog-pill.active')?.dataset.cat || 'all';
        this.renderFullGemstonesCatalog(activeCat, '');
      });
    }
    document.querySelectorAll('#catalog-cat-pills .catalog-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#catalog-cat-pills .catalog-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const query = fullStoneSearch ? fullStoneSearch.value : '';
        this.renderFullGemstonesCatalog(pill.dataset.cat, query);
      });
    });

    // ============================================================================
    // Pricing Studio Fullpage Events (Epic 6)
    // ============================================================================
    const fullPricingSaveBtn = document.getElementById('btn-pricing-save-config');
    const fullPricingResetBtn = document.getElementById('btn-pricing-reset-defaults');

    if (fullPricingSaveBtn) {
      fullPricingSaveBtn.addEventListener('click', () => {
        const newConfig = {
          packaging: {
            certificate: parseFloat(document.getElementById('full-cfg-pkg-cert')?.value) || 5.00,
            giftBag: parseFloat(document.getElementById('full-cfg-pkg-bag')?.value) || 15.00,
            elastic: parseFloat(document.getElementById('full-cfg-pkg-elastic')?.value) || 10.00,
            boxPrinting: parseFloat(document.getElementById('full-cfg-pkg-box')?.value) || 20.00
          },
          logistics: {
            shipment: parseFloat(document.getElementById('full-cfg-log-ship')?.value) || 45.00,
            sticker: parseFloat(document.getElementById('full-cfg-log-sticker')?.value) || 2.00,
            shipmentBag: parseFloat(document.getElementById('full-cfg-log-bag')?.value) || 10.00
          },
          overheads: {
            returnDamage: parseFloat(document.getElementById('full-cfg-ovh-damage')?.value) || 50.00,
            marketingBase: parseFloat(document.getElementById('full-cfg-ovh-marketing')?.value) || 50.00,
            discountPct: parseFloat(document.getElementById('full-cfg-ovh-discount-pct')?.value) ?? 0.10
          },
          margin: {
            targetProfit: parseFloat(document.getElementById('full-cfg-margin-profit')?.value) || 200.00,
            mrpAnchorMode: document.getElementById('full-cfg-margin-anchor')?.value || '49_99'
          },
          stoneRates: {}
        };

        // Gather Stone Rates Overrides
        document.querySelectorAll('.full-stone-rate-input').forEach(inp => {
          const sId = inp.dataset.stoneId;
          const val = parseFloat(inp.value);
          if (sId && !isNaN(val)) newConfig.stoneRates[sId] = val;
        });

        PricingEngine.saveConfig(newConfig);
        this.updatePricingSnapshot();
        this.updateUI();
        this.populateFullPricingView();
        this.showToast('Pricing configuration saved locally!', 'success');
      });
    }

    if (fullPricingResetBtn) {
      fullPricingResetBtn.addEventListener('click', () => {
        PricingEngine.resetToDefaults();
        this.updatePricingSnapshot();
        this.updateUI();
        this.populateFullPricingView();
        this.showToast('Pricing reset to factory CSV defaults.', 'info');
      });
    }

    // Stone Rates Matrix Search & Reset
    const ratesSearchInput = document.getElementById('full-stone-rates-search');
    if (ratesSearchInput) {
      ratesSearchInput.addEventListener('input', () => this.renderEnhancedStoneRates());
    }

    const resetAllRatesBtn = document.getElementById('btn-reset-all-stone-rates');
    if (resetAllRatesBtn) {
      resetAllRatesBtn.addEventListener('click', () => {
        if (!PricingEngine.config.stoneRates || Object.keys(PricingEngine.config.stoneRates).length === 0) {
          this.showToast('All stone rates are already at factory base rates.', 'info');
          return;
        }
        PricingEngine.config.stoneRates = {};
        PricingEngine.saveConfig(PricingEngine.config);
        this.updatePricingSnapshot();
        this.updateUI();
        this.renderEnhancedStoneRates();
        this.showToast('Reset all stone rates to CSV base prices.', 'success');
      });
    }

    // ============================================================================
    // Collections Fullpage View Events (Epic 6)
    // ============================================================================
    const fullColSaveBtn = document.getElementById('btn-full-col-save-current');
    const fullColNewBtn = document.getElementById('btn-full-col-new-design');
    const fullColSearch = document.getElementById('full-col-search-input');
    const fullColClearSearch = document.getElementById('btn-full-col-clear-search');
    const fullColStatusFilter = document.getElementById('full-col-status-filter');

    if (fullColSaveBtn) fullColSaveBtn.addEventListener('click', () => this.saveCurrentDesign());
    if (fullColNewBtn) fullColNewBtn.addEventListener('click', () => {
      this.currentProductId = null;
      this.applyPreset('wealth', false);
      this.saveHistoryState();
      this.switchView('studio');
      this.showToast('Started fresh custom design in Studio!', 'info');
    });

    if (fullColSearch) {
      fullColSearch.addEventListener('input', () => this.renderFullCollectionsGrid());
    }
    if (fullColClearSearch) {
      fullColClearSearch.addEventListener('click', () => {
        if (fullColSearch) fullColSearch.value = '';
        fullColClearSearch.style.display = 'none';
        this.renderFullCollectionsGrid();
      });
    }
    if (fullColStatusFilter) {
      fullColStatusFilter.addEventListener('change', () => this.renderFullCollectionsGrid());
    }
    document.querySelectorAll('#full-col-cat-pills .col-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#full-col-cat-pills .col-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderFullCollectionsGrid();
      });
    });

    // ============================================================================
    // Spec Sheet Fullpage Events (Epic 6)
    // ============================================================================
    const viewSpecPrintBtn = document.getElementById('btn-view-spec-print');
    const viewSpecCopyBtn = document.getElementById('btn-view-spec-copy-recipe');
    if (viewSpecPrintBtn) viewSpecPrintBtn.addEventListener('click', () => this.printSpecSheet());
    if (viewSpecCopyBtn) {
      viewSpecCopyBtn.addEventListener('click', () => {
        const p = this.pricing || PricingEngine.calculate(this.beads);
        const recipeText = `AuraCraft Manufacturing Specification
Job Reference: AC-JOB-${(this.product.sku || 'SKU').split('-').slice(1, 4).join('')}
Title: ${this.product.title}
SKU: ${this.product.sku}
Status: ${(this.product.status || 'Active').toUpperCase()}
Total Bits: ${this.totalBits} beads | Diameter: ${this.beadDiameterMm}mm
Estimated Wrist Circumference: ${((this.totalBits * this.beadDiameterMm) / 10).toFixed(1)} cm
Raw Gems Cost: ₹${p.rawGemsCost.toFixed(2)} | Landed Total: ₹${p.totalLandedCost.toFixed(2)}
Final Selling Price: ₹${p.finalSellingPrice.toFixed(2)} | Recommended MRP: ₹${p.mrp.toFixed(2)}
Full BOM:
${p.stoneBreakdown.map(s => `- ${s.name}: ${s.count}x (₹${s.unitPrice.toFixed(2)}/ea = ₹${s.total.toFixed(2)})`).join('\n')}`;
        navigator.clipboard.writeText(recipeText).then(() => {
          this.showToast('Specification & BOM copied to clipboard!', 'success');
        });
      });
    }

    // ============================================================================
    // Share & Backup Hub Fullpage Events (Epic 6)
    // ============================================================================
    const fullCopyShareBtn = document.getElementById('btn-full-copy-share-url');
    if (fullCopyShareBtn) {
      fullCopyShareBtn.addEventListener('click', () => {
        const urlInp = document.getElementById('full-share-url-input');
        if (urlInp) {
          navigator.clipboard.writeText(urlInp.value).then(() => {
            this.showToast('Shareable link copied to clipboard!', 'success');
          });
        }
      });
    }

    // ============================================================================
    // Global Keyboard Shortcuts (Enhanced Epic 6)
    // ============================================================================
    window.addEventListener('keydown', (e) => {
      // Escape: Close open modals, or return to studio from subviews
      if (e.key === 'Escape') {
        this.closeAllModals();
        if (this.currentView !== 'studio') {
          this.switchView('studio');
        }
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Avoid shortcut interception if focused inside text inputs/textareas/selects
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

      if (cmdOrCtrl && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        this.printSpecSheet();
      } else if (cmdOrCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        this.saveCurrentDesign();
      } else if (cmdOrCtrl && !e.shiftKey && e.key.toLowerCase() === 'z' && !isInput) {
        e.preventDefault();
        this.undo();
      } else if (cmdOrCtrl && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z')) && !isInput) {
        e.preventDefault();
        this.redo();
      } else if (!cmdOrCtrl && !isInput) {
        // Quick 3-View Switching Numbers 1, 2, 3
        if (e.key === '1') this.switchView('studio');
        else if (e.key === '2') this.switchView('collections');
        else if (e.key === '3') this.switchView('settings');
        else if (e.key.toLowerCase() === 'f') this.toggleZenMode();
        else if (e.key === '[' || (e.altKey && e.key === '[')) this.togglePaletteSidebar();
        else if (e.key === ']' || (e.altKey && e.key === ']')) this.toggleDetailsSidebar();
      }
    });
  }

  // ============================================================================
  // Collection Gallery Operations (Epic 3)
  // ============================================================================
  updateCollectionCountBadge() {
    const count = StorageManager.getCount();
    const headerBadge = document.getElementById('header-collection-count');
    if (headerBadge) headerBadge.textContent = count;

    const modalBadge = document.getElementById('modal-collection-count-badge');
    if (modalBadge) modalBadge.textContent = `${count} ${count === 1 ? 'Design' : 'Designs'}`;
  }

  saveCurrentDesign() {
    const p = this.pricing || PricingEngine.calculate(this.beads);
    const payload = {
      id: this.currentProductId || undefined,
      title: this.product.title,
      sku: this.product.sku,
      category: this.product.category,
      status: this.product.status,
      beads: [...this.beads],
      totalBits: this.totalBits,
      beadDiameterMm: this.beadDiameterMm,
      cordType: this.cordType,
      pricing: {
        finalSellingPrice: p.finalSellingPrice,
        mrp: p.mrp,
        rawGemsCost: p.rawGemsCost
      }
    };

    const saved = StorageManager.save(payload);
    if (saved) {
      this.currentProductId = saved.id;
      this.updateCollectionCountBadge();
      this.showToast(`Saved "${saved.title}" to collection!`);

      const modal = document.getElementById('collections-modal');
      if (modal && modal.style.display !== 'none') {
        this.renderCollectionGrid();
      }
    }
  }

  openCollectionsModal() {
    const modal = document.getElementById('collections-modal');
    if (!modal) return;
    this.renderCollectionGrid();
    modal.style.display = 'flex';
  }

  renderCollectionGrid(filterCategory = null, searchQuery = null, filterStatus = null) {
    const grid = document.getElementById('collection-grid');
    const emptyState = document.getElementById('collection-empty-state');
    if (!grid) return;

    const activePill = document.querySelector('#collection-cat-pills .col-pill.active');
    const cat = filterCategory || (activePill ? activePill.dataset.cat : 'all');
    const searchInput = document.getElementById('collection-search-input');
    const query = (searchQuery !== null ? searchQuery : (searchInput ? searchInput.value : '')).toLowerCase().trim();
    const statusSelect = document.getElementById('collection-status-filter');
    const status = filterStatus || (statusSelect ? statusSelect.value : 'all');

    let products = StorageManager.getAll();

    if (cat !== 'all') {
      products = products.filter(p => (p.category || 'wealth') === cat);
    }

    if (status !== 'all') {
      products = products.filter(p => (p.status || 'active') === status);
    }

    if (query) {
      products = products.filter(p => {
        const titleMatch = (p.title || '').toLowerCase().includes(query);
        const skuMatch = (p.sku || '').toLowerCase().includes(query);
        const stoneMatch = (p.beads || []).some(b => {
          const st = this.getStone(b);
          return st && st.name.toLowerCase().includes(query);
        });
        return titleMatch || skuMatch || stoneMatch;
      });
    }

    grid.innerHTML = '';

    if (products.length === 0) {
      emptyState.style.display = 'flex';
      return;
    } else {
      emptyState.style.display = 'none';
    }

    products.forEach(product => {
      const pPricing = product.pricing || PricingEngine.calculate(product.beads);
      const card = document.createElement('div');
      card.className = 'collection-card';
      
      const categoryLabel = (product.category || 'wealth').toUpperCase();
      const statusClass = product.status || 'active';
      const statusText = statusClass.charAt(0).toUpperCase() + statusClass.slice(1);

      card.innerHTML = `
        <div class="collection-thumb-wrapper">
          <canvas class="collection-thumb-canvas" width="280" height="190"></canvas>
          <div class="collection-badge-overlay">
            <span class="collection-category-badge">${categoryLabel}</span>
            <span class="status-badge ${statusClass}">${statusText}</span>
          </div>
        </div>
        <div class="collection-card-body">
          <div class="collection-card-title" title="${product.title}">${product.title}</div>
          <div class="collection-sku-row">
            <span class="collection-card-sku">${product.sku}</span>
            <span class="collection-card-specs">${product.totalBits}B • ${product.beadDiameterMm}mm</span>
          </div>
          <div class="collection-price-row">
            <span class="collection-card-price">₹${Math.round(pPricing.finalSellingPrice || pPricing.sellingPrice || 0)}</span>
            <span class="collection-card-mrp">MRP ₹${Math.round(pPricing.mrp || 0)}</span>
          </div>
        </div>
        <div class="collection-card-actions">
          <button class="col-action-btn primary btn-load-design" title="Load into studio">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Load
          </button>
          <button class="col-action-btn btn-duplicate-design" title="Duplicate design">
            <i class="fa-solid fa-clone"></i>
          </button>
          <button class="col-action-btn danger btn-delete-design" title="Delete design">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;

      // Render miniature realistic canvas
      const thumbCanvas = card.querySelector('.collection-thumb-canvas');
      this.drawBracelet(thumbCanvas, 'dark', product.beads, product.totalBits, product.beadDiameterMm, product.cordType);

      // Event listeners
      card.querySelector('.btn-load-design').addEventListener('click', () => this.loadDesignIntoStudio(product.id));
      card.querySelector('.btn-duplicate-design').addEventListener('click', () => this.duplicateDesign(product.id));
      card.querySelector('.btn-delete-design').addEventListener('click', () => this.deleteDesign(product.id));

      grid.appendChild(card);
    });
  }

  loadDesignIntoStudio(id) {
    const product = StorageManager.getById(id);
    if (!product) return;

    this.currentProductId = product.id;
    this.totalBits = product.totalBits || product.beads.length || 22;
    this.beadDiameterMm = product.beadDiameterMm || 8;
    this.cordType = product.cordType || 'elastic';
    this.beads = [...product.beads];
    
    this.product = {
      title: product.title,
      sku: product.sku,
      category: product.category || 'wealth',
      status: product.status || 'active',
      isCustomTitle: true,
      isCustomSKU: true,
      variant: product.sku ? (product.sku.split('-').pop() || '001') : '001'
    };

    // Update UI Controls
    const bitsSlider = document.getElementById('bits-slider');
    if (bitsSlider) bitsSlider.value = this.totalBits;

    const cordSelect = document.getElementById('cord-type-select');
    if (cordSelect) {
      cordSelect.value = this.cordType;
      document.getElementById('bom-cord-text').textContent = cordSelect.options[cordSelect.selectedIndex].text;
    }

    document.querySelectorAll('#bead-size-selector .segment-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.size) === this.beadDiameterMm);
    });

    const titleInput = document.getElementById('product-title-input');
    if (titleInput) titleInput.value = this.product.title;

    const skuBadge = document.getElementById('product-sku-badge');
    if (skuBadge) skuBadge.textContent = this.product.sku;

    const catSelect = document.getElementById('product-category-select');
    if (catSelect) catSelect.value = this.product.category;

    const statusSelect = document.getElementById('product-status-select');
    if (statusSelect) statusSelect.value = this.product.status;

    const statusBadge = document.getElementById('product-status-badge');
    if (statusBadge) {
      statusBadge.className = `status-badge ${this.product.status}`;
      statusBadge.textContent = this.product.status.charAt(0).toUpperCase() + this.product.status.slice(1);
    }

    this.saveHistoryState();
    this.updateUI();
    this.drawBracelet();

    const modal = document.getElementById('collections-modal');
    if (modal) modal.style.display = 'none';

    this.showToast(`Loaded "${this.product.title}" into studio!`);
  }

  duplicateDesign(id) {
    const clone = StorageManager.duplicate(id);
    if (clone) {
      this.updateCollectionCountBadge();
      this.renderCollectionGrid();
      this.showToast(`Duplicated as "${clone.title}"!`);
    }
  }

  deleteDesign(id) {
    const p = StorageManager.getById(id);
    if (!p) return;
    if (confirm(`Are you sure you want to delete "${p.title}" (${p.sku}) from your collection?`)) {
      StorageManager.delete(id);
      if (this.currentProductId === id) {
        this.currentProductId = null;
      }
      this.updateCollectionCountBadge();
      this.renderCollectionGrid();
      this.showToast(`Deleted design from collection.`);
    }
  }

  // ============================================================================
  // URL Hash & Share Operations (Epic 4)
  // ============================================================================
  checkAndHydrateUrlHash() {
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('design=')) {
      const shared = ShareEngine.deserialize(window.location.hash);
      if (shared) {
        this.totalBits = shared.n || (shared.b ? shared.b.length : 22);
        this.beadDiameterMm = shared.d || 8;
        this.cordType = shared.c || 'elastic';
        this.beads = [...shared.b];
        
        this.product = {
          title: shared.t || 'Shared Custom Bracelet',
          sku: shared.s || SKUManager.generateSKU(this.beads, this.totalBits, this.beadDiameterMm),
          category: shared.cat || 'wealth',
          status: shared.st || 'active',
          isCustomTitle: true,
          isCustomSKU: true,
          variant: '001'
        };

        // Sync inputs
        const bitsSlider = document.getElementById('bits-slider');
        if (bitsSlider) bitsSlider.value = this.totalBits;

        const cordSelect = document.getElementById('cord-type-select');
        if (cordSelect) cordSelect.value = this.cordType;

        document.querySelectorAll('#bead-size-selector .segment-btn').forEach(btn => {
          btn.classList.toggle('active', parseInt(btn.dataset.size) === this.beadDiameterMm);
        });

        const titleInput = document.getElementById('product-title-input');
        if (titleInput) titleInput.value = this.product.title;

        this.saveHistoryState();
        this.updateUI();
        this.drawBracelet();
        this.showToast('Loaded shared custom bracelet design!');
      }
    }
  }

  openShareModal() {
    const shareModal = document.getElementById('share-modal');
    if (!shareModal) return;

    const shareUrl = ShareEngine.generateShareUrl(this);
    const linkInput = document.getElementById('share-link-input');
    if (linkInput) linkInput.value = shareUrl;

    const p = this.pricing || PricingEngine.calculate(this.beads);
    const shareText = encodeURIComponent(`Check out my custom AuraCraft bracelet design: "${this.product.title}" (${this.product.sku}) - ₹${p.finalSellingPrice.toFixed(0)}\n${shareUrl}`);

    const whatsappBtn = document.getElementById('btn-share-whatsapp');
    if (whatsappBtn) {
      whatsappBtn.href = `https://api.whatsapp.com/send?text=${shareText}`;
    }

    const twitterBtn = document.getElementById('btn-share-twitter');
    if (twitterBtn) {
      twitterBtn.href = `https://twitter.com/intent/tweet?text=${shareText}`;
    }

    const emailBtn = document.getElementById('btn-share-email');
    if (emailBtn) {
      emailBtn.href = `mailto:?subject=${encodeURIComponent('Custom AuraCraft Bracelet Specification: ' + this.product.title)}&body=${shareText}`;
    }

    shareModal.style.display = 'flex';
  }

  openBackupModal() {
    const backupModal = document.getElementById('backup-modal');
    if (!backupModal) return;

    const count = StorageManager.getCount();
    const countSpan = document.getElementById('backup-export-count');
    if (countSpan) countSpan.textContent = count;

    const skuSpan = document.getElementById('backup-active-sku');
    if (skuSpan) skuSpan.textContent = this.product.sku;

    // Reset staged area
    this.stagedBackupData = null;
    const stagedArea = document.getElementById('import-staged-area');
    if (stagedArea) stagedArea.style.display = 'none';

    const executeBtn = document.getElementById('btn-execute-restore');
    if (executeBtn) executeBtn.style.display = 'none';

    backupModal.style.display = 'flex';
  }

  handleBackupFileSelect(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const validated = BackupEngine.parseAndValidate(content);

      const stagedArea = document.getElementById('import-staged-area');
      const filenameSpan = document.getElementById('import-filename');
      const countBadge = document.getElementById('import-item-count');
      const executeBtn = document.getElementById('btn-execute-restore');

      if (!validated.valid) {
        alert(`Failed to parse backup file: ${validated.error}`);
        return;
      }

      this.stagedBackupData = validated;
      if (filenameSpan) filenameSpan.textContent = file.name;
      if (countBadge) countBadge.textContent = `${validated.count} ${validated.count === 1 ? 'Design' : 'Designs'} Found`;
      if (stagedArea) stagedArea.style.display = 'block';
      if (executeBtn) executeBtn.style.display = 'inline-flex';
    };
    reader.readAsText(file);
  }

  executeBackupRestore() {
    if (!this.stagedBackupData) {
      alert('Please select a valid backup JSON file first.');
      return;
    }

    const selectedMode = document.querySelector('input[name="import-mode"]:checked')?.value || 'merge';
    const result = BackupEngine.restoreBackup(this.stagedBackupData, selectedMode);

    if (result.success) {
      this.updateCollectionCountBadge();
      this.renderCollectionGrid();
      this.renderStonesCatalog();
      this.updateUI();

      const modal = document.getElementById('backup-modal');
      if (modal) modal.style.display = 'none';

      if (result.mode === 'replace') {
        this.showToast(`Restored collection (${result.count} designs)!`);
      } else {
        this.showToast(`Merged ${result.added} new and ${result.updated} updated designs!`);
      }
    } else {
      alert(`Restore failed: ${result.error}`);
    }
  }

  renderExportPreview(bgStyle) {
    const previewCanvas = document.createElement('canvas');
    previewCanvas.width = 800;
    previewCanvas.height = 800;
    this.drawBracelet(previewCanvas, bgStyle);
    document.getElementById('export-preview-img').src = previewCanvas.toDataURL('image/png');
  }

  populateSummaryModal() {
    const miniCanvas = document.getElementById('summary-mini-canvas');
    this.drawBracelet(miniCanvas, 'dark');

    const p = this.pricing || PricingEngine.calculate(this.beads);
    const approxCircumference = ((this.totalBits * (this.beadDiameterMm + 0.4)) / 10).toFixed(1);
    
    // Product Title & SKU in Summary Modal (Epic 2)
    const modalTitle = document.getElementById('modal-product-title');
    if (modalTitle) modalTitle.textContent = this.product.title;

    const modalSku = document.getElementById('modal-product-sku');
    if (modalSku) modalSku.textContent = this.product.sku;

    document.getElementById('modal-total-bits').textContent = `${this.totalBits} Beads`;
    document.getElementById('modal-bead-size').textContent = `${this.beadDiameterMm} mm`;
    document.getElementById('modal-summary-selling-price').textContent = `₹${p.finalSellingPrice.toFixed(2)}`;
    document.getElementById('modal-summary-mrp').textContent = `₹${p.mrp.toFixed(2)}`;
    
    const cordSelect = document.getElementById('cord-type-select');
    if (cordSelect) {
      document.getElementById('modal-cord-type').textContent = cordSelect.options[cordSelect.selectedIndex].text;
    }

    const tbody = document.getElementById('specs-table-body');
    tbody.innerHTML = '';

    p.stoneBreakdown.forEach(item => {
      const stone = this.getStone(item.id);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600; color: #fff;">${item.name}</td>
        <td style="color: #94a3b8;">${stone.chakra}</td>
        <td style="font-family: 'Space Grotesk', monospace;">₹${item.unitPrice.toFixed(2)}</td>
        <td style="font-weight: bold; color: var(--accent-gold-light);">${item.count}</td>
        <td style="font-family: 'Space Grotesk', monospace; font-weight: bold; color: #fff;">₹${item.total.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  closeAllModals() {
    const modalIds = [
      'pricing-modal',
      'collections-modal',
      'share-modal',
      'backup-modal',
      'export-modal',
      'summary-modal'
    ];
    modalIds.forEach(id => {
      const modal = document.getElementById(id);
      if (modal) modal.style.display = 'none';
    });
  }

  createBarcodeBar(className) {
    const bar = document.createElement('span');
    bar.className = `barcode-bar ${className}`;
    return bar;
  }

  populatePrintableSpecSheet() {
    const p = this.pricing || PricingEngine.calculate(this.beads);
    
    // 1. Meta / Header
    const jobIdElem = document.getElementById('print-job-id');
    if (jobIdElem) {
      const skuParts = (this.product.sku || 'SKU').split('-');
      const hash = skuParts.length > 2 ? skuParts.slice(1, 4).join('') : '98214';
      jobIdElem.textContent = `AC-JOB-${hash.toUpperCase()}`;
    }

    const dateElem = document.getElementById('print-date');
    if (dateElem) {
      const now = new Date();
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      dateElem.textContent = `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }

    const statusElem = document.getElementById('print-status-badge');
    if (statusElem) {
      statusElem.textContent = (this.product.status || 'ACTIVE').toUpperCase();
    }

    // 2. Visual Render Snapshot
    const printImg = document.getElementById('print-bracelet-img');
    if (printImg && this.canvas) {
      printImg.src = this.canvas.toDataURL('image/png');
    }

    // 3. Physical Dimensions
    const dimBits = document.getElementById('print-dim-bits');
    if (dimBits) dimBits.textContent = `${this.totalBits} Beads`;

    const dimDiameter = document.getElementById('print-dim-diameter');
    if (dimDiameter) dimDiameter.textContent = `${this.beadDiameterMm.toFixed(1)} mm`;

    const dimCirc = document.getElementById('print-dim-circumference');
    if (dimCirc) {
      const circCm = ((this.totalBits * this.beadDiameterMm) / 10).toFixed(1);
      const wristMin = Math.max(12, (circCm - 1.5)).toFixed(1);
      dimCirc.textContent = `${circCm} cm (Wrist ${wristMin} - ${circCm} cm)`;
    }

    const dimCord = document.getElementById('print-dim-cord');
    if (dimCord) {
      const cordSelect = document.getElementById('cord-type-select');
      const cordName = (cordSelect && cordSelect.options && cordSelect.selectedIndex >= 0 && cordSelect.options[cordSelect.selectedIndex]) 
        ? cordSelect.options[cordSelect.selectedIndex].text 
        : 'Elastic Stretch Thread (0.8mm)';
      dimCord.textContent = cordName;
    }

    // 4. Product Title & Barcode
    const catBadge = document.getElementById('print-category-badge');
    if (catBadge) catBadge.textContent = (this.product.category || 'Fine Jewelry').toUpperCase();

    const titleElem = document.getElementById('print-product-title');
    if (titleElem) titleElem.textContent = this.product.title;

    const skuText = document.getElementById('print-sku-text');
    if (skuText) skuText.textContent = this.product.sku;

    // Simulated Barcode Generation
    const barcodeContainer = document.getElementById('print-simulated-barcode');
    if (barcodeContainer) {
      barcodeContainer.innerHTML = '';
      const sku = this.product.sku || 'AC-AURA-001';
      // Lead guard
      barcodeContainer.appendChild(this.createBarcodeBar('w2'));
      barcodeContainer.appendChild(this.createBarcodeBar('space1'));
      barcodeContainer.appendChild(this.createBarcodeBar('w1'));
      barcodeContainer.appendChild(this.createBarcodeBar('space1'));

      for (let i = 0; i < sku.length; i++) {
        const charCode = sku.charCodeAt(i);
        const wClass = (charCode % 3 === 0) ? 'w3' : ((charCode % 2 === 0) ? 'w2' : 'w1');
        const spClass = (charCode % 2 === 0) ? 'space2' : 'space1';
        barcodeContainer.appendChild(this.createBarcodeBar(wClass));
        barcodeContainer.appendChild(this.createBarcodeBar(spClass));
      }

      // Trail guard
      barcodeContainer.appendChild(this.createBarcodeBar('w1'));
      barcodeContainer.appendChild(this.createBarcodeBar('space1'));
      barcodeContainer.appendChild(this.createBarcodeBar('w2'));
    }

    // Energy description
    const energyElem = document.getElementById('print-energy-description');
    if (energyElem) {
      const topStones = p.stoneBreakdown.slice(0, 3).map(s => s.name).join(', ');
      energyElem.textContent = `Authentic formulation featuring ${topStones}, calibrated for elemental harmony, mental clarity, and spiritual resonance.`;
    }

    // Bead stringing sequence chips
    const seqContainer = document.getElementById('print-sequence-preview');
    if (seqContainer) {
      seqContainer.innerHTML = '';
      this.beads.forEach((stoneId, idx) => {
        const stone = this.getStone(stoneId);
        const chip = document.createElement('span');
        chip.className = 'print-seq-chip';
        const code = stone.code || stone.name.substring(0, 3).toUpperCase();
        chip.textContent = `${idx + 1}:${code}`;
        chip.title = `${idx + 1}. ${stone.name}`;
        seqContainer.appendChild(chip);
      });
    }

    // 5. Bill of Materials (BOM) Table
    const bomTbody = document.getElementById('print-bom-tbody');
    if (bomTbody) {
      bomTbody.innerHTML = '';
      p.stoneBreakdown.forEach((item, idx) => {
        const stone = this.getStone(item.id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="text-align: center;">${idx + 1}</td>
          <td><strong>${item.name}</strong></td>
          <td>${stone.mineralFamily || 'Natural Mineral'}</td>
          <td>${stone.chakra}</td>
          <td style="text-align: center;"><strong>${item.count}</strong></td>
          <td style="text-align: right; font-family: 'Space Grotesk', monospace;">₹${item.unitPrice.toFixed(2)}</td>
          <td style="text-align: right; font-family: 'Space Grotesk', monospace;"><strong>₹${item.total.toFixed(2)}</strong></td>
        `;
        bomTbody.appendChild(tr);
      });
    }

    const bomBits = document.getElementById('print-bom-total-bits');
    if (bomBits) bomBits.textContent = this.totalBits;

    const bomGemsCost = document.getElementById('print-bom-total-gems-cost');
    if (bomGemsCost) bomGemsCost.textContent = `₹${p.rawGemsCost.toFixed(2)}`;

    // 6. Cost Waterfall
    const setCost = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = `₹${val.toFixed(2)}`;
    };

    setCost('print-cost-raw-gems', p.rawGemsCost);
    setCost('print-cost-packaging', p.packaging.subtotal);
    setCost('print-cost-logistics', p.logistics.subtotal);
    setCost('print-cost-overheads', p.overheads.fixedSubtotal);
    setCost('print-cost-margin', p.margin.targetProfit);
    setCost('print-cost-selling-price', p.finalSellingPrice);
    setCost('print-cost-discount', p.overheads.discountAmount);
    setCost('print-cost-mrp', p.mrp);
  }

  printSpecSheet() {
    this.populatePrintableSpecSheet();
    setTimeout(() => {
      window.print();
    }, 80);
  }

  showToast(message, type = 'info', title = null, duration = 2800) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-text');
    const toastTitle = document.getElementById('toast-title');
    const toastIcon = document.getElementById('toast-icon');
    const toastProgress = document.getElementById('toast-progress-bar');
    if (!toast || !toastText) return;

    // Reset classes
    toast.className = `toast-notification ${type} active`;
    toast.style.display = 'flex';

    // Set Text
    toastText.textContent = message;

    // Set Title
    if (toastTitle) {
      toastTitle.textContent = title || (type === 'success' ? 'Success' : type === 'warning' ? 'Notice' : type === 'error' ? 'Error' : 'AuraCraft');
    }

    // Set Icon
    if (toastIcon) {
      if (type === 'success') toastIcon.className = 'fa-solid fa-circle-check';
      else if (type === 'warning') toastIcon.className = 'fa-solid fa-triangle-exclamation';
      else if (type === 'error') toastIcon.className = 'fa-solid fa-circle-xmark';
      else toastIcon.className = 'fa-solid fa-gem';
    }

    // Animated Progress Bar
    if (toastProgress) {
      toastProgress.style.transition = 'none';
      toastProgress.style.transform = 'scaleX(1)';
      setTimeout(() => {
        toastProgress.style.transition = `transform ${duration}ms linear`;
        toastProgress.style.transform = 'scaleX(0)';
      }, 20);
    }

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dismissToast();
    }, duration);
  }

  dismissToast() {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.classList.remove('active');
    setTimeout(() => {
      toast.style.display = 'none';
    }, 250);
  }

  // ============================================================================
  // Multi-View Router & Layout Management (Epic 6)
  // ============================================================================
  initViewRouter() {
    // Populate stone count badge in nav
    const navStoneCount = document.getElementById('nav-stone-count');
    if (navStoneCount) navStoneCount.textContent = STONES_DB.length;

    // Attach click listeners to all view navigation tab buttons
    document.querySelectorAll('.view-nav-tabs .nav-tab-btn, #view-nav-tabs .nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const view = btn.dataset.view;
        if (view) this.switchView(view);
      });
    });

    // Check if initial URL hash has #view=...
    const hash = window.location.hash;
    if (hash && hash.startsWith('#view=')) {
      const view = hash.replace('#view=', '');
      this.switchView(view);
    } else {
      this.switchView('studio');
    }
  }

  switchView(viewName) {
    // Normalization & Aliases
    if (viewName === 'pricing') {
      this.switchView('settings');
      this.switchSettingsTab('pricing');
      return;
    }
    if (viewName === 'share-backup' || viewName === 'backup') {
      this.switchView('settings');
      this.switchSettingsTab('backup');
      return;
    }
    if (viewName === 'specsheet') {
      this.printSpecSheet();
      return;
    }
    if (viewName === 'gemstones') {
      viewName = 'studio';
    }

    const validViews = ['studio', 'collections', 'settings'];
    if (!validViews.includes(viewName)) viewName = 'studio';

    this.currentView = viewName;

    // 1. Update Navigation Tabs
    document.querySelectorAll('#view-nav-tabs .nav-tab-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. Hide all view containers and show target
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
      view.style.display = 'none';
    });

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.add('active');
      targetView.style.display = viewName === 'studio' ? 'grid' : 'flex';
    }

    // 3. Populate target view data reactively
    if (viewName === 'studio') {
      setTimeout(() => {
        this.drawBracelet();
      }, 50);
    } else if (viewName === 'collections') {
      this.renderFullCollectionsGrid();
    } else if (viewName === 'settings') {
      this.populateFullPricingView();
      this.populateFullShareBackupView();
    }
  }

  switchSettingsTab(tabName) {
    document.querySelectorAll('#settings-subtabs .settings-subtab-btn').forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const panePricing = document.getElementById('pane-settings-pricing');
    const paneBackup = document.getElementById('pane-settings-backup');
    if (tabName === 'backup') {
      if (panePricing) panePricing.style.display = 'none';
      if (paneBackup) paneBackup.style.display = 'flex';
      this.populateFullShareBackupView();
    } else {
      if (panePricing) panePricing.style.display = 'flex';
      if (paneBackup) paneBackup.style.display = 'none';
      this.populateFullPricingView();
    }
  }

  togglePaletteSidebar(forceState) {
    const studioMain = document.getElementById('view-studio');
    const paletteSidebar = document.getElementById('palette-sidebar');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const expandBtn = document.getElementById('btn-expand-left-sidebar');
    if (!studioMain) return;

    // In mobile viewport, toggle the mobile drawer overlay
    if (window.innerWidth <= 768 && paletteSidebar) {
      const isOpen = paletteSidebar.classList.contains('mobile-open');
      if (forceState === true || (forceState === undefined && isOpen)) {
        paletteSidebar.classList.remove('mobile-open');
        if (backdrop) backdrop.classList.remove('active');
      } else {
        paletteSidebar.classList.add('mobile-open');
        if (backdrop) backdrop.classList.add('active');
      }
      return;
    }

    this.isPaletteCollapsed = (forceState !== undefined) ? forceState : !this.isPaletteCollapsed;

    if (this.isPaletteCollapsed) {
      studioMain.classList.add('palette-collapsed');
      if (expandBtn) expandBtn.style.display = 'inline-flex';
    } else {
      studioMain.classList.remove('palette-collapsed');
      studioMain.classList.remove('zen-mode');
      this.isZenMode = false;
      const zenBtn = document.getElementById('btn-toggle-zen-mode');
      if (zenBtn) zenBtn.classList.remove('active');
      const zenLbl = document.getElementById('zen-btn-label');
      if (zenLbl) zenLbl.textContent = 'Zen Mode';
      if (expandBtn) expandBtn.style.display = 'none';
    }

    setTimeout(() => this.drawBracelet(), 260);
  }

  toggleDetailsSidebar(forceState) {
    const studioMain = document.getElementById('view-studio');
    const detailsSidebar = document.getElementById('details-sidebar');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const expandBtn = document.getElementById('btn-expand-right-sidebar');
    if (!studioMain) return;

    // In mobile viewport, toggle the mobile drawer overlay
    if (window.innerWidth <= 768 && detailsSidebar) {
      const isOpen = detailsSidebar.classList.contains('mobile-open');
      if (forceState === true || (forceState === undefined && isOpen)) {
        detailsSidebar.classList.remove('mobile-open');
        if (backdrop) backdrop.classList.remove('active');
      } else {
        detailsSidebar.classList.add('mobile-open');
        if (backdrop) backdrop.classList.add('active');
      }
      return;
    }

    this.isDetailsCollapsed = (forceState !== undefined) ? forceState : !this.isDetailsCollapsed;

    if (this.isDetailsCollapsed) {
      studioMain.classList.add('details-collapsed');
      if (expandBtn) expandBtn.style.display = 'inline-flex';
    } else {
      studioMain.classList.remove('details-collapsed');
      studioMain.classList.remove('zen-mode');
      this.isZenMode = false;
      const zenBtn = document.getElementById('btn-toggle-zen-mode');
      if (zenBtn) zenBtn.classList.remove('active');
      const zenLbl = document.getElementById('zen-btn-label');
      if (zenLbl) zenLbl.textContent = 'Zen Mode';
      if (expandBtn) expandBtn.style.display = 'none';
    }

    setTimeout(() => this.drawBracelet(), 260);
  }

  bindMobileEvents() {
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const paletteSidebar = document.getElementById('palette-sidebar');
    const detailsSidebar = document.getElementById('details-sidebar');
    const btnMobileStones = document.getElementById('btn-mobile-open-stones');
    const btnMobileInspector = document.getElementById('btn-mobile-open-inspector');
    const btnMobileUndo = document.getElementById('btn-mobile-undo');
    const btnMobileBits = document.getElementById('btn-mobile-bits-quick');

    const closeMobileDrawers = () => {
      if (paletteSidebar) paletteSidebar.classList.remove('mobile-open');
      if (detailsSidebar) detailsSidebar.classList.remove('mobile-open');
      if (backdrop) backdrop.classList.remove('active');
      if (btnMobileStones) btnMobileStones.classList.remove('active');
      if (btnMobileInspector) btnMobileInspector.classList.remove('active');
    };

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileDrawers);
      backdrop.addEventListener('touchstart', (e) => {
        e.preventDefault();
        closeMobileDrawers();
      }, { passive: false });
    }

    if (btnMobileStones) {
      btnMobileStones.addEventListener('click', () => {
        const isOpen = paletteSidebar && paletteSidebar.classList.contains('mobile-open');
        closeMobileDrawers();
        if (!isOpen && paletteSidebar) {
          paletteSidebar.classList.add('mobile-open');
          if (backdrop) backdrop.classList.add('active');
          btnMobileStones.classList.add('active');
        }
      });
    }

    if (btnMobileInspector) {
      btnMobileInspector.addEventListener('click', () => {
        const isOpen = detailsSidebar && detailsSidebar.classList.contains('mobile-open');
        closeMobileDrawers();
        if (!isOpen && detailsSidebar) {
          detailsSidebar.classList.add('mobile-open');
          if (backdrop) backdrop.classList.add('active');
          btnMobileInspector.classList.add('active');
        }
      });
    }

    if (btnMobileUndo) {
      btnMobileUndo.addEventListener('click', () => this.undo());
    }

    if (btnMobileBits) {
      btnMobileBits.addEventListener('click', () => {
        const sizes = [18, 20, 22, 24, 26, 28];
        const curIdx = sizes.indexOf(this.totalBits);
        const nextSize = sizes[(curIdx + 1) % sizes.length] || 22;
        this.setTotalBits(nextSize);
      });
    }

    this.closeMobileDrawers = closeMobileDrawers;

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileDrawers();
      }
      this.drawBracelet();
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.drawBracelet();
      }, 300);
    });
  }

  toggleZenMode() {
    const studioMain = document.getElementById('view-studio');
    const zenBtn = document.getElementById('btn-toggle-zen-mode');
    const zenLbl = document.getElementById('zen-btn-label');
    const expandLeft = document.getElementById('btn-expand-left-sidebar');
    const expandRight = document.getElementById('btn-expand-right-sidebar');
    if (!studioMain) return;

    this.isZenMode = !this.isZenMode;

    if (this.isZenMode) {
      this.isPaletteCollapsed = true;
      this.isDetailsCollapsed = true;
      studioMain.classList.add('zen-mode', 'palette-collapsed', 'details-collapsed');
      if (zenBtn) zenBtn.classList.add('active');
      if (zenLbl) zenLbl.textContent = 'Exit Zen';
      if (expandLeft) expandLeft.style.display = 'inline-flex';
      if (expandRight) expandRight.style.display = 'inline-flex';
      this.showToast('Zen Fullscreen Mode enabled (Press F to exit)', 'info');
    } else {
      this.isPaletteCollapsed = false;
      this.isDetailsCollapsed = false;
      studioMain.classList.remove('zen-mode', 'palette-collapsed', 'details-collapsed');
      if (zenBtn) zenBtn.classList.remove('active');
      if (zenLbl) zenLbl.textContent = 'Zen Mode';
      if (expandLeft) expandLeft.style.display = 'none';
      if (expandRight) expandRight.style.display = 'none';
    }

    setTimeout(() => this.drawBracelet(), 260);
  }

  renderFullGemstonesCatalog(category = 'all', query = '') {
    const container = document.getElementById('gemstones-fullgrid');
    if (!container) return;
    container.innerHTML = '';

    const q = (query || '').toLowerCase().trim();
    const filtered = STONES_DB.filter(s => {
      const matchCat = (category === 'all') || (s.category === category);
      const matchQuery = !q || s.name.toLowerCase().includes(q) || s.chakra.toLowerCase().includes(q) || (s.mineralFamily && s.mineralFamily.toLowerCase().includes(q)) || (s.healing && s.healing.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });

    filtered.forEach(stone => {
      const card = document.createElement('div');
      card.className = 'gemstone-fullcard';
      const rate = PricingEngine.getStoneRate(stone.id);

      card.innerHTML = `
        <div class="gemstone-fullcard-top">
          <div class="gemstone-large-sphere" style="background: ${stone.color}; box-shadow: inset -4px -4px 8px rgba(0,0,0,0.6), 0 0 16px ${stone.color}40;"></div>
          <div class="gemstone-fullcard-meta">
            <div class="gemstone-fullcard-name-row">
              <span class="gemstone-fullcard-name">${stone.name}</span>
              <span class="gemstone-fullcard-price">₹${rate.toFixed(2)}/ea</span>
            </div>
            <span class="gemstone-fullcard-chakra">${stone.chakra} Chakra • ${stone.mineralFamily || 'Natural Mineral'}</span>
          </div>
        </div>
        <p class="gemstone-fullcard-desc">${stone.healing || stone.description || 'Authentic natural healing mineral with grounding and vibrational attunement.'}</p>
        <div class="gemstone-fullcard-properties">
          <div><span>Hardness:</span> <strong>${stone.hardness || '7.0'} Mohs</strong></div>
          <div><span>Zodiac:</span> <strong>${stone.zodiac || 'All Signs'}</strong></div>
          <div><span>Element:</span> <strong>${stone.element || 'Earth'}</strong></div>
          <div><span>SKU Code:</span> <strong>${stone.code || stone.name.substring(0,3).toUpperCase()}</strong></div>
        </div>
        <div class="gemstone-fullcard-actions">
          <button class="action-btn primary full-width btn-full-select" style="flex: 1;"><i class="fa-solid fa-palette"></i> Select for Studio</button>
          <button class="action-btn gold btn-full-fill" title="Fill entire bracelet with ${stone.name}"><i class="fa-solid fa-fill-drip"></i> Fill</button>
        </div>
      `;

      card.querySelector('.btn-full-select').addEventListener('click', () => {
        this.activeStoneId = stone.id;
        this.updateActiveStoneUI();
        this.switchView('studio');
        this.showToast(`Selected ${stone.name} as active stone.`, 'info');
      });

      card.querySelector('.btn-full-fill').addEventListener('click', () => {
        this.applyFill(stone.id);
        this.switchView('studio');
      });

      container.appendChild(card);
    });
  }

  renderEnhancedStoneRates() {
    const grid = document.getElementById('full-stone-rates-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const searchInput = document.getElementById('full-stone-rates-search');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    const filteredStones = STONES_DB.filter(st => {
      if (!query) return true;
      return (
        st.name.toLowerCase().includes(query) || 
        (st.chakra && st.chakra.toLowerCase().includes(query)) ||
        (st.alias && st.alias.toLowerCase().includes(query))
      );
    });

    if (filteredStones.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; color: var(--text-subtle);">
          <i class="fa-solid fa-gem" style="font-size: 1.8rem; opacity: 0.4; margin-bottom: 8px;"></i>
          <p>No gemstones match your search query.</p>
        </div>
      `;
      return;
    }

    filteredStones.forEach(st => {
      const currentRate = PricingEngine.getStoneRate(st.id);
      const isOverridden = PricingEngine.config.stoneRates && PricingEngine.config.stoneRates[st.id] !== undefined;
      const baseRate = st.unitPrice;

      const card = document.createElement('div');
      card.className = `stone-rate-card ${isOverridden ? 'is-custom' : ''}`;
      card.innerHTML = `
        <div class="stone-rate-preview">
          <canvas class="stone-rate-canvas" width="30" height="30" data-stone-id="${st.id}"></canvas>
          <div class="stone-rate-info">
            <span class="stone-rate-name">${st.name}</span>
            <span class="stone-base-tag">Base: ₹${baseRate.toFixed(2)}</span>
          </div>
        </div>
        <div class="stone-rate-control">
          <div class="stone-rate-input-wrap">
            <span class="stone-rate-symbol">₹</span>
            <input type="number" step="0.25" min="0" value="${currentRate.toFixed(2)}" class="full-stone-rate-input" data-stone-id="${st.id}">
          </div>
          ${isOverridden ? `<button class="btn-reset-single-rate" data-stone-id="${st.id}" title="Reset to base rate (₹${baseRate.toFixed(2)})"><i class="fa-solid fa-rotate-left"></i></button>` : ''}
        </div>
      `;

      // Render mini canvas bead preview
      const canvas = card.querySelector('.stone-rate-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        this.renderRealisticBead(ctx, 15, 15, 12, st, false, false);
      }

      // Input change listener for live override
      const input = card.querySelector('.full-stone-rate-input');
      if (input) {
        input.addEventListener('change', (e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val) && val >= 0) {
            if (!PricingEngine.config.stoneRates) PricingEngine.config.stoneRates = {};
            PricingEngine.config.stoneRates[st.id] = val;
            PricingEngine.saveConfig(PricingEngine.config);
            this.updatePricingSnapshot();
            this.updateUI();
            this.renderEnhancedStoneRates();
            this.showToast(`Updated ${st.name} rate to ₹${val.toFixed(2)}/bead`, 'success');
          }
        });
      }

      // Reset single rate button
      const resetBtn = card.querySelector('.btn-reset-single-rate');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (PricingEngine.config.stoneRates && PricingEngine.config.stoneRates[st.id] !== undefined) {
            delete PricingEngine.config.stoneRates[st.id];
            PricingEngine.saveConfig(PricingEngine.config);
            this.updatePricingSnapshot();
            this.updateUI();
            this.renderEnhancedStoneRates();
            this.showToast(`Reset ${st.name} to base rate ₹${baseRate.toFixed(2)}`, 'info');
          }
        });
      }

      grid.appendChild(card);
    });
  }

  populateFullPricingView() {
    const p = this.pricing || PricingEngine.calculate(this.beads);
    const cfg = PricingEngine.config;

    // 1. Form Inputs Hydration
    const setInput = (id, val) => {
      const inp = document.getElementById(id);
      if (inp) inp.value = val;
    };
    setInput('full-cfg-pkg-cert', cfg.packaging.certificate);
    setInput('full-cfg-pkg-bag', cfg.packaging.giftBag);
    setInput('full-cfg-pkg-elastic', cfg.packaging.elastic);
    setInput('full-cfg-pkg-box', cfg.packaging.boxPrinting);

    setInput('full-cfg-log-ship', cfg.logistics.shipment);
    setInput('full-cfg-log-sticker', cfg.logistics.sticker);
    setInput('full-cfg-log-bag', cfg.logistics.shipmentBag);

    setInput('full-cfg-ovh-damage', cfg.overheads.returnDamage);
    setInput('full-cfg-ovh-marketing', cfg.overheads.marketingBase);
    setInput('full-cfg-ovh-discount-pct', cfg.overheads.discountPct);

    setInput('full-cfg-margin-profit', cfg.margin.targetProfit);
    setInput('full-cfg-margin-anchor', cfg.margin.mrpAnchorMode || '49_99');

    // 2. Stone Rates Grid
    this.renderEnhancedStoneRates();
  }

  renderFullCollectionsGrid() {
    const grid = document.getElementById('full-col-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const items = StorageManager.getAll();
    const activeCat = document.querySelector('#full-col-cat-pills .col-pill.active')?.dataset.cat || 'all';
    const activeStatus = document.getElementById('full-col-status-filter')?.value || 'all';
    const query = (document.getElementById('full-col-search-input')?.value || '').toLowerCase().trim();

    const filtered = items.filter(p => {
      const matchCat = (activeCat === 'all') || (p.category === activeCat);
      const matchStatus = (activeStatus === 'all') || (p.status === activeStatus);
      const matchQuery = !query || 
        p.title.toLowerCase().includes(query) || 
        p.sku.toLowerCase().includes(query) || 
        (p.beads && p.beads.some(b => b.toLowerCase().includes(query)));
      return matchCat && matchStatus && matchQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="collection-empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-gem empty-icon"></i>
          <h4>No Matching Designs Found</h4>
          <p>No bracelets match your search filters. Try adjusting your query or create a new design in Studio.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(product => {
      const pPricing = product.pricing || PricingEngine.calculate(product.beads);
      const card = document.createElement('div');
      card.className = 'collection-card';
      
      const categoryLabel = (product.category || 'wealth').toUpperCase();
      const statusClass = product.status || 'active';
      const statusText = statusClass.charAt(0).toUpperCase() + statusClass.slice(1);

      card.innerHTML = `
        <div class="collection-thumb-wrapper">
          <canvas class="collection-thumb-canvas" width="280" height="190"></canvas>
          <div class="collection-badge-overlay">
            <span class="collection-category-badge">${categoryLabel}</span>
            <span class="status-badge ${statusClass}">${statusText}</span>
          </div>
        </div>
        <div class="collection-card-body">
          <h4 class="collection-card-title">${product.title}</h4>
          <div class="collection-sku-row">
            <span class="collection-card-sku">${product.sku}</span>
            <span class="collection-card-specs">${product.totalBits || product.beads.length}B • ${product.beadDiameterMm || 8}mm</span>
          </div>
          <div class="collection-price-row">
            <span class="collection-card-price">₹${pPricing.finalSellingPrice.toFixed(2)}</span>
            <span class="collection-card-mrp">MRP ₹${pPricing.mrp.toFixed(2)}</span>
          </div>
        </div>
        <div class="collection-card-actions">
          <button class="col-action-btn primary btn-full-col-load"><i class="fa-solid fa-palette"></i> Load</button>
          <button class="col-action-btn btn-full-col-dup" title="Duplicate"><i class="fa-solid fa-copy"></i> Copy</button>
          <button class="col-action-btn danger btn-full-col-del" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `;

      // Render miniature realistic canvas
      const thumbCanvas = card.querySelector('.collection-thumb-canvas');
      if (thumbCanvas) {
        this.drawBracelet(thumbCanvas, 'dark', product.beads, product.totalBits || product.beads.length, product.beadDiameterMm || 8, product.cordType || 'elastic');
      }

      card.querySelector('.btn-full-col-load').addEventListener('click', () => {
        this.loadDesignIntoStudio(product.id);
        this.switchView('studio');
      });

      card.querySelector('.btn-full-col-dup').addEventListener('click', () => {
        const clone = StorageManager.duplicate(product.id);
        if (clone) {
          this.updateCollectionCountBadge();
          this.renderFullCollectionsGrid();
          this.showToast(`Duplicated as "${clone.title}"!`, 'success');
        }
      });

      card.querySelector('.btn-full-col-del').addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
          StorageManager.delete(product.id);
          this.updateCollectionCountBadge();
          this.renderFullCollectionsGrid();
          this.showToast(`Deleted design from collection.`, 'info');
        }
      });

      grid.appendChild(card);
    });
  }

  populateFullSpecSheetView() {
    this.populatePrintableSpecSheet();
    const screenCard = document.getElementById('specsheet-screen-preview');
    const printSheet = document.getElementById('printable-spec-sheet');
    if (screenCard && printSheet) {
      screenCard.innerHTML = printSheet.innerHTML;
    }
  }

  populateFullShareBackupView() {
    const url = ShareEngine.generateShareUrl(this);
    const urlInput = document.getElementById('full-share-url-input');
    if (urlInput) urlInput.value = url;

    // Social Links
    const encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(`Check out my custom AuraCraft gemstone bracelet design: ${this.product.title} (SKU: ${this.product.sku})!`);
    
    const waBtn = document.getElementById('btn-full-share-whatsapp');
    if (waBtn) waBtn.href = `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`;

    const twBtn = document.getElementById('btn-full-share-twitter');
    if (twBtn) twBtn.href = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;

    const emBtn = document.getElementById('btn-full-share-email');
    if (emBtn) emBtn.href = `mailto:?subject=${encodeURIComponent('AuraCraft Custom Bracelet Recipe: ' + this.product.title)}&body=${text}%0A%0AOpen%20Design:%20${encodedUrl}`;

    // Summary Card
    const p = this.pricing || PricingEngine.calculate(this.beads);
    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (el) el.textContent = v;
    };
    setVal('hub-design-title', this.product.title);
    setVal('hub-design-sku', this.product.sku);
    setVal('hub-design-specs', `${this.totalBits} Beads (${this.beadDiameterMm}mm) • ${this.cordType}`);
    setVal('hub-design-price', `₹${p.finalSellingPrice.toFixed(2)}`);
  }

  handleFullBackupFileSelect(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = BackupEngine.parseAndValidate(e.target.result);
      if (result.valid) {
        this.stagedBackupData = result.data;
        const stagedArea = document.getElementById('full-import-staged-area');
        const filenameSpan = document.getElementById('full-import-filename');
        const countBadge = document.getElementById('full-import-item-count');

        if (stagedArea) stagedArea.style.display = 'block';
        if (filenameSpan) filenameSpan.textContent = file.name;
        if (countBadge) countBadge.textContent = `${result.itemCount} ${result.itemCount === 1 ? 'Design' : 'Designs'} Found`;
        this.showToast(`Validated backup: ${result.itemCount} designs ready for restore.`, 'success');
      } else {
        this.stagedBackupData = null;
        this.showToast(`Invalid backup file: ${result.error}`, 'error');
      }
    };
    reader.readAsText(file);
  }

  executeFullBackupRestore() {
    if (!this.stagedBackupData) {
      this.showToast('Please select a valid AuraCraft JSON backup file first.', 'warning');
      return;
    }

    const modeInput = document.querySelector('input[name="full-import-mode"]:checked');
    const mode = modeInput ? modeInput.value : 'merge';

    const result = BackupEngine.restoreBackup(this.stagedBackupData, mode);
    if (result.success) {
      this.updateCollectionCountBadge();
      this.renderFullCollectionsGrid();
      this.updatePricingSnapshot();
      this.updateUI();
      if (mode === 'replace') {
        this.showToast(`Restored collection (${result.count} designs)!`, 'success');
      } else {
        this.showToast(`Merged ${result.added} new and ${result.updated} updated designs!`, 'success');
      }
    } else {
      this.showToast(`Restore failed: ${result.error}`, 'error');
    }
  }

  // ============================================================================
  // Atelier Security & Passcode Gate Engine
  // ============================================================================
  initAuthGate() {
    this.authPinBuffer = '';
    const gateOverlay = document.getElementById('atelier-auth-gate');
    const pinInput = document.getElementById('auth-pin-input');
    const statusMsg = document.getElementById('auth-status-msg');
    const card = document.querySelector('.auth-gate-card');
    const btnSaveNewPin = document.getElementById('btn-save-new-pin');
    const btnLockNow = document.getElementById('btn-lock-atelier-now');
    const newPinInput = document.getElementById('cfg-new-pin');

    if (!gateOverlay) return;

    // Check if session or local token already authenticated
    const hasLocal = (typeof localStorage !== 'undefined') && (localStorage.getItem('auracraft_auth_token') === 'authenticated');
    const hasSession = (typeof sessionStorage !== 'undefined') && (sessionStorage.getItem('auracraft_session_token') === 'authenticated');
    const isAuthed = hasLocal || hasSession;

    if (isAuthed) {
      gateOverlay.style.display = 'none';
    } else {
      gateOverlay.style.display = 'flex';
      if (pinInput && typeof pinInput.focus === 'function') setTimeout(() => pinInput.focus(), 200);
    }

    const updateDots = () => {
      const dots = document.querySelectorAll('#auth-pin-display .pin-dot');
      dots.forEach((dot, idx) => {
        if (idx < this.authPinBuffer.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    };

    const attemptUnlock = () => {
      const currentConfigPin = (typeof localStorage !== 'undefined' && localStorage.getItem('auracraft_custom_pin')) || '3868';
      const entered = this.authPinBuffer || (pinInput ? pinInput.value : '');

      if (!entered) return;

      if (entered === currentConfigPin) {
        if (statusMsg) {
          statusMsg.className = 'auth-status-msg success';
          statusMsg.textContent = 'Passcode accepted. Welcome to Atelier!';
        }
        
        const remember = document.getElementById('auth-remember-session');
        if (remember && remember.checked && typeof localStorage !== 'undefined') {
          localStorage.setItem('auracraft_auth_token', 'authenticated');
        } else if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('auracraft_session_token', 'authenticated');
        }

        setTimeout(() => {
          gateOverlay.style.opacity = '0';
          setTimeout(() => {
            gateOverlay.style.display = 'none';
            gateOverlay.style.opacity = '1';
            this.authPinBuffer = '';
            updateDots();
          }, 300);
        }, 200);
      } else {
        if (card) {
          card.classList.remove('shake');
          void card.offsetWidth; // trigger reflow
          card.classList.add('shake');
        }
        if (statusMsg) {
          statusMsg.className = 'auth-status-msg error';
          statusMsg.textContent = 'Incorrect PIN. Please try again.';
        }
        this.authPinBuffer = '';
        if (pinInput) pinInput.value = '';
        updateDots();
      }
    };

    // Numpad button clicks
    document.querySelectorAll('#auth-numpad .numpad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (key === 'clear') {
          this.authPinBuffer = '';
          if (pinInput) pinInput.value = '';
          updateDots();
        } else if (key === 'enter') {
          attemptUnlock();
        } else if (key && this.authPinBuffer.length < 6) {
          this.authPinBuffer += key;
          if (pinInput) pinInput.value = this.authPinBuffer;
          updateDots();
          if (this.authPinBuffer.length === 4) {
            setTimeout(attemptUnlock, 120);
          }
        }
      });
    });

    // Keyboard listener for lock screen
    window.addEventListener('keydown', (e) => {
      if (gateOverlay.style.display === 'none') return;
      if (e.key >= '0' && e.key <= '9') {
        if (this.authPinBuffer.length < 6) {
          this.authPinBuffer += e.key;
          if (pinInput) pinInput.value = this.authPinBuffer;
          updateDots();
          if (this.authPinBuffer.length === 4) {
            setTimeout(attemptUnlock, 120);
          }
        }
      } else if (e.key === 'Backspace') {
        this.authPinBuffer = this.authPinBuffer.slice(0, -1);
        if (pinInput) pinInput.value = this.authPinBuffer;
        updateDots();
      } else if (e.key === 'Enter') {
        attemptUnlock();
      }
    });

    // Settings PIN management
    if (btnSaveNewPin && newPinInput) {
      btnSaveNewPin.addEventListener('click', () => {
        const val = (newPinInput.value || '').trim();
        if (/^\d{4,6}$/.test(val)) {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('auracraft_custom_pin', val);
          }
          newPinInput.value = '';
          this.showToast(`Atelier PIN updated successfully to ${val}!`, 'success');
        } else {
          this.showToast('Please enter a 4 to 6 digit numeric PIN.', 'error');
        }
      });
    }

    if (btnLockNow) {
      btnLockNow.addEventListener('click', () => {
        if (typeof localStorage !== 'undefined') localStorage.removeItem('auracraft_auth_token');
        if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('auracraft_session_token');
        this.authPinBuffer = '';
        if (pinInput) pinInput.value = '';
        updateDots();
        if (statusMsg) {
          statusMsg.className = 'auth-status-msg';
          statusMsg.textContent = 'Enter Atelier PIN to access studio';
        }
        gateOverlay.style.display = 'flex';
        gateOverlay.style.opacity = '1';
        this.showToast('Atelier locked securely.', 'info');
      });
    }
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.braceletApp = new BraceletStudio();
  window.studio = window.braceletApp;
});
