#!/bin/bash

echo "Intializing configuration.."
echo "Getting backend dependencies: Postgres docker image.."
if ! command -v docker &> /dev/null
then
    echo "docker could not be found, please configure docker before running the script"
    exit 1
fi
echo "Docker is installed, continue.."
if ! command -v npm &> /dev/null
then
    echo "npm could not be found"
    exit 1
fi
echo "npm is installed, continue.."
if ! command -v npx &> /dev/null
then
    echo "Npx could not be found, kill the application ports manually: 3000, 5173"
fi
echo "npx is installed, continue.."
cd "$PWD/server" || return
echo "Setting up database container: Postgres"
docker pull postgres:16rc1-alpine3.18
docker run -d --network host -e POSTGRES_PASSWORD=password  postgres:16rc1-alpine3.18
echo "Postgres container ready!"
npm install
npx prisma migrate dev
npx kill-port 3000 -y || true 
nest start &
cd ../client || return
npm install
echo "All Project Dependencies have been configured!"
npx kill-port 5173 -y || true
npm start


