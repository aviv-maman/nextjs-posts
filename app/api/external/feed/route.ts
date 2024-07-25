import { type NextRequest, NextResponse } from 'next/server';
import { artificialDelay } from '@/lib/utils';
import mockData from '@/mock_data.json';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  try {
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const pageSize = Number(request.nextUrl.searchParams.get('pageSize')) || 6;
    const skip = (page - 1) * pageSize;
    const total = 100;
    const data = await artificialDelay(3000).then(async () => mockData);
    const result = { total, data, message: 'Success' };
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET /api/external/feed');
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
    }
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return (
      NextResponse.json({ total: null, data: null, message }), { status: 500, statusText: 'Internal Server Error' }
    );
  }
};
