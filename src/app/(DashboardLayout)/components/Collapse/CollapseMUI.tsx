'use client'

import { Collapse, CollapseProps } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface CollapseMUIProps extends CollapseProps {
  children: React.ReactNode
  cancel?: boolean
}


const CollapseMUI: React.FC<CollapseMUIProps> = ({ children, cancel }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Collapse in={show}>{children}</Collapse>
  )
}

export default CollapseMUI