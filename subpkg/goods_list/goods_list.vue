<template>
	<view>
		<view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 请求参数对象
				queryObj: {
          // 查询关键字
          query: '',
          // 分类ID
          cid: '',
          // 页数索引
          pagenum: 1,
          // 每页长度
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量,用来实现页面分页
        total: 0,
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
         // 是否正在请求数据
        isloading: false
			};
		},
    // 将页面跳转过来的数据接收
    onLoad(option) {
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      // console.log(this.queryObj.query, this.queryObj.cid)
      this.getGoodsList()
    },
    methods:{
      async getGoodsList(cb){
        // 打开节流阀
        this.isloading = true
        const { data:res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isloading = false
        
        cb && cb()
        
        if (res.meta.status !== 200) return uni.$showMsg()
        // this.goodsList = res.message.goods
        // 进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
        })
      }
    },
    // 上拉加载事件
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完成')
      if (this.isloading) return
       // 让页码值自增 +1
      this.queryObj.pagenum += 1
      // 重新获取数据
      this.getGoodsList()
    }
	}
</script>

<style lang="scss">
// .goods-item {
//   display: flex;
//   padding: 10px 5px;
//   border-bottom: 1px solid #f0f0f0;

//   .goods-item-left {
//     margin-right: 5px;

//     .goods-pic {
//       width: 100px;
//       height: 100px;
//       display: block;
//     }
//   }

//   .goods-item-right {
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;

//     .goods-name {
//       font-size: 13px;
//     }

//     .goods-price {
//       font-size: 16px;
//       color: #c00000;
//     }
//   }
// }
</style>
