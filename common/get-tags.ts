export function iterateTags(tags?: { [key: string]: string }) {
  const tagArr = [];

  if (tags) {
    const keys = Object.keys(tags);

    for (let i = 0; i < keys.length; i++) {
      tagArr.push(`${keys[i]}:${tags[keys[i]]}`);
    }
  }

  return tagArr;
}
