
<template>
    <div class="card p-10 m-5 flex flex-col column-container">
        <div class="a4-container  multi-column overflow-y-auto">
            <TabView v-model:activeIndex="active">
                <TabPanel header="">
                    <div class="">
                            <div class="w-full text-center mb-5">
                                <strong class="m-0">
                                    สัญญาจ้างวางระบบและเขียนระบบ
                                </strong>
                            </div>
                            <div class="text-end">
                                <p class="m-0">
                                    ทำที่ {{ contractHead.address[0] }}
                                </p>
                                <p class="m-0">
                                    {{ contractHead.address[1] }}
                                </p>
                                <p class="m-0">
                                    {{ contractHead.address[2] }}
                                </p>
                            </div>
                            <div class="text-center my-3">
                                <p class="m-0">
                                    {{ contractHead.date }}<span class="text-red-500">*</span>
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
                                        <div class="flex gap-3 self-center my-3">
                                            <Button class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-300 ease-in-out duration-300" @click="openEditingPartner=false" label="ยืนยัน" />
                                            <Button class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-300 ease-in-out duration-300" label="ยกเลิก" @click="openEditingPartner=false"/>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                           
                            <article class="text-wrap my-3">
                                <p class="m-0 break-words text-wrap text-justify indent-8">
                                    สัญญาฉบับนี้ทำขึ้นระหว่าง 
                                    <span 
                                    v-tooltip.top="{
                                        value: 'แก้ไข',
                                        pt: {
                                            text: 'px-2 bg-black rounded text-white'
                                        }
                                    }"
                                    class="text-sky-600 hover:text-black px-2 underline font-semibold cursor-pointer ease-in-out duration-300 hover:bg-sky-300 hover:rounded" @click.prevent="editingDetail('partner')">{{ partner.name }}</span> 
                                    เลขประจำตัวประชาชน/เลขประจำตัวผู้เสียภาษี 
                                    <span 
                                    v-tooltip.top="{
                                        value: 'แก้ไข',
                                        pt: {
                                            text: 'px-2 bg-black rounded text-white'
                                        }
                                    }"
                                    class="text-sky-600 hover:text-black underline font-semibold cursor-pointer ease-in-out duration-300 hover:bg-sky-300 hover:rounded" @click.prevent="editingDetail('partner')">{{ partner.taxId }}</span> 
                                    ที่อยู่ 
                                    <span 
                                    v-tooltip.top="{
                                        value: 'แก้ไข',
                                        pt: {
                                            text: 'px-2 bg-black rounded text-white'
                                        }
                                    }"
                                    class="text-sky-600 hover:text-black underline font-semibold cursor-pointer ease-in-out duration-300 hover:bg-sky-300 hover:rounded" @click.prevent="editingDetail('partner')">{{ partner.address }}</span> ซึ่งต่อไปในสัญญาฉบับนี้เรียกว่า <strong>“ผู้ว่าจ้าง”</strong> 
                                    ฝ่ายหนึ่งกับ บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด สำนักงานตั้งอยู่ที่ 103 หมู่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200 เลขประจำตัวผู้เสียภาษี 0505566024381 ซึ่งต่อไปในสัญญาจะเรียกว่า <strong>“ผู้รับจ้าง”</strong>
                                </p>
                            </article>

                            <div v-if="openEditingTotalPrice" class="card flex justify-center">
                                <Dialog class="bg-white p-5 shadow-md rounded" v-model:visible="openEditingTotalPrice" modal :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                    <div class="flex flex-col gap-4 text-center">
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="total_price_amount">ราคา (ตัวเลข)</label>
                                            <InputNumber :minFractionDigits="2" class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="total_price_amount" v-model="contractHead.total_price.amount" aria-describedby="total_price_amount-help" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <label class="px-2 bg-sky-100 w-fit rounded" for="total_price_text">ราคา (ภาษาไทย)</label>
                                            <InputText class="border border-sky-700 rounded px-3 py-2 bg-white focus:bg-sky-100 focus:border-0" id="total_price_text" v-model="contractHead.total_price.text" aria-describedby="total_price_text-help" />
                                        </div>
                                        <div class="flex gap-3 self-center my-3">
                                            <Button class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-300 ease-in-out duration-300" @click="openEditingPartner=false" label="ยืนยัน" />
                                            <Button class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-300 ease-in-out duration-300" label="ยกเลิก" @click="openEditingPartner=false"/>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>

                            <!-- BODY -->
                            <div class="my-3">
                                <p class="my-2 indent-8">
                                    <strong>คู่สัญญาได้ตกลงกันมีข้อความดังต่อไปนี้</strong>
                                </p>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p @click="openAccept=true" v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
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
                                        <!-- <img :src="signature.sign" alt="partner-signature" /> -->
                                        <img class="h-[50px] w-[120px]" :src="`https://drive.google.com/thumbnail?id=${signature.sign}`" alt="partner-signature" />
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
                                        <img v-if="partner.stamp && signature.stamp" :src="partner.stamp" alt="partner-stamp" />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-5">
                                <div class="relative w-1/2 my-10" v-for="(signature, index) in contractor.signature" :key="index">
                                    <div class="flex justify-center items-center gap-5">
                                        <p>ลงชื่อ</p>
                                        <!-- <img :src="signature.sign" alt="partner-signature" /> -->
                                        <img v-if="signature.sign" class="h-[50px] w-[120px]" :src="signature.sign" alt="partner-signature" />
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
                                        <img v-if="contractor.stamp && signature.stamp" :src="contractor.stamp" alt="partner-stamp" />
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="card flex justify-center mt-10">
                        <Button class="px-2 py-1 rounded bg-sky-400 hover:bg-sky-700 " type="button" label="ร่างสัญญาใหม่" :loading="loading" @click="approveContract" />
                    </div>
                </TabPanel>
                
            </TabView>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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

const route = useRoute();
const id = route.params.id

const active = ref(0);
const openEditingPartner = ref(false);
const openAccept = ref(false)
const openEditingTotalPrice = ref(false)

const loading = ref(false);

const load = () => {
    loading.value = true;
};

/* SIGNATURE */
const addedSignatures = ref([])
const signatureList = ref([])
const openAddSignatureDialog = ref(false)
const addSignatures = (sign) => {
    
}

const approveContract = async () => {
    load()
    const formData = {
        contract_name: "ร่างหนังสือสัญญาจ้างการเขียนโปรแกรม",
        contract_start: "2024-01-29T10:33:16.366Z",
        contract_end: "2024-01-31T10:33:16.366Z",
        contract_code: "A00001",
        contractor: {
        name: "นาย เอ นามสมมติ",
        address: "298/1 หมู่3 ต.สันผักหวาน อ.หางดง จ.เชียงใหม่ 50230",
        stamp: "stamp ใน contractor ",
        tax_id: "1579900278555",
        tel: "0874445555",
        signature: [
            {
                name: "นาย เอ นามสมมติ1",
                role: "role นาย เอ นามสมมติ1",
                position: "ประธานบริษัท",
                sign: "ลายเซ็นต์ นาย เอ นามสมมติ1",
                stamp: false
            }
        ]
    },
    body: [],
    partner: {
        id: id,
        name: "นางสาว บี ขยันทำงาน",
        address: "",
        stamp: "stamp นางสาว บี ขยันทำงาน",
        tax_id: "846211616161",
        tel: "785212222020",
        signature: []
    },
    status: [
        {
            name: "ยืนยัน",
            date: new Date(),
            sender: ""
        }
    ],
    refer_doc: [],
    remark: ""
    }
    try {
        const response = await axios.put(`https://api.nbadigital.tech/contract/add`,
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

const contractHead = ref({
    name: 'สัญญาว่าจ้างเขียนโปรแกรม',
    address: [
        'บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด',
        '103 หมู่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ',
        'อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200'
    ],
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
    penalty_on2: {
        amount: 0,
        text: ''
    },
    penalty_onCancle: {
        amount: 0,
        text: ''
    }

})

const partner = ref({
    name: 'บริษัท จำไม่ได้ จำกัด',
    branch: 'สำนักงานใหญ่',
    taxId: '0000000000000',
    address: '66/6 หมู่ที่ 8 ตำบล สันทราย อำเภอ สารภี จังหวัด เชียงใหม่ 50140',
    signature: [
        {
            name: 'นายประหยัด จันทร์อังคาร',
            role: 'ผู้บริหาร',
            position: 'ผู้ว่าจ้าง',
            sign: signature000,
            stamp: true
        },
        {
            name: 'นายประหวิด วงคำเหลา',
            role: 'หัวหน้าแผนกกฎหมาย',
            position: 'พยานผู้ว่าจ้าง',
            sign: signature001,
            stamp: true
        },
        {
            name: 'นางประวาณี จันทร์เจ้าเอ๋ย',
            role: 'หัวหน้าแผนกบัญชี',
            position: 'พยานผู้ว่าจ้าง',
            sign: signature002,
            stamp: false
        }
    ],
    stamp: stamp00
})

const contractor = ref({
    name: 'บริษัท จำไม่ได้ จำกัด',
    branch: 'สำนักงานใหญ่',
    taxId: '0000000000000',
    address: '66/6 หมู่ที่ 8 ตำบล สันทราย อำเภอ สารภี จังหวัด เชียงใหม่ 50140',
    signature: [
        {
            name: 'บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด',
            role: '',
            position: 'ผู้รับจ้าง',
            sign: signature003,
            stamp: false
        },
        {
            name: 'นางสาวกานต์ธิดา สารีทก',
            role: '',
            position: 'ทนายความ',
            sign: signature003,
            stamp: false
        },
        {
            name: '',
            role: '',
            position: 'พยานผู้รับจ้าง',
            sign: null,
            stamp: false
        }
    ],
    stamp: stamp00
})

const body = ref([
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
        subtitle: `ผู้ว่าจ้างตกลงจ่ายและผู้รับจ้างตกลงรับเงินค่าจ้างเป็นจำนวน <span class="text-sky-600 underline font-semibold"> ${contractHead.value.total_price.amount} บาท ( ${contractHead.value.total_price.text} บาทถ้วน )</span> โดยมีเงื่อนไขดังนี้`,
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
            `กรณีผู้ว่าจ้างไม่ปฏิบัติตามสัญญาข้อ 2.2 ผู้ว่าจ้างยินยอมให้ผู้รับจ้างริบเงินจำนวน ${contractHead.value.penalty_on2.amount} บาท ( ${contractHead.value.penalty_on2.text} บาท) ที่ผู้ว่าจ้างได้ส่งมอบให้แก่ผู้รับจ้างแล้ว โดยไม่มีข้อยกเว้น`,
            `กรณีผู้ว่าจ้างต้องการยกเลิกสัญญาฉบับนี้ ผู้ว่าจ้างยินยอมให้ผู้รับจ้างริบเงินจำนวน ${contractHead.value.penalty_onCancle.amount} บาท ( ${contractHead.value.penalty_onCancle.text} บาท) ที่ผู้ว่าจ้างได้ส่งมอบให้แก่ผู้รับจ้างแล้ว โดยไม่มีข้อยกเว้น`
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
])

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
        openEditingTotalPrice.value = true

    } else if (type==='p1_price') {
        openEditingP1Price.value = true

    } else if (type==='p2_price') {
        openEditingP2Price.value = true

    } else if (type==='sorceCode_plus') {
        openEditingSorceCode.value = true

    } else if (type==='penalty_on2') {
        openEditingPenaltyOn2.value = true

    } else if (type==='penalty_onCancle') {
        openEditingPenaltyCancle.value = true
    }
}

onMounted(()=>{
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
    padding: 20mm;
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
