import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

export default async (_: NextApiRequest, res: NextApiResponse) => {
    try {
        const counts = await query(`
            SELECT * FROM count
            WHERE id >= 20000 or id <= 20365
        `)
        res.status(200).json({
            code: 200,
            data: counts
        })
    } catch (err) {
        res.status(500).json({ code: 500, message: err.message })
    }
}
