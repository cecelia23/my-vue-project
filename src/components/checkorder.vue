<template>
  <div>
    <my-dialog :isShow="isShowCheckOrder" @on-close="checkOrder(orderId)">
      <h2>请确认支付状态：</h2>
      <button class="button" @click="checkOrder(orderId)">支付成功</button>
      <button class="button" @click="goFailPage">支付失败</button>
    </my-dialog>
    <my-dialog :isShow="isShowPaySuccess" @on-close="toOrderList">支付成功，请关闭页面</my-dialog>
    <my-dialog :isShow="isShowPayFail" @on-close="toOrderList">支付失败，余额不足</my-dialog>
  </div>
</template>
<script>
import myDialog from './dialog'
export default {
  props: {
    isShowCheckOrder: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: [Number, String]
    }
  },
  components: {
    myDialog
  },
  data () {
    return {
      isShowPaySuccess: false,
      isShowPayFail: false
    }
  },
  methods: {
    checkOrder (orderId) {
      this.$http.post('/api/checkOrder', {
        orderId: this.orderId
      }).then((res) => {
        this.isShowPaySuccess = true
        this.$emit('on-close-check')
      },(err) => {
        this.isShowFailDialog = true
        this.$emit('on-close-check')
      })
    },
    goFailPage () {
      this.isShowPayFail = true
      this.$emit('on-close-check')
    },
    toOrderList () {
      this.$router.push({path: '/order'})
    }
    // closePaySuccess () {
    //   // this.isShowPaySuccess = false
    //   // 组件跳转
    //   this.$router.push({path: '/order'})
    // },
    // closePayFail () {
    //   // this.isShowPayFail = false
    //   this.$rounter.push({path: '/order'})
    // }
  }
}
</script>
<style scoped>

</style>
