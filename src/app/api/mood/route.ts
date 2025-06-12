import { NextRequest, NextResponse } from 'next/server';
import { moods } from '../../utils/mood';

export async function GET() {
  return NextResponse.json(moods);
}

export async function POST(req: NextRequest) {
  const {name, mood, comment } = await req.json();

  if (!name) 
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  
  if (!mood) 
    return NextResponse.json({ error: 'Mood is required' }, { status: 400 });
  

  const entry = {
    name,
    mood,
    comment,
    createdAt: new Date().toISOString(),
  };

  moods.push(entry);

  return NextResponse.json(entry, { status: 201 });
}