import React, { useState } from 'react';
import {Button} from 'reactstrap'
import './Sidebar.css';
import {NavLink} from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="Sidebar-wrapper">
            <ul className="list list-unstyled nav">
                <li>
                    <NavLink to="/vehicles">
                        <i className="icon-dashboard"/> Vehicles
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/vehicles-on-road" activeClassName="active">
                        <i className="icon-dashboard"/> Vehicles On Road
                    </NavLink>
                </li>
                
            </ul>
        </div>
    );
}

export default SideBar;
