import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const usePartnerContract = defineStore('partner-contract', () => {
  const token = localStorage.getItem('token')
  const partnerContracts = ref<[]>([])

  const createNewPartnerContract = async (data: object) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_CONTRACT}/partner-contract/create`,
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

  const getPartnerContracts = async () => {
    try {
      //const response = await axios.get(`${import.meta.env.VITE_API_CONTRACT}/partner-contract/all`)
      const response = await axios.get('https://ds7dd5.nbadigitalservice.com/contract/partner-contract/all')
      partnerContracts.value = response.data.data
      console.log(partnerContracts.value.length)
      return response.data
    } catch (err) {
      console.log(err)
      return err.message
    }
  }

  const getPartnerCodeIdContracts = async (data: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_CONTRACT}/partner-contract/all-me`,
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

  const deletePartnerContract = async (id: any) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_CONTRACT}/partner-contract/${id}`,
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

  const getPartnerContractById = async (id: any) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_CONTRACT}/partner-contract/one/${id}`,
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

  const editPartnerContractById = async (id: any, data: any) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_CONTRACT}/partner-contract/edit/${id}`,
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

  const signPartnerContract = async (id: any, data: any) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_CONTRACT}/partner-contract/sign/${id}`,
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
    createNewPartnerContract,
    getPartnerContracts,
    getPartnerCodeIdContracts,
    deletePartnerContract,
    getPartnerContractById,
    editPartnerContractById,
    signPartnerContract,
    partnerContracts
  }
})
