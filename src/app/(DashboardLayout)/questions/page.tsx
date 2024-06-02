import { Grid } from '@mui/material'
import AllQuestions from '../components/questions/AllQuestions'
import QuestionForm from '../components/questions/QuestionForm'

const Questions = async () => {

  return (
    <Grid container mt={3}>
      <Grid item xs={12}>
        <QuestionForm />
      </Grid>
      <Grid item xs={12}>
        <AllQuestions />
      </Grid>
    </Grid>
  )
}

export default Questions
