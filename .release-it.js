// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
    hooks: {
        "before:bump": "node scripts/change-api-version.js ${version}",
        "after:bump": "pnpx auto-changelog -p && git add CHANGELOG.md",
    },
    git: {
        commit: true,
        tag: true,
        push: true,
        releaseName: ":rocket: Release ${version}",
        commitMessage: "chore(release): :rocket: ${version}",
        commitArgs: ["-S"],
        requireCleanWorkingDir: true,
        tagName: "v/${version}",
        tagAnnotation : "Release ${version}",
        tagArgs: ["-s"],
        changelog: "pnpx auto-changelog --stdout --commit-limit false -u --template https://raw.githubusercontent.com/cookpete/auto-changelog/refs/heads/master/templates/conventional.hbs --tag-prefix=v/",
        comments: {
            submit: false,
            issue: ":rocket: _This issue has been resolved in v${version}. See [${releaseName}](${releaseUrl}) for release notes._",
            pr: ":rocket: _This pull request is included in v${version}. See [${releaseName}](${releaseUrl}) for release notes._"
        }
    },
    github: {
        release: true,
        releaseName: "${version}"
    },
    npm: {
        publish: false,
    }
};
