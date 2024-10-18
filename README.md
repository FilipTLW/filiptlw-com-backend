# filiptlw.com Backend

This is the source of the backend for my personal website soon accessible at [filiptlw.com](https://filiptlw.com).

## Running the backend locally

### Prerequisites

- A GitHub Application with following settings:

| Setting                                                | Value                         |
|--------------------------------------------------------|-------------------------------|
| Request user authorization (OAuth) during installation | true                          |
| Callback URL                                           | \<frontend URL\>/login/github |
| Account Permissions: Email Addresses                   | Access: Read-only             |

- A MariaDB database
- The newest version of Node.js
- The newest version of pnpm


### Environment Variables

| Environment Variable | Description                                 |
|----------------------|---------------------------------------------|
| DATABASE_HOST        | The host of the database                    |
| DATABASE_PORT        | The port of the database                    |
| DATABASE_USER        | A user of the database                      |
| DATABASE_PASSWORD    | The password of the database user           |
| DATABASE_DATABASE    | The name of the database                    |
| GITHUB_CLIENT_ID     | The (public) Client ID of the GitHub App    |
| GITHUB_CLIENT_SECRET | The Client Secret of the GitHub App         |
| JWT_SECRET           | A string used for signing JSON Web Tokens   |
| JWT_REFRESH_SECRET   | A string used for signing the Refresh Token |

### Running

```shell
pnpm i --frozen-lockfile
pnpm run start
```