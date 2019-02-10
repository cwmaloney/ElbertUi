"use strict";

// this does not handle shared references withing the object
function cloneObject(objectToClone) {
  let clone = JSON.parse(JSON.stringify(objectToClone));
  return clone;
}

// this does not handle shared references withing the object
function copyObject(toObject, fromObject) {
  for (let propertyName in fromObject) {
    if (fromObject.hasOwnProperty(propertyName)) {
      if (toObject[propertyName] instanceof Object) {
        copyObject(toObject[propertyName], fromObject[propertyName]);
      }
      if (toObject[propertyName] instanceof Array) {
        const toArray = toObject[propertyName];
        const fromArray = fromObject[propertyName];
        toArray.length = fromArray.length;
        for (let index = 0; index < fromObject.length; index++) {
          toArray[index] = fromObject[index];
        }
      } else {
        toObject[propertyName] = fromObject[propertyName];
      }
    }
  }
}

// this does not handle shared references withing the object
function cloneArray(arrayToClone) {
  let clone = JSON.parse(JSON.stringify(arrayToClone));
  return clone;
}

/*
 * Filter an array for items that contain a string
 * array - array to filter
 * filter - string to match
 * returns matching items from array
 */
function filterArray(array, filter) {
  if (!filter) {
    return array;
  }

  const lowercaseFilter = filter.toString().toLowerCase();

  const results = [];

  for (let index = 0; index < array.length; index++) {
    let arrayElement = array[index];

    for (let prop in arrayElement) {
      let value = arrayElement[prop];

      const normalisedValue = value.toString().toLowerCase();

      if (normalisedValue.indexOf(lowercaseFilter) > -1) {
        results.push(arrayElement);
        break;
      }
    }
  }

  return results;
}


module.exports = { cloneObject, copyObject, cloneArray, filterArray };
