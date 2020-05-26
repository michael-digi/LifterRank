import React, { useEffect } from 'react';
import LandingPage from './Pages/LandingPage';
import ResultsPage from './Pages/ResultsPage';
import Login from './Pages/LoginPage';
import SignUp from './Pages/SignUpPage';
import axios from 'axios'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import { ProtectedRoute, AuthRoute } from "./utils/routeAuth";
import Cookies from 'js-cookie';
import { setUserInfo, setUserTokenStatus } from './actions'
import { useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch()
	
	useEffect(() => {
		if (Cookies.get('token')) {
			async function verifyToken() {
				let userCheck = await axios.get('/verifyToken')
				let { expired, message, user } = userCheck.data
				if ( expired || message === 'invalid token') dispatch(setUserTokenStatus(false))
				else {
					if (user.uuid) {
						dispatch(setUserInfo(user))
					  dispatch(setUserTokenStatus(true))
					}
				}
			}
			verifyToken()
		}
		else dispatch(setUserTokenStatus(false))
	},[])
	
	return (
    <BrowserRouter>
			<Switch>
				<Route path = "/" exact component = {LandingPage} />
				<Route path = "/home" exact component = {LandingPage} />
				<Route path = "/results" exact component = {ResultsPage} />
        <AuthRoute path = "/login" exact component = {Login} />
				<AuthRoute path = "/signup" exact component = {SignUp} />
				<ProtectedRoute path = "/dashboard" component = {DashboardPage}/>
			</Switch>
		</BrowserRouter>
  );
}

export default App;