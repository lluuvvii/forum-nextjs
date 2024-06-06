import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'

// interface TinyMCEReadOnlyProps {
//   content: string;
// }

const TinyMCEReadOnly = ({ value }: any) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleEditorInit = () => {
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          // position="absolute"
          top={0}
          left={0}
          bgcolor="rgba(255, 255, 255, 0.8)"
        // zIndex={1}
        >
          <CircularProgress />
        </Box>
      )}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        disabled={true}
        readonly={true}
        init={{
          menubar: false,
          toolbar: false,
          selector: "#editor",
          readonly: 1,
          noneditable_class: 'nonedit',
          resize: false,
          setup: (editor) => {
            editor.on('init', handleEditorInit)
          }
        }}
        initialValue=""
        value={value}
      />
    </div>
  )
}

export default TinyMCEReadOnly