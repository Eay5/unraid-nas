/*
 * @Author: eay
 * @Date: 2022-04-01 14:57:18
 * @LastEditors: Please set LastEditors
 * @Autor: Seven
 * @LastEditTime: 2022-04-26 16:03:06
 * @Description:
 */
//utils.js

export default {
  handleText(value, index) {
    if (!value) return "";
    if (value.length > index) {
      return value.slice(0, index) + "...";
    }
    return value;
  },
  genID(length) {
    return Number(
      Math.random().toString().substr(3, length) + Date.now()
    ).toString(36);
  },
};
