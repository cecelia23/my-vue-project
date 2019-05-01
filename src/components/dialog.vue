<template>
    <div>
      <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="dialog-content" v-if="isShow">
          <p class="dialog-close" @click="closeMyself">x</p>
          <slot>empty</slot>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.drop-enter-active{
  /* 动画效果的切换在0.5s内完成 */
  transition:all .5s ease;
}
.drop-leave-active{
  transition:all .3s ease;
}
.drop-enter{
  /* 实现从上方落下 ，开始位置为-500*/
  transform: translateY(-500px);
}
.drop-leave-to{
  /* 实现向上收回 ，结束位置为-500*/
  transform: translateY(-500px);
}
.dialog-wrap {
  position: fixed;
  height:100%;
  width:100%;
}
.dialog-cover{
height:100%;
width:100%;
position:fixed;
top:0;
left:0;
background: #000;
opacity:0.3;
z-index:5;
}
.dialog-content{
width:30%;
max-height:50%;
position:fixed;
top:20%;
left:50%;
margin-left:-15%;
overflow:auto;
background:#fff;
z-index:10;
padding:2%;
border:2px solid #464086;
line-height:1.6;
}
.dialog-close{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: default;
}

</style>
