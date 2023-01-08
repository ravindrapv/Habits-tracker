import React from "react";
import { withRouter } from "react-router-dom";
import baseurl from "../utils/constants";

class EditArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: "",
      tags: "",
      error: "",
    };
  }
  handleInput = ({ target }) => {
    let { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  checkInput = () => {
    let { title, description, tags, body } = this.state;
    if (!title || !description || !tags || !body) {
      this.setState({
        error: "all fields are required*",
      });
    }
  };
  editArticle = () => {
    let { title, description, tags, body } = this.state;
    fetch(`${baseurl}/api/articles/${this.props.location.state.article.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          taglist: tags,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't edit");
        }
        return res.json();
      })
      .then((article) => {
        this.props.history.push(`/articles/${article.article.article.slug}`);
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  componentDidMount() {
    let { title, description, body, taglist } =
      this.props.location.state.article;
    this.setState({
      title: title,
      description: description,
      tags: taglist ? taglist.toString() : "",
      body: body,
    });
  }
  render() {
    let { title, description, body } = this.state;
    let formControlClass =
      "text-lg rounded-md w-full py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900";
    return (
      <div className="pb-28">
        <h2 className="capitalize text-2xl text-center p-4 blue ">
          edit article
        </h2>
        <div className="text-center mx-auto w-3/5">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.checkInput();
              this.editArticle();
            }}
          >
            <span className="text-red-600">
              {this.state.error ? this.state.error : ""}
            </span>
            <input
              placeholder="Enter Habit Title"
              onChange={this.handleInput}
              className={formControlClass}
              type="text"
              name="title"
              value={title}
            ></input>
            <input
              placeholder="What's this Habit is about?"
              onChange={this.handleInput}
              className={formControlClass}
              type="text"
              name="description"
              value={description}
            ></input>
            <textarea
              className={formControlClass}
              placeholder="Write your Habit"
              rows={6}
              onChange={this.handleInput}
              value={body}
              name="body"
            ></textarea>
            <input
              type="submit"
              value="Update Habits"
              className={`bg-blue-300 blue ${formControlClass} cursor-pointer`}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditArticle);
