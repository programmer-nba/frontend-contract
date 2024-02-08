
<template>
    <div class="card flex flex-col column-container">
        <div class="a4-container multi-column overflow-y-auto">
            <TabView v-model:activeIndex="active">
                <TabPanel header="">
                    <div v-if="base.contract_head" class="">
                            <div class="w-full text-center mb-5">
                                <div v-for="(head, index) in base.contract_head">
                                    <strong class="m-0" :key="index">
                                        {{ head }}
                                    </strong>
                                </div>
                            </div>
                            <div class="text-end">
                                <p class="m-0">
                                    ทำที่ {{ base.contractor?.name }}
                                </p>
                                <p class="m-0">
                                    {{ base.contractor?.address }}
                                </p>
                            </div>

                            <div v-if="openEditingPartner" class="card flex justify-center">
                                <Dialog class="bg-white p-5 shadow-md rounded" v-model:visible="openEditingPartner" modal :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                    <div class="flex flex-col gap-4 text-center">
                                        <h1 class="my-3 text-lg">แก้ไขข้อมูล</h1>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="name">ชื่อ / บริษัท</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="name" v-model="partner.name" aria-describedby="name-help" />
                                            
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="taxId">เลขประจำตัวผู้เสีภาษี/เลขบัตรประชาชน</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="taxId" v-model="partner.taxId" aria-describedby="taxId-help" />
                                            
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="address">ที่อยู่</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="address" v-model="partner.address" aria-describedby="address-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="total_price_amount">ราคา (ตัวเลข)</label>
                                            <InputNumber :minFractionDigits="2" class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="total_price_amount" v-model="contractHead.total_price.amount" aria-describedby="total_price_amount-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="total_price_text">ราคา (ภาษาไทย)</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="total_price_text" v-model="contractHead.total_price.text" aria-describedby="total_price_text-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="p1_price_amount">ต้องจ่ายงวดแรก (ตัวเลข)</label>
                                            <InputNumber :minFractionDigits="2" class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="p1_price_amount" v-model="contractHead.p1_price.amount" aria-describedby="p1_price_amount-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="p1_price_text">ต้องจ่ายงวดแรก (ภาษาไทย)</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="p1_price_text" v-model="contractHead.p1_price.text" aria-describedby="p1_price_text-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="p2_price_amount">ต้องจ่ายงวดสอง (ตัวเลข)</label>
                                            <InputNumber :minFractionDigits="2" class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="p2_price_amount" v-model="contractHead.p2_price.amount" aria-describedby="p2_price_amount-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="p2_price_text">ต้องจ่ายงวดสอง (ภาษาไทย)</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="p2_price_text" v-model="contractHead.p2_price.text" aria-describedby="p2_price_text-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="sorceCode_plus_amount">เพิ่ม sourc code (ตัวเลข)</label>
                                            <InputNumber :minFractionDigits="2" class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="sorceCode_plus_amount" v-model="contractHead.sorceCode_plus.amount" aria-describedby="sorceCode_plus_amount-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="sorceCode_plus_text">เพิ่ม sourc code (ภาษาไทย)</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="sorceCode_plus_text" v-model="contractHead.sorceCode_plus.text" aria-describedby="sorceCode_plus_text-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="penal_no2_amount">ค่าปรับเมื่อผิดสัญญา (ตัวเลข)</label>
                                            <InputNumber :minFractionDigits="2" class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="penal_no2_amount" v-model="contractHead.penal_no2.amount" aria-describedby="penal_no2_amount-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="penal_no2_text">ค่าปรับเมื่อผิดสัญญา (ภาษาไทย)</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="penal_no2_text" v-model="contractHead.penal_no2.text" aria-describedby="penal_no2_text-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="penal_cancle_amount">ค่าปรับเมื่อยกเลิกสัญญา (ตัวเลข)</label>
                                            <InputNumber :minFractionDigits="2" class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="penal_cancle_amount" v-model="contractHead.penal_cancle.amount" aria-describedby="penal_cancle_amount-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="penal_cancle_text">ค่าปรับเมื่อยกเลิกสัญญา (ภาษาไทย)</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="penal_cancle_text" v-model="contractHead.penal_cancle.text" aria-describedby="penal_cancle_text-help" />
                                        </div>
                                        <div class="flex gap-3 self-center my-3">
                                            <Button class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-300 ease-in-out duration-300" @click.prevent="closeEditting" label="ยืนยัน" />
                                            <Button class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-300 ease-in-out duration-300" label="ยกเลิก" @click.prevent="closeEditting=false"/>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                           
                            <article class="text-wrap my-3">
                                <p class="m-0 break-words text-wrap text-justify indent-8">
                                    {{ base.contract_sub_head }}
                                </p>
                            </article>

                            <!-- BODY -->
                            <div class="my-3">
                                <p class="my-2 indent-8">
                                    <strong>คู่สัญญาได้ตกลงกันมีข้อความดังต่อไปนี้</strong>
                                </p>
                                <article v-for="(text, index) in base.body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>{{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span>{{ text.subtitle }}</span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p @click="openAccept=true" v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            <span>{{ detail }}</span>
                                        </p>
                                    </div>
                                </article>
                            </div>

                            <!-- FOOTER -->
                            <article class="text-wrap my-10">
                                <p class="m-0 break-words text-wrap text-justify indent-8">
                                    สัญญานี้ทำขึ้นสองฉบับมีข้อความถูกต้องตรงกัน คู่สัญญาแต่ละฝ่ายได้อ่านโดยตลอดแล้ว เห็นว่าถูกต้องตามความประสงค์ จึงลงลายมือชื่อและประทับตราสำคัญของบริษัท(ถ้ามี) ไว้เป็นสำคัญต่อหน้าพยาน                                     
                                </p>
                            </article>

                            <!-- SIGNATURE -->
                            <div class="flex flex-wrap justify-between">
                                <div class="relative w-1/2 my-10" v-for="(signature, index) in partner.signature" :key="index">
                                    <div class="flex justify-center items-center gap-5">
                                        <p>ลงชื่อ</p>
                                        <img v-if="signature.sign && signature.sign!==''" class="h-[50px] w-[120px]" :src="`https://drive.google.com/thumbnail?id=${signature.sign}`" alt="partner-signature" />
                                        <p v-if="!signature.sign">________________</p>
                                        <p>{{ signature.position }}</p>
                                    </div>
                                    <div class="flex justify-center items-center">
                                        ({{ `${signature.name}` }})
                                    </div>
                                    <div class="flex justify-center items-center">
                                        {{ `${signature.role}` }}
                                    </div>
                                    <div class="flex justify-center items-center">
                                        <p>ตราประทับ (ถ้ามี)</p>
                                    </div>
                                    <div class="absolute top-4 left-16 w-[180px] h-[180px] opacity-50">
                                        <img v-if="partner.stamp && signature.stamp" :src="`https://drive.google.com/thumbnail?id=${partner.stamp}`" alt="partner-stamp" />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-5">
                                <div class="relative w-1/2 my-10" v-for="(signature, index) in contractor.signature" :key="index">
                                    <div class="flex justify-center items-center gap-5">
                                        <p>ลงชื่อ</p>
                                        <!-- <img :src="signature.sign" alt="partner-signature" /> -->
                                        <img v-if="signature.sign && signature.sign!==''" class="h-[50px] w-[120px]" :src="`https://drive.google.com/thumbnail?id=${signature.sign}`" alt="contractor-signature" />
                                        <p v-if="!signature.sign">________________</p>
                                        <p>{{ signature.position }}</p>
                                    </div>
                                    <div class="flex justify-center items-center py-2">
                                        <p class="text-nowrap">({{ signature.name ? `${signature.name}` : `________________________` }})</p>
                                    </div>
                                    <div class="flex justify-center items-center">
                                        {{ `${signature.role}` }}
                                    </div>
                                    <div class="flex justify-center items-center">
                                        <p>ตราประทับ (ถ้ามี)</p>
                                    </div>
                                    <div class="absolute top-4 left-16 w-[180px] h-[180px] opacity-50">
                                        <img v-if="contractor.stamp && signature.stamp" :src="`https://drive.google.com/thumbnail?id=${contractor.stamp}`" alt="contractor-stamp" />
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div v-if="!base.contract_head" class="w-[500px]">

                    </div>
                </TabPanel> 
            </TabView>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import stamp00 from '../assets/img/stamp-000.png'
import signature000 from '../assets/img/signature-000.png'
import signature001 from '../assets/img/signature-001.png'
import signature002 from '../assets/img/signature-002.png'
import signature003 from '../assets/img/signature-003.png'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import axios from 'axios'
import Calendar from 'primevue/calendar';

const route = useRoute();
const id = route.params.id

const replacePartner = () => {
    base.contract_sub_head.replace('partner_name', partner.value.name)
    console.log(base.contract_sub_head)
    console.log(partner.value.name)
}

const { base } = defineProps(['base'])

watch(base, (newValue, oldValue) => {
  replacePartner();
});

const buttondisplay = ref();
const icondisplay = ref();

const active = ref(0);
const openEditingPartner = ref(false);
const openAccept = ref(false)
const openEditingTotalPrice = ref(false)

const loading = ref(false);

const load = () => {
    loading.value = true;
};

const body = ref([])

/* SIGNATURE */
const addedSignatures = ref([])
const signatureList = ref([])
const openAddSignatureDialog = ref(false)
const addSignatures = () => {
}

const createNewContract = async () => {
    load()
    const formData = {
        contract_name: contractHead.value.name,
        contract_start: contractHead.value.date,
        contract_end: contractHead.value.date,
        contract_code: "A00000",
        contractor: {
        name: `${contractor.value.name} (${contractor.value.branch})`,
        address: contractHead.value.location,
        stamp: "-",
        tax_id: "1579900278555",
        tel: "0874445555",
        signature: contractor.value.signature
    },
    body: body.value,
    partner: {
        id: id,
        name: partner.value.name,
        address: partner.value.address,
        stamp: "-",
        tax_id: partner.value.taxId,
        tel: "-",
        signature: partner.value.signature
    },
    status: [
        {
            name: "รอลงนาม",
            date: new Date(),
            sender: "-"
        }
    ],
    refer_doc: [],
    remark: "-",
    total_price: {
        amount: contractHead.value.total_price.amount,
        text: contractHead.value.total_price.text
    },
    p1_price: {
        amount: contractHead.value.p1_price.amount,
        text: contractHead.value.p1_price.text
    },
    p2_price: {
        amount: contractHead.value.p2_price.amount,
        text: contractHead.value.p2_price.text,
    },
    sorceCode_plus: {
        amount: contractHead.value.sorceCode_plus.amount,
        text: contractHead.value.sorceCode_plus.text
    },
    penal_no2: {
        amount: contractHead.value.penal_no2.amount,
        text: contractHead.value.penal_no2.text
    },
    penal_cancle: {
        amount: contractHead.value.penal_cancle.amount,
        text: contractHead.value.penal_cancle.text
    },
    }
    try {
        const response = await axios.post(`https://api.nbadigital.tech/contract/add`,
            formData,
            {
                headers: {
                    'Content-Type' : "application/json"
                }
            }
        )
        if(response.data.status){
            loading.value = false;
            alert('สร้างสัญญาสำเร็จ')
            console.log(response.data)
        }
    }
    catch(err){
        console.log(err)
    }
}

const getPartnerData = async () => {
    try {
        /* const response = await axios.get(`https://api.nbadigital.tech/v1/Backend-Partner/partner/byid/${id}`)
        if(response.data.status){
            partner.value.name = response.data.data.partner_company_name
            partner.value.taxId = response.data.data.partner_company_number
            partner.value.address = response.data.data.partner_company_address
            partner.value.signature = response.data.data.signature
            partner.value.id = response.data.data.id
        } */
        body.value = [
    {
        no: '1',
        title: null,
        subtitle: null,
        detail: [
            'ผู้ว่าจ้างตกลงจ้างและผู้รับจ้างตกลงรับจ้างให้ทำงานเขียนโปรแกรมระบบขนส่งด้วยภาษาคอมพิวเตอร์ ให้ถูกต้องตามรูปแบบและรายละเอียดของงานตามที่ผู้ว่าจ้างกำหนดแนบท้ายสัญญาทุกประการโดยผู้รับจ้างตกลงที่จะจัดหาแรงงานและวัสดุ เครื่องมือเครื่องใช้ตลอดจนอุปกรณ์รวมทั้งสัมภาระต่างๆ ที่จําเป็นชนิดดีเพื่อความสำเร็จแก่งานของผู้ว่าจ้าง',
        ]
    },
    {
        no: '2',
        title: 'อัตราค่าจ้าง ไม่รวมภาษีมูลค่าเพิ่ม',
        subtitle: `ผู้ว่าจ้างตกลงจ่ายและผู้รับจ้างตกลงรับเงินค่าจ้างเป็นจำนวน <span class="text-sky-600 underline font-semibold"> ${totalAmount.value} บาท ( ${contractHead.value.total_price?.text} บาทถ้วน )</span> โดยมีเงื่อนไขดังนี้`,
        detail: [
            `งวดที่ 1 ผู้ว่าจ้างตกลงจ่ายให้แก่ผู้รับจ้าง ณ วันทำสัญญาฉบับนี้ ในอัตราร้อยละ 50 เป็นจำนวนเงิน <span class="text-sky-600 underline font-semibold"> ${ contractHead.value.p1_price.amount } บาท ( ${ contractHead.value.p1_price.text } บาทถ้วน )</span>`,
            `งวดที่ 2 ผู้ว่าจ้างตกลงจ่ายให้แก่ผู้รับจ้าง ณ วันที่ผู้รับจ้างส่งมอบงานกึ่งหนึ่งให้แก่ผู้ว่าจ้างแล้ว ในส่วนที่เหลืออีกอัตราร้อยละ 50 เป็นจำนวนเงิน <span class="text-sky-600 underline font-semibold"> ${ contractHead.value.p2_price.amount } บาท ( ${ contractHead.value.p2_price.text } บาทถ้วน )</span>`,
            'ผู้ว่าจ้าง ได้สิทธิ์ยกเว้นค่าธรรมเนียม เซิร์ฟเวอร์ (Server) และโดเมน (Domain) เป็นระยะเวลา 1 ปี นับจากผู้รับจ้างส่งมอบงานให้แก่ผู้ว่าจ้างจนเสร็จสิ้น',
            'ผู้ว่าจ้าง ได้สิทธิ์ยกเว้นค่าบริการ Cloud storage service เป็นจำนวน 15 GB จากผู้รับจ้าง',
            `อัตราค่าบริการในส่วนนี้ไม่รวมถึง คำสั่งในการเขียนโปรแกรม (Source code) ที่ผู้ว่าจ้างจะได้รับจากผู้รับจ้าง หากผู้ว่าจ้างต้องการคำสั่งในการเขียนโปรแกรม (Source code) ต้องเสียค่าบริการเพิ่มเติมเป็นจำนวน <span class="text-sky-600 underline font-semibold"> ${ contractHead.value.sorceCode_plus.amount } บาท ( ${ contractHead.value.sorceCode_plus.text } บาทถ้วน)</span> ให้แก่ผู้รับจ้าง`,
            'อัตราค่าบริการในส่วนนี้เฉพาะขอบเขตของงานจ้าง (Term of reference) ไม่รวมถึงโปรแกรมเพิ่มเติมในส่วนอื่น ๆ',
        ]
    },
    {
        no: '3',
        title: 'การส่งมอบงาน',
        subtitle: null,
        detail: [
            'ผู้รับจ้างตกลงจะส่งมอบงานกึ่งหนึ่ง (ร้อยละ 50) ให้แก่ผู้ว่าจ้าง ภายใน 30 วัน นับจากวันที่ผู้ว่าจ้างปฏิบัติตามสัญญาฉบับนี้ข้อ 2.1',
            'ผู้รับจ้างตกลงจะส่งมอบงานอีกกึ่งหนึ่ง (ร้อยละ 50) ให้แก่ผู้ว่าจ้าง ภายใน 30 วัน นับจากวันที่ผู้ว่าจ้างปฏิบัติตามสัญญาฉบับนี้ข้อ 2.2',
            'ผู้รับจ้างตกลงจะส่งมอบงานภายในกำหนดตามสัญญานี้ เว้นแต่กรณีที่ผู้รับจ้างต้องการทดสอบระบบเพื่อความเสถียรในการใช้งานเพิ่มเติม ผู้รับจ้างสามารถส่งมอบงานล่าช้าได้เกินกว่ากำหนด 5 วันโดยได้แจ้งให้ผู้ว่าจ้างทราบเป็นลายลักษณ์อักษรล่วงหน้าไม่น้อยกว่า 7 วันก่อนส่งมอบงานตามกำหนดในสัญญา',
            'ภายหลังจากที่ผู้รับจ้างได้ส่งมอบให้แก่ผู้ว่าจ้างจนเสร็จสิ้นแล้ว กรณีที่โปรแกรมมีปัญหาใด ทางผู้รับจ้างตกลงแก้ไข เปลี่ยนแปลง ซ่อมแซม ให้ตลอดอายุการใช้งาน โดยไม่คิดค่าบริการเพิ่มเติม หากเป็นการแก้ไข เปลี่ยนแปลง ซ่อมแซม อัพเดตโปรแกรม หรือรายละเอียดอื่นใดที่ไม่ได้ตกลงกันไว้ในสัญญานี้ ผู้ว่าจ้างยินดีจ่ายค่าบริการเพิ่มเติมให้แก่ผู้รับจ้าง'
        ]
    },
    {
        no: '4',
        title: 'ความรับผิด',
        subtitle: null,
        detail: [
            `กรณีผู้ว่าจ้างไม่ปฏิบัติตามสัญญาข้อ 2.2 ผู้ว่าจ้างยินยอมให้ผู้รับจ้างริบเงินจำนวน ${contractHead.value.penal_no2.amount} บาท ( ${contractHead.value.penal_no2.text} บาท) ที่ผู้ว่าจ้างได้ส่งมอบให้แก่ผู้รับจ้างแล้ว โดยไม่มีข้อยกเว้น`,
            `กรณีผู้ว่าจ้างต้องการยกเลิกสัญญาฉบับนี้ ผู้ว่าจ้างยินยอมให้ผู้รับจ้างริบเงินจำนวน ${contractHead.value.penal_cancle.amount} บาท ( ${contractHead.value.penal_cancle.text} บาท) ที่ผู้ว่าจ้างได้ส่งมอบให้แก่ผู้รับจ้างแล้ว โดยไม่มีข้อยกเว้น`
        ]
    },
    {
        no: '5',
        title: null,
        subtitle: null,
        detail: [
            'ผู้ว่าจ้างตกลงสิทธิในทรัพย์สินทางปัญญาทั้งปวงไม่จำกัดเพียงแต่ลิขสิทธิ์ สิทธิบัตร เครื่องหมายทางการค้า เครื่องหมายบริการ ชื่อทางการค้า การออกแบบ ระบบงานที่เกิดขึ้นจากการสร้างสรรค์ คิดค้น ออกแบบของผู้รับจ้างตามสัญญาจ้างฉบับนี้ ให้ตกเป็นสิทธิเด็ดขาดของผู้จ้างทั้งสิ้น ยกเว้นกรณีตามสัญญาข้อ 2.5',
        ]
    },
    {
        no: '6',
        title: null,
        subtitle: null,
        detail: [
            'ผู้ว่าจ้างตกลงว่า ผู้ว่าจ้างสามารถขยายสาขาภายใต้แบรนด์ของผู้ว่าจ้างโดยใช้ระบบงานที่ผู้รับจ้างส่งมอบให้แก่ผู้ว่าจ้างได้ โดยผู้ว่าจ้างไม่สามารถเปลี่ยนแปลง แก้ไข หรือตัดทอนข้อมูลบางส่วนหรือทั้งหมดจากระบบงานของผู้รับจ้าง ทำให้เปิดเผย ตีพิมพ์ ประกาศ ทำให้แพร่หลาย หรือเผยแพร่ต่อบุคคลที่สาม หากฝ่าฝืนผู้ว่าจ้างยินยอมให้ผู้รับจ้างดำเนินคดีตามกฎหมาย',
        ]
    },
    {
        no: '7',
        title: null,
        subtitle: null,
        detail: [
            'เอกสารอื่นใดที่ได้แนบท้ายไว้ตามสัญญาฉบับนี้ คู่สัญญาให้ถือว่าเป็นส่วนหนึ่งของสัญญาด้วย',
        ]
    },
    {
        no: '8',
        title: null,
        subtitle: null,
        detail: [
            'ผู้ว่าจ้างขอรับรองว่า ข้อความต่าง ๆ ที่ได้เขียนไว้ในสัญญา หรือเอกสารประกอบที่ผู้ว่าจ้างได้รับรอง และส่งมอบให้แก่ผู้รับจ้างตามเอกสารแนบท้ายสัญญาฉบับนี้ เป็นความจริงทุกประการ หากภายหลังผู้รับจ้างตรวจพบว่าเป็นเอกสารที่เป็นความเท็จ ยินดีให้ผู้รับจ้างเลิกสัญญาได้ทันที โดยไม่ต้องจ่ายค่าชดเชย หรือเงินอื่นใดทั้งสิ้น',
        ]
    },
]
    }
    catch(err){
        console.log(err)
    }
}

const contractHead = ref({
    name: 'สัญญาว่าจ้างเขียนโปรแกรม',
    address: [
        'บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด',
        '103 หมู่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ',
        'อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200'
    ],
    location: '103 หมู่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200',
    date: null,
    total_price: {
        amount: 0,
        text: ''
    },
    p1_price: {
        amount: 0,
        text: ''
    },
    p2_price: {
        amount: 0,
        text: ''
    },
    sorceCode_plus: {
        amount: 0,
        text: ''
    },
    penal_no2: {
        amount: 0,
        text: ''
    },
    penal_cancle: {
        amount: 0,
        text: ''
    }

})

const partner = ref({
    id: '',
    code: '',
    name: '/*customer_name*/',
    branch: '',
    taxId: '/*customer_taxID*/',
    address: '/*customer_address*/',
    signature: [
        {
            name: '________________',
            role: '',
            position: 'ผู้ว่าจ้าง',
            sign: null,
            stamp: false
        },
        {
            name: '______________',
            role: '',
            position: 'พยานผู้ว่าจ้าง',
            sign: null,
            stamp: false
        }
    ],
    //stamp: stamp00
})

const contractor = ref({
    name: 'บริษัท จำไม่ได้ จำกัด',
    branch: 'สำนักงานใหญ่',
    taxId: '0000000000000',
    address: '66/6 หมู่ที่ 8 ตำบล สันทราย อำเภอ สารภี จังหวัด เชียงใหม่ 50140',
    signature: [
        {
            name: '',
            role: '-',
            position: 'ผู้รับจ้าง',
            sign: null,
            stamp: false
        },
        {
            name: 'นางสาวกานต์ธิดา สารีทก',
            role: '-',
            position: 'ทนายความ',
            sign: null,
            stamp: false
        },
        {
            name: '-',
            role: '-',
            position: 'พยานผู้รับจ้าง',
            sign: null,
            stamp: false
        }
    ],
    //stamp: stamp00
})

const totalAmount = computed(()=>{
    return contractHead.value.total_price.amount
})


const newThaiDate = () => {
    if(!contractHead.value.date){
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Bangkok',
        }
        const thaiDateString = new Date().toLocaleDateString('th-TH', options)
        contractHead.value.date = thaiDateString
    }
}

const editingDetail = (type) => {
    if(type==='partner'){
        openEditingPartner.value = true

    } else if (type==='total_price') {
        openEditingPartner.value = true
    } 
}

const closeEditting = () => {
    openEditingPartner.value = false
    getPartnerData()
}

onMounted(async ()=>{
    newThaiDate()
    getPartnerData()
})

</script>

<style scoped>

.a4-container {
    max-width: 210mm;
    max-height: 297mm;
    height: 75vh;
    width: auto;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 5rem;
    padding-left: 20mm;
    padding-right: 20mm;
    box-sizing: border-box;
    page-break-after: always; /* Ensure a page break after each container */
  }
  
  /* Style for the first page, no page break before it */
  .a4-container:first-of-type {
    page-break-after: auto;
  }
  
  /* Style for the subsequent pages */
  .a4-container:not(:first-of-type) {
    page-break-before: always; /* Ensure a page break before each subsequent container */
  }

  .column-container {
    column-count: 3; /* Set the number of columns */
    column-gap: 20px; /* Adjust the gap between columns */
  }
  
  .multi-column {
    break-inside: avoid; /* Avoid breaking the paragraph inside columns */
    text-align: justify; /* Justify the text within columns */
  }
</style>
