import { NextRequest, NextResponse } from 'next/server'
import { applyCoupon, removeCoupon, getSessionId } from '@/lib/mock/cartStore'

export async function POST(request: NextRequest) {
  const sid = getSessionId(request.headers.get('cookie'))
  const body = await request.json().catch(() => ({}))
  const { code } = body

  if (!code) {
    return NextResponse.json({ error: 'code is required' }, { status: 400 })
  }

  const result = applyCoupon(sid, String(code))
  if ('error' in result) {
    return NextResponse.json(result, { status: 422 })
  }

  const res = NextResponse.json(result)
  res.cookies.set('cocolime_sid', sid, { httpOnly: false, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}

export async function DELETE(request: NextRequest) {
  const sid = getSessionId(request.headers.get('cookie'))
  const result = removeCoupon(sid)

  const res = NextResponse.json(result)
  res.cookies.set('cocolime_sid', sid, { httpOnly: false, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}
