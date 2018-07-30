import arrayFrom from './polyfill/array.from';
import Navi from './navi';

arrayFrom();

document.addEventListener('DOMContentLoaded', () => {
  // touch
  function toggleTouch(element) {
    element.addEventListener('touchstart', () => element.classList.add('is-touch'));
    element.addEventListener('touchend', () => element.classList.remove('is-touch'));
  }
  Array.from(document.querySelectorAll('.js-touch')).forEach(toggleTouch);
  Array.from(document.querySelectorAll('.c-post a')).forEach(toggleTouch);

  // highlight.js
  const codes = Array.from(document.querySelectorAll('pre code'));
  if (codes.length) {
    codes.forEach(hljs.highlightBlock);
  }

  // navi
  new Navi({
    wrapper: '.js-navi',
    trigger: '.js-navi-button',
    bg: '.js-navi-bg',
    box: '.js-navi-box'
  });
});

console.log('hogehoge')
