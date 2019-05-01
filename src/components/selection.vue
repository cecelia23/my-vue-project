<template>
<div class="selection-components">
  <div class="selection-show" @click="toggleDrop">
    <span>{{selection[nowIndex].label}}</span>
    <div class="arrow"></div>
  </div>
  <div class="selection-list" v-if="isDrop">
    <ul>
      <li v-for="(item,index) in selection" :key="item.id" @click="chooseSelection(item,index)">{{item.label}}</li>
    </ul>
  </div>
</div>
</template>
<script>
import eventBus from '../eventBus.js'
export default{
  props: {
    selection: {
      type: Array,
      default: function () {
        return [{
          label: 'test',
          value: 0
        }]
      }
    }
  },
  data () {
    return {
      nowIndex: 0,
      isDrop: false
    }
  },
  mounted () {
    // 内层监听，执行动作，列表收起
    eventBus.$on('reset-components', () => {
      this.isDrop = false
    })
  },
  methods: {
    toggleDrop (event) {
      // 阻止冒泡，不会传到外层
      event.stopPropagation()
      // 其他的selection组件收起
      eventBus.$emit('reset-components')
      this.isDrop = !this.isDrop
    },
    chooseSelection (item, index) {
      this.nowIndex = index
      this.isDrop = false
      this.$emit('on-change', this.selection[index])
    }
  }
}
</script>
<style>
.selection-components{
  display:inline-block;
  position:relative;
}
.selection-show{
  /* position:relative; */
  display:inline-block;
  border:1px solid black;
  border-radius:3px;
  height:25px;
  line-height:25px;
  cursor:pointer;
  padding: 0 10px 0 20px;
}

.selection-show .arrow{
  display:inline-block;
  height:5px;
  border-left:4px solid transparent;
  border-right:4px solid transparent;
  border-top: 5px solid #000;
  margin-left: 12px;
  margin-right:8px;
  margin-top:1px;
  vertical-align: middle;
}
.selection-list{
  position:absolute;
  display:inline-block;
  width:100%;
  top:25px;
  left:0px;
  margin-left:30px;
  background:#fff;
  border-top:1px solid #e3e3e3;
  border-bottom:1px solid #e3e3e3;
  z-index:5;
}
.selection-list li{
  border-left:1px solid red;
  border-right:1px solid red;
  padding:5px 10px;
  background:#fff;
  white-space: nowrap;
  cursor: pointer;
  overflow:hidden;
  text-overflow:ellipsis;
}
.selection li:hover{
  background:#4fc08d;
}
</style>
