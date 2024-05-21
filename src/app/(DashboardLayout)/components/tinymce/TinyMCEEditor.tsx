import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TinyMCEEditor = ({ onEditorChange, uploadToCLoudinary }: any) => {
  
  return (
    <Editor
      apiKey='2rbge8xcacyk5ou86hjs033lq6o9nwi71b3weee3ae79cjwt'
      init={{
        menubar: false,
        plugins: 'anchor autolink charmap codesample emoticons image link lists searchreplace table visualblocks wordcount linkchecker',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        resize: false,
        images_upload_handler: uploadToCLoudinary
      }}
      onEditorChange={onEditorChange}
      // onInit={(evt, editor) => {
      //   editorRef.current = editor
      // }}
      initialValue=""
    />
  )
}

export default TinyMCEEditor