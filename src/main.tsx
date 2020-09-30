import React from 'react';
import ReactDOM from 'react-dom';

import { CustomNavbar, Ipsum } from './components';
import { Button } from './components/blueprintjs';

import './main.scss';

const App = () => (
  <>
    <CustomNavbar />
    <main className="main p-16">
      <h1>hello</h1>
      <Button icon="airplane" className="mb-28">
        weeee
      </Button>
      <Ipsum />
    </main>
  </>
);

ReactDOM.render(<App />, document.querySelector('#app'));
