import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Basic validation: name and email are strictly required
    const name = data.name?.trim();
    const email = data.email?.trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Extract IP address and Country from headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || null);
    const country = req.headers.get('x-vercel-ip-country') || data.country || null;

    // Support both contact form (message) and lead capture form (issueDescription)
    const issueDescription = (data.message || data.issueDescription || '').trim() || null;
    const phone = data.phone?.trim() || 'Not provided';
    const printerBrand = data.printerBrand?.trim() || 'General Inquiry';

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        printerBrand,
        country,
        issueDescription,
        ipAddress,
        status: 'new',
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
