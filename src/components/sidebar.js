import React from "react";
import baseurl from "../utils/constants";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      error: null,
    };
  }
  componentDidMount() {
    fetch(`${baseurl}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          tags: data.tags,
        });
      })
      .catch((err) => {
        this.setState({
          error: "you can  visit all users daily habites",
        });
      });
  }
  render() {
    const { error } = this.state;
    if (error) {
      return <p className="text-center p-4">{error}</p>;
    }
  }
}

export default Sidebar;
