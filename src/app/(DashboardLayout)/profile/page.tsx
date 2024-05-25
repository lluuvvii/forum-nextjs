import { Grid } from '@mui/material'
import UserProfile from '../components/profile/UserProfile'
import UserComments from '../components/profile/UserComments'
import CollapseMUI from '../components/collapse/CollapseMUI'

const Profile = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <CollapseMUI>
              <UserProfile />
            </CollapseMUI>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CollapseMUI>
              <UserComments />
            </CollapseMUI>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Profile