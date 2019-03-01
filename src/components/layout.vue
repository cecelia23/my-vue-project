<template>
<div @click="resetComponents">
  <div class="app-header">
    <div class="app-header-inner">
      <router-link :to="{path:'/'}">
      <!-- 点击图标跳转至首页 -->
        <img src="../assets/logo.png">
      </router-link>
      <div class="header-nav">
        <ul class="nav-list">
          <li>{{username}}</li>
          <li v-if="username!==''" class="nav-pile">|</li>
          <li v-if="username!==''" @click="quit">退出</li>
          <li v-if="username===''" class="nav-pile">|</li>
          <li v-if="username===''" @click="loginClick">登录</li>
          <li v-if="username===''" class="nav-pile">|</li>
          <li v-if="username===''" @click="regClick">注册</li>
          <li  class="nav-pile">|</li>
          <li  @click="aboutClick">关于</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="app-context">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
  <div class="app-footer">
    <p>@ 2019 MIT</p>
  </div>
  <myDialog :isShow="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
    <p>about</p>
  </myDialog>
  <myDialog :isShow="isShowLoginDialog" @on-close="closeDialog('isShowLoginDialog')">
    <log-form @has-log="loginSuccess" @close-form="closeDialog('isShowLoginDialog')"></log-form>
  </myDialog>
  <myDialog :isShow="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
    <reg-form></reg-form>
  </myDialog>
  </div>
</template>

<script>
import { eventBus } from '../eventBus'
import myDialog from './dialog'
import logForm from './logform'
import regForm from './regform'

export default {
  name: 'Layout',
  components: {
    myDialog,
    logForm,
    regForm
  },
  data () {
    return {
      username: '',
      isShowAboutDialog: false,
      isShowLoginDialog: false,
      isShowRegDialog: false
    }
  },
  methods: {
    quit () {
      this.username = ''
    },
    loginClick () {
      this.isShowLoginDialog = true
    },
    regClick () {
      this.isShowRegDialog = true
    },
    aboutClick () {
      this.isShowAboutDialog = true
    },
    closeDialog (param) {
      this[param] = false
    },
    loginSuccess (data) {
      // console.log(data)
      this.username = data.username
      this.closeDialog('isShowLoginDialog')
    },
    resetComponents (event) {
      // 外层点击后，触发事件
      eventBus.$emit('reset-components')
    }
  }
}
</script>

<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-header {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-header-inner {
  width: 1200px;
  margin: 0 auto;
}
.header-logo {
  float: left;
}
.app-header-inner img {
  width: 50px;
  margin-top: 20px;
}
.header-nav {
  float: right;
}
.header-nav ul {
  overflow: hidden;
}
.header-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-footer {
  /* position:absolute; */
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
.app-container {
  /* position: relative; */
  width: 1200px;
  height:1000px;
  margin: 0 auto;
}
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}

.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>
