import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { date } = req.query;
        const day = await query(`
            SELECT * FROM count
            WHERE date = "${date}"
        `)
        res.status(200).json({
            code: 200,
            data: day
        })
    } catch (err) {
        res.status(500).json({ code: 500, message: err.message })
    }
}
