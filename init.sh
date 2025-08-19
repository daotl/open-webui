#!/bin/sh
set -a
source ./.env
set +a

mkdir -p ${VOLUMES_ROOT}/data
mkdir -p ${VOLUMES_ROOT}/ollama
