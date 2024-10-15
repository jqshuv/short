// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default {
	async fetch(request, env): Promise<Response> {
        const requestUrl = new URL(request.url);
        const shortCodeGet = requestUrl.pathname.slice(1);

        // check if request has body and await for it to be parsed to variable body

        if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });

        if (!shortCodeGet) return new Response('just redirect. - powered by jqshuv x unately.', { status: 200 });

        const data = await env.SHORT_URLS.get(shortCodeGet);
        if (data) {
            return Response.redirect(data, 302);
        } else {
            return Response.redirect('https://github.com/jqshuv/short', 302);
        }
    }
} satisfies ExportedHandler<Env>;
