import React, {Component} from "react";
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Right, Spinner, Text,
    Title,
    View,
    Switch, Picker
} from 'native-base';
// @ts-ignore
import {Colors, CommonStyles, Fonts, Metrics, Presets} from '../../theme';
// @ts-ignore
import {STRINGS} from "../../tools";

interface MyProps {

}

type Props = MyProps & NavigationScreenProps;

export default class ProfileScreen extends Component<Props> {
    state = {

    };

    constructor(props: Props) {
        super(props);
    }

    render() {
        const self = this;
        const {} = self.state;
        return (
            <Container style={styles.container}>
                <Header
                    style={CommonStyles.header}>
                    <Left style={CommonStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} name="menu"/>
                        </Button>
                    </Left>
                    <Body style={CommonStyles.headerBody}>
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{STRINGS.createForm}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <ScrollView style={styles.scrollSec}>

                    </ScrollView>
                    </Body>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.mainBackground,
    },
    content: {
        padding: Metrics.baseMargin,
        paddingTop: Metrics.basePadding + Metrics.statusBarHeight,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    body: {
        width: '100%',
        height: '100%',
    },
    scrollSec: {
        width: '100%',
        // marginTop: Metrics.baseDoubleMargin,
        // flexDirection: 'column',
        // alignItems: "flex-start",
    },

});
