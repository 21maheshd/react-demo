import React from 'react';
import { Route, Link  } from 'react-router-dom';

export class UpdateComponent extends React.Component {
    state = {  }
    render() {
        return (
            <div>
                Updated products here
                <Link to="/">Home</Link>
            </div>
        )
    }
}