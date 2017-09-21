import stickyElement from './modules/sticky';
import throttle from './service/throttle';

const sticky_container = document.querySelector('.js-sticky');
const element = document.querySelector('.js-header');

window.addEventListener('scroll', () => {
  throttle(stickyElement(sticky_container, element, 'header--fixed'), 250);
});
