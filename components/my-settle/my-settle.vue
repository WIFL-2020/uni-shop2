<template>
	<view class="my-settle-container">
    <!-- 全选状态 -->
      <label class="radio" @click="changeAllState">
        <radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
      </label>
      
      <!-- 合计区域 -->
      <view class="amount-box">
        <view class="amount">合计:￥{{checkedGoodsAmount}}</view>
      </view>
      
      <!-- 结算按钮 -->
      <view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed:{
      // 将total映射到当前组件
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      // 是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods:{
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      changeAllState() {
        // 修改购物车中所有商品的选中状态
        // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        this.updateAllGoodsState(!this.isFullCheck)
      }
    }
	}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: cyan;
 // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  
  .radio {
      display: flex;
      align-items: center;
    }
  
    .amount {
      color: #c00000;
    }
  
    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
 }
</style>
