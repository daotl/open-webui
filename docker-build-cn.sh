#!/bin/sh

USE_SLIM="${USE_SLIM:-true}"
NPM_REGISTRY="${NPM_REGISTRY:-https://registry.npmmirror.com}"
PIP_MIRROR="${PIP_MIRROR:-https://mirrors.aliyun.com/pypi/simple}"
APT_MIRROR="${APT_MIRROR:-https://mirrors.aliyun.com}"
PYODIDE_INDEX_URL="${PYODIDE_INDEX_URL:-}"
PYODIDE_PYPI_INDEX_URL="${PYODIDE_PYPI_INDEX_URL:-https://mirrors.aliyun.com/pypi/simple}"
PYODIDE_PYPI_API_URL="${PYODIDE_PYPI_API_URL:-https://mirrors.aliyun.com/pypi}"
PYODIDE_PYPI_FILES_BASE_URL="${PYODIDE_PYPI_FILES_BASE_URL:-https://mirrors.aliyun.com/pypi/packages}"

export \
	USE_SLIM \
	NPM_REGISTRY \
	PIP_MIRROR \
	APT_MIRROR \
	PYODIDE_INDEX_URL \
	PYODIDE_PYPI_INDEX_URL \
	PYODIDE_PYPI_API_URL \
	PYODIDE_PYPI_FILES_BASE_URL

docker compose -f docker-compose.yaml -f docker-compose.build.yaml build \
	--build-arg USE_SLIM="${USE_SLIM}" \
	--build-arg NPM_REGISTRY="${NPM_REGISTRY}" \
	--build-arg PIP_MIRROR="${PIP_MIRROR}" \
	--build-arg APT_MIRROR="${APT_MIRROR}" \
	--build-arg PYODIDE_INDEX_URL="${PYODIDE_INDEX_URL}" \
	--build-arg PYODIDE_PYPI_INDEX_URL="${PYODIDE_PYPI_INDEX_URL}" \
	--build-arg PYODIDE_PYPI_API_URL="${PYODIDE_PYPI_API_URL}" \
	--build-arg PYODIDE_PYPI_FILES_BASE_URL="${PYODIDE_PYPI_FILES_BASE_URL}" \
	"$@"
