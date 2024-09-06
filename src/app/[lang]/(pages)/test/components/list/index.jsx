// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TestListTable from './TestListTable'
import UserListCards from './UserListCards'

const UserList = ({ userData, addUsersData, updateUsersData, deleteUserData }) => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <UserListCards />
      </Grid> */}
      <Grid item xs={12}>
        <TestListTable
          tableData={userData}
          addUserData={addUsersData}
          updateUserData={updateUsersData}
          deleteUserData={deleteUserData}
        />
      </Grid>
    </Grid>
  )
}

export default UserList
