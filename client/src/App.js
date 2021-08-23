import './App.css';
import { LoginForm } from './Components/Auth/LoginForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useRouteMatch,
  useParams,
  useHistory,
  withRouter
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Exam from './Components/Exam/Exam.js';
import SubmitButton from './Components/Exam/SubmitButton';
import MenuExam from './Components/MenuExam/MenuExam';
import MenuExamSwitch from './Components/MenuExam/MenuExam';
import Loading from './Components/LoadingPage/Loading';
import NavCustom from './Components/NavBar';
import useToken from './CustomHook/useToken';
import Home from './Components/Home/Home';
import PrivateRoute from './Components/Auth/PrivateRoute';


export const TokenContext = React.createContext();

function App() {

  const { token, setToken } = useToken();
  const [freshToken, setFreshToken] = useState();
  const history = useHistory();

  

  // if (!token)
  //   return (
  //     <div>
  //       <Router>
  //         <NavCustom />
  //         <Switch>
  //           <Route exact path="/">
  //             <Home />
  //           </Route>
  //         </Switch>
  //       </Router>
  //       <LoginForm setToken={setToken} setFreshToken={setFreshToken} />
  //     </div>);

  return (

    <TokenContext.Provider value={{ token, freshToken, setToken, setFreshToken }}>
      <Router>
        <NavCustom />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/about">
            <Loading />
          </Route>
          <PrivateRoute path="/exam">
            <MenuExamSwitch />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </TokenContext.Provider>
  );
}



function NotFound() {
  let location = useLocation();
  console.log(location);

  let match = useRouteMatch();
  console.log(match);

  let history = useHistory();

  return (
    <div>
      <h2>{match.path}404 Not Found</h2>;
      <button onClick={() => { history.goBack() }} >back</button>
    </div>
  );
}

export default App;
