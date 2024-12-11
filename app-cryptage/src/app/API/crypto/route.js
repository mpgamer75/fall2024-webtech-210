import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const API_KEY = process.env.NEXT_PUBLIC_CRYPTO_PANIC_API_KEY;
    
    try {
        const response = await fetch(
            `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&currencies=${query}&public=true`
        );
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}