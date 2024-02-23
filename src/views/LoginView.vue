<template>
  <Toast />
  <div
    class="w-full h-full flex xl:justify-end lg:justify-end md:justify-center justify-center items-center py-20"
  >
    <div
      class="bg-white bg-opacity-90 h-full rounded-xl shadow-lg xl:w-1/2 lg:w-1/2 md:w-full w-full min-h-[350px]"
    >
      <div class="card flex flex-col gap-y-6 justify-center items-center h-full">
        <h1 class="text-3xl text-center">เข้าสู่ระบบ</h1>
        <div class="w-full xl:px-0 lg:px-0 md:px-3 sm:px-3 max-w-[400px]">
          <FloatLabel>
            <InputText
              id="username"
              class="p-3 shadow-md w-full"
              :class="{ 'border-red-500 text-red-500': invalid_username }"
              v-model.trim="username"
            />
            <label for="username"> username </label>
          </FloatLabel>
        </div>
        <div class="w-full xl:px-0 lg:px-0 md:px-3 sm:px-3 max-w-[400px]">
          <FloatLabel>
            <Password
              :feedback="false"
              id="password"
              toggleMask
              :invalid="invalid_password"
              inputClass="p-3 w-full"
              class="h-10 shadow-md w-full"
              v-model.trim="password"
            />
            <label for="password"> password </label>
          </FloatLabel>
          <small :class="invalid_username || invalid_password ? 'text-red-500 block' : 'hidden'">
            {{
              invalid_username
                ? 'ไม่พบผู้ใช้งานในระบบ กรุณาใส่ username ให้ถูกต้อง'
                : 'รหัสผ่านไม่ถูกต้อง กรุณาใส่รหัสผ่านใหม่'
            }}
          </small>
        </div>
        <Button
          :label="loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'"
          class="bg-sky-300 w-full max-w-[400px] py-2 text-gray-800 shadow hover:bg-sky-400 hover:text-white duration-200 ease-in-out"
          @click.prevent="logingIn"
          type="submit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/index'

const router = useRouter()
const toast = useToast()
const username = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)
const invalid_username = ref<boolean>(false)
const invalid_password = ref<boolean>(false)
const auth = useAuthStore()

async function logingIn() {
  loading.value = true
  invalid_username.value = false
  invalid_password.value = false
  try {
    const response = await auth.login(username.value, password.value)
    if (!response) {
      errorToast()
      return
    }
    showToast()
    setTimeout(() => {
      invalid_username.value = false
      invalid_password.value = false
      router.push('/admin/home')
    }, 2000)
  } catch (err) {
    console.log(err)
    errorToast()
    return
  } finally {
    loading.value = false
  }
}

function showToast() {
  toast.add({ severity: 'success', summary: 'สำเร็จ', detail: 'เข้าสู่ระบบสำเร็จ', life: 3000 })
}
function errorToast() {
  toast.add({
    severity: 'error',
    summary: 'เกิดข้อผิดพลาด',
    detail: 'เข้าสู่ระบบไม่สำเร็จ',
    life: 3000
  })
}
</script>

<style scoped></style>
