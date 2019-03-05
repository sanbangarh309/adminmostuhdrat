import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import AdminHeader from '../Admin/Header';
import Topbar from '../Admin/Topbar';
import Footer from './Footer';
import AdminFooter from '../Admin/Footer';
import history from '../history';

const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {};

const App = ({children}) => {
  let url_params = window.location.href.split("/");
  if (url_params.indexOf("admin") > -1) {
  	return (
        <div>
            <AdminHeader />
            <div className="main-panel">
            	<Topbar />
            	{children}
              <AdminFooter />
            </div>
        </div>
    );
  }
  
  let prms = url_params[url_params.length-1];
  if(prms == 'signature' || prms == 'dashboard'){
    return (
        <div>
            {children}
        </div>
    );
  }
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
