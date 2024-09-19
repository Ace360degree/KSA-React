import { pool as db } from '../../db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Run a simple test query
    const [rows] = await db.query('SELECT 1');
    
    return NextResponse.json({
      message: 'Database connected successfully',
      result: rows
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      message: 'Error connecting to the database',
      error: error.message
    }, { status: 500 });
  }
}
