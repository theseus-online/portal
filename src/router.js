import VueRouter from 'vue-router';
import Wip from './components/wip.vue';
import User from './components/user.vue';
import Deployment from './components/deployment.vue';
import NewDeployment from './components/new-deployment.vue';
import DelDeployment from './components/del-deployment.vue';

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
                     component: Wip,
                 },
                 {
                     name: "ingress",
                     path: "ingresses",
                     component: Wip,
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
                     component: Wip,
                 },
                 {
                     name: "new-ingress",
                     path: "new-ingress",
                     component: Wip,
                 },
                 {
                     name: "del-deployment",
                     path: ":depname/delete",
                     component: DelDeployment,
                 }
             ]
         }
    ]
})
