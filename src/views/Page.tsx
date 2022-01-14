import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PageExtensionSDK } from '@contentful/app-sdk';
import Home from './Home';
import Importing from './importing';
interface PageProps {
  sdk: PageExtensionSDK;
}

const Page = (props: PageProps) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/importing">
          <Importing />
        </Route>
      </Switch>
    </Router>
  );
};

export default Page;
