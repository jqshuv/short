// Copyright (c) 2025 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import hardcodedLinks from './hardcodedLinks.json'

/**
 * Checks if a given shortcode exists in the hardcodedLinks array and returns the corresponding URL if found.
 * @param {string} shortcode - The shortcode to check against the hardcoded links.
 * @returns {object} An object containing a `blocked` boolean indicating if the shortcode is found and a `url` string if the shortcode is found and has an associated URL.
 */
export function hardcodedCheck(shortcode: string): boolean | string {
  const foundElement = hardcodedLinks.find(element => element.shortCode === shortcode && element.url !== undefined);
  return foundElement ? foundElement.url : false;
}
