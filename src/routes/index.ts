// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default {
	async fetch(request, env): Promise<Response> {
    // Get the short code from the request URL.
    const requestUrl = new URL(request.url);
    const shortCodeGet = requestUrl.pathname.slice(1);

    // Check if the request method is allowed.
    if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });

    // Show index page if no short code is provided.
    if (!shortCodeGet) return new Response('just redirect. - powered by jqshuv x unately.', { status: 200 });

    // Get the redirect URL from the short code.
    const data = await env.SHORT_URLS.get(shortCodeGet);

    // Redirect to the URL if it exists. Otherwise, redirect to the GitHub repository.
    if (data) {
      return Response.redirect(data, 302);
    } else {
      return Response.redirect('https://github.com/jqshuv/short', 302);
    }
  }
} satisfies ExportedHandler<Env>;
