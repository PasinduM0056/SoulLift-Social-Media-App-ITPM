import React from 'react';
import '../../css/style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faCartPlus,
  faBullhorn,
  faCreditCard,
  faChartLine,
  faUser,
  faComments,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import userAtom from "./../../atoms/userAtom";
import { useRecoilValue } from "recoil";
import './ODSidebar.css';
const UDSideBar = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div id="nav-bar" className='odsidebar' style={{minHeight:'101vh', position:'fixed'}}>
      <input id="nav-toggle" type="checkbox"/>
      <div id="nav-header">
        <a id="nav-title" href="https://codepen.io" target="_blank">
          CODEPEN
        </a>
        <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
        <hr/>
      </div>

      <br/>
      <div id="nav-content">
        {/* Dashboard */}
        <div className="nav-button">
          <Link to={`/organization-Home`}>
            <FontAwesomeIcon icon={faPalette} />
            <span> Dashboard</span>
          </Link>
        </div>

        <br/>

        {/* Product */}
        <div className="nav-button">
          <Link to={`/Post-a-job`}>
            <FontAwesomeIcon icon={faCartPlus} />
            <span> Post a job</span>
          </Link>
        </div>

        <br/>

         {/* Advertisement */}
         <div className="nav-button">
          <Link to={`/Create-a-post`}>
            <FontAwesomeIcon icon={faBullhorn} />
            <span> Create Dedicated page</span>
          </Link>
        </div>

        <br/>

        {/* Advertisement */}
        <div className="nav-button">
          <Link to={`/Candidate-Shortlisting`}>
            <FontAwesomeIcon icon={faBullhorn} />
            <span> Candidate shortlisting</span>
          </Link>
        </div>

        <br/>
        
        <hr/>

        {/* Sales Analysis */}
        <div className="nav-button">
          <Link to={`/Shortlisted-Candidates`}>
            <FontAwesomeIcon icon={faChartLine} />
            <span> Sortlisted Candidates</span>
          </Link>
        </div>

        <br/>

        {/* Advertisement Analysis */}
        <div className="nav-button">
          <Link to={`/Posted-Jobs`}>
            <FontAwesomeIcon icon={faChartLine} />
            <span> Posted Jobs</span>
          </Link>
        </div>
<br/>
        <div className="nav-button">
          <Link to={`/Update-Organization`}>
            <FontAwesomeIcon icon={faChartLine} />
            <span> Update your company details</span>
          </Link>
        </div>
        
        
        <hr/>

        
        <div id="nav-content-highlight"></div>
      </div>
      <input id="nav-footer-toggle" type="checkbox"/>
      <div id="nav-footer">
        <div id="nav-footer-avatar">
          <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="User Avatar" />
        </div>
        <div id="nav-footer-titlebox">
        </div>
      </div>
    </div>
  );
}

export default UDSideBar;
