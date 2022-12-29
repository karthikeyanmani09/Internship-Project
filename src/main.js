import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
Object.keys(AllRules).forEach(rule => {
 defineRule(rule, AllRules[rule]);
});

import {createStore} from "vuex";

const store = createStore({
 state(){
  return{
   users:[],
   id:null,
  }
 },
 /* ?_limit=5*/
 actions:{
  async fetchUsers({ commit }) {
   try {
    const data = await axios.get('https://jsonplaceholder.typicode.com/posts/');
    commit("SET_USERS", data.data);
   } catch (error) {
    alert(error);
    console.log(error);
   }
  },
 },
 mutations:{
  SET_USERS(state, users) {
   state.users = users;
  },
 },
 getters:{
  getUsers(state){
   return state.users;
  }
 }
})

const app = createApp(App)
 app.use(router);
 app.use(store)

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

app.use(VueSweetalert2);

app.mount('#app')
