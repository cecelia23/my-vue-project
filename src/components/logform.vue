<template>
<div class="login-form">
  <div class="g-form">
    <div class="g-form-line">
      <span class="g-form-label">用户名：</span>
      <input type="text" v-model="usernameModel" placeholder="请输入用户名">
      <span class="g-form-error">{{usernameError.errorText}}</span>
    </div>
    <div class="g-form-line">
      <span class="g-form-label">密码：</span>
      <input type="password" v-model="passwordModel">
      <span class="g-form-error">{{passwordError.errorText}}</span>

    </div>
    <div class="g-form-button">
      <button class="button" @click="login">登陆</button>
      <button class="button" @click="cancelLog">取消</button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      flag: ''
    }
  },
  // watch: {
  //  passwordModel (!this.flag,this.flag) {

  //   }
  // },
  computed: {
    usernameError: {
      get: function () {
        let status, errorText
        if (!/@/g.test(this.usernameModel)) {
          status = false
          errorText = '用户名不合法'
        } else {
          status = true
          errorText = ''
        }
        if (this.flag !== 1) {
          errorText = ''
          // this.flag = 1
        }
        return {
          status,
          errorText
        }
      }
      // set: function () {
      //   if (this.flag === 0) {
      //     this.flag = 1
      //   }
      // }
    },
    passwordError () {
      let status, errorText
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码位数错误'
      } else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    login () {
      if (this.usernameError.status === false || this.passwordError.status === false) {
        alert('部分选项未通过')
      } else {
        this.$http.get('api/login').then(
          (res) => {
            // 子组件只负责触发父组件的事件，而实际的处理内容在父组件中完成
            // console.log(res.data)
            this.$emit('has-log', res.data)
          },
          (error) => {
            console.log(error)
          }
        )
      }
    },
    cancelLog () {
      this.$emit('close-form')
    }
  }
}
</script>
<style scoped>
.g-form-error{
  color:red;
  margin-left:20px;
}
</style>
