import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { filter_conditions, sort_by, offset, count } = req.query;

    const query = new URLSearchParams({
      filter_conditions: filter_conditions as string,
      sort_by: sort_by as string,
      offset: offset as string,
      count: count as string,
    }).toString();

    try {
      const response = await fetch(`https://api-rest.elice.io/org/academy/course/list/?${query}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
