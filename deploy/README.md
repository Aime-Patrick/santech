# SAN TECH Deployment Guide — Spaceship cPanel

## GitHub repositories

| Repo | URL |
|---|---|
| Frontend | `git@github.com:Aime-Patrick/santech.git` |
| CMS | `git@github.com:Aime-Patrick/santech-cms.git` |

---

## One-time server setup

### 1. SSH into your Spaceship server
```bash
ssh username@yourdomain.com
```

### 2. Clone both GitHub repos
```bash
cd ~
git clone git@github.com:Aime-Patrick/santech.git santech
git clone git@github.com:Aime-Patrick/santech-cms.git santech-cms
```

> The deploy scripts expect the frontend at `~/santech/` and the CMS at `~/santech/` too.
> If you cloned the CMS separately, symlink or merge it:
> ```bash
> cp -r ~/santech-cms/* ~/santech/cms/
> ```

### 3. Create Node.js Apps in cPanel

Go to cPanel → **Setup Node.js App** and create two apps:

| Setting | CMS App | Frontend App |
|---|---|---|
| Node.js version | 20.x | 20.x |
| Application mode | Production | Production |
| Application root | `santech/cms` | `santech/santech-f` |
| Application URL | `api.yourdomain.com` | `yourdomain.com` |
| Application startup file | `app.js` | `server.js` |
| Application port | 1337 | 3000 |

### 4. Create a subdomain for the CMS API

In cPanel → **Subdomains**, create:
- Subdomain: `api`
- Domain: `yourdomain.com`

Then in cPanel → **Node.js App**, set the CMS app URL to `api.yourdomain.com`.

### 5. Create the production database

Go to cPanel → **PostgreSQL Databases**:
- Create database: `cpanelusername_santechcms`
- Create user: `cpanelusername_user` with a strong password
- Grant the user all privileges on the database

### 6. Create production .env files on the server

**CMS** (`~/santech/cms/.env`):
```bash
nano ~/santech/cms/.env
```
```env
HOST=0.0.0.0
PORT=1337

APP_KEYS=<generate: openssl rand -base64 16>,<openssl rand -base64 16>,<openssl rand -base64 16>,<openssl rand -base64 16>
API_TOKEN_SALT=<openssl rand -base64 16>
ADMIN_JWT_SECRET=<openssl rand -base64 16>
JWT_SECRET=<openssl rand -base64 16>
TRANSFER_TOKEN_SALT=<openssl rand -base64 16>
ENCRYPTION_KEY=<openssl rand -base64 16>

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cpanelusername_santechcms
DATABASE_USERNAME=cpanelusername_user
DATABASE_PASSWORD=yourpassword
DATABASE_SSL=false

CLOUDINARY_CLOUD_NAME=i5pxe4ko
CLOUDINARY_API_KEY=<your-key>
CLOUDINARY_API_SECRET=<your-secret>
CLOUDINARY_FOLDER=santech/uploads
```

**Frontend** (`~/santech/santech-f/.env.production`):
```bash
cp ~/santech/santech-f/.env.production.example ~/santech/santech-f/.env.production
nano ~/santech/santech-f/.env.production
```
```env
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=i5pxe4ko
```

### 7. Set up GitHub Actions secrets

In your GitHub repo → **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|---|---|
| `SSH_HOST` | Your server IP or hostname |
| `SSH_USER` | Your cPanel SSH username |
| `SSH_PASSWORD` | Your cPanel SSH password (or use `SSH_PRIVATE_KEY`) |

### 8. Run the first deployment
```bash
bash ~/santech/deploy/deploy-all.sh
```

---

## Subsequent deployments

Every push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which SSHs in and runs `deploy-all.sh` automatically.

To deploy manually from the server:
```bash
# Deploy everything
bash ~/santech/deploy/deploy-all.sh

# Deploy only CMS
bash ~/santech/deploy/deploy-all.sh cms

# Deploy only frontend
bash ~/santech/deploy/deploy-all.sh frontend
```

---

## After first CMS deployment

1. Visit `https://api.yourdomain.com/admin` to create your admin account
2. Go to **Settings → API Tokens → Create** a full-access token
3. Run the seed scripts:
```bash
cd ~/santech/cms
STRAPI_API_TOKEN="your-token" node scripts/seed-all.mjs
STRAPI_API_TOKEN="your-token" node scripts/seed-content.mjs
```

---

## Checklist — ready to go live?

- [ ] Both repos cloned to server
- [ ] Two Node.js Apps created in cPanel (CMS + Frontend)
- [ ] `api` subdomain created and pointed to CMS app
- [ ] PostgreSQL database and user created
- [ ] `~/santech/cms/.env` created with production values
- [ ] `~/santech/santech-f/.env.production` created
- [ ] GitHub Actions secrets set (`SSH_HOST`, `SSH_USER`, `SSH_PASSWORD`)
- [ ] First deploy run: `bash ~/santech/deploy/deploy-all.sh`
- [ ] CMS admin account created at `https://api.yourdomain.com/admin`
- [ ] Strapi API token created and seed scripts run
- [ ] Site live at `https://yourdomain.com`

---

## Troubleshooting

**App won't start** — cPanel → Node.js App → click the app → view error log

**Database connection error** — verify credentials in `cms/.env` match exactly what cPanel created (cPanel prefixes database/user names with your cPanel username)

**Images not loading** — confirm `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.production` matches your Cloudinary account

**Strapi admin blank page** — run `npm run build` in `cms/` again then restart the app via cPanel

**Frontend shows old content** — Next.js caches at build time; redeploy frontend after updating CMS content

**Port already in use** — check cPanel Node.js App panel for the assigned port; update `PORT` in the relevant `.env`
