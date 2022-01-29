import React from 'react';
import ReactDOM from 'react-dom';
// Components
import Header from './organisms/Header';
import NewPost from './organisms/NewPost';
import TImeline from './organisms/TImeline';

function Example() {
    return (
        <div className='container'>
            <Header />
            <NewPost />
            <TImeline />
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

export default Example;

if (document.getElementById('root')) {
    ReactDOM.render(<Example />, document.getElementById('root'));
}
