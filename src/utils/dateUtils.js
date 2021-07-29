
/**
 * 日期格式转换成字符串
 * @param {*} date 
 * @param {*} format 
 * @returns dareFormat(new Date(),'yyyy-MM-dd hh:mm:ss')  返回  2017-12-21 09:38:15
 */
 export const dateFormat = (date, format) => {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
}


/**
 * 时间戳转日期格式
 * @param {*} timestamp 时间戳
 * @param {*} onlyDate 是否带时分秒 false-带时分秒， true-不带
 * @returns 
 */
export function formatDate (timestamp, onlyDate = true) {
  if(!timestamp) return ''
  // 转Int
  timestamp = parseInt(timestamp);
  var times = (timestamp.toString().length > 10) ? timestamp : timestamp * 1000;
  var date = new Date(times);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (onlyDate) {
    return this.numberPrefix(4, year) + "-" + this.numberPrefix(2, month) + "-" + this.numberPrefix(2, day);
  }
  return this.numberPrefix(4, year) + "-" + this.numberPrefix(2, month) + "-" + this.numberPrefix(2, day) + " "
    + this.numberPrefix(2, hour) + ":" + this.numberPrefix(2, minute) + ":" + this.numberPrefix(2, second);
}