import './App.css';
//import './bootstrap/bootstrap.min.css';
import DraftCard from './DraftCard'

import * as cardIndex from './card-index.json';

function App() {
  return (
    <div className="App">
      <DraftCard cardData={cardIndex[0].cards[0]} />
    </div>
  );
}

export default App;
