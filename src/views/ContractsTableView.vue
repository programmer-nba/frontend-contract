<template>
    <div class="card">
        <DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="country.name" header="Country" style="width: 25%"></Column>
            <Column field="company" header="Company" style="width: 25%"></Column>
            <Column field="representative.name" header="Representative" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script>
export default {
    data() {
        return {
            contracts: [
                {
                    code: "TML-00001",
                    name: "มีทุน มีที่",
                    partner: {
                        prev_name: "นาย",
                        first_name: "สมชาย",
                        last_name: "วงกลม",
                        taxId: "1509970149346",
                    },
                    contractor: {
                        name: "บริษัท ทศกัณฐ์",
                        taxId: "1111111111111",
                        
                    }
                }
            ]
        };
    },
    mounted() {
        
    }
};
</script>
