import { createRouter, createWebHistory } from "vue-router"
import About from "@/components/about/About.vue"
import addEntity from "@/components/addEntity/addEntity.vue"
import Dashboard from "@/components/dashboard/Dashboard.vue"
import Home from "@/views/Home.vue"


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/about",
        name: "about",
        component: About
      },
      {
        path: "/newEntity",
        name: "newEntity",
        component: addEntity
      }
      // {
      //   path: "/rooms",
      //   name: "rooms",
      //   component: Rooms
      // }
    ]
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "dashboard" }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
