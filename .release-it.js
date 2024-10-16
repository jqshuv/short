// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
    hooks: {
        "before:init": "echo \"${version}\"",
        "before:bump": "echo ${version}",
        "after:bump": "pnpx auto-changelog -p && git add CHANGELOG.md",
    },
    git: {
        commit: true,
        tag: true,
        push: true,
        commitMessage: "chore(release): :rocket: ${version}",
        commitArgs: ["-S"],
        requireCleanWorkingDir: true,
        tagName: "v/${version}",
        tagAnnotation : "Release ${version}",
        tagArgs: ["-s"],
        changelog: "echo \"${version}\" > .release-version",
    },
    github: {
        release: true,
        releaseName: "🚀 Release ${version}",
        comments: {
            submit: false,
            issue: ":rocket: _This issue has been resolved in v${version}. See [${releaseName}](${releaseUrl}) for release notes._",
            pr: ":rocket: _This pull request is included in v${version}. See [${releaseName}](${releaseUrl}) for release notes._"
        }
    },
    npm: {
        publish: false,
    }
};
