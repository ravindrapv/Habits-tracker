import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import baseurl from "../utils/constants";
import Loading from "./loading";

class HabitsFeed extends React.Component {
  state = {
    error: "",
    user: null,
  };
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        user: this.props.user,
        error: this.props.error,
      });
    }
  }
  componentDidUpdate() {
    if (this.state.error !== this.props.error) {
      this.setState({
        error: this.props.error,
      });
    }
  }
  favoriteArticle = (slug, favorited) => {
    if (this.state.user) {
      fetch(`${baseurl}/api/articles/${slug}/favorite`, {
        method: favorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${this.props.user.token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("can't mark as favorite article");
          }
          return res.json();
        })
        .then((article) => {
          this.props.handleState("myfeed", false);
          if (this.props.match.params.username) {
            this.props.handleState("myfeed", this.props.myfeed);
          }
        })
        .catch((errors) => {
          this.setState({
            error: errors.error,
          });
        });
    } else {
      alert("you have to log in first");
    }
  };
  render() {
    let articles = this.props.articles;
    return (
      <section className="articles">
        {articles && articles.length < 1 ? (
          <p className="text-center my-4 text-xl capitalize">
            no habites to show
          </p>
        ) : (
          ""
        )}
        {articles && !this.state.error ? (
          articles.map((article, i) => {
            return (
              <ArticleFeed
                favoriteArticle={this.favoriteArticle}
                article={article}
                key={i}
              />
            );
          })
        ) : this.state.error ? (
          <p className="text-center my-4 text-xl capitalize">
            no articles to show
          </p>
        ) : (
          <Loading />
        )}
      </section>
    );
  }
}

function ArticleFeed(props) {
  const article = props.article.article;
  return (
    <div className="article flex p-8 m-4 border-2 border-solid rounded-lg border-blue-900 center">
      <div className="">
        <NavLink to={`/articles/${article.slug}`}>
          <h3 className="text-2xl hover:underline pink">{article.title}</h3>
        </NavLink>
        <NavLink to={`/profiles/${article.author.username}`}>
          <div className="flex hover:underline blue  py-2 items-center">
            <h4 className="blue hover:scale-105">{article.author.username}</h4>
          </div>
        </NavLink>
        <p className="text-l py-2">{article.description}</p>
        <NavLink
          className="text-blue-400 read-more mt-4 inline-block border-2 border-solid rounded-lg py-1 px-2 border-blue-400"
          to={`/articles/${article.slug}`}
        >
          Read More
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(HabitsFeed);
