#!/bin/bash

echo "Intializing configuration.."
echo "Getting backend dependencies: Postgres docker image.."
cd $PWD/server
docker pull postgres:16rc1-alpine3.18
docker run -d --network host -e POSTGRES_PASSWORD=password  postgres:16rc1-alpine3.18
echo "Postgres container ready!"
npm install
npx prisma migrate dev
npx kill-port 3000 -y
nest start &
cd ../client
npm install
echo "All Project Dependencies have been configured!"
npx kill-port 5173 -y
npm start


