import { Box, CircularProgress } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'

const TinyMCEEditor = ({ onEditorChange, uploadToCLoudinary, value }: any) => {
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
        init={{
          menubar: false,
          plugins: 'anchor autolink charmap codesample emoticons image link lists searchreplace table visualblocks wordcount linkchecker',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | anchor autolink codesample lists searchreplace visualblocks wordcount linkchecker',
          // mergetags_list: [
          //   { value: 'First.Name', title: 'First Name' },
          //   { value: 'Email', title: 'Email' },
          // ],
          // ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          resize: false,
          images_upload_handler: uploadToCLoudinary,
          setup: (editor) => {
            editor.on('init', handleEditorInit)
          }
        }}
        onEditorChange={onEditorChange}
        // onInit={(evt, editor) => {
        //   editorRef.current = editor
        // }}
        initialValue=""
        value={value}
      />
    </div>
  )
}

export default TinyMCEEditor