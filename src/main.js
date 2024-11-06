import './style/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Home from './pages/Home.vue'
import Post from './pages/UpdatePost.vue'
import Page2 from './pages/page2.vue'
import Page3 from './pages/page3.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/post/:postID?', name: 'post',component: Post },
    { path: '/page2', name: 'page2',component: Page2 },
    { path: '/page3', name: 'page3',component: Page3 },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')