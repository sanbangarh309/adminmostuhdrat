import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from './components/LoadableCircle';

import features from './features';
import auth from 'src/auth';

import App from './components/App';
import Edit_Product from './Admin/Product/Edit_Product';
import Admin from './Admin';
import Product from './Admin/Product';
import Login from './Admin/Login';
import Logout from './Admin/Logout';
import Signup from './Admin/Signup';
import Category from './Admin/Category';

const Home = Loadable({
    loader: () => import('./Home/route'),
});

const AdvPerm = auth.permission.verify.custom(['advanced'], <p>Your permission is not enough.</p>);

// Must construct an object out of render() function for
// both performance and the correctness of module states, i.e. this.state.
const TestWithAdvPerm = AdvPerm(Home);

export default () => (
    <App>
        <Switch>
            <Route exact path="/" component={Home} />
            {/* This can only be viewed with advanced permission */}
            <Route path="/advanced-permission" component={TestWithAdvPerm} />
            <Route path="/product/edit/:id" component={Edit_Product} />
            <Route path="/admin/signup" key={Signup.constants.NAME} component={Signup.route} />
            <Route path="/admin/login" key={Login.constants.NAME} component={Login.route} />
            <Route path="/admin/logout" key={Logout.constants.NAME} component={Logout.route} />
            <Route path="/admin/home" key={Admin.constants.NAME} component={Admin.route} />
            <Route path="/admin/products" component={Product.route} />
            <Route path="/admin/product/edit/:id" component={Edit_Product} />
            <Route path="/admin/categories" component={Category.route} />

            {/* Import all routes, permissions are verified in each route */}
            {features.filter((feature) => feature.route).map((feature) => (
                <Route
                    key={feature.constants.NAME}
                    path={`/${feature.constants.NAME}`}
                    component={feature.route}
                />
            ))}
            <Redirect to="/" />
        </Switch>
    </App>
);
