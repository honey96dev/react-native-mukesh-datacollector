import React, {Component} from "react";
import {StyleSheet} from 'react-native';
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
    Label, Left, Picker, Right,
    Spinner,
    Text, Title,
    Toast,
    View
} from 'native-base';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AutoHeightImage from 'react-native-auto-height-image';
import {Colors, CommonStyles, Fonts, Images, Metrics, Presets} from '../../theme';
import {G, NUMBERS, STRINGS} from '../../tools';
import {ROUTES} from "../../routes";
import MyAlert from "../../components/MyAlert";
import {api_list, fetch, POST} from "../../apis";

interface MyProps {

}

type Props = MyProps & NavigationScreenProps;

export default class SignUpScreen extends Component<Props> {
    roles = [
        {label: STRINGS.admin, value: STRINGS.admin},
        {label: STRINGS.folderManager, value: STRINGS.folderManager},
        {label: STRINGS.folderUser, value: STRINGS.folderUser},
    ];
    state = {
        showPassword: false,
        showPassword2: false,

        email: '',
        name: '',
        password: '',
        password2: '',
        role: this.roles[2].value,

        doingRegister: false,
        didRegister: false,

        showAlert: false,
        alertTitle: '',
        alertMessage: '',
    };
    constructor(props: Props) {
        super(props);
    }

    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
    };

    onKeyValueFieldChanged = (key: string, text: string) => {
        this.setState({
            [key]: text,
        })
    };

    onKeyValueFieldToggled = (key: string) => {
        // @ts-ignore
        let value: boolean = this.state[key];
        this.setState({
            [key]: !value,
        })
    };

    onRegisterButtonPressed = () => {
        const self = this;
        let {email, name, password, password2, role} = self.state;
        console.log(role);
        email = email.trim();
        name = name.trim();
        if (email.length == 0) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.email,
                alertMessage: STRINGS.emailRequired,
            });
            return;
        } else if (!G.isValidEmail(email)) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.email,
                alertMessage: STRINGS.emailInvalid,
            });
            return;
        }

        if (name.length == 0) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.name,
                alertMessage: STRINGS.usernameRequired,
            });
            return;
        }

        if (password.length == 0) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.password,
                alertMessage: STRINGS.passwordRequired,
            });
            return;
        }

        if (password2.length == 0) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.password2,
                alertMessage: STRINGS.password2Required,
            });
            return;
        } else if (password2 != password) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.password2,
                alertMessage: STRINGS.password2Mismatched,
            });
            return;
        }

        this.setState({
            doingRegister: true,
        });

        // @ts-ignore
        fetch(POST, api_list.register, {email, name, password, role})
            .then((response: any) => {
                console.log(response);
                if (response.result == STRINGS.success) {
                    // this.props.navigation.navigate(ROUTES.Profile);
                    this.setState({
                        showAlert: true,
                        alertTitle: response.result,
                        alertMessage: response.message,
                    });
                } else {
                    this.setState({
                        showAlert: true,
                        alertTitle: response.result,
                        alertMessage: response.message,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    showAlert: true,
                    alertTitle: STRINGS.error,
                    alertMessage: STRINGS.unknownServerError,
                });
            })
            .finally(() => {
                this.setState({
                    doingRegister: false,
                });
            });

        // setTimeout(() => {
        //     this.setState({
        //         doingRegister: false,
        //     });
        //     Toast.show({
        //         text: STRINGS.registrationSuccess,
        //         buttonText: STRINGS.okay,
        //         duration: NUMBERS.toastShowTime2,
        //         buttonStyle: { backgroundColor: Colors.colorSuccess },
        //     });
        // }, 1000);
    };

    onAlreadyRegisteredButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.SignIn);
    };

    render() {
        const self = this;
        const {showPassword, showPassword2, email, name, password, password2, role, doingRegister, showAlert, alertTitle, alertMessage} = self.state;
        const roles = self.roles;
        return (
            <Container style={styles.container}>
                {/*<Header style={CommonStyles.header}>*/}
                    {/*<Left style={CommonStyles.headerLeft} >*/}
                        {/*<Button*/}
                            {/*transparent*/}
                            {/*onPress={self.onBackButtonPressed} >*/}
                            {/*<Icon style={Presets.h3.regular} type={"FontAwesome5"} name="angle-left"/>*/}
                        {/*</Button>*/}
                    {/*</Left>*/}
                    {/*<Body style={CommonStyles.headerBody}>*/}
                    {/*<Title style={Presets.h4.bold}>{STRINGS.signUp}</Title>*/}
                    {/*</Body>*/}
                    {/*<Right style={CommonStyles.headerRight}>*/}
                    {/*</Right>*/}
                {/*</Header>*/}
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <View style={styles.waveSec}>
                        <Label style={[CommonStyles.title, Presets.h3.bold, styles.title]}>{STRINGS.signUp}</Label>
                        <AutoHeightImage style={styles.banner} source={Images.banner} width={wp(100)}/>
                    </View>
                    <Label style={[CommonStyles.title, Presets.titleFont.regular]}></Label>
                    {/*<Label style={[styles.title, Presets.titleFont.regular]}>{STRINGS.signUp}</Label>*/}
                    <View style={styles.credentialSec}>
                        <Item regular style={styles.credentialItem}>
                            <Icon style={styles.credentialIcon} type={'FontAwesome'} name={'envelope'}/>
                            <Input disabled={!!doingRegister} style={[styles.credential, Presets.textFont.regular]} value={email} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.email} onChangeText={(text) => self.onKeyValueFieldChanged('email', text)}/>
                        </Item>
                        <Item regular style={styles.credentialItem}>
                            <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'user-alt'}/>
                            <Input disabled={!!doingRegister} style={[styles.credential, Presets.textFont.regular]} value={name} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.name} onChangeText={(text) => self.onKeyValueFieldChanged('name', text)}/>
                        </Item>
                        <Item regular style={styles.credentialItem}>
                            <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'key'}/>
                            <Input disabled={!!doingRegister} style={[styles.credential, Presets.textFont.regular]} value={password} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.password} secureTextEntry={!showPassword} onChangeText={(text) => self.onKeyValueFieldChanged('password', text)}/>
                            <Icon style={styles.credentialIcon} type={'FontAwesome5'}
                                  name={showPassword ? 'eye-slash' : 'eye'} onPress={() => {!doingRegister && self.onKeyValueFieldToggled('showPassword')}}/>
                        </Item>
                        <Item regular style={styles.credentialItem}>
                            <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'check'}/>
                            <Input disabled={!!doingRegister} style={[styles.credential, Presets.textFont.regular]} value={password2} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.password2} secureTextEntry={!showPassword2} onChangeText={(text) => self.onKeyValueFieldChanged('password2', text)}/>
                            <Icon style={styles.credentialIcon} type={'FontAwesome5'}
                                  name={showPassword2 ? 'eye-slash' : 'eye'} onPress={() => {!doingRegister && self.onKeyValueFieldToggled('showPassword2')}}/>
                        </Item>
                        <Item regular style={styles.credentialItem}>
                        <Picker

                            mode="dropdown"
                            // iosHeader="Select Language"
                            // iosIcon={<Icon type={"FontAwesome5"} name={"caret-down"} style={{ color: Colors.mainForeground, fontSize: 25 }} />}
                            note={false}
                            style={[Presets.textFont.regular, styles.rolePicker]}
                            selectedValue={role}
                            placeholder={STRINGS.selectRole}
                            // placeholderStyle={{ color: "#bfc6ea" }}
                            onValueChange={(value) => self.onKeyValueFieldChanged('role', value)}
                        >
                            {roles.map((item: any, key) => {
                                let label = item.label;
                                let value = item.value;
                                return (
                                    <Picker.Item key={value} label={label} value={value}/>
                                );
                            })}
                            {/*<Picker.Item label="User1" value="en" />*/}
                            {/*<Picker.Item label="Vietnamese" value="vt" />*/}
                        </Picker>
                        </Item>
                    </View>
                    <View style={styles.buttonsSec}>
                        <View style={styles.buttonInnerSec}>
                            {/*<Button disabled={!!doingSignin} transparent iconLeft style={[styles.flatButton]}*/}
                            {/*onPress={self.onForgetPasswordButtonPressed}>*/}
                            {/*<Text uppercase={false} style={[Presets.textFont.semiBold, styles.flatButtonText]}>{STRINGS.forgotPassword}</Text>*/}
                            {/*</Button>*/}
                            <Button disabled={!!doingRegister} primary iconLeft style={[Presets.primaryButton, styles.button]}
                                    onPress={self.onRegisterButtonPressed}>
                                {!!doingRegister ? <Spinner color={Colors.primaryButtonText}/> : <Icon style={Presets.textFont.regular} type={"FontAwesome5"} name={"user-plus"}/>}
                                {!doingRegister && <Text uppercase={false} style={[Presets.textFont.semiBold]}>{STRINGS.registration}</Text>}
                            </Button>
                            <Button disabled={!!doingRegister} transparent style={[styles.flatButton]}
                                    onPress={self.onAlreadyRegisteredButtonPressed}>
                                <Text uppercase={false} style={[Presets.textFont.semiBold]}>{STRINGS.alreadyRegistered}</Text>
                            </Button>
                        </View>
                    </View>
                    </Body>
                    {/*<AwesomeAlert*/}
                        {/*show={showAlert}*/}
                        {/*showProgress={false}*/}
                        {/*title={alertTitle}*/}
                        {/*titleStyle={[Presets.h4.regular]}*/}
                        {/*message={alertMessage}*/}
                        {/*messageStyle={[Presets.textFont.regular]}*/}
                        {/*closeOnTouchOutside={true}*/}
                        {/*closeOnHardwareBackPress={true}*/}
                        {/*showCancelButton={true}*/}
                        {/*showConfirmButton={false}*/}
                        {/*cancelText="Okay"*/}
                        {/*cancelButtonColor={Colors.primaryButtonBackground}*/}
                        {/*cancelButtonTextStyle={[*/}
                            {/*Presets.textFont.regular, {color: Colors.secondaryButtonText}]}*/}
                        {/*onCancelPressed={() => {*/}
                            {/*this.hideAlert();*/}
                        {/*}}*/}
                    {/*/>*/}
                </Content>
                {MyAlert(showAlert, alertTitle, alertMessage, self.hideAlert)}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.mainBackground,
    },
    content: {
        padding: Metrics.basePadding,
        paddingTop: Metrics.statusBarHeight,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    body: {
        width: '100%',
        height: '100%',
    },
    waveSec: {
        height: hp(25),
        // backgroundImage: Images.wave,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginTop: Metrics.baseMargin,
        // position: 'absolute',
        // marginTop: - hp(15),
        color: Colors.title,
    },
    banner: {
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
    rolePicker: {
        // flex: 1,
        width: '100%',
        color: Colors.textForeground,
    },
    buttonsSec: {
        position: 'absolute',
        width: '100%',
        marginStart: Metrics.baseMargin,
        marginEnd: Metrics.baseMargin,
        paddingStart: Metrics.basePadding,
        paddingEnd: Metrics.basePadding,
        bottom: 0,
        // marginTop: Metrics.baseMargin,
        // height: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buttonInnerSec: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: Metrics.section,
        // flexDirection: "column",
        justifyContent: "center",
        borderRadius: Metrics.baseDoubleRadius,
    },
    flatButton: {
        marginTop: Metrics.baseMargin,
        width: '100%',
        // flexDirection: "column",
        justifyContent: "center",
    },
    buttonText: {
        // textDecorationStyle: 'unset',
    },
    flatButtonText: {
        color: Colors.primaryButtonBackground,
        paddingRight: 0,
    },
    term: {
        marginTop: Metrics.baseMargin,
        marginBottom: 0,
        padding: Metrics.basePadding,
        paddingBottom: 0,
        color: Colors.placeholder,
        justifyContent: "center",
    },
});
