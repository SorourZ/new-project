import { NextRequest, NextResponse } from 'next/server'
import { addItem, getSessionId } from '@/lib/mock/cartStore'

export async function POST(request: NextRequest) {
  const sid = getSessionId(request.headers.get('cookie'))
  const body = await request.json().catch(() => ({}))
  const { product_id, variant_id, quantity = 1 } = body

  if (!product_id || !variant_id) {
    return NextResponse.json({ error: 'product_id and variant_id are required' }, { status: 400 })
  }

  const result = await addItem(sid, product_id, variant_id, Number(quantity))
  if ('error' in result) {
    return NextResponse.json(result, { status: 404 })
  }

  const res = NextResponse.json(result)
  res.cookies.set('cocolime_sid', sid, { httpOnly: false, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}
