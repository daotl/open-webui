import { resolve } from 'node:path';

const DEFAULT_PYPI_INDEX_URL = 'https://pypi.org/simple';
const DEFAULT_PYPI_API_URL = 'https://pypi.org/pypi';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');
const ensureTrailingSlash = (value) => `${trimTrailingSlash(value)}/`;

const splitUrls = (value) =>
	value
		.split(/[\s,]+/)
		.map((item) => item.trim())
		.filter(Boolean);

export const getPyPIIndexUrls = (env = process.env) => {
	const configured = env.PYODIDE_PYPI_INDEX_URL?.trim();
	if (!configured) {
		return undefined;
	}

	return splitUrls(configured).map(trimTrailingSlash);
};

export const resolvePyodideIndexURL = (env = process.env, cwd = process.cwd()) => {
	const configured = env.PYODIDE_INDEX_URL?.trim();
	if (configured) {
		return ensureTrailingSlash(configured);
	}

	return ensureTrailingSlash(resolve(cwd, 'node_modules/pyodide'));
};

export const resolvePyPIMetadataUrl = (pkg, env = process.env) => {
	const baseUrl = trimTrailingSlash(env.PYODIDE_PYPI_API_URL?.trim() || DEFAULT_PYPI_API_URL);
	return `${baseUrl}/${pkg}/json`;
};

export const resolvePyPIWheelUrl = (wheelUrl, env = process.env) => {
	const filesBaseUrl = env.PYODIDE_PYPI_FILES_BASE_URL?.trim();
	if (!filesBaseUrl) {
		return wheelUrl;
	}

	const parsed = new URL(wheelUrl);
	if (parsed.hostname !== 'files.pythonhosted.org' || !parsed.pathname.startsWith('/packages/')) {
		return wheelUrl;
	}

	const normalizedBaseUrl = trimTrailingSlash(filesBaseUrl);
	const normalizedPath = normalizedBaseUrl.endsWith('/packages')
		? parsed.pathname.replace(/^\/packages/, '')
		: parsed.pathname;

	return `${normalizedBaseUrl}${normalizedPath}${parsed.search}`;
};

export { DEFAULT_PYPI_API_URL, DEFAULT_PYPI_INDEX_URL };
