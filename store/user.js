export default {
  // 开启命名空间
  namespaced: true,
  
  state: () =>({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      
      
      // 通过持久化存储
      this.commit('m_user/saveAddressToStorage')
    },
   // 1. 定义将 address 持久化存储到本地 mutations 方法
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
  },
  
   // 数据包装器
  getters: {},
}