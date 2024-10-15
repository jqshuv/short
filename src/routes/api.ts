// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

function hasValidHeader(request: Request, env: Env): boolean {
	const searchParams = new URL(request.url).searchParams;

	if (request.headers.has('Authorization')) {
		const authHeader = request.headers.get('Authorization');
		if (authHeader === env.AUTH_SECRET) {
			return true;
		} else {
			return false;
		}
	} else if (searchParams.has('auth')) {
		const authParam = searchParams.get('auth');
		if (authParam === env.AUTH_SECRET) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function authorizeRequest(request: Request, env: Env): boolean {
	switch (request.method) {
		case 'GET':
			return true;
		case 'POST':
			return hasValidHeader(request, env);
		case 'PUT':
			return hasValidHeader(request, env);
		case 'DELETE':
			return hasValidHeader(request, env);
		default:
			return false
	}
}

export default {
	async fetch(request, env): Promise<Response> {
		let body: { shortcode?: string, redirect: string } | undefined;

		if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
			if (!request.headers.has('Content-Type') || request.headers.get('Content-Type') !== 'application/json') {
				return new Response('Bad Request', { status: 400 });
			}

			body = await request.json() as { shortcode?: string, redirect: string } || undefined;

			if (!body || !body.redirect) {
				return new Response('Bad Request', { status: 400 });
			}
		} else if (request.method === 'GET') {
            return Response.redirect('https://s.jqshuv.com/apidocs', 302);
        }

		if (!authorizeRequest(request, env) && request.method !== 'GET') {
			return new Response('Unauthorized', { status: 401 });
		}

		switch (request.method) {
			case 'POST':
				if (!body) return new Response('Bad Request', { status: 400 });
				const postShortCode = body.shortcode || Math.random().toString(36).slice(2, 8);
				const postRedirectUrl = body.redirect;

				await env.SHORT_URLS.put(postShortCode, postRedirectUrl);
				// response with shortCode in json
				return new Response(JSON.stringify({ status: "succesfully_created", shortcode: postShortCode, redirect: postRedirectUrl }), { status: 201 });
			case 'PUT':
				if (!body) return new Response('Bad Request', { status: 400 });
				const putShortCode = body.shortcode;
				const putRedirectUrl = body.redirect;

                if (!putShortCode) return new Response(JSON.stringify({ status: "no_shortcode_provided" }), { status: 400 });

                const existingData = await env.SHORT_URLS.get(putShortCode);

                if (!existingData) return new Response(JSON.stringify({ status: "shortcode_not_found" }), { status: 404 })

				await env.SHORT_URLS.put(putShortCode, putRedirectUrl);
				return new Response(JSON.stringify({ status: "succesfully_updated", shortcode: putShortCode, redirect: putRedirectUrl }), { status: 200 });
			case 'DELETE':
				if (!body) return new Response(JSON.stringify({ status: "no_body_provided" }), { status: 400 });
				const deleteShortCode = body.shortcode

				if (!deleteShortCode) return new Response(JSON.stringify({ status: "no_shortcode_provided" }), { status: 400 });

				await env.SHORT_URLS.delete(deleteShortCode);
				return new Response(JSON.stringify({ status: "succesfully_deleted" }), { status: 200 });
			default:
				return new Response('Method Not Allowed', { status: 405 });
		}
    }
} satisfies ExportedHandler<Env>;

