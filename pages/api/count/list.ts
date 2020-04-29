import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import moment from 'moment'

const fsPromises = fs.promises

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const files = await fsPromises.readFile('db/count.json', 'utf-8')
    const currentDay = getCurrentDay()
    const parsed = JSON.parse(files)
    res.status(200).json({
      code: 200,
      data: {
        list: parsed,
        day: { ...parsed[currentDay], index: currentDay }
      }
    })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
}

function getCurrentDay() {
    const timestamp = +moment() - +moment().dayOfYear(1)
    return timestamp / (24 * 60 * 60 * 1000)
}