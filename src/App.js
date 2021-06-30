import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Cars from "./containers/Cars/Cars";


function App() {
  return (
    <Router>
      <div>
          <Switch>
            <Route exact path="/" component={Cars}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;