// 'use client'
import { useEffect, useState } from 'react'
import { ApiRequestHandle } from '@/libs/axios'
import axios from 'axios'

import { USER_MODULE_ENDPOINTS } from '../Const/ApiEndpoints'

export default function useUserApi() {
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  const fetchData = async () => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_LMS_API_URL}users/list` // Construct the full URL

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_LMS_TOKEN}`, // Add Authorization header
          Network: process.env.NEXT_PUBLIC_LMS_TOKEN, // Add Network header
          Accept: 'application/json' // Specify the accepted response format
        }
      })
      setLoader(false)
      setData(response.data?.payload?.data) // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    setData,
    loader,
    setLoader
  }
}
