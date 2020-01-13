import React from 'react';
import 'jquery';
import 'bootstrap/js/dist/tab';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './templates/Home'
import Category from './templates/Category'
import ProductDescription from './templates/ProductDescription'
import Items from './templates/Items'


import Confirmation from './templates/Confirmation'
import Bag from './templates/Bag'
import './App.scss';



function App() {

 
  
  return (
  
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
      </Switch>
      
    </React.Fragment>
    
  </BrowserRouter>
     
  );
}

export default App;
