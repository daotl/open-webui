#!/bin/sh
USE_SLIM=true \
NPM_REGISTRY=https://registry.npmmirror.com \
PIP_MIRROR=https://mirrors.aliyun.com/pypi/simple \
APT_MIRROR=https://mirrors.aliyun.com \
docker compose build 
