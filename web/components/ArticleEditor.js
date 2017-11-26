import React from 'react';
import { connect } from 'react-redux';
import Editor from 'react-medium-editor';

import '../scss/article-editor.scss';
import 'medium-editor/src/sass/medium-editor.scss'
import 'medium-editor/src/sass/themes/default.scss';
import TopbarEditor from "./TopbarEditor";

class ArticleEditor extends React.Component {

  handleChange(text, medium){
    console.log(text, medium);
  }

  render(){
    return <div className="article-editor-container">

      <Editor
        tag="pre"
        onChange={this.handleChange}
      />

    </div>
  }
}

export default connect()(ArticleEditor);
