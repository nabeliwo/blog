const ua = window.navigator.userAgent.toLowerCase();

export const isMobile = (
  (ua.indexOf('windows') !== -1 && ua.indexOf('phone') !== -1) ||
  (ua.indexOf('android') !== -1 && ua.indexOf('mobile') !== -1) ||
  (ua.indexOf('firefox') !== -1 && ua.indexOf('mobile') !== -1) ||
  ua.indexOf('iphone') !== -1 ||
  ua.indexOf('ipod') !== -1 ||
  ua.indexOf('blackberry') !== -1
);

export const isTablet = (
  (ua.indexOf('windows') !== -1 && ua.indexOf('touch') !== -1 && ua.indexOf('tablet pc') === -1) ||
  (ua.indexOf('android') !== -1 && ua.indexOf('mobile') === -1) ||
  (ua.indexOf('firefox') !== -1 && ua.indexOf('tablet') !== -1) ||
  ua.indexOf('ipad') !== -1 ||
  ua.indexOf('kindle') !== -1 ||
  ua.indexOf('silk') !== -1 ||
  ua.indexOf('playbook') !== -1
);

export default {
  isMobile,
  isTablet
}
