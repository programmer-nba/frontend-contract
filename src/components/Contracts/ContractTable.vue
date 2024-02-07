
<template>
    <div class="card">
        <DataView :value="contracts" paginator :rows="6">
            <template #list="">
                <div class="grid grid-nogutter">
                    <div v-for="(contract, index) in contracts" :key="index" class="col-12 border cursor-pointer hover:border-green-400 hover:shadow-md" @click="seeContract(contract)">
                        <div class="flex flex-col sm:flex-row sm:items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div class="md:w-5rem relative">
                                
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-secondary text-sm">{{ contract.contract_code }}</span>
                                        <div class="text-lg font-medium text-900 mt-2 w-60"><p class="truncate">{{ contract.contract_head[0] }}</p></div>
                                    </div>
                                    <div class="surface-100 p-1" style="border-radius: 30px">
                                        <div class="surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-900 font-medium text-sm">{{ contract.contractor.name }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-5">
                                    <span class="text-xl font-semibold text-900">{{ contract.remark }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button icon="pi pi-heart" outlined></Button>
                                        <Button 
                                            label="แก้ไข" 
                                            class="flex-auto md:flex-initial white-space-nowrap bg-orange-500 text-white px-2 py-1 rounded"
                                            @click="selectContract(contract)"
                                        ></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from "vue";
import { ProductService } from '../../service/ProductService';

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    getContractsBase()
});

const emit = defineEmits(['selectedContract','seeContract'])

const products = ref();
const contracts = ref()
const selectedContract = ref({})

const getContractsBase = async () => {
    try {
        const response = await axios.get(`https://api.nbadigital.tech/contract/HaveplaceNocapital/GetAllContract`)
        if(response.data){
            contracts.value = response.data.data
            console.log(contracts.value)
        }
    }
    catch (err) {
        console.log(err)
    }
}

const selectContract = (contract) => {
    selectedContract.value = contract
    emit('selectedContract', contract)
}

const seeContract = (contract) => {
    selectedContract.value = contract
    emit('seeContract', contract)
}

</script>
