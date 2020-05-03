import mysql from 'serverless-mysql'

const db = mysql({
    config: {
        host: process.env.NODE_ENV === 'development' ? process.env.LOCAL_MYSQL_HOST : process.env.MYSQL_HOST,
        database: process.env.NODE_ENV === 'development' ? process.env.LOCAL_MYSQL_DATABASE : process.env.MYSQL_DATABASE,
        user: process.env.NODE_ENV === 'development' ? process.env.LOCAL_MYSQL_USER : process.env.MYSQL_USER,
        password: process.env.NODE_ENV === 'development' ? process.env.LOCAL_MYSQL_PASSWORD : process.env.MYSQL_PASSWORD
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
