import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import Axios from 'axios'

const TinyMCEEditor = ({ onEditorChange }: any) => {
  const uploadToCLoudinary = async (blobInfo: any, success: any, failure: any) => {
    const formData = new FormData()
    formData.append("file", blobInfo.blob(), blobInfo.filename())
    formData.append(
      "upload_preset",
      "forum_image_upload"
    )
    formData.append('folder', 'forum_nextjs')

    const response = await Axios.post('https://api.cloudinary.com/v1_1/dbzjr3io4/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const data = await response.data.url
    success(data)
    return data
  }
  return (
    <Editor
      apiKey='2rbge8xcacyk5ou86hjs033lq6o9nwi71b3weee3ae79cjwt'
      init={{
        menubar: false,
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
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