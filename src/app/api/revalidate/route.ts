import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path');
  const secret = req.nextUrl.searchParams.get('secret');

  // Secure secret matching admin panel authentication
  if (secret !== 'Simple@#123') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
}
