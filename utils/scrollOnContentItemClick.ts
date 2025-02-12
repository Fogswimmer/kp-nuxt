export default (anchor: string, mainAccorion: Ref<string[]>, activeSection: Ref<string | undefined>): void => {
  const element = document.getElementById(anchor);
  console.log(element)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!mainAccorion.value.includes(anchor)) {
      mainAccorion.value.push(anchor);
    }
    const index = mainAccorion.value.indexOf(anchor);
    activeSection.value = mainAccorion.value[index];
  }
};