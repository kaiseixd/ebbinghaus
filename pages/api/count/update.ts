import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, count } = req.body
        await query(`
            UPDATE count
            SET count = ${count}
            WHERE id = ${id}
        `)
        res.status(200).json({
            code: 200,
            data: 'success'
        })
    } catch (err) {
        res.status(500).json({ code: 500, message: err.message })
    }
}
