import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {
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
      <form onSubmit={handleSubmit(this.props.createPost)}>
        <h3>Create a new post!</h3>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" className="form-control" {...title} />
        </div>

        <div className="form-group">
          <label>Categories:</label>
          <input type="text" className="form-control" {...categories} />
        </div>

        <div className="form-group">
          <label>Content:</label>
          <textarea className="form-control" {...content} />
        </div>

        <button type="submit" className="btn btn-primary">Submit!</button>
      </form>
    );
  }
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps.
// reduxForm: 1st is form config, 2nd is mapStateToProps, mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content']
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
