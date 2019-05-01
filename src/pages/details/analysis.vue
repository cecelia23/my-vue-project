<template>
<div class="submit-form">
  <table>
    <tr>
      <td class="first-col">数量：</td>
      <td class="second-col"><v-counter :min="minNum" :max="maxNum" @on-change="changeParams('buyNum',$event)"></v-counter></td>
    </tr>
    <tr>
      <td class="first-col">产品类型：</td>
      <td class="second-col"><v-selection :selection="buyTypes" @on-change="changeParams('buyType', $event)"></v-selection></td>
    </tr>
    <tr>
      <td>有效时间：</td>
      <td><chooser :selection="periodList" @on-change="changeParams('period',$event)"></chooser></td>
    </tr>
    <tr>
      <td>产品版本：</td>
      <td><choose-multi :selection="versionList" @on-change="changeParams('versions',$event)"></choose-multi></td>
    </tr>
    <tr>
      <td>总价：</td>
      <td>{{price}}元</td>
    </tr>
    <tr>
      <td colspan="2" class="button-col">
        <button class="button" @click="payDialogShow">立即购买</button>
      </td>
    </tr>
  </table>
  <!--弹窗1 -->
  <my-dialog :is-show="isShowPayDialog" @on-close="payDialogClose">
    <table class="dialog-table">
      <tr>
      <th>数量</th>
      <th>产品类型</th>
      <th>有效时间</th>
      <th>产品版本</th>
      <th>总价</th>
      </tr>
      <tr>
        <td>{{buyNum}}</td>
        <td>{{buyType.label}}</td>
        <td>{{period.label}}</td>
        <td>
          <span v-for="item in versions" :key="item.id">{{item.label}}</span>
        </td>
        <td>{{price}}</td>
      </tr>
    </table>
    <h2>请选择银行：</h2>
    <bank-chooser @on-chosen="onChosenBank"></bank-chooser>
    <button class="button" @click="comfirmBuy">确认购买</button>
  </my-dialog>
  <check-order :isShowCheckOrder="isShowCheckOrder" :orderId="orderId" @on-close-check="closeCheck"></check-order>
</div>
</template>
<script>
import vSelection from '../../components/selection'
import chooser from '../../components/chooser'
import chooseMulti from '../../components/chooseMulti'
import vCounter from '../../components/counter'
import myDialog from '../../components/dialog'
import bankChooser from '../../components/bank'
import checkOrder from '../../components/checkorder'
import _ from 'lodash'

export default{
  components: {
    chooser,
    chooseMulti,
    vCounter,
    vSelection,
    myDialog,
    bankChooser,
    checkOrder
  },
  data () {
    return {
      minNum: 1,
      maxNum: 50,
      buyNum: 1,
      buyType: {},
      versions: [],
      period: {},
      price: 0,
      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        }
      ],
      versionList: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
      ],
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      // nowIndex: new Set(),
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
      ],
      isShowPayDialog: false,
      isShowCheckOrder: false,
      bankId: 0,
      orderId: 0
    }
  },
  methods: {
    changeParams (attr, val) {
      this[attr] = val
      // console.log(this[attr], attr)
      this.getPrice()
    },
    getPrice () {
      let buyVersions = _.map(this.versions, (item) => {
        // console.log(item.label)
        return item.label
      })
      let resParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        versions: buyVersions.join(',')
      }
      this.$ajax.post('/api/getPrice', resParams).then((res) => {
        this.price = res.data.amount
      }, (err) => {
        console.log(err)
      })
      // this.$http.post('/api/getPrice', resParams).then((res) => {
      //   this.price = res.data.amount
      // }, (err) => {
      //   console.log(err)
      // })
    },
    payDialogClose () {
      this.isShowPayDialog = false
    },
    payDialogShow () {
      this.isShowPayDialog = true
    },
    onChosenBank (param) {
      this.bankId = param
      // console.log(param)
    },
    comfirmBuy () {
      let buyVersions = _.map(this.versions, (item) => {
        // console.log(item.label)
        return item.label
      })
      let resParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        versions: buyVersions.join(','),
        bankId: this.bankId
      }
      // this.$http.post('/api/createOrder', resParams).then((res) => {
      //   this.orderId = res.data.orderId
      //   this.isShowCheckOrder = true
      //   this.isShowPayDialog = false
      //   console.log(this.orderId)
      // }, (err) => {
      //   console.log(err)
      // })
      this.$ajax.post('/api/createOrder', resParams).then((res) => {
        this.orderId = res.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
        console.log(this.orderId)
      }, (err) => {
        console.log(err)
      })
    },
    closeCheck () {
      this.isShowCheckOrder = false
    }
  },
  mounted () {
    this.buyNum = 1
    this.buyType = this.buyTypes[0]
    this.versions = [this.versionList[0]]
    this.period = this.periodList[0]
    this.getPrice()
  }
}
</script>
<style>
.submit-form{
  margin-left:20px;
}
table{
  line-height:38px;
}
.first-col{
  width:100px;
}
.second-col{
  width:auto;
  text-align:left;
}
.button-col{
  text-align:center
}

.submit-form > div{
  /* padding:20px; */
  margin-bottom:20px;
}
.price >span{
  padding:20px;
 }
.dialog-table th{
padding:2px 10px;
font-weight:bold;
 }
.dialog-table td{
padding:2px 10px;
 }
 .dialog-table td span{
padding:0px 5px;
 }
</style>
