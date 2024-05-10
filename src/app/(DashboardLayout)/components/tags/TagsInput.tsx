import React, { useState } from 'react';
import { TextField, Chip, Grid } from '@mui/material';

const TagsInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (error) setError('');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag) {
        if (newTag.includes(' ')) {
          setError('Tag tidak boleh berisi spasi');
        } else {
          setTags([...tags, newTag]);
          setInputValue('');
        }
      }
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  console.log({ tags })

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Tekan Enter untuk menambahkan tag"
          error={Boolean(error)}
          helperText={error}
        />
      </Grid>
      <Grid item xs={12}>
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            variant="outlined"
            color="primary"
            size="small"
            style={{ margin: '2px' }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default TagsInput;
