// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 * Check if the request has a valid header.
 * @param request The user request.
 * @param env The Cloudflare environment.
 * @returns Returns true if the request has a valid header, otherwise false.
 */
function hasValidHeader(request: Request, env: Env): boolean {
  // Get the search parameters from the request URL.
	const searchParams = new URL(request.url).searchParams;

  // If the AUTH_SECRET is not set, make the API public and return true.
  if (!env.AUTH_SECRET) return true;

  // Check if the request has a valid Authorization header or query parameter.
	if (request.headers.has('Authorization')) {
    // Get the Authorization header from the request.
		const authHeader = request.headers.get('Authorization');

    // Check if the Authorization header is valid.
		if (authHeader === env.AUTH_SECRET) return true;

    // Return false if the Authorization header is invalid.
    return false;
	} else if (searchParams.has('auth')) {
    // Get the auth query parameter from the request.
		const authParam = searchParams.get('auth');

    // Check if the auth query parameter is valid.
		if (authParam === env.AUTH_SECRET) return true;

    // Return false if the auth query parameter is invalid.
    return false;
	} else {
		return false;
	}
}

/**
 * Authorize the request based on the method.
 * @param request The user request.
 * @param env The Cloudflare environment.
 * @returns Returns true if the request is authorized, otherwise false.
 */
function authorizeRequest(request: Request, env: Env): boolean {
  // Check if the request method is allowed.
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
      // Define the body of the request.
		let body: { shortcode?: string, redirect: string, expire?: number } | undefined;

    // Check if the request method is allowed. Also, check if the request is valid.
		if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      // Check if the request has a valid Content-Type header.
			if (!request.headers.has('Content-Type') || request.headers.get('Content-Type') !== 'application/json') {
				return new Response('Bad Request', { status: 400 });
			}

      // Get the body of the request.
			body = await request.json() as { shortcode?: string, redirect: string } || undefined;

      // Check if the body is valid.
			if (!body || !body.redirect) {
				return new Response('Bad Request', { status: 400 });
			}
		} else if (request.method === 'GET') {
      // Redirect to the API documentation if the request method is GET.
      return Response.redirect('https://s.jqshuv.com/apidocs', 302);
    }

    // Check if the request is authorized.
		if (!authorizeRequest(request, env) && request.method !== 'GET') {
			return new Response(JSON.stringify({ status: 'unauthorized' }), { status: 401 });
		}

    // Check the request method and perform the appropriate action.
		switch (request.method) {
			case 'POST': {
        // Define the variables for the expiration time.
        let expire: number | undefined;

        // Check if the body is valid.
				if (!body) return new Response('Bad Request', { status: 400 });

        // Check if the short code is too long.
        if (body.shortcode && body.shortcode.length > 30) return new Response(JSON.stringify({ status: "shortcode_too_long" }), { status: 400 });

        // Check if the expiration time is provided.
        if (body.expire) {
          // Get the expiration time in minutes.
          expire = body.expire * 60;

          // Check if the expiration time is valid.
          if (expire < 0 || expire > 525600) return new Response(JSON.stringify({ status: "invalid_expire_time" }), { status: 400 });

          // Set the expiration time to undefined if it is 0.
          if (expire === 0) expire = undefined;
        } else {
          // Set the expiration time to undefined if it is not provided.
          expire = undefined
        }

        // Check if the short code already exists.
        if (body.shortcode) {
            // Check if the short code already exists from the database.
          const postExistingData = await env.SHORT_URLS.get(body.shortcode);

          // Return an error if the short code already exists.
          if (postExistingData) return new Response(JSON.stringify({ status: "shortcode_already_exists" }), { status: 409 });
        }

        // Generate a short code if one is not provided
				const postShortCode = body.shortcode || Math.random().toString(36).slice(2, 8);

        // Get the redirect URL from the body.
				const postRedirectUrl = body.redirect;


        // Check if the short code already exists.
				await env.SHORT_URLS.put(postShortCode, postRedirectUrl, {
          expirationTtl: expire
        });

				// Return the response.
				return new Response(JSON.stringify({ status: "succesfully_created", shortcode: postShortCode, redirect: postRedirectUrl }), { status: 201 });
			}

      case 'PUT': {
        // Check if the body is valid.
				if (!body) return new Response('Bad Request', { status: 400 });

        // Get the short code and redirect URL from the body.
				const putShortCode = body.shortcode;

        // Get the redirect URL from the body.
				const putRedirectUrl = body.redirect;

                // Check if the short code is provided.
        if (!putShortCode) return new Response(JSON.stringify({ status: "no_shortcode_provided" }), { status: 400 });

        // Check if the short code already exists.
        const putExistingData = await env.SHORT_URLS.get(putShortCode);

        // Return an error if the short code does not exist.
        if (!putExistingData) return new Response(JSON.stringify({ status: "shortcode_not_found" }), { status: 404 })

        // Update the redirect URL in the database.
				await env.SHORT_URLS.put(putShortCode, putRedirectUrl);

        // Return the response.
				return new Response(JSON.stringify({ status: "succesfully_updated", shortcode: putShortCode, redirect: putRedirectUrl }), { status: 200 });
			}

      case 'DELETE': {
        // Check if the body is valid.
				if (!body) return new Response(JSON.stringify({ status: "no_body_provided" }), { status: 400 });

        // Get the short code from the body.
				const deleteShortCode = body.shortcode

        // Check if the short code is provided.
				if (!deleteShortCode) return new Response(JSON.stringify({ status: "no_shortcode_provided" }), { status: 400 });

        // Check if the short code already exists.
        const deleteExistingData = await env.SHORT_URLS.get(deleteShortCode);

        // Return an error if the short code does not exist.
        if (!deleteExistingData) return new Response(JSON.stringify({ status: "shortcode_not_found" }), { status: 404 });

        // Delete the short code from the database.
				await env.SHORT_URLS.delete(deleteShortCode);

        // Return the response.
				return new Response(JSON.stringify({ status: "succesfully_deleted" }), { status: 200 });
      }

			default: {
        // Return an error if the request method is not allowed.
				return new Response('Method Not Allowed', { status: 405 });
      }
		}
  }
} satisfies ExportedHandler<Env>;
