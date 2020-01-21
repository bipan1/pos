import React from 'react';
import 'jquery';
import 'bootstrap/js/dist/tab';
import store from './redux/store';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './templates/Home';
import Category from './templates/Category';
import ProductDescription from './templates/ProductDescription';
import Items from './templates/Items';
// import Detail from './templates/Detail';
import {Provider} from 'react-redux';
import Confirmation from './templates/Confirmation';
import Bag from './templates/Bag';
import './App.scss';



function App() {
  
  return (
    <Provider store={store}>
  
    <BrowserRouter>
    <React.Fragment>
      
      <Switch>
        <Redirect from="/home" to="/"/>
        <Route exact path="/" component={Home}/>
        <Route path="/category" component={Category}/>
        <Route path="/product" component={ProductDescription}/>
        <Route path="/confirmation" component={Confirmation}/>
        <Route path="/bag" component={Bag}/>
        <Route path="/items" component={Items}/>
        {/* <Route path="/detail" component={Detail} /> */}
      </Switch>
      
    </React.Fragment>
    
  </BrowserRouter>
  </Provider>
     
  );
}

export default App;
