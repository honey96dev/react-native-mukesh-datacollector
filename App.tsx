import React, {Component} from "react";
import {Root} from 'native-base';
// @ts-ignore
import GlobalFont from 'react-native-global-font';
import AppContainer from "./src/routes";
import {setBaseURL} from "./src/apis";
import G from "./src/tools/G";
import { Provider } from 'react-redux';
import configureStore from './src/store';

setBaseURL(G.Server.baseUrl);

const store = configureStore();

export default class App extends Component<{}> {

    componentWillMount() {
        let fontName = 'Nunito-Regular';
        GlobalFont.applyGlobal(fontName);
    }

    render() {
        return (
            <Provider store={store}>
                <Root>
                    <AppContainer/>
                </Root>
            </Provider>
        );
    }
}
