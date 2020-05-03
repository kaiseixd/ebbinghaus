import mysql from 'serverless-mysql'

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
})

async function query(q: string) {
    try {
        const results = await db.query(q)
        await db.end()
        return results
    } catch (error) {
        return { error }
    }
}

export { query }
