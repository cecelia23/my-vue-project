<template>
<div>
  <div class="sales-intro">
    <h2>数量预测</h2>
    <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
  <div class="sales-board-form">
    <!-- 插入子组件 -->
    <v-selection :selection="productType" @on-change="selected"></v-selection>
  </div>
  </div>
  <div class="sales-intro"></div>
</div>
</template>
<script>
import VSelection from '../../components/selection'
export default {
  components: {
    VSelection
  },
  data () {
    return {
      productType: [
        {
          label: 'A',
          value: 0
        },
        {
          label: 'B',
          value: 10
        },
        {
          label: 'C',
          value: 20
        }
      ]
    }
  },
  methods: {
    selected (param) {
      console.log(param)
    }

  }

}
</script>
<style>

</style>
