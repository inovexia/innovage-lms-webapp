// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import NotificationTable from './NotificationTable'

const UserList = ({ userData, addUsersData, updateUsersData, deleteUserData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <NotificationTable />
      </Grid>

        <UserListTable
          tableData={userData}
          addUserData={addUsersData}
          updateUserData={updateUsersData}
          deleteUserData={deleteUserData}
        />
      </Grid>

  )
}

export default UserList
