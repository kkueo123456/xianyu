export default (time) => {
  var date = time || ""
  if (date) {
    var data2 = new Date(date)
    var finDate = data2.toLocaleString('chinese', {
      hour12: false
    })
    return finDate;
  }
  return "无"
}
