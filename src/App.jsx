import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import './bootstrap/bootstrap.min.css';
import './App.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Jumbotron } from 'react-bootstrap';
import ScrollToTop from './ScrollToTop.jsx';
import Landing from './Landing.jsx';
import AllCards from './AllCards.jsx';
import Rules from './Rules.jsx';
import CardPage from './CardPage.jsx';
import TagPage from './TagPage.jsx';
import TagLanding from './TagLanding.jsx';
// import CardPagePrint from './CardPagePrint.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Navbar className="Navbar-Title" bg="dark" variant="dark" expand="md">
          <Container>
            <LinkContainer to={`/`}>
              <Navbar.Brand className="NavbarTitleBrand mx-auto" href="#">
                <img
                  src="/img/draft-badge.png"
                  width="40"
                  className="Navbar-Title-Img d-inline-block align-center"
                  alt="Draft Badge"
                />
                <span className='NavbarTitleBrand NavbarTitleText align-middle'>upgrade.cards</span>
              </Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
        <Switch>
          {/* <Route path='/print' component={CardPagePrint} /> */}
          <Route path='/card' component={CardPage} />
          <Route path='/cards' component={AllCards} />
          <Route path='/tag' component={TagPage} />
          <Route path='/tags' component={TagLanding} />
          <Route path='/rules' component={Rules} />
          <Route path='/' component={Landing} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
