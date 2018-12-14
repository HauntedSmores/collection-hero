import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@shopify/polaris/styles.css';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <AppProvider>
          <Page title="Example app">
            <Card sectioned>
              <Button onClick={() => alert('Button clicked!')}>Example button</Button>
            </Card>
          </Page>
        </AppProvider>
      </div>
    );
  }
}

export default App;
