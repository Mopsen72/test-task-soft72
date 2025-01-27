import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "root",
        redirect: "books",
        component: async () => import("../../pages/layoutPage.vue"),
        children: [
            {
                path: "books",
                name: "books",
                component: async () => import("../../pages/BooksListPage.vue"),
                children: [
                    {
                        path: "/:bookId",
                        name: "books-id",
                        component: async () => import("../../pages/BookModalPage.vue")
                    }
                ]
            },
            {
                path: "me", name: "me", component: async () => import("../../pages/AboutMePage.vue")
            }
        ]
    },

]

export const router: Router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "active",
    linkActiveClass: "active",
})