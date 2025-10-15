# Contributing

## Setup

```sh
pnpm install
cd apps/curator-backend
cp .env.example .env
# add the PRIVY_APP_SECRET & PRIVY_APP_ID to the apps/curator-backend/.env file
cd apps/curator-frontend
cp .env.example .env
# add the VITE_PRIVY_APP_ID & VITE_HYPERGRAPH_RPC_URL to the apps/curator-frontend/.env file
pnpm prisma migrate dev
```

## Development

```sh
cd apps/curator-frontend
pnpm dev
# in another tab
cd apps/curator-backend
pnpm dev
```

Any time you make changes to the schema, you will need to run the following commands:

```sh
cd apps/curator-backend
pnpm prisma migrate dev # this will also generate the Prisma client
```

## Upgrading Dependencies

```sh
pnpm up --interactive --latest -r
```

## Build and run the Docker image locally

```sh
docker build . -t curator-backend
docker run -it --rm --name=curator-backend curator-backend:latest
```


## Deploying your own SyncServer to Railway

Setup a service and attach a volume under `/data` to it.

Since cache-mounts on Railway need to prefixed with the service ID and BuildKit doesn’t expand variables there. You must give it a literal value for the mount ID.

To do so you can fill in the service ID below and run the command before your `railway up` command.
More info here: https://docs.railway.com/guides/dockerfiles#cache-mounts
Get the service ID by using CMD/CTRL+K and search for `Copy Service ID`.

```sh
sed -i '' \
  's|\(--mount=type=cache,id=\)workspace|\1s/<service-id>-pnpm-store|' \
  Dockerfile
railway up
```

Note: By default horizontal scaling is disabled because of the attached volume.

In the UI setup the following variables for the service:
- set the `DATABASE_URL` to `file:/data/production.sqlite`
- set the `PRIVY_APP_SECRET` to your Privy app secret
- set the `PRIVY_APP_ID` to your Privy app id

Then restart the service in the UI.