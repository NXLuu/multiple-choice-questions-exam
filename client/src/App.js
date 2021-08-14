import './App.css';
import { LoginForm } from './Components/LoginForm';
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
import React from 'react';
import Exam from './Components/Exam';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/exam">Exam</Link>
            </li>
            <li>
              <Link to="/about?name=luu&id=luu">About</Link>
            </li>
            <li>
              <Link to="/404">Not Found</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/exam">
            <Exam  />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  let location = useLocation();
  console.log(location);

  let match = useRouteMatch();
  console.log(match);

  let query = new URLSearchParams(location.search);

  return <h2>About {query.get('name')} - {query.get('id')}</h2>;
}

// function Users() {
//   let { name, id } = useParams();

//   return <h2>Users {name} - {id}</h2>;
// }

// class Users extends React.Component {

//   render() {
//     let { match } = this.props;
//     console.log(match.params);
//     let {name , id} = match.params;
//     return <h2>Users {name} - {id}</h2>;
//   }
// }

// const UsersWithClassRouter = withRouter(Users);

function NotFound() {
  let location = useLocation();
  console.log(location);

  let match = useRouteMatch();
  console.log(match);

  let history = useHistory();

  return (
    <div>
      <h2>{match.path}404 Not Found</h2>;
      <button onClick={() => {history.goBack()}} >back</button>
    </div>
  );
}
// class NotFound extends React.Component {
//   render() {
//     let {location, history, match} = this.props;
//     return (
//       <div>
//         <h2>{match.path}404 Not Found</h2>;
//         <button onClick={() => { history.goBack() }} >back</button>
//       </div>
//     )
//   };
// }

// const NotFountClassWithRouter = withRouter(NotFound);

export default App;
