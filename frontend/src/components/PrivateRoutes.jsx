import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
/**
 * this component get other component as props making it HOC
 */
const PrivateRoutes = ({ component: Component, ...rest }) => {
    const token = window.localStorage.getItem("token");
    const isLoggedIn = token ? true : false;
    // debugger;
    if (isLoggedIn) {
        return <Route {...rest} render={(props) => {
            return < Component {...props} />
        }} />
    } else {
        return <Redirect to="/signin" />
    }
}
export default PrivateRoutes;