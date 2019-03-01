<template>
<div class="count-wrap">
  <div class="add-minus" @click="minus">
    <span>-</span>
  </div>
  <div class="input-number">
    <input type="text" v-model="number" @keyup="fixNumber" :placeholder="number">
  </div>
  <div class="add-minus" @click="add">
    <span>+</span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 10
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      number: this.min
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  },
  methods: {
    add () {
      if (this.number >= this.max) {
        return
      }
      this.number++
    },
    minus () {
      if (this.number <= this.min) {
        return
      }
      this.number--
    },
    fixNumber () {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g, ''))
      } else {
        fix = this.number
      }
      if (fix < this.min || fix > this.max) {
        fix = this.min
      }
      this.number = fix
    }
  }
}
</script>

<style>
.count-wrap{
  display:inline-block;
  }
.add-minus{
  display:inline-block;
  padding:2px;
}
.input-number{
  display:inline-block;
 }
.input-number input{
  display:inline-block;
  width:44.8px;
  text-align:center;
}
</style>
