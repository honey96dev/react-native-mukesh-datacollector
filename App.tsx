import React, {Component} from "react";
import {Root} from 'native-base';
// @ts-ignore
import GlobalFont from 'react-native-global-font';
import AppContainer from "./src/routes";
import {setBaseURL} from "./src/apis";
import G from "./src/tools/G";

setBaseURL(G.Server.baseUrl);

export default class App extends Component<{}> {

    componentWillMount() {
        let fontName = 'Nunito-Regular';
        GlobalFont.applyGlobal(fontName);
    }

    render() {
        return (
            <Root>
                <AppContainer/>
            </Root>
        );
    }
}
