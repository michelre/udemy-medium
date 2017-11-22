import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class ArticleEditor extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  onChange(editorState){
    this.setState({ editorState });
  }

  onClickBoldAction(){
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));

  }

  render(){
    return <div>
      <button onClick={() => this.onClickBoldAction()}>bold</button>
      <Editor
        editorState={this.state.editorState}
        onChange={(editorState) => this.onChange(editorState)}
      />
    </div>
  }
}
