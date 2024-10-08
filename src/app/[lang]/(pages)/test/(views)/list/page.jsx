// Component Imports

// import UserList from '@views/apps/user/list'
'use client'
import useTestApi from '../../Api/useTestApi'
import UserList from '../../components/list'

// Data Imports
// import { getUserData, getNewUserData } from '@/app/server/actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
// const getUserData = async () => {
//   // Vars
//   const res = await fetch(`https://66caea284290b1c4f1990810.mockapi.io/users/create`)

//   if (!res.ok) {
//     throw new Error('Failed to fetch userData')
//   }

//   return res.json()
// }

const UserListApp = () => {
  // Vars
  // const data = await getUserData()
  const { addUsersData, updateUsersData, deleteUserData, data } = useTestApi()

  return (
    <UserList
      userData={data}
      addUsersData={addUsersData}
      updateUsersData={updateUsersData}
      deleteUserData={deleteUserData}
    />
  )
}

export default UserListApp
