import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Resgister from './pages/Resgister';
import MyStory from './pages/MyStory';
import NewStory from './pages/NewStory';
import Story from './pages/Story';
import Profile from './pages/Profile';
import Search from './pages/Search';


import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={Login} exact />
        <Route path="/signup" component={Resgister} />
        <PrivateRoutes path="/new-story" component={NewStory} />
        <Route path="/my-story" component={MyStory} />
        <Route path="/story/:id" component={Story} exact />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/search/:query" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
