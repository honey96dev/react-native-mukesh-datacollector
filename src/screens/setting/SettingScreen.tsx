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
        loginPassword: '',
        loginPassword2: '',
        paymentPassword: '',
        paymentPassword2: '',
        googleAuthentication: false,
        language: 'en',

        showLoginPassword: false,
        showLoginPassword2: false,
        showPaymentPassword: false,
        showPaymentPassword2: false,

        doingChangeLoginPassword: false,
        doingChangePaymentPassword: false,
        doingSave: false,
    };

    constructor(props: Props) {
        super(props);
    }

    onKeyValueFieldChanged = (key: string, value: any) => {
        this.setState({
            [key]: value,
        });
    };

    onKeyValueFieldToggled = (key: string) => {
        // @ts-ignore
        let value:boolean = this.state[key];
        this.setState({
            [key]: !value,
        });
    };

    onChangeLoginPasswordButtonPressed = () => {

    };

    onChangePaymentPasswordButtonPressed = () => {

    };

    render() {
        const self = this;
        const {loginPassword, loginPassword2, paymentPassword, paymentPassword2, googleAuthentication, language, showLoginPassword, showLoginPassword2, showPaymentPassword, showPaymentPassword2, doingChangeLoginPassword, doingChangePaymentPassword, doingSave} = self.state;
        return (
            <Container style={styles.container}>
                <Header
                    style={CommonStyles.header}>
                    <Left style={CommonStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon style={Presets.h3.regular} name="menu"/>
                        </Button>
                    </Left>
                    <Body style={CommonStyles.headerBody}>
                    <Title style={Presets.h4.bold}>{STRINGS.setting}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <ScrollView style={styles.scrollSec}>
                        <Label style={[CommonStyles.title, styles.title]}>{STRINGS.loginPassword}</Label>
                        <View style={styles.credentialSec}>
                            <Item regular style={styles.credentialItem}>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'key'}/>
                                <Input disabled={!!doingChangeLoginPassword} style={[styles.credential, Presets.textFont.regular]} value={paymentPassword} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.password} secureTextEntry={!showLoginPassword} onChangeText={(text) => self.onKeyValueFieldChanged('paymentPassword', text)}/>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'}
                                      name={showLoginPassword ? 'eye-slash' : 'eye'} onPress={() => {!doingChangeLoginPassword && self.onKeyValueFieldToggled('showLoginPassword')}}/>
                            </Item>
                            <Item regular style={styles.credentialItem}>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'equals'}/>
                                <Input disabled={!!doingChangeLoginPassword} style={[styles.credential, Presets.textFont.regular]} value={loginPassword2} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.password2} secureTextEntry={!showLoginPassword2} onChangeText={(text) => self.onKeyValueFieldChanged('loginPassword2', text)}/>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'}
                                      name={showLoginPassword2 ? 'eye-slash' : 'eye'} onPress={() => {!doingChangeLoginPassword && self.onKeyValueFieldToggled('showLoginPassword2')}}/>
                            </Item>
                            <Button disabled={!!doingChangeLoginPassword} iconLeft
                                    style={[Presets.primaryButton, styles.button]}
                                    onPress={self.onChangeLoginPasswordButtonPressed}>
                                {!!doingChangeLoginPassword ? <Spinner color={Colors.primaryButtonText}/> :
                                    <Icon type={"FontAwesome5"} name={"check"}/>}
                                <Text uppercase={false} style={[Presets.textFont.semiBold]}>{STRINGS.change}</Text>
                            </Button>
                        </View>
                        <Label style={[CommonStyles.title, styles.title]}>{STRINGS.paymentPassword}</Label>
                        <View style={styles.credentialSec}>
                            <Item regular style={styles.credentialItem}>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'key'}/>
                                <Input disabled={!!doingChangePaymentPassword} style={[styles.credential, Presets.textFont.regular]} value={paymentPassword} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.paymentPassword} secureTextEntry={!showPaymentPassword} onChangeText={(text) => self.onKeyValueFieldChanged('paymentPassword', text)}/>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'}
                                      name={showPaymentPassword ? 'eye-slash' : 'eye'} onPress={() => {!doingChangePaymentPassword && self.onKeyValueFieldToggled('showPaymentPassword')}}/>
                            </Item>
                            <Item regular style={styles.credentialItem}>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'equals'}/>
                                <Input disabled={!!doingChangePaymentPassword} style={[styles.credential, Presets.textFont.regular]} value={paymentPassword2} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.password2} secureTextEntry={!showPaymentPassword2} onChangeText={(text) => self.onKeyValueFieldChanged('paymentPassword2', text)}/>
                                <Icon style={styles.credentialIcon} type={'FontAwesome5'}
                                      name={showPaymentPassword2 ? 'eye-slash' : 'eye'} onPress={() => {!doingChangePaymentPassword && self.onKeyValueFieldToggled('showPaymentPassword2')}}/>
                            </Item>
                            <Button disabled={!!doingChangeLoginPassword} iconLeft
                                    style={[Presets.primaryButton, styles.button]}
                                    onPress={self.onChangePaymentPasswordButtonPressed}>
                                {!!doingChangeLoginPassword ? <Spinner color={Colors.primaryButtonText}/> :
                                    <Icon type={"FontAwesome5"} name={"check"}/>}
                                <Text uppercase={false} style={[Presets.textFont.semiBold]}>{STRINGS.change}</Text>
                            </Button>
                        </View>
                        <Label style={[CommonStyles.title, styles.title]}>{STRINGS.oAuth}</Label>
                        <View style={[styles.credentialSec, styles.rowLinearContainer]}>
                            <Body>
                            <Label style={[Presets.textFont.regular, styles.itemLabel]}>{STRINGS.googleAuthentication}</Label>
                            </Body>
                            <Right>
                                <Switch trackColor={{false: Colors.placeholder, true: Colors.placeholder}} value={googleAuthentication} onValueChange={() => self.onKeyValueFieldToggled('googleAuthentication')}/>
                            </Right>
                        </View>
                        <Label style={[CommonStyles.title, styles.title]}>{STRINGS.language}</Label>
                        <View style={[styles.credentialSec, styles.rowLinearContainer]}>
                            <Body>
                            <Label style={[Presets.textFont.regular, styles.itemLabel]}>{STRINGS.googleAuthentication}</Label>
                            </Body>
                            <Right>
                                <Picker
                                    
                                    mode="dropdown"
                                    iosHeader="Select Language"
                                    iosIcon={<Icon type={"FontAwesome5"} name={"caret-down"} style={{ color: Colors.mainForeground, fontSize: 25 }} />}

                                    style={[Presets.textFont.regular, styles.languagePicker]}
                                    selectedValue={language}
                                    onValueChange={(value) => self.onKeyValueFieldChanged('language', value)}
                                >
                                    <Picker.Item label="English" value="en" />
                                    <Picker.Item label="Vietnamese" value="vt" />
                                </Picker>
                            </Right>
                        </View>
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
    title: {
        marginTop: Metrics.smallMargin,
    },
    credentialSec: {
        width: '100%',
        padding: Metrics.basePadding,
    },
    credentialItem: {
        marginTop: Metrics.baseMargin,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: Metrics.tinyPadding,
        paddingRight: Metrics.tinyPadding,
        // marginBottom: 0,
        backgroundColor: Colors.textBackground,
        borderRadius: Metrics.baseDoubleRadius,
        borderColor: Colors.textBorder,
    },
    credentialIcon: {
        margin: 0,
        color: Colors.placeholder,
        fontSize: Fonts.Size.text,
    },
    credential: {
        color: Colors.textForeground,
    },

    rowLinearContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLabel: {
        color: Colors.mainForeground,
    },

    button: {
        marginTop: Metrics.baseMargin,
        width: '100%',
        height: Metrics.section,
        // flexDirection: "column",
        justifyContent: "center",
        borderRadius: Metrics.baseDoubleRadius,
    },
    languagePicker: {
        // flex: 1,
        width: 120,
        color: Colors.mainForeground,
    },
});
