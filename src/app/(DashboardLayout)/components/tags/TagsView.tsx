import React from 'react'

import { Grid, Chip } from '@mui/material'

const TagsView = ({ tags, handleDeleteTag, handleClickTag }: any) => {
  return (
    <Grid item xs={12}>
      {tags.map((tag: any, i: number) => {
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
            onClick={handleClickTag ? () => handleClickTag(tag.id) : null}
            label={tag.tag.name}
            variant="outlined"
            color="primary"
            size="small"
            style={{ margin: '2px' }}
          />
        )
      })}
    </Grid>
  )
}

export default TagsView