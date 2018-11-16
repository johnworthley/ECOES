#!/usr/bin/env bash

# make sure everything is clean and well setup
echo "[quick_start.sh] First time setup"
./first_time_setup.sh

# start mongodb and put in background
echo "[quick_start.sh] Starting mongodb"
./start_mongodb_docker.sh --nolog
