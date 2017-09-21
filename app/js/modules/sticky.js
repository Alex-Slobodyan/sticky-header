import checkOffset from '../service/offset';

export default (sticky_container, element, class_fixed) => {
  if (checkOffset(sticky_container)) {
    sticky_container.style.paddingTop = `${element.clientHeight}px`;
    element.classList.add(class_fixed);
  } else {
    sticky_container.style.paddingTop = 0;
    element.classList.remove(class_fixed);
  }
}
