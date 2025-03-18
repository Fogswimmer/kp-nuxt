export default (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
