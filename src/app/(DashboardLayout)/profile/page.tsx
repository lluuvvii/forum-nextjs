import { Grid } from '@mui/material'

// comp import
import UserProfile from '../components/profile/UserProfile'
import UserForums from '../components/profile/UserForums'

const Profile = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <UserProfile />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserForums />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Profile