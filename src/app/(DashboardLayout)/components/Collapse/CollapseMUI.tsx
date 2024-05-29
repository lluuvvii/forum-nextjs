'use client'

import { Collapse } from '@mui/material'
import React, { useEffect, useState } from 'react'

const CollapseMUI = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Collapse in={show}>{children}</Collapse>
  )
}

export default CollapseMUI