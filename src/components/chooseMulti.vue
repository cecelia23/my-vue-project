<template>
  <div class="selection">
    <span v-for="(item,index) in selection" :key="item.id" @click="chosen(index)"
    :class="{active:checkIndex(index)}">{{item.label}}</span>
  </div>
</template>
<script>
import _ from 'lodash'
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
      // nowIndex: new Set([0,])
      nowIndex: []
    }
  },
  methods: {
    chosen (index) {
      // console.log(this.nowIndex)
      // if (this.nowIndex.has(index))
      // {
      //   this.nowIndex.delete(index)
      // }else{
      //   this.nowIndex.add(index)
      // }
      if (this.nowIndex.indexOf(index) === -1) {
        this.nowIndex.push(index)
        // console.log(this.nowIndex)
      } else {
        this.nowIndex = _.remove(this.nowIndex, (idx) => {
          return idx !== index
        })
      }
      let nowArray = _.map(this.nowIndex, (idx) => {
        // console.log(idx)
        return this.selection[idx]
      })
      this.$emit('on-change', nowArray)
    },
    checkIndex (index) {
      // console.log(this.nowIndex.indexOf(index) !== -1)
      return this.nowIndex.indexOf(index) !== -1
      // console.log(this.nowIndex.has(index))
      // return this.nowIndex.has(index)
    }
  }
}
</script>
<style scoped>
.selection{
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
