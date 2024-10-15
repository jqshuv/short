// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
    hooks: {
        "after:bump": "npx auto-changelog -p",
        "after:bump": "node scripts/change-api-version.js ${version}"
    },
    git: {
        commit: true,
        tag: true,
        push: true,
        commitMessage: "chore(release): ${version}",
        requireCleanWorkingDir: true,
        tagName: "v/${version}",
        tagAnnotation : "Release ${version}",
        changelog: "npx auto-changelog --stdout --commit-limit false -u --template https://raw.githubusercontent.com/release-it/release-it/main/templates/changelog-compact.hbs"
    },
    github: {
        release: true,
        releaseName: "${version}"
    },
    npm: {
        publish: false,
    }
};
