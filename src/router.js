import {createRouter, createWebHistory } from 'vue-router';

import UpdateTodo from "@/pages/UpdateTodo";
import AddTodo from "@/pages/AddTodo";
import NotFound from "@/components/NotFound";
import itemsTodo from "@/components/ItemsTodo";

const router= createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home', name:'home', component:itemsTodo},
        {path:'/update/:id', name:'update', component:UpdateTodo},

        {path:'/add', name:'add',component:AddTodo},

        {path:'/:notFound(.*)',component:NotFound}
    ],
})

export default router;