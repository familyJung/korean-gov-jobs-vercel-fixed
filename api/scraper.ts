import { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeDatabase } from '../server/initializeData.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      // Initialize database and start scraping in production
      if (process.env.NODE_ENV === 'production') {
        console.log('🚀 Initializing database for production...');
        await initializeDatabase();
        console.log('✅ Database initialization completed');
      }
      
      res.status(200).json({ success: true, message: 'Scraper initialized' });
    } catch (error) {
      console.error('Scraper initialization error:', error);
      res.status(500).json({ error: 'Failed to initialize scraper' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}