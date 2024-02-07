<template>
    <div>
        <div class="card">
            <DataView :value="partners" paginator :rows="6">
                <template #list="">
                    <div class="grid grid-nogutter">
                        <div v-for="(partner, index) in partners" :key="index" class="col-12 border">
                            <div class="flex flex-col sm:flex-row sm:items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                                <div class="md:w-5rem relative">
                                    <img :src="`https://drive.google.com/thumbnail?id=${partner?.logo}`" :alt="partner?.logo" />
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-secondary text-sm">{{ partner.partner_company_name }}</span>
                                            <div class="text-lg font-medium text-900 mt-2">{{ partner.partner_company_name }}</div>
                                        </div>
                                        <div class="surface-100 p-1" style="border-radius: 30px">
                                            <div class="surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                <span class="text-900 font-medium text-sm">{{ partner.partner_company_name }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-5">
                                        <span class="text-xl font-semibold text-900">${{ partner.partner_company_name }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

onMounted(async()=>{
    await getPartners()
})

const loading = ref(false)
const partners = ref()
const selectedPartner = ref({})

const getPartners = async () => {
    loading.value = true
    try {
        const response = await axios.get(`https://api.nbadigital.tech/v1/Backend-Partner/partner`)
        if(response.data){
            partners.value = response.data.data
            console.log(partners.value)
        } else {
            partners.value = []
        }
    }
    catch(err){
        console.log(err)
    }
    finally {
        loading.value = false
    }
}
const getPartner = async () => {
    try {
        const response = await axios.get(`https://api.nbadigital.tech/v1/Backend-Partner/partner/byid/${id}`)
        if(response.data.status){
            partner.value.name = response.data.data.partner_company_name
            partner.value.taxId = response.data.data.partner_company_number
            partner.value.address = response.data.data.partner_company_address
            partner.value.signature = response.data.data.signature
        }
    }
    catch(err){
        console.log(err)
    }
}
</script>
<style scoped>
 
</style>