import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Components from './components';
import * as Bp from './components/blueprint';

class App extends React.Component {
  render() {
    return (
      <>
        <Components.Navbar />
        <main className="main-content">
          <h1>hello</h1>
          <Bp.Button icon="airplane" text="weeeeeeee" />
        </main>
      </>
    );
  }
} 

ReactDOM.render(<App />, document.querySelector('#app'));
