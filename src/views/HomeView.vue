<!--
 * @Author: your name
 * @Date: 2022-04-28 16:48:06
 * @LastEditTime: 2022-04-29 15:19:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \unraid-nas\src\views\HomeView.vue
-->
<template>
  <div class="home" :style="imageUrl">
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
      <div class="bottomSou" :style="souList.length != 0 ? 'opacity:1' : ''">
        <input
          class="SouInput"
          @input="search"
          v-model="souVal"
          @keyup.enter="submit"
          @focus="focusVal"
        />
        <div class="leftIcon"></div>
        <div class="rightIcon">
          <span
            class="iconfont icon-sousuoxiao"
            style="font-size: 33px"
            @click="souOpen(souVal)"
          ></span>
        </div>
        <div class="rightIconDel" v-if="souDataJudge">
          <span
            class="iconfont icon-shanchu2"
            style="font-size: 20px"
            @click="delData"
          ></span>
        </div>
        <div class="bottomSouData" v-if="souDataJudge">
          <ul>
            <li v-for="item in souList" :key="item.sa" @click="souOpen(item.q)">
              <span
                :class="
                  item.history != 1
                    ? 'iconfont icon-sousuoxiao'
                    : 'iconfont icon-lishi'
                "
              ></span
              >&nbsp;&nbsp;<span style="width: 50%">{{ item.q }} </span>
              <!-- <span
                v-if="item.history != 1 ? 'false' : 'true'"
                class="iconfont icon-shanchu delDom"
                style="float: right; margin-right: 90px"
                @click="delData(item.q)"
              ></span> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navCard">
      <div class="navMenu">
        <div
          class="box-card"
          v-for="(item, i) in iconData"
          :key="i"
          shadow="hover"
          @click="openUrl(item.url)"
        >
          <img :src="item.img" alt="" srcset="" width="80" height="80" />
          <h2>{{ item.title }}</h2>
        </div>
      </div>
    </div>
    <div class="imgNav">
      <span
        class="iconfont icon-qiehuan2"
        style="font-size: 32px"
        @click="switchImg"
      ></span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getLunar } from "chinese-lunar-calendar";

import axios from "axios";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      imageUrl: "background:url(" + "./img/" + 3 + ".jpg" + ");",
      souDataJudge: false,
      souVal: "",
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
      souList: [],
      iconData: [],
    };
  },
  created() {
    this.timeFn();

    this.iconData = navData;
    if (localStorage.getItem("imageUrl")) {
      this.imageUrl = localStorage.getItem("imageUrl");
    }
  },
  // watch: {
  //   souList(val) {
  //     // console.log(val, val.length, "valvalvalval");
  //     // if (val.length == 0) {
  //     //   this.souDataJudge = false;
  //     // } else {
  //     //   this.souDataJudge = true;
  //     // }
  //   },

  // deep: true,
  // },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    focusVal() {
      // if (JSON.parse(localStorage.getItem("historyData"))) {
      //   this.souList = JSON.parse(localStorage.getItem("historyData"));
      //   this.souDataJudge = true;
      // }
    },
    timeFn() {
      this.timer = setInterval(() => {
        this.dateDay = this.$dayjs.formatTime();
        this.dateYear = this.$dayjs.formatDate();
        this.dateWeek = this.weekday[this.$dayjs.formatWeek()];
        this.getLunarDay = getLunar(this.year, this.month, this.date);
        // console.log(this.getLunarDay.dateStr);
      }, 10);
    },
    submit() {
      this.historyList(this.souVal);
      window.open("http://www.baidu.com/s?wd=" + this.souVal);
      this.souList = [];
      this.souVal = "";
      this.souDataJudge = false;
      // https://api.codelife.cc/api/baidu_sugrec/ooo
    },
    historyList(val) {
      if (JSON.parse(localStorage.getItem("historyData"))) {
        let historyVal = JSON.parse(localStorage.getItem("historyData"));
        console.log(historyVal);
        let page = false;
        historyVal.forEach((item, i) => {
          if (item.g != val) {
            page = true;
          } else {
            page = false;
          }
          if (page) {
            historyVal.push({ q: val, history: "1" });
            localStorage.setItem("historyData", JSON.stringify(historyVal));
          }
        });
      } else {
        let historyVal = [];
        historyVal.push({ q: val, history: "1" });
        localStorage.setItem("historyData", JSON.stringify(historyVal));
      }
    },
    openUrl(url) {
      window.open(url);
    },
    search() {
      axios
        .get("https://api.codelife.cc/api/baidu_sugrec/" + this.souVal)
        .then((res) => {
          // console.log(res, typeof res.data.code);
          if (res.data.code === 200) {
            // console.log(res.data.data.g);
            if (res.data.data.g) {
              this.souList = res.data.data.g;
              this.souDataJudge = true;
            } else {
              this.souList = [];
              // this.souVal = "";
              this.souDataJudge = false;
            }
          }
        });
    },
    delData(val) {
      this.souList = [];
      this.souVal = "";
      this.souDataJudge = false;
      // let historyVal = JSON.parse(localStorage.getItem("historyData"));
      // historyVal.forEach((item, i) => {
      //   if (item.g == val) {
      //     historyVal.splice(i, 1); // 从下标 i 开始, 删除 1 个元素
      //   }
      // });

      // localStorage.setItem("historyData", JSON.stringify(historyVal));
    },
    souOpen(val) {
      this.historyList(val);
      window.open("http://www.baidu.com/s?wd=" + val);
      this.souList = [];
      this.souVal = "";
      this.souDataJudge = false;
    },
    switchImg() {
      // let url = "./img/" + Math.ceil(Math.random() * 6) + ".jpg";
      let num = Math.ceil(Math.random() * 29);
      console.log(num);
      // console.log(url);
      this.imageUrl = "background:url(" + "./img/" + num + ".jpg" + ");";
      localStorage.setItem("imageUrl", this.imageUrl);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  // background: url("../assets/img/2.jpg");

  /* 背景图垂直、水平均居中 */

  background-size: cover !important;
  background-position: center center !important;
  /* 背景图不平铺 */
  background-repeat: no-repeat !important;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */

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
    grid-row: 1/3;
    .TopTime {
      width: 500px;
      height: 140px;
      margin: auto;
      font-size: 120px;
      // background: red;
      color: #fff;
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
      width: 800px;
      height: 60px;

      // background-color: rgba(0, 0, 0, 0); // 透明背景
      background-color: transparent;
      position: relative;
      margin: 20px auto;
      border-radius: 28px;
      background-color: #fff;
      opacity: 0.6;
      .SouInput {
        width: 80%;
        height: 58px;

        border: 0; // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        // border: 1px solid #e67e22;
        margin: auto;
        display: block;
      }
      .SouInput :focus {
        color: yellow;
      }
      .leftIcon {
        // border-radius: 25px;
        width: 80px;
        height: 62px;
        background: #306cff;
        position: absolute;
        left: 0;
        top: 0;
        // bottom: 0;
        border-top-left-radius: 25px; //左上角
        -webkit-mask: url("../assets/img/baidu.svg") no-repeat 50% 50%;

        mask: url("../assets/img/baidu.svg") no-repeat 50% 50%;

        border-bottom-left-radius: 27px; //左下角
      }
      .rightIcon {
        width: 80px;
        height: 60px;
        background-color: #fff;

        position: absolute;
        right: 0;
        top: 0;
        border-bottom-right-radius: 25px; //左下角
        border-top-right-radius: 27px; //左下角
        line-height: 62px;
        text-align: center;
      }
      .rightIconDel {
        width: 40px;
        height: 60px;
        background-color: #fff;

        position: absolute;
        right: 80px;
        top: 0;
        border-bottom-right-radius: 25px; //左下角
        border-top-right-radius: 27px; //左下角
        line-height: 62px;
        text-align: center;
      }
      .rightIconDel:hover {
        cursor: pointer;
      }
      .rightIcon:hover {
        // background-color: #498ef0;
        cursor: pointer;
      }
      .bottomSouData {
        position: absolute;
        top: 69px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 9;
        // border: 1px solid red;
        height: 100px;

        ul {
          list-style: none;
          background: #fff;
          border-radius: 25px;

          li {
            width: 100%;
            height: 30px;
            // border: 1px solid red;
            line-height: 30px;
          }
          li:hover {
            color: #1882ff;
            // background: red;
            cursor: pointer;
            // transition-delay: 0.05s;
            transform: translateX(10px);
            // box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.3);
          }
          .delDom:hover {
            color: red;
          }
        }
      }
    }

    .bottomSou :focus {
      background-color: #fff;
    }
  }

  .navCard {
    // border: 1px solid red;
    grid-column: 1/5;
    grid-row: 3/7;

    .navMenu {
      // border: 1px solid red;
      margin: auto;
      width: 77%;
      height: 95%;
      // overflow-x: hidden;
      overflow-y: scroll;

      // background: red;
      .box-card {
        // width: 160px;
        // height: 140px;
        float: left;
        margin: 20px;
        text-align: center;
        background: #fff;
        border-radius: 25px;
        padding: 15px !important;
        opacity: 0.7;
      }

      .box-card:hover {
        opacity: 1 !important;
        cursor: pointer;
      }
    }
  }
  .imgNav {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }
}
</style>
