import React from 'react'

import { Grid, Chip } from '@mui/material'

const TagsView = ({ tags, handleDeleteTag }: any) => {
  return (
    <Grid item xs={12}>
      {tags.map((tag: string, i: number) => {
        if (handleDeleteTag) {
          return (
            <Chip
              key={i}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              variant="outlined"
              color="primary"
              size="small"
              style={{ margin: '2px' }}
            />
          )
        }
        return (
          <Chip
            key={i}
            label={tag}
            variant="outlined"
            color="primary"
            size="small"
            style={{ margin: '2px' }}
          />)
      })}
    </Grid>
  )
}

export default TagsView