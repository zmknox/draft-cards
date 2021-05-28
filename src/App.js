import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import './bootstrap/bootstrap.min.css';
import Landing from './Landing';
import CardPage from './CardPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/card' component={CardPage} />
        <Route path='/' component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
