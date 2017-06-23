import { isMobile, isTablet } from './ua';

export const clickEvent = isMobile || isTablet ? 'touchend' : 'click';

export function debounce(func, interval = 100) {
  let timer;

  return (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(e);
    }, interval);
  };
}

export default {
  clickEvent,
  debounce
};
