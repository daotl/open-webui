import { describe, expect, it } from 'vitest';

import {
	getPyPIIndexUrls,
	resolvePyodideIndexURL,
	resolvePyPIMetadataUrl,
	resolvePyPIWheelUrl
} from '../../scripts/lib/pyodide-mirror.js';

describe('pyodide mirror helpers', () => {
	it('uses the configured PyPI mirror endpoints', () => {
		const env = {
			PYODIDE_PYPI_INDEX_URL: 'https://mirrors.aliyun.com/pypi/simple',
			PYODIDE_PYPI_API_URL: 'https://mirrors.aliyun.com/pypi',
			PYODIDE_PYPI_FILES_BASE_URL: 'https://mirrors.aliyun.com/pypi/packages'
		};

		expect(getPyPIIndexUrls(env)).toEqual(['https://mirrors.aliyun.com/pypi/simple']);
		expect(resolvePyPIMetadataUrl('black', env)).toBe(
			'https://mirrors.aliyun.com/pypi/black/json'
		);
		expect(
			resolvePyPIWheelUrl(
				'https://files.pythonhosted.org/packages/ab/cd/black-26.3.1-py3-none-any.whl',
				env
			)
		).toBe('https://mirrors.aliyun.com/pypi/packages/ab/cd/black-26.3.1-py3-none-any.whl');
	});

	it('falls back to the upstream PyPI endpoints when no mirror is set', () => {
		expect(getPyPIIndexUrls({})).toBeUndefined();
		expect(resolvePyPIMetadataUrl('black', {})).toBe('https://pypi.org/pypi/black/json');
		expect(
			resolvePyPIWheelUrl(
				'https://files.pythonhosted.org/packages/ab/cd/black-26.3.1-py3-none-any.whl',
				{}
			)
		).toBe('https://files.pythonhosted.org/packages/ab/cd/black-26.3.1-py3-none-any.whl');
	});

	it('defaults the Pyodide index URL to the local node_modules copy', () => {
		expect(resolvePyodideIndexURL({}, '/tmp/open-webui')).toBe(
			'/tmp/open-webui/node_modules/pyodide/'
		);
	});

	it('uses the configured Pyodide index URL when provided', () => {
		expect(
			resolvePyodideIndexURL(
				{
					PYODIDE_INDEX_URL: 'https://mirrors.aliyun.com/pyodide'
				},
				'/tmp/open-webui'
			)
		).toBe('https://mirrors.aliyun.com/pyodide/');
	});
});
