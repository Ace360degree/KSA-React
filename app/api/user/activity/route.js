import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { pool as db } from '../../db';
import { authOptions } from '../../../lib/auth';

export async function POST() {
    try {
        // Get the current session with authOptions
        const session = await getServerSession(authOptions);
        console.log('Session in activity route:', session);
        
        // If no session, return unauthorized
        if (!session?.user?.id) {
            console.log('No valid session found');
            return NextResponse.json({ 
                error: 'Unauthorized',
                details: 'No valid session found'
            }, { status: 401 });
        }

        console.log('Updating activity for user:', session.user.id);

        // Update user activity
        const [result] = await db.query(
            "UPDATE users SET last_seen_at = CONVERT_TZ(UTC_TIMESTAMP(), '+00:00', '+05:30'), is_online = 1 WHERE id = ?",
            [session.user.id]
          );

        console.log('Update result:', result);

        if (result.affectedRows === 0) {
            return NextResponse.json({ 
                error: 'Update failed',
                details: 'No rows were updated'
            }, { status: 400 });
        }

        return NextResponse.json({ 
            success: true,
            userId: session.user.id,
            timestamp: new Date().toISOString(),
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error('Activity update error:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        
        return NextResponse.json({ 
            error: 'Internal Server Error',
            details: error.message,
            code: error.code
        }, { status: 500 });
    }
} 