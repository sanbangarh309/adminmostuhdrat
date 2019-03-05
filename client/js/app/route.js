import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from './components/LoadableCircle';

import features from './features';
import auth from 'src/auth';

import App from './components/App';
import Edit_Product from './Product/Edit_Product';
<<<<<<< HEAD
import Admin from './Admin';
import Product from './Admin/Product';
import Category from './Admin/Category';
=======
>>>>>>> 8f57c3afc5043b7aa3dbb82fe519038d48622843

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
<<<<<<< HEAD
            <Route path="/admin/home" key={Admin.constants.NAME} component={Admin.route} />
            <Route path="/admin/products" component={Product.route} />
            <Route path="/admin/categories" component={Category.route} />
=======
>>>>>>> 8f57c3afc5043b7aa3dbb82fe519038d48622843

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
