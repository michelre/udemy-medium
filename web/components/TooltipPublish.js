import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WithContext as ReactTags } from 'react-tag-input';
import ReactTooltip from 'react-tooltip';
import * as R from 'ramda';
import * as articleActions from '../actions/articles';
import '../scss/tooltip-content.scss';
import '../scss/tooltip-publish.scss';
import '../scss/react-tags.scss';

const filterIndex = R.addIndex(R.filter);
const mapIndex = R.addIndex(R.map);

class TooltipPublish extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const { categories, article } = this.props;
    const currentCategories = mapIndex((catSlug, i) => {
      const category = R.find(({ slug }) => catSlug === slug, categories);
      return { text: category.name, id: i };
    }, article.categories || []);
    this.setState({ categories: currentCategories });
  }

  handlePublishClick() {
    const { articleActions, article } = this.props;
    const categories = R.map(({ text }) => {
      const trueCategory = R.find(
        ({ name }) => name === text,
        this.props.categories
      );
      return trueCategory.slug;
    }, this.state.categories);
    articleActions.publish(R.merge(article, { categories })).then(() => {
      ReactTooltip.hide(this.props.tooltipRef);
    });
  }

  handleDeleteCategory(i) {
    const { categories } = this.state;
    this.setState({
      categories: filterIndex((e, idx) => idx !== i, categories),
    });
  }

  handleAddCategory(category) {
    const { categories } = this.state;
    this.setState({
      categories: categories.concat({
        text: category,
        id: categories.length + 1,
      }),
    });
  }

  render() {
    return (
      <div className="tooltip-publish-container p-md">
        <h3>Ready to publish?</h3>
        <div>
          Add or change categories so readers know what your story is about:
        </div>
        <ReactTags
          tags={this.state.categories}
          placeholder="Add a category"
          suggestions={R.pluck('name', this.props.categories)}
          handleDelete={i => this.handleDeleteCategory(i)}
          handleAddition={category => this.handleAddCategory(category)}
        />
        <div>
          Tip: add a high resolution image to your story to capture people’s
          interest
        </div>
        <div>
          <div>
            <i className="fa fa-twitter" /> Connect to share on Twitter
          </div>
          <div className="m-t-md">
            <i className="fa fa-facebook-official" /> Connect to share on
            Facebook
          </div>
        </div>
        <div>
          <div>
            <div className="m-b-sm">Scheduling / visibility / license</div>
            <div>Earn moneyfor your story</div>
          </div>
          <button
            onClick={() => this.handlePublishClick()}
            className="medium-btn btn--publish"
          >
            Publish
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return { articleActions: bindActionCreators(articleActions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(TooltipPublish);
