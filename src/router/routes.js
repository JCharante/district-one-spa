
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '/event/:eventcode', component: () => import('pages/EventView.vue'), props: true, name: 'EventView' },
            { path: '/team/:teamNumber', component: () => import('pages/TeamView.vue'), props: true, name: 'TeamView' },
            { path: '', component: () => import('pages/Index.vue') },
        ],
    },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue'),
    });
}

export default routes;
