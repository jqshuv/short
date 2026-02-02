// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
  hooks: {
    "before:init": "bun test:single",
    // "before:bump": "node scripts/change-api-version.js ${version}",
    // edit the CHANGELOG.md file before the release with sed 's/...main/...v\\/${version}/g'
    "before:release": "bunx changelogen@latest --from=${latestTag} --output=CHANGELOG.md && sed -i '' 's/...main/...v\\/${version}/g' CHANGELOG.md && git add CHANGELOG.md",
    "after:release": "git pull --tags && git checkout production && git merge main && git push && git checkout main",
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
    changelog: "git log ${latestTag}..HEAD --oneline --no-merges",
  },
  github: {
    release: true,
    releaseName: "🚀 Release ${version}",
    releaseNotes: "bunx changelogen@latest --from=${latestTag} | tail -n +4 | sed 's/...main/...v\\/${version}/g'",
    comments: {
      submit: false,
      issue: ":rocket: _This issue has been resolved in v${version}. See [${releaseName}](${releaseUrl}) for release notes._",
      pr: ":rocket: _This pull request is included in v${version}. See [${releaseName}](${releaseUrl}) for release notes._"
    }
  },
  npm: {
    publish: false,
  },
  plugins: {
    "@release-it/bumper": {
      in: {
        file: "docs/api-docs.yaml",
        path: "info.version"
      },
      out: {
        file: "docs/api-docs.yaml",
        path: "info.version"
      },
    }
  }
};
