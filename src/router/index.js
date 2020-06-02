import Vue from 'vue';
import VueRouter from 'vue-router';
if (!window.VueRouter) Vue.use(VueRouter)
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
]
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router