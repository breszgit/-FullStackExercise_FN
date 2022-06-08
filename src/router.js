//--Global--
import { createWebHistory, createRouter } from "vue-router"

//--Layout--
import MainLayout from "@/layouts/MainLayout";
import MemberLayout from "@/layouts/MemberLayout";

//--Pages--
const LoginPage =()=> import("@/pages/loginPage");
const TasksPage =()=> import("@/pages/tasksPage");

//--GroupPage--
let mainPages = {
    path:'/',
    component: MainLayout,
    name:'LoginPage',
    children:[
        {
            path: '/',
            name: 'A',
            component: LoginPage
        }
    ]
}

let memberPages ={
    path:'/Tasks',
    component: MemberLayout,
    name:'Tasks',
    children:[
        {
            path: '/Tasks',
            name: 'Tasks',
            component: TasksPage
        }
    ]
}

//--Routes--
const routes = [
    mainPages
    ,memberPages
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;