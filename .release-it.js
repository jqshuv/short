// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
    hooks: {
        // Change version on docs/api-docs.yaml to the new version with shell command
        "before:bump": "sed -i '' 's/version: v\/[0-9]*\.[0-9]*\.[0-9]*/version: v\/${version}/' docs/api-docs.yaml",
    },
    git: {
        commit: true,
        tag: true,
        push: true,
        commitMessage: "chore(release): ${version}",
        requireCleanWorkingDir: true,
        tagName: "v/${version}",
        tagAnnotation : "Release ${version}",
    },
    github: {
        release: true,
        releaseName: "${version}"

    },
    npm: {
        publish: false,
    },
    plugins: {
        "@release-it/conventional-changelog": {
            preset: "angular",
            infile: "CHANGELOG.md"
        }
    },
};
