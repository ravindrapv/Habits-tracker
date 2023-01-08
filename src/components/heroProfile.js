import React from "react";
import { NavLink } from "react-router-dom";
import baseurl from "../utils/constants";

class HeroProfile extends React.Component {
  state = {
    user: "",
    currentUser: null,
  };
  componentDidMount() {
    this.setState({
      user: this.props.user,
      currentUser: this.props.currentUser,
    });
  }
  followAuthor = () => {
    fetch(`${baseurl}/api/profiles/${this.state.user.username}/follow`, {
      method: this.state.user.following ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.state.currentUser.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't follow author");
        }
        return res.json();
      })
      .then((profile) => {
        this.setState({
          user: profile.profile,
        });
      })
      .catch((errors) => {
        this.setState({
          error: errors.error,
        });
      });
  };
  render() {
    let { username, email, bio } = this.props.user;
    return (
      <>
        <div className=" bg-sky-100 relative p-4 w-screen">
          <div className="flex items-center flex-col justify-evenly ">
            <div className="flex items-center">
              <h1 className="blue text-3xl capitalize p-3">{username}</h1>
              <h1 className="blue text-3xl capitalize p-3">{email}</h1>
              <h1 className="blue text-3xl capitalize p-3">{bio}</h1>
            </div>
            <a
              className="  text-xl p-3"
              href="/"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              {email}
            </a>
            <p className="text-lg">{bio}</p>
          </div>
          {this.props.follow ? (
            <button
              onClick={this.followAuthor}
              className="absolute bottom-2 right-4 p-2 underline pink text-base"
            >
              {this.state.user.following ? "Unfollow" : "Follow"}
            </button>
          ) : (
            <NavLink
              to="/settings"
              className="absolute bottom-2 right-4 p-2 underline pink text-base"
            >
              Update settings
            </NavLink>
          )}
        </div>
      </>
    );
  }
}

export default HeroProfile;
