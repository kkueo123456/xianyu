export default (img) => {
  let picData = typeof img == "string" && JSON.parse(img).questions || "";
  if (picData) {
    let pic2 = picData.map((itm) => {
      return itm.answers[0].name;
    });
    return pic2
  }
}
