#!/bin/bash
set -a
source ./.env
set +a

mkdir -p ${VOLUMES_ROOT}/data
mkdir -p ${VOLUMES_ROOT}/postgres
mkdir -p ${VOLUMES_ROOT}/qdrant/data
mkdir -p ${VOLUMES_ROOT}/ollama
