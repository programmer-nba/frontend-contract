import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null | undefined>(null)

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_CONTRACT}/login`, {
        username: username,
        password: password
      })
      if (response.data && response.data.status) {
        console.log(response.data)
        token.value = response.data.token
        localStorage.setItem('token', response.data.token)
        return response.data
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  return { token, login }
})
