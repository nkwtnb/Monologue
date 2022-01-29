import React from 'react';
import ReactDOM from 'react-dom';
import { Outlet } from 'react-router-dom';
// Components
import Header from './organisms/Header';
import NewPost from './organisms/NewPost';
import TImeline from './organisms/TImeline';

export default () => {
    return (
        <div className='container'>
            <Header />
            <NewPost />
            <TImeline />
            <Outlet />
            {/* <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

// if (document.getElementById('root')) {
//     ReactDOM.render(<Example />, document.getElementById('root'));
// }
