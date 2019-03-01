<template>
  <div class="order-wrap">
    <div class="order-list-container">选择产品：
      <v-selection :selection="productList" @on-change="changeParams('product',$event)"></v-selection>
    </div>
    <div class="order-list-container">选择产品2：
      <v-selection :selection="productList" @on-change="changeParams('product',$event)"></v-selection>
    </div>
    <div class="order-list-container">开始时间：
           <!-- <date-picker min="2017-8-16"
             @close="isShow = false"
             v-if="isShow"
             v-model="date"></date-picker> -->
      <datepicker :readonly="true" :value="startDate" format="YYYY-MM-DD" name="startdate" @on-change="changeStartDate"></datepicker>
    </div>
    <div class="order-list-container">结束时间：
      <datepicker :readonly="true" :value="endDate" format="YYYY-MM-DD" name="enddate" @on-change="changeEndDate"></datepicker>
    </div>
    <div class="order-list-container">关键词：
      <input type="text" v-model.lazy="keyword">
    </div>
    <table class="order-list-table">
      <tr class="order-list-head">
        <th v-for="head in headList" :key="head.id" @click="changeOrder(head)" :class="{active:head.active}">{{head.label}}</th>
      </tr>
      <tr v-for="item in tableList" :key="item.id">
        <td v-for="head in headList" :key="head.id" >{{item[head.key]}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import vSelection from '../components/selection'
import datepicker from 'vue-date-picker'

import _ from 'lodash'

export default{
  data () {
    return {
      product: '',
      keyword: '',
      startDate: '',
      endDate: '',
      isShow: true,
      productList: [
        {
          label: '数据统计',
          url: 'http://starcraft.com'
        },
        {
          label: '数据预测',
          url: 'http://warcraft.com'
        },
        {
          label: '流量分析',
          url: 'http://overwatch.com'
        },
        {
          label: '广告发布',
          url: 'http://hearstone.com'
        }
      ],
      headList: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ]
      // tableList: []
    }
  },
  computed: {
    tableList () {
      return this.$store.getters.getOrderList
    }
  },
  components: {
    vSelection,
    datepicker
  },
  methods: {
    changeParams (attr, val) {
      // this[attr] = val.label
      // this.getList()
      // 更新参数
      this.$store.commit('updateParams', {
        key: 'product',
        value: val.label
      })
      // 用新的state对象参数去请求数据
      this.$store.dispatch('fetchOrderList')
    },
    changeStartDate (date) {
      this.startDate = date
      console.log(this.startDate)
      this.getList()
    },
    changeEndDate (date) {
      this.endDate = date
      console(this.endDate)
      this.getList()
    },
    getList () {
      let reqParam = {
        product: this.product,
        keyword: this.keyword,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$http.post('/api/orderList', reqParam)
        .then((res) => {
          // console.log(res.data.list)
          this.tableList = res.data.list
        }, (err) => {
          console.log(err)
        })
    },
    changeOrder (headItem) {
      this.headList.map((item) => {
        item.active = false
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      } else {
        this.currentOrder = 'asc'
      }
      this.tableList = _.orderBy(this.tableList, headItem.key, this.currentOrder)
    }

  },
  mounted () {
    // this.getList()
    this.$store.dispatch('fetchOrderList')
    // console.log(this.$store)
  },
  watch: {
    keyword () {
      this.getList()
    }
  }
}
</script>
<style scoped>
/* .order-wrap{
  width:100%;
  position:fixed;
  background: tomato;
} */
.order-list-container{
  display:inline-block;
  margin:20px 30px ;
  padding:2px 5px;
  line-height: 1.8;
}
.order-list-table{
  position:absolute;
  left:50%;
  width:800px;
  margin-left:-400px;
}
.order-list-head th.active{
  background:#4fc08d;
  color:#fff;
}
.order-list-head th{
  background: #444;
  color:yellow;
}
.order-list-head th{
  padding:5px 20px;
  width:auto;
  text-align:center;
}
td{
  padding:5px 20px;
  border:1px solid black;
  text-align: center;
}
</style>
