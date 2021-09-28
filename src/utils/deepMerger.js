'use strict'
import { isObject, isArray } from './is'

/**
 * deepMerger
 *
 * @param {Object|Array} target :: A object or array being merged
 * @param {Object|Array} source :: A object or array being copied to target`
 */
function deepMerger(target, source) {
  if (isObject(target)) {
    const keys = Object.keys(target)
    const array = keys.map((key) => [key, isObject(source) ? (source[key] ? deepMerger(target[key], source[key]) : target[key]) : target[key]])
    return Object.fromEntries(array)
  } else if (isArray(target) && target.length) {
    return target.map((item, idx) => (isArray(source) ? (source[idx] ? deepMerger(item, source[idx]) : item) : item))
  } else if (typeof source !== 'undefined') {
    return source
  } else return target
}

export default deepMerger
