<!--
 * @Author: your name
 * @Date: 2022-04-28 16:48:06
 * @LastEditTime: 2022-04-28 18:20:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \unraid-nas\src\views\HomeView.vue
-->
<template>
  <div class="home">
    <div class="topSou">
      <div class="TopTime UnidreamLED">{{ this.dateDay }}</div>
      <br />
      <div class="bottomTime">
        {{
          this.dateYear == null
            ? ""
            : this.dateYear +
              "&nbsp;&nbsp;" +
              this.dateWeek +
              "&nbsp;&nbsp;" +
              getLunarDay.dateStr
        }}
      </div>
      <input class="bottomSou" />
    </div>
    <div class="navCard"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getLunar } from "chinese-lunar-calendar";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      timer: null, //定时器名称
      weekday: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      getLunarDay: "",
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
    };
  },
  created() {
    this.timeFn();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    timeFn() {
      this.timer = setInterval(() => {
        this.dateDay = this.$dayjs.formatTime();
        this.dateYear = this.$dayjs.formatDate();
        this.dateWeek = this.weekday[this.$dayjs.formatWeek()];
        this.getLunarDay = getLunar(this.year, this.month, this.date);
        console.log(this.getLunarDay.dateStr);
      }, 10);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  background: url("../assets/img/2.jpg");
  /* 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动 */
  background-attachment: fixed;
  /* 图片可以保有其原有的尺寸，或者拉伸到新的尺寸，或者在保持其原有比例的同时缩放到元素的可用空间的尺寸。 */
  background-size: cover;

  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(3, 5fr);
  /*  声明行间距和列间距  */
  grid-gap: 20px;
  /*  声明行的高度  */
  grid-template-rows: repeat(6, 5fr);
  width: 100%;
  height: 100vh;
  .topSou {
    grid-column: 1/5;
    grid-row: 1/4;
    .TopTime {
      width: 500px;
      height: 140px;
      margin: auto;
      font-size: 120px;
      // background: red;
      color: #e67e22;
      text-align: center;
    }
    .bottomTime {
      width: 300px;
      height: 50px;
      margin: auto;
      font-size: 20px;
      text-align: center;
      color: #fff;
    }
    .bottomSou {
      width: 50%;
      height: 80px;
      border: 1px solid #e67e22;
      margin: 20px auto;
      display: block;
      border-radius: 25px;
    }
  }
  div {
    // border: 1px solid red;
  }
  .navCard {
  }
}
</style>
