import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.printerBrand) {
      return NextResponse.json({ error: 'All required fields must be provided' }, { status: 400 });
    }

    // Capture IP address
    const ipAddress = req.headers.get('x-forwarded-for') || null;

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        printerBrand: data.printerBrand,
        country: data.country || null,
        issueDescription: data.issueDescription || null,
        ipAddress: ipAddress,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
