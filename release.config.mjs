// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default {
    branches: [{
        name: 'main',
        channel: process.env.RELEASE || 'next',
    }],
    tagFormat: 'v/${version}',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/github',
    ],
};
