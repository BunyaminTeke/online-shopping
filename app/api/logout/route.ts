import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Çıkış yapıldı.' });

  // Cookie'yi silmek için expires tarihini geçmiş yapıyoruz
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // 1970 tarihinden bir tarih veriyoruz, böylece cookie silinir
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return response;
}
