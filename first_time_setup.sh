#!/usr/bin/env bash
set -o errexit

echo "=== start of first time setup ==="

# change to script's directory
cd "$(dirname "$0")"

# make sure Docker and Node.js is installed
if [ ! -x "$(command -v docker)" ] ||
   [ ! -x "$(command -v node)" ]; then
    echo ""
    echo -e "\033[0;31m[Error with Exception]\033[0m"
    echo "Please make sure Docker and Node.js are installed"
    echo ""
    echo "Install Docker: https://docs.docker.com/docker-for-mac/install/"
    echo "Install Node.js: https://nodejs.org/en/"
    echo ""
    exit
fi

# set up node_modules for frontend
echo "=== npm install packpage for frontend react app ==="
# change directory to ./frontend
cd "./frontend"
yarn
cd "../"

# set up node_modules for backend
echo "=== npm install packpage for frontend react app ==="
# change directory to ./backend
cd "./backend"
npm install
cd "../"
