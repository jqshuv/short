// Copyright (c) 2024 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const fs = require('fs')
const path = require('path')

const apiVersion = process.argv[2]
const apiDocsPath = path.join(__dirname, '..', 'docs', 'api-docs.yaml')
const apiDocs = fs.readFileSync(apiDocsPath, 'utf8')

const updatedApiDocs = apiDocs.replace(/version: .*/, `version: ${apiVersion}`)

fs.writeFileSync(apiDocsPath, updatedApiDocs)

console.log(`API version updated to ${apiVersion}`)
