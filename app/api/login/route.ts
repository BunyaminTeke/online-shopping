import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    try {
        const { usernameOrEmail, password } = await req.json();

        if (!usernameOrEmail || !password) {
            return NextResponse.json({ success: false, message: 'Eksik bilgi.' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: usernameOrEmail.toLowerCase() },
                    { username: usernameOrEmail.toLowerCase() },
                ],
            },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Kullanıcı bulunamadı.' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: 'Şifre yanlış.' }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET environment değişkeni tanımlı değil.');
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            secret,
            { expiresIn: '1h' }
        );

        const response = NextResponse.json({
            success: true,
            message: 'Giriş başarılı!',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
            },
        });

        // HTTP-only cookie ile token'ı set et
        response.headers.set('Set-Cookie', serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60, // 1 saat
        }));

        return response;
    } catch (error) {
        console.error('Login hatası:', error);
        return NextResponse.json({ success: false, message: 'Sunucu hatası.' }, { status: 500 });
    }
}
