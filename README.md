### Ebbinghause
#### Install and run

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

#### Development MySQL setup

```bash
# .env
LOCAL_MYSQL_HOST=$database-hostname
LOCAL_MYSQL_DATABASE=$database-name
LOCAL_MYSQL_USER=$database-username
LOCAL_MYSQL_PASSWORD=$database-password
```

#### Production MySQL setup

```bash
now secrets add MYSQL_HOST $database-hostname && now secrets add MYSQL_USER $database-username && now secrets add MYSQL_DATABASE $database-name && now secrets add MYSQL_PASSWORD $database-password
```

```bash
# now.json
{
  "env": {
    "MYSQL_HOST": "@mysql_host",
    "MYSQL_USER": "@mysql_user",
    "MYSQL_PASSWORD": "@mysql_password",
    "MYSQL_DATABASE": "@mysql_database"
  }
}
```