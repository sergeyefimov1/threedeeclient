import React from 'react';
import Search from './search';
import { Link } from 'react-router-dom';


export default class Header extends React.Component {
    render () {
        return <header className="App-header">
            <div className="flex-horizontal">
                <a href="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="flex-horizontal">
                        <p>
                        3D Market 
                        </p>
                        <div className="logo"></div>
                    </div>
                </a>
            </div>
            <Search/>
        </header>
    }
}
