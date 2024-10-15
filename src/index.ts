// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import handleRedirect from './routes/index';
import handleApi from './routes/api';

export default {
	async fetch(request, env, ctx): Promise<Response> {
        const requestUrl = new URL(request.url);

        switch (requestUrl.pathname) {
            case '/api':
                return await handleApi.fetch(request, env);
            default:
                return await handleRedirect.fetch(request, env);
        }
	},
} satisfies ExportedHandler<Env>;
