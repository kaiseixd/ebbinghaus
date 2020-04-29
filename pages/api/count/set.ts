import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

const fsPromises = fs.promises

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { date, count } = req.body;
    const files = await fsPromises.readFile('db/count.json', 'utf-8')
    const parsed = JSON.parse(files)

    const item = parsed.find((item: any) => item.date === date)
    item.count = count
    await fsPromises.writeFile('db/count.json', JSON.stringify(parsed),'utf-8')

    res.status(200).json({
      code: 200,
      data: 'success'
    })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
}
