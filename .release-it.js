// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
    hooks: {
        "after:bump": "pnpx auto-changelog -p && node scripts/change-api-version.js ${version}",
    },
    git: {
        commit: true,
        tag: true,
        push: true,
        commitMessage: "chore(release): ${version}",
        commitArgs: ["-S"],
        requireCleanWorkingDir: true,
        tagName: "v/${version}",
        tagAnnotation : "Release ${version}",
        tagArgs: ["-s"],
        changelog: "pnpx auto-changelog --stdout --commit-limit false -u --template https://raw.githubusercontent.com/cookpete/auto-changelog/refs/heads/master/templates/conventional.hbs --tag-prefix=v/"
    },
    github: {
        release: true,
        releaseName: "${version}"
    },
    npm: {
        publish: false,
    }
};
