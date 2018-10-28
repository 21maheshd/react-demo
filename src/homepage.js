import React from "react";
import { Route, Link  } from 'react-router-dom';
export default class HomePage  extends React.Component {
  state = {  }
  render() {
    return (
      <div>
        <ul><li>
        <Link to="/">Home</Link></li>
        <li><Link to="/edit">Edit Page</Link></li>
        <li><Link to="/update">Update Page</Link></li>
        </ul>
      </div>
    )
  }
}