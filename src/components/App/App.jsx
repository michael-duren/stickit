import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SessionPage from '../SessionPage/SessionPage';

import HomePage from '../HomePage/HomePage';
import TimeSelectionPage from '../TimeSelectionPage/TimeSelectionPage';
import NotFound from '../NotFoundPage/NotFoundPage';

import './App.css';
import '../../fonts/OpenSans-Italic.ttf';
import '../../fonts/OpenSans.ttf';
import FocusSelectionPage from '../FocusSelectionPage/FocusSelectionPage';
import SessionSelectionPage from '../SessionSelectionPage/SessionSelectionPage';
import TypeSelectionPage from '../TypeSelectionPage/TypeSelectionPage';
import { SESSION_FORM_SAGA_ACTIONS } from '../../redux/actions/session-form.saga.actions';
import Routes from '../Routes/Routes';
import SessionCompletePage from '../SessionCompletePage/SessionCompletePage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: SESSION_FORM_SAGA_ACTIONS.GET_TYPES }); // get types on intial load
  }, [dispatch]);

  return (
    <Router>
      <div className="background-primary-grey full-height">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to={Routes.Login} />

          <Route exact path={Routes.Login}>
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to={Routes.Home} />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path={Routes.About}
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.User}
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.TimeSelection}
          >
            <TimeSelectionPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path={Routes.Home}
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path={Routes.Info}
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute path={Routes.SessionType}>
            <TypeSelectionPage />
          </ProtectedRoute>

          <ProtectedRoute path={Routes.SessionFocus}>
            <FocusSelectionPage />
          </ProtectedRoute>

          <ProtectedRoute exact path={Routes.SessionPage}>
            <SessionPage />
          </ProtectedRoute>

          <ProtectedRoute exact path={Routes.SessionSummary}>
            <SessionSelectionPage />
          </ProtectedRoute>

          <ProtectedRoute exact path={Routes.SessionSummaryComplete}>
            <SessionCompletePage />
          </ProtectedRoute>

          <Route exact path={Routes.Login}>
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to={Routes.Home} />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path={Routes.Registration}>
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to={Routes.Home} />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

//create endpoint to update exercise when someone completes and exercise
//
