import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import './bootstrap/bootstrap.min.css';
import './App.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Jumbotron } from 'react-bootstrap';
import Landing from './Landing';
import CardPage from './CardPage';

function App() {
  return (
    <Router>
      <Navbar className="Navbar-Title" bg="dark" variant="dark" expand="md">
        <Container>
          <LinkContainer to={`/`}>
            <Navbar.Brand className="NavbarTitleBrand mx-auto" href="#">
              <img
                src="/img/draft-badge.png"
                width="40"
                className="d-inline-block align-center"
                alt="Draft Badge"
              />
              <span className='NavbarTitleBrand NavbarTitleText align-middle'>upgrade.cards</span>
            </Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
      <Switch>
        <Route path='/card' component={CardPage} />
        <Route path='/' component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
