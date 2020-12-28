import Vue from 'vue';
import Router from 'vue-router';

import Auth from './libs/auth';
import Acl from './libs/acl';

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    component: () => import('./pages/Layout'),
    children: [{
            path: '',
            redirect: 'home',
        },
        {
            path: 'home',
            name: 'home',
            component: () => import('./pages/Home'),
        },
        {
            path: 'person',
            name: 'person',
            component: () => import('./pages/person/List'),
        },
        {
            path: 'permission',
            name: 'permission',
            component: () => import('./pages/permission/List'),
        },
        {
            path: 'role',
            name: 'role',
            component: () => import('./pages/role/List'),
        },
        {
            path: 'trip',
            name: 'trip',
            component: () => import('./pages/trip/List'),
        },
        {
            path: 'order',
            name: 'order',
            component: () => import('./pages/order/List'),
        },
        {
            path: 'order/edit',
            name: 'order/edit',
            component: () => import('./pages/order/Edit'),
        },
        {
            path: 'agent',
            name: 'agent',
            component: () => import('./pages/agent/List'),
        },
        {
            path: 'agent/order/:id',
            name: 'agent/order',
            component: () => import('./pages/agent/Order'),
        },
        {
            path: 'resource',
            name: 'resource',
            component: () => import('./pages/resource/List'),
        },
        {
            path: 'resource/history',
            name: 'resource/history',
            component: () => import('./pages/resource/History'),
        },
        {
            name: '404',
            path: '/404',
            component: () => import('./pages/exception/404'),
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // },
    ]
}, {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login'),
}]

const router = new Router({
    mode: 'history',
    scrollBehavior(to) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes
})

router.beforeEach((to, _from, next) => {
    document.title = to.meta && to.meta.title || '报单系统';
    if (to.name != 'login') {
        Promise.all([
            Auth.check(),
            Acl.check(),
        ]).then(() => {
            next()
        }).catch(() => {
            next({
                name: 'login'
            })
        })
    } else {
        next()
    }
})

export default router