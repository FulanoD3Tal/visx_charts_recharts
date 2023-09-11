import { NextRequest, NextResponse } from 'next/server';
import { appleStock } from '@visx/mock-data';

function GET(req: NextRequest) {
  const data = appleStock.slice(0, 300);
  return NextResponse.json(data);
}

export { GET };
