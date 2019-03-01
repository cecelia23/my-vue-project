<template>
<div class="detail-wrap">
  <div class="detail-left">
    <div class="products">
      <img :src="productsImage">
      <ul>
        <!-- 想要点击实现路由跳转，换成router-link -->
        <router-link v-for="item in products" :key="item.id" :to="item.path"
        tag="li" active-class="active">{{item.name}}</router-link>
        <!-- <li v-for="item in products" :key="item.id">{{item.name}}</li> -->
      </ul>
    </div>
  </div>
  <div class="detail-right">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</div>
</template>
<script>
export default{
  data () {
    return {
      detail: 'hello',
      products: [
        {
          name: '数据统计',
          path: 'count',
          icon: require('../assets/images/1.png'),
          active: false
        },
        {
          name: '数据预测',
          path: 'forecast',
          active: false
        },
        {
          name: '流量分析',
          path: 'analysis',
          active: false
        },
        {
          name: '广告发布',
          path: 'publish',
          active: false
        }
      ],
      imgMap: {
        '/detail/publish': require('../assets/images/1.png'),
        '/detail/count': require('../assets/images/2.png'),
        '/detail/analysis': require('../assets/images/3.png'),
        '/detail/forecast': require('../assets/images/4.png')
      }
    }
  },
  computed: {
    // 页面图标
    productsImage () {
      // console.log(this.imgMap, this.$route.path)
      return this.imgMap[this.$route.path]
    }
  }
}
</script>

<style>
/* 在detail组件中定义了其子组件的样式，所以不能加scoped */
.detail-wrap{
  position:relative;
  width:1200px;
  margin-top:20px;
  margin-left:30px;
}
.detail-left{
  float:left;
  width:200px;
  background:#fff;
  text-align: center;
}

.detail ul{
  margin-top:20px;
}
.detail-left li{
  cursor:pointer;
  padding:10px 5px;
  font-size:12pt;
  text-align:left;
}
.detail-left li.active,
.detail-left li:hover{
  background:#4fc08d;
  color:#fff;
}
.detail-right{
  float:left;
  margin-left:20px;
  width:980px;
}
.sales-board{
  background:#fff;
}
.sales-intro{
  margin-top:20px;
  background:#fff;
}
.sales-intro h2{
  font-size: 20px;
  padding: 20px;
}
.sales-intro p{
  color:gray;
  line-height:1.8;
  padding: 10px 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-des p {
  line-height: 1.6;
}
.sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-des li {
  padding: 5px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}
.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
</style>
