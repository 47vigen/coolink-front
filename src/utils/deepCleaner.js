/**
 * author :: Craig Blackburn
 * repository :: https://github.com/darksinge/deep-cleaner.git
 */

'use strict'

import { isArray, isEmpty, isObject } from './is'

/**
 * deepCleaner.js :: Delete nested key-value pairs by a specified key
 *   or remove empty objects, empty strings, null, and undefined
 *   values from an object.
 */

/**
 * cleanCyclicObject :: Removes any undefined, null, or empty strings, arrays, or objects from `obj`.
 *    Uses a `WeakMap` to keep track of objects that have been visited while recursively cleaning
 *    an object to prevent infinite recursive calls.
 * @param {Object} object :: the object to be cleaned
 * @param {?String} target :: Optional key to remove from `object`. If not specified, the default
 * @param {Boolean} justTarget :: just clean targets from `obj`
 *    behavior is to remove "empty" values from `object`. A value is considered to be empty if it
 *    is one of the following:
 *      - empty strings
 *      - empty arrays
 *      - empty objects
 *      - values that are null
 *      - values that are undefined
 */
function cleanCyclicObject(object, target = null, justTarget = false) {
  const visitedObjects = new WeakMap() // use a WeakMap to keep track of which objects have been visited

  function recursiveClean(obj) {
    let thisObj = isObject(obj) ? { ...obj } : isArray(obj) ? [...obj] : obj
    // If `obj` is an actual object, check if it's been seen already.
    if (isObject(thisObj)) {
      // If we've seen this object already, return to stop infinite loops
      if (visitedObjects.has(thisObj)) {
        return thisObj
      }

      // If we haven't seen this object yet, add it to the list of visited objects.
      // Since 'obj' itself is used as the key, the value of 'objects[obj]' is
      // irrelevent. I just went with using 'null'.
      visitedObjects.set(thisObj, null)

      Object.keys(thisObj).map((key) => {
        if (
          (target && key === target) || // Check if 'key' is the target to delete,
          (!justTarget && isEmpty(thisObj[key])) // or if 'target' is unspecified but the object is "empty"
        ) {
          delete thisObj[key]
        } else {
          thisObj[key] = recursiveClean(thisObj[key])
        }
      })

      return thisObj
    } else if (isArray(thisObj)) {
      return thisObj.map((obj) => recursiveClean(obj))
    } else return thisObj
  }

  return recursiveClean(object)
}

/**
 * removeKeyLoop :: does the same thing as `removeKey()` but with multiple keys.
 * @param {Object} obj :: the object being cleaned
 * @param {Array} keys :: an array containing keys to be cleaned from `obj`
 * @param {Boolean} justTarget :: just clean targets from `obj`
 */
function removeKeyLoop(obj, keys = [], justTarget = false) {
  return keys.map((key) => cleanCyclicObject(obj, key, justTarget))
}

/**
 * deepCleaner
 *
 * @param {Object} obj :: the object being cleaned
 * @param {?String|?Array} target :: A string or array of strings of key(s) for key-value pair(s) to be cleaned from `obj`
 * @param {Boolean} justTarget :: just clean targets from `obj`
 */
function deepCleaner(obj, target = null, justTarget = false) {
  if (isArray(target)) {
    return removeKeyLoop(obj, target, justTarget)
  } else {
    return cleanCyclicObject(obj, target, justTarget)
  }
}

export default deepCleaner
