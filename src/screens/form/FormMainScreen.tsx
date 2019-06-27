import React, {Component} from "react";
import {LayoutAnimation, ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input, Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Title
} from 'native-base';
// @ts-ignore
import {Colors, CommonStyles, Fonts, Metrics, Presets} from '../../theme';
// @ts-ignore
import {G, STRINGS} from "../../tools";
import {ROUTES} from "../../routes";
import {api_list, DELETE, fetch, GET} from "../../apis";
import {sprintf} from "sprintf-js";
import MyAlert from "../../components/MyAlert";
import MyConfirm from "../../components/MyConfirm";

import {connect} from 'react-redux';
import {addForm, deleteForm, editForm, listForm, setCreateFormMode} from '../../actions/forms';

interface MyProps {
    reportProcMode: string,
    forms: Array<any>,
    listForm: (forms: Array<any>) => void,
    addForm: (form: any) => void,
    deleteForm: (form: any) => void,
    editForm: (prev: any, current: any) => void,
    setCreateFormMode: (data: any) => void,
}

type Props = MyProps & NavigationScreenProps;

class FormMainScreen extends Component<Props> {
    state = {
        showAlert: false,
        alertTitle: '',
        alertMessage: '',

        showConfirm: false,
        confirmTitle: '',
        confirmMessage: '',

        searchWord: '',

        deletingFormId: -1,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        // @ts-ignore
        fetch(GET, api_list.formList, {})
            .then((response: any) => {
                // console.log(response);
                if (response.result == STRINGS.success) {
                    // this.props.navigation.navigate(ROUTES.Profile);
                    this.props.listForm(response.data);
                } else {
                    this.props.listForm([]);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.listForm([]);
            });
            // .finally(() => {
            //     this.setState({
            //         doingRegister: false,
            //     });
            // });
    }

    animateState(nextState: any | Pick<any, never> | null, delay: number = 0) {
        setTimeout(() => {
            this.setState(() => {
                LayoutAnimation.easeInEaseOut();
                return nextState;
            });
        }, delay);
    }

    hideAlert = () => {
        this.setState({
            showAlert: false,
        })
    };

    hideConfirm = () => {
        this.setState({
            showConfirm: false,
        })
    };

    onPlusButtonPressed = () => {
        this.props.setCreateFormMode({
            mode: 'create',
        });
        this.props.navigation.navigate(ROUTES.CreateForm);
    };

    onKeyValueFieldChanged = (key: any, value:any) => {
        this.setState({
            [key]: value,
        });
    };

    onKeyValueSlowFieldChanged = (key: any, value:any) => {
        this.animateState({
            [key]: value,
        }, 4000);
    };

    // onSearchButtonPressed = () => {
    //
    // };

    onListItemPressed = (value: any) => {
        // let {forms} = this.state;
        // // @ts-ignore
        // const index = columns.indexOf(value);
        // console.log(index);
        this.props.setCreateFormMode({
            mode: 'edit',
            data: value,
        });
        this.props.navigation.navigate(ROUTES.CreateForm);
    };

    onDeleteListItemButtonPressed = (value: any) => {
        let {forms} = this.props;
        // @ts-ignore
        const index = forms.indexOf(value);
        // console.log(index);
        // @ts-ignore
        const message = sprintf("Form name: %s", value.name);
        this.setState({
            deletingFormId: value._id,
            showConfirm: true,
            confirmTitle: STRINGS.delete,
            confirmMessage: message,
        });
    };

    onDeleteForm = () => {
        // @ts-ignore
        fetch(DELETE, api_list.formDelete, {_id: this.state.deletingFormId})
            .then((response: any) => {
                this.setState({
                    showConfirm: false,
                    showAlert: true,
                    alertTitle: response.result,
                    alertMessage: response.message,
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    showConfirm: false,
                    showAlert: true,
                    alertTitle: STRINGS.error,
                    alertMessage: STRINGS.unknownServerError,
                });
            })
            .finally(() => {
                // @ts-ignore
                fetch(GET, api_list.formList, {})
                    .then((response: any) => {
                        // console.log(response);
                        if (response.result == STRINGS.success) {
                            // this.props.navigation.navigate(ROUTES.Profile);
                            this.props.listForm(response.data);
                        } else {
                            this.props.listForm([]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.listForm([]);
                    });
            });
    };

    render() {
        const self = this;
        const {showConfirm, confirmTitle, confirmMessage, showAlert, alertTitle, alertMessage, searchWord} = self.state;
        const searchWord2 = searchWord.length > 2 ? searchWord : '';
        const {forms, reportProcMode} = self.props;
        const userRole = G.UserProfile.data.role;
        console.log(forms);
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
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{STRINGS.formMain}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                        {userRole == STRINGS.admin && <Button
                            transparent
                            onPress={self.onPlusButtonPressed}
                        >
                            <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"} name="plus"/>
                        </Button>}
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <Item regular style={styles.credentialItem}>
                        <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'search'}/>
                        <Input style={[styles.credential, Presets.textFont.regular]} value={searchWord} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.search} onChangeText={(text) => self.onKeyValueFieldChanged('searchWord', text)}/>
                        {/*<Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'arrow-right'} onPress={}/>*/}
                    </Item>
                    <ScrollView style={styles.scrollSec}>
                        <List style={styles.scrollSec}>
                            {forms.map((value: any) => {
                                if (value.name.includes(searchWord2)) {
                                    return (
                                        <ListItem style={styles.listItem} onPress={() => self.onListItemPressed(value)}>
                                            {/*<Left style={styles.listItemLeft}>*/}
                                            {/*<Label style={Presets.h5.regular}>Name:</Label>*/}
                                            {/*<Label style={Presets.h6.regular}>Columns Count:</Label>*/}
                                            {/*</Left>*/}
                                            <Body>
                                            <Label style={Presets.h5.regular}>{value.autoIndex}. {value.name}</Label>
                                            {/*<Label style={Presets.h6.regular}>Columns*/}
                                                {/*Count: {value.columns.length}</Label>*/}
                                            <Label style={Presets.h6.regular}>Modified
                                                Date: {value.lastModifiedDate}</Label>
                                            {/*<Label style={Presets.h6.regular}>{columnIdx}</Label>*/}
                                            </Body>
                                            <Right>
                                                {userRole == STRINGS.admin && <Button
                                                    transparent
                                                    onPress={() => self.onDeleteListItemButtonPressed(value)}
                                                >
                                                    <Label style={Presets.h6.regular}>#{value.columns.length}</Label>
                                                    <Icon
                                                        style={[Presets.h3.regular, CommonStyles.headerIcon, styles.listItemDeleteIcon]}
                                                        type={"FontAwesome5"} name="times"/>
                                                </Button>}
                                            </Right>
                                        </ListItem>
                                    );
                                }
                            })}
                        </List>
                    </ScrollView>
                    </Body>
                </Content>
                {MyAlert(showAlert, alertTitle, alertMessage, self.hideAlert)}
                {MyConfirm(showConfirm, confirmTitle, confirmMessage, self.hideConfirm, self.onDeleteForm)}
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
    credentialSec: {
        width: '100%',
        // marginTop: Metrics.baseDoubleMargin,
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
    scrollSec: {
        width: '100%',
        // marginTop: Metrics.baseDoubleMargin,
        // flexDirection: 'column',
        // alignItems: "flex-start",
    },
    listItem: {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    listItemLeft: {
        width: Metrics.doubleSection,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    listItemDeleteIcon: {
        marginRight: 0,
        color: Colors.danger,
    },
    listItemAddButton: {
        marginTop: Metrics.baseMargin,
        width: '100%',
        // height: Metrics.section,
        // flexDirection: "column",
        justifyContent: "center",
        borderRadius: Metrics.baseDoubleRadius,
    },

});

const mapStateToProps = (state: any) => {
    // console.log(state);
    return {
        forms: state.forms.forms,
        reportProcMode: state.reports.reportProcMode,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        listForm: (forms: any) => {
            dispatch(listForm(forms));
        },
        addForm: (form: any) => {
            dispatch(addForm(form));
        },
        deleteForm: (form: any) => {
            dispatch(deleteForm(form));
        },
        editForm: (prev: any, current: any) => {
            dispatch(editForm(prev, current));
        },
        setCreateFormMode: (data: any) => {
            dispatch(setCreateFormMode(data));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(FormMainScreen);
