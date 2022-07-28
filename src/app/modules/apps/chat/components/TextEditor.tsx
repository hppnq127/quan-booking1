import React, {useState} from 'react'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './textEditor.scss'
type SetPropsType = {
  setText: React.Dispatch<React.SetStateAction<string>>
}
function TextEditor({setText}: SetPropsType) {
  const [editor, setEditor] = useState<EditorState>(EditorState.createEmpty())
  const onEditorStateChange = (editorState: any) => {
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setText(text)
    setEditor(editorState)
  }
  return (
    <>
      <Editor
        editorState={editor}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName='border border-2 rounded-1 h-auto pt-4 w-100'
        toolbarClassName='shadow bg-body rounded fs-3 mx-4'
        editorClassName='editor w-100 lh-1 p-4'
        // wrapperClassName='border border-2 rounded-1 position-absolute w-80 p-4 h-85 w-100'
        // toolbarClassName='position-absolute w-90 toolbar-editor shadow bg-body rounded fs-3'
        // editorClassName='editor pt-10 w-100'
        toolbar={{
          options: ['inline', 'colorPicker', 'fontSize', 'emoji'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
        }}
      />
    </>
  )
}

export default React.memo(TextEditor)
