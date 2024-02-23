import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useBaseContract = defineStore('base-contract', () => {
  const token = localStorage.getItem('token')
  const codeTypes = ref<any>()

  const createNewBaseContract = async (data: object) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_CONTRACT}/base-contract/create`,
        data,
        {
          headers: {
            'auth-token': token
          }
        }
      )
      console.log(token)
      return response.data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const getBaseContractCodes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_CONTRACT}/base-contract/codes`)
      codeTypes.value = response.data.data
      return response.data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const getBaseContracts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_CONTRACT}/base-contract/all`, {
        headers: {
          'auth-token': token
        }
      })
      return response.data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const deleteBaseContract = async (id: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_CONTRACT}/base-contract/${id}`,
        {
          headers: {
            'auth-token': token
          }
        }
      )
      return response.data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const getBaseContractById = async (id: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_CONTRACT}/base-contract/${id}`, {
        headers: {
          'auth-token': token
        }
      })
      return response.data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const editBaseContractById = async (id: any, data: any) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_CONTRACT}/base-contract/${id}`,
        data,
        {
          headers: {
            'auth-token': token
          }
        }
      )
      return response.data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  return {
    createNewBaseContract,
    getBaseContractCodes,
    codeTypes,
    getBaseContracts,
    deleteBaseContract,
    getBaseContractById,
    editBaseContractById
  }
})
