# Vercel Auto-Deploy Setup

Automatic production deployment to Vercel on every push to `main`. GitHub Actions builds the app, then deploys the pre-built files to Vercel.

**No manual promotion needed.**

## Setup Steps

### 1. Create Vercel Project

```bash
pnpm dlx vercel login
cd apps/curator-frontend
pnpm dlx vercel link --yes
```

Prompts: Answer `N` to deploy, `N` to link existing, then enter your project name.

This creates `.vercel/` directory with project info.

### 2. Get Credentials

**VERCEL_TOKEN**: Create at https://vercel.com/account/tokens

**VERCEL_PROJECT_ID & VERCEL_ORG_ID**:
```bash
cat apps/curator-frontend/.vercel/project.json
```
Copy `projectId` and `orgId` values.

### 3. Configure GitHub Secrets

In your repo: **Settings** → **Secrets and variables** → **Actions**

**Secrets** (tab):
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_PRIVY_APP_ID`

**Variables** (tab):
- `VITE_HYPERGRAPH_SYNC_SERVER_ORIGIN`
- `VITE_HYPERGRAPH_CHAIN`
- `VITE_HYPERGRAPH_RPC_URL`
- `VITE_KNOWLEDGE_GRAPH_NETWORK`
- `VITE_CURATOR_API_URL`

### 4. Test Deployment

**Manual trigger**: Actions → "Vercel Deploy (Production on main)" → Run workflow

**Or push to main**:
```bash
git commit --allow-empty -m "Test Vercel deploy"
git push origin main
```

Check Actions tab for green checkmark and deployment URL.

## How It Works

**Triggers**: Push to `main` or manual trigger

**Process**:
1. GitHub Actions builds app with pnpm (shared packages → frontend)
2. Vercel CLI deploys pre-built `dist` folder with `--prod`
3. Production URL appears in workflow summary

**Important**: `vercel.json` must include these to prevent Vercel from building:
```json
{
  "buildCommand": "echo 'Build already completed in CI'",
  "outputDirectory": ".",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## Troubleshooting

**"vite build" error**: Add `buildCommand` and `outputDirectory` to `vercel.json` (see above)

**Missing VERCEL_* credentials**: Double-check all three secrets in GitHub Settings

**Missing VITE_* vars**: Add as GitHub Variables/Secrets (required at build time)

**Actions not triggering**: Enable workflows in Actions tab (forked repos disabled by default)

**App doesn't work**: Check `VITE_*` vars are set correctly, verify backend URL

## Handoff Instructions

Provide the receiving team:
1. `.github/workflows/vercel-deploy.yml`
2. `apps/curator-frontend/vercel.json` (with buildCommand config)
3. This `VERCEL_DEPLOY_SETUP.md`

They need to:
1. Create Vercel project in their team account (run `vercel link`)
2. Add GitHub Secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VITE_PRIVY_APP_ID`
3. Add GitHub Variables: All `VITE_*` environment variables (production values)
4. Push to `main` to test

## Optional: PR Preview Deployments

To add preview environments for PRs, extend the workflow with a `pull_request` trigger and deploy without `--prod` flag. Can be added later without affecting production deployments.
