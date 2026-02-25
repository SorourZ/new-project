// ============================================================
// COCOLIME — Core Type Definitions
// ============================================================

// --- USER & AUTH ---

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  avatar_url: string | null
  phone: string | null
  accepts_marketing: boolean
  created_at: string
}

export interface AuthTokens {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  user: User
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  first_name: string
  last_name: string
  email: string
  password: string
  accepts_marketing: boolean
}

// --- ADDRESSES ---

export interface Address {
  id: string
  first_name: string
  last_name: string
  line1: string
  line2?: string
  city: string
  postcode: string
  country: string
  phone?: string
  is_default: boolean
}

// --- PRODUCTS ---

export interface ProductImage {
  id: string
  url: string
  alt: string
  position: number
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  compare_at_price: number | null
  sku: string
  inventory: number
  in_stock: boolean
  options: Record<string, string>
}

export interface ProductRating {
  average: number
  count: number
}

export type ProductBadge = 'new' | 'sale' | 'low_stock' | 'bestseller' | 'exclusive'

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  description: string
  short_description: string
  price: number
  compare_at_price: number | null
  currency: string
  images: ProductImage[]
  variants: ProductVariant[]
  rating: ProductRating
  badges: ProductBadge[]
  in_stock: boolean
  category: string
  subcategory: string
  product_type: string
  tags: string[]
  meta_title?: string
  meta_description?: string
}

export interface ProductListItem {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  compare_at_price: number | null
  currency: string
  images: ProductImage[]
  rating: ProductRating
  badges: ProductBadge[]
  in_stock: boolean
}

// --- CATEGORIES ---

export interface ProductType {
  id: string
  slug: string
  name: string
  product_count: number
}

export interface Subcategory {
  id: string
  slug: string
  name: string
  image_url?: string
  product_types: ProductType[]
  product_count: number
}

export interface Category {
  id: string
  slug: string
  name: string
  image_url?: string
  description?: string
  subcategories: Subcategory[]
  product_count: number
}

// --- CART ---

export interface CartItem {
  id: string
  product: ProductListItem
  variant: ProductVariant
  quantity: number
  line_total: number
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping_estimate: number | null
  total: number
  currency: string
  coupon_code: string | null
  coupon_discount: number
  item_count: number
}

export interface AddToCartPayload {
  product_id: string
  variant_id: string
  quantity: number
}

// --- CHECKOUT ---

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimated_days: string
}

export interface OrderPayload {
  cart_id: string
  shipping_address: Omit<Address, 'id' | 'is_default'>
  shipping_method_id: string
  payment: {
    method: 'stripe' | 'paypal' | 'apple_pay'
    payment_intent_id: string
  }
  coupon_code?: string
  accepts_terms: boolean
}

// --- ORDERS ---

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface OrderItem {
  id: string
  product_name: string
  variant_name: string
  quantity: number
  unit_price: number
  line_total: number
  image_url: string
}

export interface Order {
  id: string
  order_number: string
  status: OrderStatus
  items: OrderItem[]
  shipping_address: Address
  shipping_method: string
  subtotal: number
  shipping: number
  discount: number
  total: number
  currency: string
  tracking_number: string | null
  tracking_url: string | null
  estimated_delivery: string | null
  created_at: string
}

// --- API RESPONSES ---

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface ApiError {
  error: string
  message: string
  errors?: Record<string, string[]>
}

export interface FiltersAvailable {
  brands: string[]
  skin_types: string[]
  concerns: string[]
  price_min: number
  price_max: number
}

export interface ProductsResponse extends PaginatedResponse<ProductListItem> {
  filters_available: FiltersAvailable
}

// --- FILTERS ---

export interface ProductFilters {
  category?: string
  subcategory?: string
  product_type?: string
  q?: string
  brands?: string[]
  skin_types?: string[]
  concerns?: string[]
  price_min?: number
  price_max?: number
  in_stock?: boolean
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'bestselling'
  page?: number
  limit?: number
}

// --- WISHLIST ---

export interface WishlistItem {
  id: string
  product: ProductListItem
  added_at: string
}
