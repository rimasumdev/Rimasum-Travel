import React, { useContext } from 'react';
import { Redirect, Route} from 'react-router-dom';
import { loggedInUser } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedUser, setLoggedUser] = useContext(loggedInUser);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            loggedUser.name || loggedInUser.email ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
            />
    );
};

export default PrivateRoute;