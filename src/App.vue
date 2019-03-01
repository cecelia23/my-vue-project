<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="getParam">click</button>
    <p></p>
    <transition>
      <!-- 使用keep-alive标签进行缓存 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- <p>{{$route.params.color}}</p> -->
    <router-link :to="{path: '/apple/red'}">to red apple</router-link>
    <router-link :to="{path: '/banana'}">to banana</router-link>
    <router-link :to="{name: 'applePage'}">to apple2</router-link>

  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    getParam () {
      console.log(this.$route.params)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
