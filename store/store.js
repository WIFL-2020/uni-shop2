// 导入Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车的vuex模块
import moduleCart from './cart.js'
// 导入用户模块
import moduleUser from './user.js'

// 将Vuex安装为Vue的插件
Vue.use(Vuex)

// 创建 Store 的实例对象
const store = new Vuex.Store({
  // 挂载store模块
  // 挂载购物车的vuex模块,模块内成员被调整为m_cart
  modules: {
    // 挂载购物车的vuex模块
    m_cart: moduleCart,
    // 挂载用户的 vuex 模块，访问路径为 m_user
    m_user: moduleUser,
  },
})

// 向外共享 Store 的实例对象
export default store