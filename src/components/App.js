import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Landing from "./Landing";
import Hotels from "./HotelsList";
import HotelDetails from "./HotelDetails";

const App = () => (
  <Router>
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/hotels" component={Hotels} />
        <Route path="/hotels/details" component={HotelDetails} />
      </Switch>
    </div>
  </Router>
);

export default App;
