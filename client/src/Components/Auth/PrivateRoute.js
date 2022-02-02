import React , { useContext }from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import { TokenContext } from '../../App';

export default function PrivateRoute({ children, ...rest }) {
    let context  = useContext(TokenContext);
    console.log(context);
    debugger;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                context.token ? (
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
}