'use client'
import { useState } from 'react'

import Grid from '@mui/material/Grid'

// Component Imports
import Tab from '@mui/material/Tab'

import TabContext from '@mui/lab/TabContext'

import TabPanel from '@mui/lab/TabPanel'

import EditForm from '@/app/[lang]/(pages)/user/components/editUser/account/EditForm'
import UserProfileHeader from '@/app/[lang]/(pages)/user/components/editUser/UserProfileHeader'

import DeleteCard from '@/app/[lang]/(pages)/user/components/editUser/account/DeleteCard'
import DeactivateCard from '@/app/[lang]/(pages)/user/components/editUser/account/DeactivateCard'

import CustomTabList from '@core/components/mui/TabList'
import ChangePasswordEmail from '@/app/[lang]/(pages)/user/components/editUser/changePassword/ChangePasswordEmail'

import ChangePasswordOtp from '@/app/[lang]/(pages)/user/components/editUser//changePassword/ChangePasswordOtp'
import ChangePasswordManually from '@/app/[lang]/(pages)/user/components/editUser/changePassword/ChangePasswordManually'

const Account = () => {

  const [activeTab, setActiveTab] = useState('account') // Ensure activeTab is initialized properly

  // Function to handle tab change
  const handleChange = (event, newValue) => {
    setActiveTab(newValue) // Update activeTab when a tab is clicked
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader/>
      </Grid>
      <Grid item xs={12}>
      <TabContext value={activeTab}>
      <CustomTabList value={activeTab} onChange={handleChange} variant='scrollable' pill='true'>
        <Tab
          label={
            <div className='flex items-center gap-2'>
              <i className='ri-user-3-line text-lg' />
              Account
            </div>
          }
          value='account'
        />
        <Tab
          label={
            <div className='flex items-center gap-2'>
              <i className='ri-team-line text-lg' />
              Change Password
            </div>
          }
          value='changePassword'
        />
        <Tab
          label={
            <div className='flex items-center gap-2'>
              <i className='ri-computer-line text-lg' />
              Billing Plans
            </div>
          }
          value='billing'
        />
        <Tab
          label={
            <div className='flex items-center gap-2'>
              <i className='ri-link-m text-lg' />
              Notifications
            </div>
          }
          value='notifications'
        />
        <Tab
          label={
            <div className='flex items-center gap-2'>
              <i className='ri-link-m text-lg' />
              Tests
            </div>
          }
          value='tests'
        />
      </CustomTabList>
            <Grid item xs={12}>
         {/* TabPanels to render content for each tab */}
      <TabPanel value='account' sx={{ marginTop: 10 }} spacing ={6}>

        <EditForm isAdmin={true} />
        <DeleteCard />


        {/* Render Account Edit Form */}
      </TabPanel>
      <TabPanel value='changePassword'  sx={{ marginTop: 10 }} >
        <ChangePasswordManually  sx={{ marginBottom: 4 }} />
        <ChangePasswordOtp sx={{ marginBottom: 4 }}  />
        <ChangePasswordEmail /> {/* Render Change Password Form */}
      </TabPanel>


      </Grid>
      </TabContext>
      </Grid>

    </Grid>





  )
}

export default Account
