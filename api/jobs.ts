import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { jobPostings } from '../shared/schema';
import { eq, desc, sql, and, or, ilike } from 'drizzle-orm';
import ws from "ws";

// Vercel serverless function setup
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { jobPostings } });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const offset = (page - 1) * limit;
    
    const search = req.query.search as string;
    const ministry = req.query.ministry as string;
    const sortBy = req.query.sortBy as string || 'latest';

    let whereConditions: any[] = [];
    
    if (search) {
      whereConditions.push(
        or(
          ilike(jobPostings.title, `%${search}%`),
          ilike(jobPostings.ministry, `%${search}%`),
          ilike(jobPostings.jobType, `%${search}%`)
        )
      );
    }

    if (ministry) {
      whereConditions.push(eq(jobPostings.ministry, ministry));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    let orderBy;
    switch (sortBy) {
      case 'deadline':
        orderBy = jobPostings.applicationPeriodEnd;
        break;
      case 'ministry':
        orderBy = jobPostings.ministry;
        break;
      default:
        orderBy = desc(jobPostings.createdAt);
    }

    const jobsQuery = db
      .select()
      .from(jobPostings)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(jobPostings);

    if (whereClause) {
      jobsQuery.where(whereClause);
      countQuery.where(whereClause);
    }

    const jobs = await jobsQuery;
    const [{ count }] = await countQuery;

    res.json({
      jobPostings: jobs,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch job postings" });
  }
}