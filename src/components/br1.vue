<template>
<div>
  <span>this is big bro</span>
  <input type="text" v-model="bro1">
  <button @click="sendMsg">click to send to bro2</button>
</div>
</template>
<script>
import eventBus from '../eventBus.js'
export default{
  data () {
    return {
      bro1: ''
    }
  },
  methods: {
    sendMsg () {
      eventBus.$emit('bad-man-comes', this.bro1)
    }
  }
}
</script>
