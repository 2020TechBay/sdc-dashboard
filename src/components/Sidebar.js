import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ tabs }) {
    return (
        <div id="container">
            <img id="logo" src="sdc_logo.png" alt="" />
            <div id="profile">
                <img src="generic-profile-photo.png" alt="" />
                <div>
                    <span id="name">Joseph Edusei</span>
                    <span id="email">jedusei99@gmail.com</span>
                    <span id="role">ADMINISTRATOR</span>
                </div>
            </div>
            {tabs && tabs.map(tab => (
                <SidebarItem key={tab.target} {...tab} />
            ))}
        </div>
    );
}

function SidebarItem({ target, icon, caption }) {
    console.log('weg');
    return (
        <Link to={target} className="sidebar-item">
            <img className='sidebar-item-icon' src={icon} alt="" />
            <span>{caption}</span>
        </Link>
    );
}