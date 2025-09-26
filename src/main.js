import { createApp } from 'vue'

import '@/assets/styles/index.scss' // global css
import App from './App'
import mitt from 'mitt'
import store from './store'
import router from './router'
import http from './utils/http' // 模块化引入api
// 注册指令
import plugins from './plugins' // plugins

// svg图标
import 'virtual:svg-icons-register'
import elementIcons from '@/components/SvgIcon/svgicon'
import './permission' // permission control
const app = createApp(App)
const eventBus = mitt()
// 全局方法挂载
app.config.globalProperties.$http = http
app.config.globalProperties.$eventBus = eventBus
app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)

app.mount('#app')
