// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// import version from package.json
import { version } from '../../package.json';

export default {
	async fetch(request, env): Promise<Response> {
    // Get the short code from the request URL.
    const requestUrl = new URL(request.url);

    // Get the short code from the URL path and remove the leading slash (/) and everything after the first slash.
    const shortCodeGet = requestUrl.pathname.slice(1).split('/')[0];

    // Get everything after the first slash.
    const afterSlash = requestUrl.pathname.slice(1).split('/')[1];

    // Get the search parameters from the request URL.
    const searchParams = requestUrl.searchParams;

    // Check if the request method is allowed.
    if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });

    // Show index page if no short code is provided.
    if (!shortCodeGet) return new Response(`just redirect. (v${version}) - powered by jqshuv x unately.`, { status: 200 });

    // Get the redirect URL from the short code.
    const data = await env.SHORT_URLS.get(shortCodeGet);

    // Redirect to the URL if it exists. Otherwise, redirect to the GitHub repository.
    if (data) {
      // Create a new URL object from the data.
      let url = new URL(data);

      // Set the pathname to the value after the first slash
      if (afterSlash) {
        url.pathname = afterSlash
      }

      // Set the search parameters to the value from the request URL.
      if (searchParams.toString()) {
        url.search = searchParams.toString();
      }

      // Redirect to the URL.
      return Response.redirect(url.toString(), 302);
    } else {
      return Response.redirect('https://github.com/jqshuv/short', 302);
    }
  }
} satisfies ExportedHandler<Env>;
