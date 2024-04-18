import React from 'react';
import '../../css/style.css'
import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsFillBuildingFill} from 'react-icons/bs'
import { Link} from 'react-router-dom';



const UDSideBar = ({openSidebarToggle, OpenSidebar}) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
        
                <Link to={`/udhome`}>
					<BsGrid1X2Fill size={20} /> Dashboard
				</Link>
                
            </li>
            <li className='sidebar-list-item'>
                <Link to={`/udproduct`}>
					<BsGrid1X2Fill size={20} /> Product
				</Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/organization-Home">
                    <BsFillBuildingFill className='icon'/> Organization
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default UDSideBar;
