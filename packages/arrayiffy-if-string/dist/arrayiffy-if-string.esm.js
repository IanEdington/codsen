function arrayiffyString(something) {
  if (typeof something === "string") {
    if (something.length > 0) {
      return [something];
    }
    return [];
  }
  return something;
}

export default arrayiffyString;
