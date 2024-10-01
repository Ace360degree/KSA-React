import { NextResponse } from "next/server";
import { pool } from "../db";
export const dynamic = 'force-dynamic';

export async function GET(){

    const [rows] = await pool.query(`SELECT projects_beta.*, projects_beta.id AS projectid, categories.*
    FROM projects_beta
    LEFT JOIN categories ON categories.id = projects_beta.category;
    SELECT category
    FROM categories
    WHERE status = 1;`)

    const projects = rows[0];  // First query result
    const categories = rows[1];  // Second query result
    // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    // return NextResponse.json({projects, categories});

    const response = NextResponse.json({ projects, categories });

    // Set cache-control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;



}