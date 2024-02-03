
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
                           
                            <article class="text-wrap my-3">
                                <p class="m-0 break-words text-wrap text-justify indent-8">
                                    สัญญาฉบับนี้ทำขึ้นระหว่าง <InputText class="border-b border-sky-600 text-center font-semibold text-sky-700" v-model="partner.name" type="text" size="small" placeholder="ชื่อพาร์ทเนอร์" /> 
                                    เลขประจำตัวประชาชน/เลขประจำตัวผู้เสียภาษี <InputText class="border-b border-sky-600 text-center font-semibold text-sky-700" v-model="partner.taxId" type="text" size="small" placeholder="เลขประจำตัวผู้เสีภาษี/เลขบัตรประชาชน" /> 
                                    ที่อยู่ <InputText class="border-b border-sky-600 text-center font-semibold text-sky-700" v-model="partner.address" type="text" size="small" placeholder="ที่อยู่พาร์ทเนอร์" /> 
                                    ซึ่งต่อไปในสัญญาฉบับนี้เรียกว่า <strong>“ผู้ว่าจ้าง”</strong> 
                                    ฝ่ายหนึ่งกับ บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด สำนักงานตั้งอยู่ที่ 103 หมู่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200 เลขประจำตัวผู้เสียภาษี 0505566024381 ซึ่งต่อไปในสัญญาจะเรียกว่า <strong>“ผู้รับจ้าง”</strong>
                                </p>
                            </article>

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
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
                                        </p>
                                    </div>
                                </article>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
                                        </p>
                                    </div>
                                </article>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
                                        </p>
                                    </div>
                                </article>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
                                        </p>
                                    </div>
                                </article>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
                                        </p>
                                    </div>
                                </article>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
                                        </p>
                                    </div>
                                </article>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
                                            {{ text.title ? `ข้อ ${text.no}.${detailIndex+1})` : `ข้อ ${text.no}.)` }} <span v-html="detail"></span>
                                        </p>
                                    </div>
                                </article>
                                <article v-for="(text, index) in body" :key="index" class="my-2">
                                    <p v-if="text.title" class="m-0 break-words text-pretty indent-8 text-justify">
                                        <strong>ข้อ {{ text.no }}.) {{ text.title }}</strong>
                                    </p>
                                    <p v-if="text.subtitle" class="my-2 break-words text-pretty indent-8 text-justify">
                                        <span v-html="text.subtitle"></span>
                                    </p>
                                    <div class="my-2" v-if="text.detail && text.detail.length > 0">
                                        <p v-for="(detail, detailIndex) in text.detail" :key="detailIndex" class="m-0 break-words text-pretty indent-8 text-justify">
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
                                        <img class="h-[50px] w-[120px]" :src="signature.sign" alt="partner-signature" />
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
                </TabPanel>
                <TabPanel header="">
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
                <TabPanel header="">
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                        officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
        </div>
        <div class="flex sticky my-2 gap-2 justify-center">
            <Button @click="active = 0" rounded label="1" class="w-[2rem] h-[2rem] pb-2 py-1 rounded-full text-center" :class="active === 0 ? 'bg-sky-400' : ' bg-gray-400'" :outlined="active !== 0" />
            <Button @click="active = 1" rounded label="2" class="w-[2rem] h-[2rem] pb-2 py-1 rounded-full" :class="active === 1 ? 'bg-sky-400' : ' bg-gray-400'" :outlined="active !== 1" />
            <Button @click="active = 2" rounded label="3" class="w-[2rem] h-[2rem] pb-2 py-1 rounded-full" :class="active === 2 ? 'bg-sky-400' : ' bg-gray-400'" :outlined="active !== 2" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import stamp00 from '../assets/img/stamp-000.png'
import signature000 from '../assets/img/signature-000.png'
import signature001 from '../assets/img/signature-001.png'
import signature002 from '../assets/img/signature-002.png'
import signature003 from '../assets/img/signature-003.png'



const active = ref(0);

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
        subtitle: 'ผู้ว่าจ้างตกลงจ่ายและผู้รับจ้างตกลงรับเงินค่าจ้างเป็นจำนวน <span class="text-red-500">____________บาท (______________บาทถ้วน )</span> โดยมีเงื่อนไขดังนี้',
        detail: [
            `งวดที่ 1 ผู้ว่าจ้างตกลงจ่ายให้แก่ผู้รับจ้าง ณ วันทำสัญญาฉบับนี้ ในอัตราร้อยละ 50 เป็นจำนวนเงิน <span class="text-red-500">______________บาท (______________บาทถ้วน )</span>`,
            'งวดที่ 2 ผู้ว่าจ้างตกลงจ่ายให้แก่ผู้รับจ้าง ณ วันที่ผู้รับจ้างส่งมอบงานกึ่งหนึ่งให้แก่ผู้ว่าจ้างแล้ว ในส่วนที่เหลืออีกอัตราร้อยละ 50 เป็นจำนวนเงิน <span class="text-red-500">______________บาท (______________บาทถ้วน )</span>',
            'ผู้ว่าจ้าง ได้สิทธิ์ยกเว้นค่าธรรมเนียม เซิร์ฟเวอร์ (Server) และโดเมน (Domain) เป็นระยะเวลา 1 ปี นับจากผู้รับจ้างส่งมอบงานให้แก่ผู้ว่าจ้างจนเสร็จสิ้น',
            'ผู้ว่าจ้าง ได้สิทธิ์ยกเว้นค่าบริการ Cloud storage service เป็นจำนวน 15 GB จากผู้รับจ้าง',
            'อัตราค่าบริการในส่วนนี้ไม่รวมถึง คำสั่งในการเขียนโปรแกรม (Source code) ที่ผู้ว่าจ้างจะได้รับจากผู้รับจ้าง หากผู้ว่าจ้างต้องการคำสั่งในการเขียนโปรแกรม (Source code) ต้องเสียค่าบริการเพิ่มเติมเป็นจำนวน <span class="text-red-500"> ___________________ บาท (_______________บาทถ้วน)</span> ให้แก่ผู้รับจ้าง',
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
            'กรณีผู้ว่าจ้างไม่ปฏิบัติตามสัญญาข้อ 2.2 ผู้ว่าจ้างยินยอมให้ผู้รับจ้างริบเงินจำนวน __________บาท (_____________บาท) ที่ผู้ว่าจ้างได้ส่งมอบให้แก่ผู้รับจ้างแล้ว โดยไม่มีข้อยกเว้น',
            'กรณีผู้ว่าจ้างต้องการยกเลิกสัญญาฉบับนี้ ผู้ว่าจ้างยินยอมให้ผู้รับจ้างริบเงินจำนวน ____________บาท (____________บาท) ที่ผู้ว่าจ้างได้ส่งมอบให้แก่ผู้รับจ้างแล้ว โดยไม่มีข้อยกเว้น'
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

const contractHead = ref({
    name: 'สัญญาว่าจ้างเขียนโปรแกรม',
    address: [
        'บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด',
        '103 หมู่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ',
        'อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200'
    ],
    date: '30 มกราคม 2567'
})

</script>

<style scoped>

.a4-container {
    max-width: 210mm;
    height: auto;
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
