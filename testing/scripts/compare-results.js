/*
  compare-results.js

  Simple helper for comparing saved JSON outputs from before and after refactor.
  Run manually in browser console or adapt for Node if desired.
*/

export function stableStringify(value) {
  return JSON.stringify(sortKeys(value), null, 2);
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    return Object.keys(value).sort().reduce((acc, key) => {
      acc[key] = sortKeys(value[key]);
      return acc;
    }, {});
  }
  return value;
}

export function compareJson(label, before, after) {
  const b = stableStringify(before);
  const a = stableStringify(after);
  return {
    label,
    equal: b === a,
    beforeLength: b.length,
    afterLength: a.length
  };
}
