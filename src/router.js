import VueRouter from 'vue-router';
import Wip from './components/wip.vue';
import Test from './components/test.vue';
import User from './components/user.vue';
import Deployment from './components/deployment.vue';
import NewDeployment from './components/new-deployment.vue';
import DelDeployment from './components/del-deployment.vue';
import Service from './components/service.vue';
import NewService from './components/new-service.vue';
import DelService from './components/del-service.vue';
import Ingress from './components/ingress.vue';
import NewIngress from './components/new-ingress.vue';
import DelIngress from './components/del-ingress.vue';

export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: Wip,
        },
        {
            name: 'tutorial',
            path: '/tutorial',
            component: Wip,
        },
        {
            name: 'about',
            path: '/about',
            component: Wip,
        },
        {
             name: 'user',
             path: '/users/:username',
             component: User,
             children: [
                 {
                     name: "deployment",
                     path: "deployments",
                     component: Deployment,
                 },
                 {
                     name: "service",
                     path: "services",
                     component: Service,
                 },
                 {
                     name: "ingress",
                     path: "ingresses",
                     component: Ingress,
                 },
                 {
                     name: "volume",
                     path: "volumes",
                     component: Wip,
                 },
                 {
                     name: "new-deployment",
                     path: "new-deployment",
                     component: NewDeployment,
                 },
                 {
                     name: "new-service",
                     path: "new-service",
                     component: NewService,
                 },
                 {
                     name: "new-ingress",
                     path: "new-ingress",
                     component: NewIngress,
                 },
                 {
                     name: "del-deployment",
                     path: "deployments/:depname/delete",
                     component: Wip,
                 },
                 {
                     name: "del-service",
                     path: "services/:svcname/delete",
                     component: DelService,
                 },
                 {
                     name: "del-ingress",
                     path: "ingresses/:ingname/delete",
                     component: DelIngress,
                 },
             ]
         }
    ]
})
