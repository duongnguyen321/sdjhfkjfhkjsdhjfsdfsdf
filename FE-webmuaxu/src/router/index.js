import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';

const isAuthenticated = () => {
    return !!Cookies.get('user');
}

const isAuthenticatedAdmin = () => {
    return !!Cookies.get('admin');
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../layout/LayoutUser.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('../views/User/HomeView.vue')
                },
                {
                    path: '/trade',
                    name: 'trade',
                    component: () => import('../views/User/TradeView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/find',
                    name: 'find',
                    component: () => import('../views/User/FindOrdef.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/qanda',
                    name: 'qanda',
                    component: () => import('../views/User/QAndA.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/catalog',
                    name: 'catalog',
                    component: () => import('../views/User/Catalog.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/news',
                    name: 'news',
                    component: () => import('../views/User/News.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/login',
                    name: 'user-login',
                    component: () => import('../views/User/Login.vue')
                },
                {
                    path: '/signup',
                    name: 'signup',
                    component: () => import('../views/User/SignUp.vue')
                },
                {
                    path: '/socket',
                    name: 'socket',
                    component: () => import('../views/TestSocket/Socket.vue')
                },
                {
                    path: '/transaction',
                    name: 'transaction',
                    component: () => import('../views/User/Transaction.vue'),
                    props: route => ({ value: route.query.value }),
                    meta: { requiresAuth: true }
                },
            ]

        },
        {
            path: '/admin',
            component: () => import('../layout/LayoutAdmin.vue'),
            children: [
                {
                    path: 'login',
                    name: 'admin-login',
                    component: () => import('../views/Admin/AdminLogin.vue')
                },
                {
                    path: 'setting',
                    name: 'setting-web',
                    component: () => import('../views/Admin/SettingWeb.vue'),
                    meta: { requiresAuth: true, adminOnly: true }
                },
                {
                    path: 'history',
                    name: 'history-order',
                    component: () => import('../views/Admin/HistoryOder.vue'),
                    meta: { requiresAuth: true, adminOnly: true }
                },
                {
                    path: 'coin',
                    name: 'coin',
                    component: () => import('../views/Admin/ListCoin.vue'),
                    meta: { requiresAuth: true, adminOnly: true }
                },
                {
                    path: 'bank',
                    name: 'bank',
                    component: () => import('../views/Admin/ListBank.vue'),
                    meta: { requiresAuth: true, adminOnly: true }
                },
                {
                    path: 'evaluate',
                    name: 'evaluate',
                    component: () => import('../views/Admin/ListEvaluate.vue'),
                    meta: { requiresAuth: true, adminOnly: true }
                },
                {
                    path: 'transaction',
                    name: 'transactionAdmin',
                    component: () => import('../views/Admin/ListTransaction.vue'),
                    meta: { requiresAuth: true, adminOnly: true }
                },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some(record => record.meta.adminOnly);
    const isLoggedIn = isAuthenticated();
    const isAdminLoggedIn = isAuthenticatedAdmin();
    const nonAuthRoutes = ['user-login', 'signup'];
    const adminNonAuthRoutes = ['admin-login'];

    if (isLoggedIn && nonAuthRoutes.includes(to.name)) {
        next({ name: 'home' });
    } else if (isAdminLoggedIn && adminNonAuthRoutes.includes(to.name)) {
        next({ name: 'setting-web' });
    } else if (requiresAuth && !isLoggedIn && !requiresAdmin) {
        next({ name: 'user-login' });
    } else if (requiresAdmin && !isAdminLoggedIn) {
        next({ name: 'admin-login' });
    } else {
        next();
    }
})

export default router
