// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
	var shortCode = '';

	it('index response', async () => {
		const request = new IncomingRequest('http://example.com', { method: 'GET' });
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot("\"just redirect. - powered by jqshuv x unately.\"");
	});

	it('post request url', async () => {
		const request = new IncomingRequest('http://example.com/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': env.AUTH_SECRET,
			},
			body: JSON.stringify({ shortCode: 'test', redirect: 'https://example.com' }),
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(201);
	});



	it('post request url without shortCode', async () => {
		const request = new IncomingRequest('http://example.com/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': env.AUTH_SECRET,
			},
			body: JSON.stringify({ redirect: 'https://example.com' }),
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const responseBody = await response.json() as { shortcode: string };
		shortCode = responseBody.shortcode;
		expect(responseBody).toMatchObject({ status: "succesfully_created" ,shortcode: shortCode, redirect: "https://example.com" });
	});
});
