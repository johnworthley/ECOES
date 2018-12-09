#!/usr/bin/env bash

# make sure everything is clean and well setup
echo "[quick_start.sh] First time setup"
./first_time_setup.sh

# start blockchain and put in background
echo "[quick_start.sh] Starting eosio docker"
./start_eosio_docker.sh --nolog

# start mongodb and put in background
echo "[quick_start.sh] Starting mongodb"
./start_mongodb_docker.sh --nolog