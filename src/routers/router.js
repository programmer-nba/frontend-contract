// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContractView from '../views/ContractView.vue'
import PartnersView from '../views/PartnersView.vue'
import ContractPartner from '../components/ContractDocPartner.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  /* {
    path: '/contract',
    name: 'Contract',
    component: ContractView,
  }, */
  {
    path: '/contract/:id',
    name: 'ContractId',
    component: ContractView,
    props: true
  },
  {
    path: '/contract-partner/:id',
    name: 'ContractPartner',
    component: ContractPartner,
    props: true
  },
  {
    path: '/partners',
    name: 'Partners',
    component: PartnersView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router