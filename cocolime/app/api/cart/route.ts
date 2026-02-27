import { NextRequest, NextResponse } from 'next/server'
import { getCart, getSessionId } from '@/lib/mock/cartStore'

export async function GET(request: NextRequest) {
  const sid = getSessionId(request.headers.get('cookie'))
  const cart = getCart(sid)

  const res = NextResponse.json(cart)
  res.cookies.set('cocolime_sid', sid, {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return res
}
