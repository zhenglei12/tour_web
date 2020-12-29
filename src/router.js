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
            meta: {
                group: 'user',
                acl: 'user-list',
            },
        },
        {
            path: 'permission',
            name: 'permission',
            component: () => import('./pages/permission/List'),
            meta: {
                group: 'user',
                acl: 'permission-list',
            },
        },
        {
            path: 'role',
            name: 'role',
            component: () => import('./pages/role/List'),
            meta: {
                group: 'user',
                acl: 'role-list',
            },
        },
        {
            path: 'trip',
            name: 'trip',
            component: () => import('./pages/trip/List'),
            meta: {
                acl: 'trip-list',
            },
        },
        {
            path: 'order',
            name: 'order',
            component: () => import('./pages/order/List'),
            meta: {
                acl: 'order-list',
            },
        },
        {
            path: 'order/edit',
            name: 'order/edit',
            component: () => import('./pages/order/Edit'),
            meta: {
                acl: 'order-add',
            },
        },
        {
            path: 'agent',
            name: 'agent',
            component: () => import('./pages/agent/List'),
            meta: {
                acl: 'agent-list',
            },
        },
        {
            path: 'agent/order/:id',
            name: 'agent/order',
            component: () => import('./pages/agent/Order'),
            meta: {
                acl: 'agent-order.list',
            },
        },
        {
            path: 'resource',
            name: 'resource',
            component: () => import('./pages/resource/List'),
            meta: {
                acl: 'resources-list',
            },
        },
        {
            path: 'resource/history',
            name: 'resource/history',
            component: () => import('./pages/resource/History'),
            meta: {
                acl: 'resources-distribute.list',
            },
        },
        {
            path: '/403',
            name: '403',
            component: () => import('./pages/exception/403'),
        },
        {
            path: '/404',
            name: '404',
            component: () => import('./pages/exception/404'),
        },
        {
            path: '*',
            redirect: '/404'
        },
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
            console.log(to);
            if (to.meta && to.meta.acl && !Acl.verify(to.meta.acl)) {
                next({
                    name: '403'
                });
            } else {
                next();
            }
        }).catch(() => {
            next({
                name: 'login'
            });
        })
    } else {
        next();
    }
})

export default router;