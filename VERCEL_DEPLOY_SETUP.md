# Vercel Auto-Deploy Setup Guide

This guide explains how to set up automatic production deployments to Vercel for the `curator-frontend` app on every push to the `main` branch.

## Overview

The GitHub Actions workflow (`.github/workflows/vercel-deploy.yml`) automatically:
1. Builds the frontend using pnpm in the monorepo
2. Deploys the pre-built `dist` folder to Vercel Production
3. **No manual promotion needed** - every push to `main` goes straight to production

## Prerequisites

### 1. Create a Vercel Project

In your Vercel account (personal or team):

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Choose **"Other"** framework (since CI builds the app)
4. Project settings:
   - **Build Command**: Leave empty (CI builds)
   - **Output Directory**: `dist` (informational only)
   - **Install Command**: Leave empty
5. Create the project

### 2. Obtain Vercel Credentials

You'll need three values:

#### **VERCEL_TOKEN**
1. Go to **Account Settings** → **Tokens**
2. Click **Create Token**
3. Give it a name (e.g., "GitHub Actions - curator-frontend")
4. Copy the token (shown only once - save it securely!)

#### **VERCEL_PROJECT_ID**
1. Go to your project → **Settings** → **General**
2. Scroll to **Project ID**
3. Copy the value (e.g., `prj_abc123xyz`)

#### **VERCEL_ORG_ID**
1. For **personal accounts**: Format is `user_xxx` (find in project settings under Owner)
2. For **teams**: Format is `team_xxx`
3. **Easy way to find it**: Run locally:
   ```bash
   pnpm dlx vercel whoami --token YOUR_TOKEN
   ```
   This will show your username and team info.

**Alternative**: After logging in with `vercel login`, check `~/.vercel/config.json` for your org ID.

## GitHub Repository Configuration

### Required Secrets

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** → **Secrets** tab.

Add these **Repository Secrets**:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `VERCEL_TOKEN` | Your Vercel access token | `abc123xyz...` |
| `VERCEL_ORG_ID` | Your Vercel org/user ID | `user_abc123` or `team_xyz789` |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | `prj_abc123xyz` |

### Required Environment Variables (for Vite Build)

These can be added as **Secrets** (recommended for sensitive values) or **Variables** (for non-sensitive config).

Go to **Settings** → **Secrets and variables** → **Actions** → **Variables** tab (or **Secrets** tab for sensitive values).

| Variable Name | Description | Example |
|---------------|-------------|---------|
| `VITE_HYPERGRAPH_SYNC_SERVER_ORIGIN` | Hypergraph sync server URL | `https://sync.geobrowser.io` |
| `VITE_HYPERGRAPH_CHAIN` | Blockchain network | `geo-testnet` |
| `VITE_HYPERGRAPH_RPC_URL` | RPC endpoint URL | `https://...` |
| `VITE_PRIVY_APP_ID` | Privy app ID (⚠️ use Secret) | `clxxxxxxxxx` |
| `VITE_KNOWLEDGE_GRAPH_NETWORK` | Network type | `TESTNET` or `MAINNET` |
| `VITE_CURATOR_API_URL` | Backend API URL | `https://api.example.com` |

### Optional Variables

| Variable Name | Default | Description |
|---------------|---------|-------------|
| `NODE_VERSION` | `22.x` | Node.js version to use |

## Testing the Deployment

### Option 1: Manual Trigger

1. Go to **Actions** tab in GitHub
2. Select **Vercel Deploy (Production on main)**
3. Click **Run workflow** → **Run workflow**
4. Wait for the job to complete
5. Check the job summary for the deployment URL

### Option 2: Push to Main

```bash
git checkout main
git commit --allow-empty -m "Test Vercel deployment"
git push origin main
```

### Verify Success

1. Check the **Actions** tab for a green checkmark
2. Click on the workflow run to see the deployment URL in the summary
3. Visit the URL to verify the app is working
4. In Vercel Dashboard → Project → Deployments, confirm it shows as "Production"

## How It Works

### Workflow Triggers

- **Automatic**: Every push to `main` branch
- **Manual**: Via "Run workflow" button in GitHub Actions

### Build Process

1. Checks out the code
2. Installs pnpm (v10.18.3) and Node.js
3. Installs all monorepo dependencies with `pnpm install --frozen-lockfile`
4. Builds shared packages (`@geo/design-system`, `@geo/curator-utils`)
5. Builds the frontend with `pnpm --filter ./apps/curator-frontend build`
6. Verifies `apps/curator-frontend/dist` exists

### Deployment Process

1. Uses Vercel CLI via `pnpm dlx vercel@latest`
2. Deploys the pre-built `apps/curator-frontend/dist` folder
3. Applies `apps/curator-frontend/vercel.json` configuration with `-A` flag
4. Uses `--prod` flag to deploy directly to production
5. Outputs the deployment URL in the job summary

### Important Notes

- The workflow builds **outside** of Vercel (faster, more control)
- Only the built `dist` folder is uploaded to Vercel
- The `vercel.json` file in `apps/curator-frontend/` is applied for routes/rewrites
- All `VITE_*` environment variables **must be set at build time** (not runtime)

## Troubleshooting

### "Error: Project linking required"

**Cause**: Missing or incorrect `VERCEL_TOKEN`, `VERCEL_ORG_ID`, or `VERCEL_PROJECT_ID`.

**Fix**: Double-check all three secrets are set correctly in GitHub.

### "Missing environment variable: VITE_*"

**Cause**: Vite requires env vars at **build time**.

**Fix**: Add the missing `VITE_*` variables as GitHub Secrets or Variables.

### Build Fails on Shared Packages

**Cause**: Monorepo dependencies not building in correct order.

**Fix**: The workflow builds `@geo/design-system` and `@geo/curator-utils` first - ensure these packages have `build` scripts in their `package.json`.

### Wrong Node Version

**Cause**: Project requires a specific Node.js version.

**Fix**: Set the `NODE_VERSION` GitHub Variable (e.g., `20.x` or `22.x`).

### Deployment Succeeds but App Doesn't Work

**Cause**: Missing or incorrect runtime environment variables.

**Fix**: 
- Vite bundles `VITE_*` vars at **build time** - set them as GitHub Variables/Secrets
- For backend API URLs, ensure `VITE_CURATOR_API_URL` points to production backend
- Check browser console for errors

## Handoff to Destination Organization

When transferring this workflow to another organization:

### Steps for the Receiving Team

1. **Create a Vercel Project** in their team account (see "Create a Vercel Project" above)

2. **Obtain Team-Specific Credentials**:
   - Create a new `VERCEL_TOKEN` (team member with deploy permissions)
   - Get the team's `VERCEL_ORG_ID` (format: `team_xxx`)
   - Get the new project's `VERCEL_PROJECT_ID`

3. **Configure GitHub Secrets** in their repository:
   - Add the three Vercel credentials as Repository Secrets
   - Add all `VITE_*` environment variables (production values)

4. **Copy the Workflow File**:
   - Copy `.github/workflows/vercel-deploy.yml` to their repository

5. **Test the Deployment**:
   - Push to `main` or manually trigger the workflow
   - Verify successful deployment in Actions tab and Vercel dashboard

### What to Provide

- The workflow file: `.github/workflows/vercel-deploy.yml`
- This documentation: `VERCEL_DEPLOY_SETUP.md`
- List of required secrets/variables (see tables above)
- Production values for `VITE_*` environment variables (if known)

## Future Enhancements

### PR Preview Deployments (Optional)

To add preview deployments for pull requests:

1. Extend the workflow with a `pull_request` trigger
2. Add a second job that deploys without `--prod` flag
3. Comment the preview URL on the PR

This is **optional** and can be added later without affecting the production deployment workflow.

## Additional Resources

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli)
- [GitHub Actions - pnpm Setup](https://pnpm.io/continuous-integration#github-actions)
- [Vite Environment Variables](https://vite.dev/guide/env-and-mode.html)
