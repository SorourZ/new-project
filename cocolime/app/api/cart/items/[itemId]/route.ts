import { NextRequest, NextResponse } from 'next/server'
import { updateItem, removeItem, getSessionId } from '@/lib/mock/cartStore'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params
  const sid = getSessionId(request.headers.get('cookie'))
  const body = await request.json().catch(() => ({}))
  const { quantity } = body

  if (typeof quantity !== 'number') {
    return NextResponse.json({ error: 'quantity must be a number' }, { status: 400 })
  }

  const result = updateItem(sid, itemId, quantity)
  if ('error' in result) {
    return NextResponse.json(result, { status: 404 })
  }

  const res = NextResponse.json(result)
  res.cookies.set('cocolime_sid', sid, { httpOnly: false, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params
  const sid = getSessionId(request.headers.get('cookie'))
  const result = removeItem(sid, itemId)

  const res = NextResponse.json(result)
  res.cookies.set('cocolime_sid', sid, { httpOnly: false, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}
