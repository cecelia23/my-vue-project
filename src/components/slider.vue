<template>
<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
<div class="slide-img">
  <a :href="slides[nowIndex].href">
    <!-- <transition name="slide-trans">
      <img v-if="isShow" :src="slides[nowIndex].src">
    </transition>
    <transition name="slide-trans-old">
      <img v-if="!isShow" :src="slides[nowIndex].src">
    </transition> -->
    <img :src="slides[nowIndex].src">
  </a>
</div>
<h2>{{slides[nowIndex].title}}</h2>
<div class="slide-pages">
  <ul>
    <li @click="goto(prevIndex)">&lt;</li>
    <li v-for="(item, index) in slides" :key="item.id" @click="goto(index)">
      {{ index + 1 }}
    </li>
    <li @click="goto(nextIndex)">&gt;</li>
  </ul>
</div>
</div>
</template>
<script>
export default {
  name: 'slideShow',
  props: {
    slides: {
      type: Array,
      default: () => {
        return []
      }
    },
    Inv: {
      type: Number,
      default: 1000
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  methods: {
    goto (index) {
      this.nowIndex = index
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.Inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  mounted () {
    this.runInv() // 启动页面时就加载
  }
}
</script>

<style>
.slide-trans-enter-active {
  transition:all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition:all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>
