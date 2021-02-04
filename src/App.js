import './App.css'
import NavBar from './components/NavBar'
import MoviesList from './pages/MoviesList'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/page=:page" component={MoviesList} />
          <Route path="/" exact>
            <Redirect to="/page=1" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
