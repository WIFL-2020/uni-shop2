<template>
	<view>
    <!-- 搜索框组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <!-- 循环渲染轮播图的 item 项 -->
		  <swiper-item v-for="(item,i) in swiperList" :key="i">
		    <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
		  </swiper-item>
		</swiper>
    
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
    <!-- 楼层区域 -->
    <!-- 楼层的容器 -->
    <view class="floor-list">
      <!-- 每一层的item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧的大图片盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧的4个小图片盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !==0" :url="item2.url">
              <image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 轮播图的数据列表,默认为空数组
         swiperList: [],
         // 获取导航列表数据的方法
         navList: [],
         // 获取楼层列表数据
         floorList: []
			}
		},
    onLoad() {
      // 在小程序加载的时候,调用获取轮播图的方法
      this.getSwiperList(),
      // 获取分类列表数据列表
      this.getNavList()
      // 获取楼层的数据的方法
      this.getFloorList()
    },
    methods:{
      async getSwiperList() {
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        //   {return uni.showToast({
        //     title: '数据请求失败',
        //     duration: 1500,
        //     icon: 'none'
        //   })
        // }
        // 请求成功之后,为swiperList 赋值
        this.swiperList = res.message
        uni.$showMsg('数据加载成功')
      },
      async getNavList() {
        const { data:res } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !==200) return uni.$showMsg()
        this.navList = res.message
      },
      // nav-item被点击的时候触发函数
      navClickHandler(item) {
        // 判断点击的是哪个
        if(item.name === '分类') {
         uni.switchTab({
           url: '/pages/cate/cate'
         })
        }
      },
      // 获取楼层数据的方法
      async getFloorList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        // 通过双重for循环,处理URL地址
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
	}
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
   }
 }
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
      .nav-img {
       width: 128rpx;
       height: 140rpx;
      }
  } 
  .floor-title {
    display: flex;
    height: 60rpx;
    width: 100%;
  }
  .floor-img-box {
    display: flex;
    padding-left: 15rpx;
  }
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .search-box {
    // 粘性定位 达到吸顶效果
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
