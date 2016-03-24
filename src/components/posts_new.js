import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  // Defines an object on the PostsNew instances and gives access to 'router'
  // It gets found way back in Router
  // Like props but a little different - use sparingly.
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // Only when new post has been created, navigate user to index
        // We navigate by calling this.context.router.push with the new path
        // what to navigate.
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: {title, categories, content }, handleSubmit } = this.props;
    // the above is the ES6 equivalant of:
    // const title = this.props.fields.title

    // below we see the spread operator "..."
    // it "destructures" the object. Passes on the object input without having
    // to use this.props.formProps, it just separates the keys and values that
    // we see in console for title, like onChange, is seen like:
    // onChange={title.onChange}
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post!</h3>
        <div className={`form-group ${title.touched && title.invalid? 'has-danger' : ''}`}>
          <label>Title:</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid? 'has-danger' : ''}`}>
          <label>Categories:</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid? 'has-danger' : ''}`}>
          <label>Content:</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit!</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// Form validation
function validate(value) {
  const errors = {};

  if (!value.title) {
    errors.title = 'Enter a username!';
  }

  if (!value.categories) {
    errors.categories = 'Enter at least one category!';
  }

  if (!value.content) {
    errors.content = 'Enter content!';
  }

  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps.
// reduxForm: 1st is form config, 2nd is mapStateToProps, mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);

// The above goes to formReducer which updates app state.
// For example: User types something in and record it in application state.
// state === {
//   form: {
//     PostsNewForm: {
//       title: {...},
//       categories: {...},
//       content: {...}
//     }
//   }
// }
