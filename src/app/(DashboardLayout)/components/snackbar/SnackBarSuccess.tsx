'use client'

import { Alert, Snackbar } from '@mui/material'
import React, { useState, useEffect } from 'react'

const SnackBarSuccess = ({ title }: any) => {
  const [openSnackBar, setOpenSnackBar] = useState(false)

  useEffect(() => {
    setOpenSnackBar(!openSnackBar)
  }, [])

  return (
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={() => setOpenSnackBar(!openSnackBar)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert
        onClose={() => setOpenSnackBar(!openSnackBar)}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {title}
      </Alert>
    </Snackbar>
  )
}

export default SnackBarSuccess