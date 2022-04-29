<!--
 * @Author: your name
 * @Date: 2022-04-28 16:48:06
 * @LastEditTime: 2022-04-29 13:04:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \unraid-nas\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@font-face {
  font-family: "UnidreamLED";
  src: url("./assets/ttf/digital-7-italic-1.ttf") format("truetype"); //UnidreamLED.ttf在项目中的位置
}
.UnidreamLED {
  font-family: "UnidreamLED", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  display: none;
}
::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
