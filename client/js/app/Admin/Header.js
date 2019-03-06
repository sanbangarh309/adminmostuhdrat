import React from 'react';
import './css/material-dashboard.css';
import './css/font-awesome.min.css';
import './css/demo.css';
// import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons';
import './css/Header.css';

import 'jquery';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';

// import './js/core/popper.min.js';
// import './js/core/bootstrap-material-design.min.js';
// import './js/plugins/perfect-scrollbar.jquery.min.js';
// import './js/plugins/moment.min.js';
// import './js/plugins/sweetalert2.js';
// import './js/plugins/jquery.validate.min.js';
// import './js/plugins/jquery.bootstrap-wizard.js';
// import './js/plugins/bootstrap-selectpicker.js';
// import './js/plugins/bootstrap-datetimepicker.min.js';
// import './js/plugins/jquery.dataTables.min.js';
// import './js/plugins/bootstrap-tagsinput.js';
// import './js/plugins/jasny-bootstrap.min.js';
// import './js/plugins/fullcalendar.min.js';
// import './js/plugins/jquery-jvectormap.js';
// import './js/plugins/nouislider.min.js';
// import './js/plugins/arrive.min.js';
// import './js/plugins/chartist.min.js';
// import './js/plugins/bootstrap-notify.js';
// import './js/material-dashboard.js';
import './css/Header.css';


// import {Link} from 'react-router-dom';
var NavLink = require('react-router-dom').NavLink;
const Header = () => {
    // if (!localStorage.getItem('jwtToken')) {
    //   return (<Redirect to={'/admin/login'}/>)
    // }
  return (
    <div className="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">
<div className="sidebar-wrapper" id="san_header">
            <div className="logo">
                <NavLink exact className="simple-text logo-normal" activeClassName='active' to='/'>
    	      	Mostuhdrat
                </NavLink>
	       </div>

            <ul className="nav">
                <li>
                <NavLink exact activeClassName='active' to='/admin/home'><i className="material-icons">dashboard</i>
                        <p>Dashboard</p>
                </NavLink>
                </li>
                <li>
                <NavLink exact activeClassName='active' to='/admin/categories'><i className="material-icons">content_paste</i>
                        <p>Categories</p>
                </NavLink>
                </li>
                <li>
                <NavLink exact activeClassName='active' to='/admin/products'><i className="material-icons">library_books</i>
                        <p>Products</p>
                </NavLink>
                </li>
            </ul>
      </div>
    </div>
)};

export default Header;
