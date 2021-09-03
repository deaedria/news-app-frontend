import React, { Component } from 'react'
import { EditorState } from "draft-js";
import dynamic from 'next/dynamic';
import { convertToRaw } from 'draft-js';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class ArticleEditor extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onSave = () => {
        const editorContentRaw = convertToRaw(this.state.editorState.getCurrentContent())
        console.log(editorContentRaw)
        // console.log(stateToHTML(convertFromRaw(convertToRaw(this.state.editorState.getCurrentContent()))))
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <div className="mt-3 box-editor btn-add top">
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbar-class"
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                        }}
                    />

                    {/* <button onClick={this.onSave}>Save</button> */}
                    <button className="w-100 btn btn-lg btn-primary btn-wrap mt-2 publish-article" type="submit" onClick={this.onSave}>Publish Article</button>

                </div>
                {/* <Editor 
                    editorState={EditorState.createWithContent(convertFromRaw(convertToRaw(this.state.editorState.getCurrentContent())))} 
                    toolbarOnFocus
                    readOnly
                /> */}
                {/* <h4>Editor content as HTML</h4>
                <pre>{stateToHTML(this.state.editorState.getCurrentContent())}</pre> */}
            </div>
        )
    }
}
