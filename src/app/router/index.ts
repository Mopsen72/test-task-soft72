import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/", component: async () => import("../../pages/BooksListPage.vue"), children: [
            {path: "/:bookId", component: async () => import("../../pages/BookModalPage.vue")}
        ]
    },
    {
        path: "/me", component: async () => import("../../pages/AboutMePage.vue")
    }
]

export const router: Router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "active",
    linkActiveClass: "active",
})