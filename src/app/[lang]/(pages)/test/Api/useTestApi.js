// 'use client'
import { useEffect, useState } from 'react'

import axios from 'axios'

import { USER_MODULE_ENDPOINTS } from '../Const/ApiEndpoints'

export default function useTestApi() {
  const [data, setData] = useState([])

  console.info(process.env.NEXT_PUBLIC_DOCS_URL)

  const fetchData = () => {
    try {
      axios
        .post(
          `${USER_MODULE_ENDPOINTS}/list`,
          {},
          {
            Authorization: 'Bearer a87afd2b2930bc58266c773f66b78b57e157fef39dd6fa31f40bfd117c2c26b1',
            Network: 'dev369',
            accept: 'application/json'
          }
        )
        ?.then(res => {
          setData(res?.data?.payload?.data)
        })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addUsersData = userData => {
    //userData example
    const data = {
      title: userData?.title,
      type: userData?.type,
      details: userData?.description
    }

    const formData = new FormData()

    if (typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    try {
      axios
        .post(
          `${USER_MODULE_ENDPOINTS}/add`,

          // userData
          formData,
          {
            Authorization: 'Bearer a87afd2b2930bc58266c773f66b78b57e157fef39dd6fa31f40bfd117c2c26b1',
            Network: 'dev369',
            accept: 'application/json'
          }
        )
        .then(() => fetchData())

      //   return response.data
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const updateUsersData = (userId, userData) => {
    try {
      axios.put(`${USER_MODULE_ENDPOINTS}/${userId}`, userData).then(() => fetchData())

      //   return response.data
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteUserData = userId => {
    try {
      axios.delete(`${USER_MODULE_ENDPOINTS}/delete/${userId}`).then(() => fetchData())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {
    deleteUserData,
    updateUsersData,
    addUsersData,
    data,
    setData
  }
}
