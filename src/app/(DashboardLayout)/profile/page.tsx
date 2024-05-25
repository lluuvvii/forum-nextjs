import { Grid, Collapse } from '@mui/material'
import UserProfile from '../components/profile/UserProfile'
import UserComments from '../components/profile/UserComments'

const Profile = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <Collapse in={true}>
              <UserProfile />
            </Collapse>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Collapse in={true}>
              <UserComments />
            </Collapse>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Profile