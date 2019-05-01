<template>
<div>
  <span>this is little bro</span>
  <input type="text" v-model="bro2">
</div>
</template>
<script>
import eventBus from '../eventBus'
export default{
  data () {
    return {
      bro2: ''
    }
  },
  mounted () {
    eventBus.$on('bad-man-comes', (params) => {
      // console.log(params)
      this.bro2 = params
    })
  }
}
</script>
