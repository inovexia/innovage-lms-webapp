// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports


import RecentDevice from './RecentDevice'

const ActivityLogs = ({ userData, addUsersData, updateUsersData, deleteUserData }) => {
  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
       <RecentDevice/>
      </Grid>
    </Grid>
  )
}

export default ActivityLogs
