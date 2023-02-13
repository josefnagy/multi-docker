import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import OtherPageView from "./views/OtherPage.vue";
import HomePage from "./views/HomePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/other",
            name: "other",
            component: OtherPageView,
        },
    ],
});

const app = createApp(App);
app.use(router);

app.mount("#app");
