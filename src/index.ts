// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import handleRedirect from './routes/index';
import handleApi from './routes/api';

export default {
	async fetch(request, env): Promise<Response> {
        // Get the request URL.
        const requestUrl = new URL(request.url);

        // Check the request URL pathname
        switch (requestUrl.pathname) {
            // Check if the request URL pathname is '/api'. If so, handle the request with the API handler.
            case '/api':
                return await handleApi.fetch(request, env);
            // Otherwise, handle the request with the index handler.
            default:
                return await handleRedirect.fetch(request, env);
        }
	},
} satisfies ExportedHandler<Env>;
