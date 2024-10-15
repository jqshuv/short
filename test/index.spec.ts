// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';

import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
	var shortCode = '';

	it('responds with Hello World! (unit style)', async () => {
		const request = new IncomingRequest('http://example.com', { method: 'GET' });
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"just redirect. - powered by jqshuv x unately."`);
	});

	it('post request url', async () => {
		const request = new IncomingRequest('http://example.com', {
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
		const request = new IncomingRequest('http://example.com', {
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
		const responseBody = await response.json() as { shortCode: string };
		shortCode = responseBody.shortCode;
		expect(responseBody).toMatchObject({ shortCode: shortCode });
	});



	it('post request url', async () => {
		const request = new IncomingRequest('http://example.com', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': env.AUTH_SECRET,
			},
			body: JSON.stringify({ shortCode: 'test', redirect: 'https://example.com' }),
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(200);
	});



	it('post request url without shortCode', async () => {
		const request = new IncomingRequest('http://example.com', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': env.AUTH_SECRET,
			},
			body: JSON.stringify({ redirect: 'https://example.com' }),
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		const responseBody = await response.json() as { shortCode: string };
		shortCode = responseBody.shortCode;
		expect(responseBody).toMatchObject({ shortCode: shortCode });
	});


	console.log(shortCode);
});
