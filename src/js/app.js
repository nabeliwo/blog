import arrayFrom from './polyfill/array.from';

arrayFrom();

document.addEventListener('DOMContentLoaded', () => {
  // highlight.js
  const codes = Array.from(document.querySelectorAll('pre code'));
  if (codes.length) {
    codes.forEach(hljs.highlightBlock);
  }
});
