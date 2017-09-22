import checkOffset from '../service/offset';

export default (container, element, class_fixed) => {
  if (checkOffset(container)) {
    container.style.paddingTop = `${element.clientHeight}px`;
    element.classList.add(class_fixed);
  } else {
    container.style.paddingTop = 0;
    element.classList.remove(class_fixed);
  }
}
