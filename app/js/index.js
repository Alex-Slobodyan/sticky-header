import stickyElement from './modules/sticky';
import throttle from './service/throttle';

const container = document.querySelector('.js-container');
const element = document.querySelector('.js-header');

const stickyHeader = () => {
  if (container && element) {
    stickyElement(container, element, 'header--fixed')
  }
}

window.addEventListener('scroll', () => {
  throttle(stickyHeader());
});
