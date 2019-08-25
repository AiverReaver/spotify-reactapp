import React from 'react';

import './Header.css';

const Header = ({ display_name }) => {
    return (
        <header>
            <nav>
                <div className="stack-nav">
                    <i className="material-icons">keyboard_arrow_left</i>
                    <i className="material-icons">keyboard_arrow_right</i>
                </div>

                <div className="search-nav">
                    <input type="text" placeholder="search" />
                </div>

                <div className="user-detail">
                    <p>{display_name}</p>
                    <i className="material-icons">keyboard_arrow_down</i>
                </div>
            </nav>
        </header>
    );
};

export default Header;
