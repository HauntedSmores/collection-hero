import React, { Component } from 'react';

import {
    AppProvider,
    DisplayText,
    Layout,
    TopBar,
    Page,
    Card,
    Button
} from '@shopify/polaris';

class App extends Component {

    render() {
        return (
            <AppProvider apiKey={ process.env.REACT_APP_API_KEY }>
                <Layout>
                    <Layout.Section>
                        <DisplayText>Good evening</DisplayText>
                    </Layout.Section>
                </Layout>
            </AppProvider>
        )
    }
}

export default App;
