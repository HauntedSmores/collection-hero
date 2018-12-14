import React, { Component } from 'react';
import '@shopify/polaris/styles.css';
import {AppProvider, Heading, ResourcePicker, Page, Card, Button} from '@shopify/polaris';

class App extends Component {

    render() {
        console.log(process.env);
        return (
            <AppProvider apiKey={process.env.REACT_APP_API_KEY}>
                <Heading>Collection Hero</Heading>
            </AppProvider>
        );
    }
}

export default App;
