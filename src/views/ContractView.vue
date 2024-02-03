<template>
    <div>
        <ContarctDoc/>
        <div>
            <div v-if="openForm">
                <ContractFormVue @sentData="createNewContract"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import ContarctDoc from '../components/ContractDoc.vue';
import ContractFormVue from '../components/ContractForm.vue';
import 'primeicons/primeicons.css'
import { ref } from 'vue'

const openForm = ref(false)

</script>

<style scoped>

</style>