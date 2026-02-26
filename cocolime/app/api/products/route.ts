import { NextRequest, NextResponse } from 'next/server'
import type { ProductListItem, ProductsResponse, FiltersAvailable } from '@/types'

// ---------------------------------------------------------------------------
// Mock product catalogue — inspired by niceonesa.com
// Prices are in pence (integer). Images from images.unsplash.com (whitelisted).
// ---------------------------------------------------------------------------

const ALL_PRODUCTS: (ProductListItem & {
  category: string
  subcategory: string
  skin_types: string[]
  concerns: string[]
  created_at: string
  bestseller_rank?: number
})[] = [
  // ── BEAUTY OF JOSEON ─────────────────────────────────────────────────────
  {
    id: 'boj-001',
    slug: 'beauty-of-joseon-relief-sun-rice-probiotics-spf50',
    name: 'Relief Sun: Rice + Probiotics SPF50+ PA++++ (50ml)',
    brand: 'Beauty of Joseon',
    price: 1490,
    compare_at_price: 2200,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1607602878030-eb70a90f8090?w=600&q=80', alt: 'Beauty of Joseon Relief Sun SPF50+', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1631159562830-7e5e1e1dfe55?w=600&q=80', alt: 'Beauty of Joseon Relief Sun texture', position: 1 },
    ],
    rating: { average: 4.8, count: 3241 },
    badges: ['bestseller', 'sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'sun-care',
    skin_types: ['All', 'Sensitive', 'Dry'],
    concerns: ['Sun Protection', 'Brightening'],
    created_at: '2024-01-15',
    bestseller_rank: 1,
  },
  {
    id: 'boj-002',
    slug: 'beauty-of-joseon-revive-eye-serum-ginseng-retinal',
    name: 'Revive Eye Serum: Ginseng + Retinal (30ml)',
    brand: 'Beauty of Joseon',
    price: 1450,
    compare_at_price: 2200,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80', alt: 'Beauty of Joseon Eye Serum', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38a18?w=600&q=80', alt: 'Eye serum dropper', position: 1 },
    ],
    rating: { average: 4.7, count: 1892 },
    badges: ['sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'eye-care',
    skin_types: ['All', 'Mature', 'Dry'],
    concerns: ['Anti-Ageing', 'Dark Circles', 'Puffiness'],
    created_at: '2024-02-20',
    bestseller_rank: 5,
  },
  {
    id: 'boj-003',
    slug: 'beauty-of-joseon-glow-serum-propolis-niacinamide',
    name: 'Glow Serum: Propolis + Niacinamide (30ml)',
    brand: 'Beauty of Joseon',
    price: 1390,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1547032889-81d21e98800d?w=600&q=80', alt: 'Glow Serum with dropper', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80', alt: 'Glow serum bottle', position: 1 },
    ],
    rating: { average: 4.6, count: 2107 },
    badges: ['new'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'serums',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Brightening', 'Uneven Tone', 'Pores'],
    created_at: '2024-11-01',
    bestseller_rank: 3,
  },
  {
    id: 'boj-004',
    slug: 'beauty-of-joseon-dynasty-cream',
    name: 'Dynasty Cream (50ml)',
    brand: 'Beauty of Joseon',
    price: 1790,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80', alt: 'Dynasty Cream jar', position: 0 },
    ],
    rating: { average: 4.5, count: 983 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'moisturisers',
    skin_types: ['Dry', 'Mature', 'Normal'],
    concerns: ['Hydration', 'Anti-Ageing', 'Nourishing'],
    created_at: '2023-09-10',
    bestseller_rank: 12,
  },

  // ── COSRX ────────────────────────────────────────────────────────────────
  {
    id: 'cosrx-001',
    slug: 'cosrx-advanced-snail-96-mucin-power-essence',
    name: 'Advanced Snail 96 Mucin Power Essence (100ml)',
    brand: 'COSRX',
    price: 1850,
    compare_at_price: 2500,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1631159562830-7e5e1e1dfe55?w=600&q=80', alt: 'COSRX Snail Essence bottle', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38a18?w=600&q=80', alt: 'COSRX Snail Essence texture', position: 1 },
    ],
    rating: { average: 4.9, count: 5412 },
    badges: ['bestseller', 'sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'essences',
    skin_types: ['All', 'Dry', 'Sensitive'],
    concerns: ['Hydration', 'Repair', 'Soothing'],
    created_at: '2022-05-01',
    bestseller_rank: 2,
  },
  {
    id: 'cosrx-002',
    slug: 'cosrx-low-ph-good-morning-gel-cleanser',
    name: 'Low pH Good Morning Gel Cleanser (150ml)',
    brand: 'COSRX',
    price: 1190,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', alt: 'COSRX Gel Cleanser tube', position: 0 },
    ],
    rating: { average: 4.7, count: 3899 },
    badges: ['bestseller'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'cleansers',
    skin_types: ['Oily', 'Combination', 'Acne-Prone'],
    concerns: ['Acne', 'Pores', 'Oil Control'],
    created_at: '2022-03-15',
    bestseller_rank: 4,
  },
  {
    id: 'cosrx-003',
    slug: 'cosrx-oil-free-ultra-moisturizing-lotion',
    name: 'Oil-Free Ultra-Moisturizing Lotion with Birch Sap (100ml)',
    brand: 'COSRX',
    price: 1350,
    compare_at_price: 1800,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1619451683800-9427b7f2fdcb?w=600&q=80', alt: 'COSRX Moisturizing Lotion', position: 0 },
    ],
    rating: { average: 4.5, count: 1674 },
    badges: ['sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'moisturisers',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Hydration', 'Oil Control'],
    created_at: '2023-01-20',
    bestseller_rank: 15,
  },
  {
    id: 'cosrx-004',
    slug: 'cosrx-salicylic-acid-daily-gentle-cleanser',
    name: 'Salicylic Acid Daily Gentle Cleanser (150ml)',
    brand: 'COSRX',
    price: 1250,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', alt: 'COSRX Salicylic Cleanser', position: 0 },
    ],
    rating: { average: 4.4, count: 2210 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'cleansers',
    skin_types: ['Oily', 'Acne-Prone', 'Combination'],
    concerns: ['Acne', 'Pores', 'Exfoliation'],
    created_at: '2023-06-01',
    bestseller_rank: 20,
  },

  // ── THE ORDINARY ─────────────────────────────────────────────────────────
  {
    id: 'to-001',
    slug: 'the-ordinary-hyaluronic-acid-2-b5',
    name: 'Hyaluronic Acid 2% + B5 (30ml)',
    brand: 'The Ordinary',
    price: 790,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1547032889-81d21e98800d?w=600&q=80', alt: 'The Ordinary HA serum dropper', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1631159562830-7e5e1e1dfe55?w=600&q=80', alt: 'The Ordinary serums', position: 1 },
    ],
    rating: { average: 4.6, count: 8921 },
    badges: ['bestseller'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'serums',
    skin_types: ['All', 'Dry', 'Dehydrated'],
    concerns: ['Hydration', 'Plumping'],
    created_at: '2021-01-01',
    bestseller_rank: 6,
  },
  {
    id: 'to-002',
    slug: 'the-ordinary-niacinamide-10-zinc-1',
    name: 'Niacinamide 10% + Zinc 1% (30ml)',
    brand: 'The Ordinary',
    price: 590,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38a18?w=600&q=80', alt: 'The Ordinary Niacinamide', position: 0 },
    ],
    rating: { average: 4.5, count: 11203 },
    badges: ['bestseller'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'serums',
    skin_types: ['Oily', 'Combination', 'Acne-Prone'],
    concerns: ['Pores', 'Oil Control', 'Brightening', 'Acne'],
    created_at: '2021-01-01',
    bestseller_rank: 7,
  },
  {
    id: 'to-003',
    slug: 'the-ordinary-retinol-0-5-squalane',
    name: 'Retinol 0.5% in Squalane (30ml)',
    brand: 'The Ordinary',
    price: 590,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80', alt: 'The Ordinary Retinol', position: 0 },
    ],
    rating: { average: 4.4, count: 6744 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'treatments',
    skin_types: ['Normal', 'Combination', 'Oily'],
    concerns: ['Anti-Ageing', 'Fine Lines', 'Texture'],
    created_at: '2021-03-10',
    bestseller_rank: 11,
  },
  {
    id: 'to-004',
    slug: 'the-ordinary-aha-30-bha-2-peeling-solution',
    name: 'AHA 30% + BHA 2% Peeling Solution (30ml)',
    brand: 'The Ordinary',
    price: 790,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1630462671547-16da68f0d7ce?w=600&q=80', alt: 'The Ordinary Peeling Solution', position: 0 },
    ],
    rating: { average: 4.3, count: 9312 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'treatments',
    skin_types: ['Normal', 'Oily', 'Combination'],
    concerns: ['Exfoliation', 'Texture', 'Brightening', 'Acne'],
    created_at: '2021-06-15',
    bestseller_rank: 14,
  },

  // ── CERAVE ───────────────────────────────────────────────────────────────
  {
    id: 'cera-001',
    slug: 'cerave-hydrating-facial-cleanser',
    name: 'Hydrating Facial Cleanser (236ml)',
    brand: 'CeraVe',
    price: 1090,
    compare_at_price: 1490,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', alt: 'CeraVe Hydrating Cleanser', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1619451683800-9427b7f2fdcb?w=600&q=80', alt: 'CeraVe cleanser texture', position: 1 },
    ],
    rating: { average: 4.8, count: 12450 },
    badges: ['bestseller', 'sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'cleansers',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Hydration', 'Soothing', 'Gentle'],
    created_at: '2020-06-01',
    bestseller_rank: 8,
  },
  {
    id: 'cera-002',
    slug: 'cerave-moisturising-cream',
    name: 'Moisturising Cream (340g)',
    brand: 'CeraVe',
    price: 1290,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&q=80', alt: 'CeraVe Moisturising Cream jar', position: 0 },
    ],
    rating: { average: 4.9, count: 18723 },
    badges: ['bestseller'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'moisturisers',
    skin_types: ['Dry', 'Sensitive', 'Eczema-Prone'],
    concerns: ['Hydration', 'Repair', 'Soothing'],
    created_at: '2020-01-01',
    bestseller_rank: 9,
  },
  {
    id: 'cera-003',
    slug: 'cerave-am-facial-moisturising-lotion-spf50',
    name: 'AM Facial Moisturising Lotion SPF50 (52ml)',
    brand: 'CeraVe',
    price: 1590,
    compare_at_price: 1990,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1607602878030-eb70a90f8090?w=600&q=80', alt: 'CeraVe AM SPF50 moisturiser', position: 0 },
    ],
    rating: { average: 4.7, count: 7834 },
    badges: ['sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'sun-care',
    skin_types: ['All', 'Sensitive', 'Dry', 'Normal'],
    concerns: ['Sun Protection', 'Hydration', 'Daily Moisturising'],
    created_at: '2022-04-01',
    bestseller_rank: 10,
  },

  // ── LA ROCHE-POSAY ───────────────────────────────────────────────────────
  {
    id: 'lrp-001',
    slug: 'la-roche-posay-effaclar-purifying-foaming-gel',
    name: 'Effaclar Purifying Foaming Gel Cleanser (400ml)',
    brand: 'La Roche-Posay',
    price: 1690,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80', alt: 'La Roche-Posay Effaclar Gel', position: 0 },
    ],
    rating: { average: 4.6, count: 5321 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'cleansers',
    skin_types: ['Oily', 'Combination', 'Acne-Prone'],
    concerns: ['Acne', 'Pores', 'Oil Control'],
    created_at: '2021-08-10',
    bestseller_rank: 16,
  },
  {
    id: 'lrp-002',
    slug: 'la-roche-posay-toleriane-double-repair-moisturiser',
    name: 'Toleriane Double Repair Face Moisturiser (75ml)',
    brand: 'La Roche-Posay',
    price: 2090,
    compare_at_price: 2600,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1619451683800-9427b7f2fdcb?w=600&q=80', alt: 'La Roche-Posay Toleriane moisturiser', position: 0 },
    ],
    rating: { average: 4.7, count: 4102 },
    badges: ['sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'moisturisers',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Hydration', 'Sensitive Skin', 'Redness'],
    created_at: '2022-10-05',
    bestseller_rank: 17,
  },
  {
    id: 'lrp-003',
    slug: 'la-roche-posay-anthelios-ultra-light-spf50',
    name: 'Anthelios Ultra-Light Invisible Fluid SPF50+ (50ml)',
    brand: 'La Roche-Posay',
    price: 2490,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1607602878030-eb70a90f8090?w=600&q=80', alt: 'La Roche-Posay Anthelios SPF50+', position: 0 },
    ],
    rating: { average: 4.8, count: 6721 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'sun-care',
    skin_types: ['All', 'Oily', 'Combination'],
    concerns: ['Sun Protection', 'Oil Control'],
    created_at: '2022-01-15',
    bestseller_rank: 13,
  },

  // ── ANUA ─────────────────────────────────────────────────────────────────
  {
    id: 'anua-001',
    slug: 'anua-heartleaf-77-soothing-toner',
    name: 'Heartleaf 77% Soothing Toner (250ml)',
    brand: 'Anua',
    price: 1690,
    compare_at_price: 2200,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80', alt: 'Anua Heartleaf Toner', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38a18?w=600&q=80', alt: 'Anua toner on skin', position: 1 },
    ],
    rating: { average: 4.7, count: 3487 },
    badges: ['sale', 'new'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'toners',
    skin_types: ['Sensitive', 'Acne-Prone', 'Dry'],
    concerns: ['Soothing', 'Redness', 'Hydration', 'Acne'],
    created_at: '2024-03-01',
    bestseller_rank: 18,
  },
  {
    id: 'anua-002',
    slug: 'anua-heartleaf-pore-control-cleansing-oil',
    name: 'Heartleaf Pore Control Cleansing Oil (200ml)',
    brand: 'Anua',
    price: 1990,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1556228578-0d85909764b2?w=600&q=80', alt: 'Anua Cleansing Oil', position: 0 },
    ],
    rating: { average: 4.5, count: 1923 },
    badges: ['new'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'cleansers',
    skin_types: ['All', 'Sensitive', 'Oily'],
    concerns: ['Deep Cleansing', 'Pores', 'Makeup Removal'],
    created_at: '2024-05-20',
    bestseller_rank: 22,
  },

  // ── AXIS-Y ───────────────────────────────────────────────────────────────
  {
    id: 'axy-001',
    slug: 'axis-y-dark-spot-correcting-glow-serum',
    name: 'Dark Spot Correcting Glow Serum (50ml)',
    brand: 'AXIS-Y',
    price: 2890,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1547032889-81d21e98800d?w=600&q=80', alt: 'AXIS-Y Glow Serum dropper', position: 0 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80', alt: 'AXIS-Y serum bottle', position: 1 },
    ],
    rating: { average: 4.5, count: 2341 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'serums',
    skin_types: ['All', 'Dull', 'Uneven'],
    concerns: ['Dark Spots', 'Brightening', 'Uneven Tone'],
    created_at: '2023-04-10',
    bestseller_rank: 21,
  },

  // ── NACIFIC ───────────────────────────────────────────────────────────────
  {
    id: 'nac-001',
    slug: 'nacific-phyto-niacin-whitening-essence',
    name: 'Phyto Niacin Whitening Essence (50ml)',
    brand: 'Nacific',
    price: 1990,
    compare_at_price: 2800,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1631159562830-7e5e1e1dfe55?w=600&q=80', alt: 'Nacific Niacin Essence', position: 0 },
    ],
    rating: { average: 4.4, count: 876 },
    badges: ['sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'essences',
    skin_types: ['All', 'Dull'],
    concerns: ['Brightening', 'Dark Spots', 'Radiance'],
    created_at: '2023-07-15',
    bestseller_rank: 25,
  },
  {
    id: 'nac-002',
    slug: 'nacific-real-floral-toner-rose',
    name: 'Real Floral Toner Rose (180ml)',
    brand: 'Nacific',
    price: 1590,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80', alt: 'Nacific Rose Toner', position: 0 },
    ],
    rating: { average: 4.3, count: 1124 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'toners',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Hydration', 'Soothing', 'Radiance'],
    created_at: '2023-02-28',
    bestseller_rank: 28,
  },

  // ── BIODERMA ──────────────────────────────────────────────────────────────
  {
    id: 'bio-001',
    slug: 'bioderma-sensibio-h2o-micellar-water',
    name: 'Sensibio H2O Micellar Water (500ml)',
    brand: 'Bioderma',
    price: 1490,
    compare_at_price: 1990,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', alt: 'Bioderma Sensibio H2O bottle', position: 0 },
    ],
    rating: { average: 4.9, count: 22341 },
    badges: ['bestseller', 'sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'cleansers',
    skin_types: ['Sensitive', 'Dry', 'All'],
    concerns: ['Gentle Cleansing', 'Makeup Removal', 'Soothing'],
    created_at: '2019-01-01',
    bestseller_rank: 19,
  },
  {
    id: 'bio-002',
    slug: 'bioderma-hydrabio-h2o-micellar-water',
    name: 'Hydrabio H2O Moisturising Micellar Water (250ml)',
    brand: 'Bioderma',
    price: 1190,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', alt: 'Bioderma Hydrabio H2O', position: 0 },
    ],
    rating: { average: 4.7, count: 8923 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'cleansers',
    skin_types: ['Dry', 'Sensitive', 'Dehydrated'],
    concerns: ['Hydration', 'Gentle Cleansing', 'Makeup Removal'],
    created_at: '2019-06-01',
    bestseller_rank: 23,
  },

  // ── K-SECRET ──────────────────────────────────────────────────────────────
  {
    id: 'ks-001',
    slug: 'k-secret-seoul-1988-serum-retinal-black-ginseng',
    name: 'Seoul 1988 Serum Retinal Liposome 2% + Black Ginseng (30ml)',
    brand: 'K-Secret',
    price: 2190,
    compare_at_price: 2750,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1547032889-81d21e98800d?w=600&q=80', alt: 'K-Secret Seoul 1988 Serum', position: 0 },
    ],
    rating: { average: 4.6, count: 743 },
    badges: ['new', 'sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'serums',
    skin_types: ['Mature', 'Normal', 'Dry'],
    concerns: ['Anti-Ageing', 'Brightening', 'Firmness'],
    created_at: '2024-09-01',
    bestseller_rank: 30,
  },

  // ── I'M SORRY FOR MY SKIN ─────────────────────────────────────────────────
  {
    id: 'isms-001',
    slug: 'im-sorry-for-my-skin-honey-beam-ampoule',
    name: 'Honey Beam Ampoule (30ml)',
    brand: "I'm Sorry For My Skin",
    price: 1230,
    compare_at_price: 2590,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38a18?w=600&q=80', alt: 'Honey Beam Ampoule bottle', position: 0 },
    ],
    rating: { average: 4.3, count: 512 },
    badges: ['sale'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'serums',
    skin_types: ['All', 'Dry', 'Dull'],
    concerns: ['Brightening', 'Glow', 'Hydration'],
    created_at: '2023-11-20',
    bestseller_rank: 35,
  },

  // ── SOME BY MI ───────────────────────────────────────────────────────────
  {
    id: 'sbm-001',
    slug: 'some-by-mi-aha-bha-pha-30-days-miracle-toner',
    name: 'AHA·BHA·PHA 30 Days Miracle Toner (150ml)',
    brand: 'Some By Mi',
    price: 1490,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80', alt: 'Some By Mi Miracle Toner', position: 0 },
    ],
    rating: { average: 4.4, count: 4231 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'toners',
    skin_types: ['Oily', 'Acne-Prone', 'Combination'],
    concerns: ['Acne', 'Exfoliation', 'Pores', 'Brightening'],
    created_at: '2022-08-01',
    bestseller_rank: 24,
  },
  {
    id: 'sbm-002',
    slug: 'some-by-mi-retinol-intense-reactivating-serum',
    name: 'Retinol Intense Reactivating Serum (30ml)',
    brand: 'Some By Mi',
    price: 2190,
    compare_at_price: 2900,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80', alt: 'Some By Mi Retinol Serum', position: 0 },
    ],
    rating: { average: 4.3, count: 1087 },
    badges: ['sale'],
    in_stock: false,
    category: 'skincare',
    subcategory: 'serums',
    skin_types: ['Normal', 'Oily', 'Mature'],
    concerns: ['Anti-Ageing', 'Texture', 'Fine Lines'],
    created_at: '2024-01-10',
    bestseller_rank: 40,
  },

  // ── ISNTREE ───────────────────────────────────────────────────────────────
  {
    id: 'isn-001',
    slug: 'isntree-hyaluronic-acid-watery-sun-gel-spf50',
    name: 'Hyaluronic Acid Watery Sun Gel SPF50+ PA++++ (50ml)',
    brand: 'Isntree',
    price: 1890,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1607602878030-eb70a90f8090?w=600&q=80', alt: 'Isntree Watery Sun Gel', position: 0 },
    ],
    rating: { average: 4.6, count: 2918 },
    badges: ['new'],
    in_stock: true,
    category: 'skincare',
    subcategory: 'sun-care',
    skin_types: ['All', 'Oily', 'Combination'],
    concerns: ['Sun Protection', 'Hydration'],
    created_at: '2024-04-15',
    bestseller_rank: 26,
  },
  {
    id: 'isn-002',
    slug: 'isntree-centella-fresh-toner',
    name: 'Centella Fresh Toner (200ml)',
    brand: 'Isntree',
    price: 1490,
    compare_at_price: null,
    currency: 'GBP',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80', alt: 'Isntree Centella Toner', position: 0 },
    ],
    rating: { average: 4.5, count: 1672 },
    badges: [],
    in_stock: true,
    category: 'skincare',
    subcategory: 'toners',
    skin_types: ['Sensitive', 'Acne-Prone', 'Redness-Prone'],
    concerns: ['Soothing', 'Redness', 'Hydration'],
    created_at: '2023-09-05',
    bestseller_rank: 29,
  },
]

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const category = searchParams.get('category') ?? undefined
  const brands = searchParams.getAll('brands[]').filter(Boolean)
  const skin_types = searchParams.getAll('skin_types[]').filter(Boolean)
  const concerns = searchParams.getAll('concerns[]').filter(Boolean)
  const price_min = searchParams.get('price_min') ? Number(searchParams.get('price_min')) : undefined
  const price_max = searchParams.get('price_max') ? Number(searchParams.get('price_max')) : undefined
  const in_stock = searchParams.get('in_stock') === 'true' ? true : undefined
  const sort = (searchParams.get('sort') ?? 'newest') as 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'bestselling'
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(48, Math.max(1, Number(searchParams.get('limit') ?? 24)))

  // Filter
  let results = ALL_PRODUCTS.filter((p) => {
    if (category && p.category !== category && p.subcategory !== category) return false
    if (brands.length && !brands.includes(p.brand)) return false
    if (skin_types.length && !skin_types.some((st) => p.skin_types.includes(st))) return false
    if (concerns.length && !concerns.some((c) => p.concerns.includes(c))) return false
    if (price_min !== undefined && p.price < price_min) return false
    if (price_max !== undefined && p.price > price_max) return false
    if (in_stock !== undefined && p.in_stock !== in_stock) return false
    return true
  })

  // Sort
  results = [...results].sort((a, b) => {
    switch (sort) {
      case 'price_asc': return a.price - b.price
      case 'price_desc': return b.price - a.price
      case 'rating': return b.rating.average - a.rating.average || b.rating.count - a.rating.count
      case 'bestselling': return (a.bestseller_rank ?? 999) - (b.bestseller_rank ?? 999)
      case 'newest':
      default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  // Build filters_available from the full (unfiltered) set matching the category only
  const categoryPool = category
    ? ALL_PRODUCTS.filter((p) => p.category === category || p.subcategory === category)
    : ALL_PRODUCTS

  const filtersAvailable: FiltersAvailable = {
    brands: [...new Set(categoryPool.map((p) => p.brand))].sort(),
    skin_types: [...new Set(categoryPool.flatMap((p) => p.skin_types))].sort(),
    concerns: [...new Set(categoryPool.flatMap((p) => p.concerns))].sort(),
    price_min: Math.min(...categoryPool.map((p) => p.price)),
    price_max: Math.max(...categoryPool.map((p) => p.compare_at_price ?? p.price)),
  }

  // Paginate
  const total = results.length
  const total_pages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, total_pages)
  const offset = (safePage - 1) * limit
  const pageData = results.slice(offset, offset + limit)

  // Strip internal fields before returning
  const data: ProductListItem[] = pageData.map(({ category: _c, subcategory: _s, skin_types: _st, concerns: _con, created_at: _ca, bestseller_rank: _br, ...rest }) => rest)

  const response: ProductsResponse = {
    data,
    pagination: { page: safePage, limit, total, total_pages },
    filters_available: filtersAvailable,
  }

  return NextResponse.json(response)
}
