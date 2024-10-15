// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
    git: {
        commit: true,
        tag: true,
        push: true,
        commitMessage: "chore(release): ${version}",
        requireCleanWorkingDir: true,
    },
    github: {
        release: true,
        releaseName: "${version}"

    },
    npm: {
        publish: false,
    },
    plugins: {
        "@release-it/keep-a-changelog": {
            "filename": "CHANGELOG.md"
        }
    },
};
