import { NextResponse } from "next/server";
import { pool } from "../db";

export async function GET(){

    const [rows] = await pool.query(`SELECT projects_beta.*, projects_beta.id AS projectid, categories.*
    FROM projects_beta
    LEFT JOIN categories ON categories.id = projects_beta.category;
    SELECT category
    FROM categories
    WHERE status = 1;`)

    const projects = rows[0];  // First query result
    const categories = rows[1];  // Second query result

    return NextResponse.json({projects, categories});


}