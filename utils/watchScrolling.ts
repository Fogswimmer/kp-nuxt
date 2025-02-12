export default (sectionClassName: string, activeSection: Ref<string | undefined>, showScrollFab: Ref<boolean>|null = null ) => {
  const scrollPosition = window.scrollY;
  const contentItems = document.querySelectorAll(`.${sectionClassName}`);
  contentItems.forEach((element: Element): void => {
    const htmlElement = element as HTMLElement;
    const elementTop = htmlElement.offsetTop;
    const elementHeight = htmlElement.clientHeight;
    const elementBottom = elementTop + elementHeight;
    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
      activeSection.value = element.id;
    }
  });
  if (showScrollFab) {
    showScrollFab.value = scrollPosition > 100;
  }
}
