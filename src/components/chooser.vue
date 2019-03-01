<template>
<div class="selection-components">
    <div class="selection" >
      <span v-for="(item,index) in selection" :key="item.id"
      :class="{active:index===nowIndex}" @click="chosen(index)">{{item.label}}</span>
  </div>
</div>
</template>
<script>
export default{
  props: {
    selection: {
      type: Array,
      default: function () {
        return [{
          label: 'text',
          value: 8
        }]
      }
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    chosen (index) {
      this.nowIndex = index
      this.$emit('on-change', this.selection[index])
    }
  }
}
</script>
<style>
.selection-components{
  display:inline-block;
}
 .selection span{
display:inline-block;
border:1px solid black;
border-radius:5px;
width:auto;
height:20px;
padding:5px 10px;
text-align: center;
line-height:20px;
margin-top:10px;
margin-right:10px;
}
.selection span:hover,
.selection span.active{
  background:#4fc08d;
  color:#fff;
}
</style>
