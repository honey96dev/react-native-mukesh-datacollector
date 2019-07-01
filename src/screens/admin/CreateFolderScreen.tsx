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
    Left,
    Right,
    Tab,
    TabHeading,
    Tabs,
    Text,
    Title,
} from 'native-base';
// @ts-ignore
import {Colors, CommonStyles, Fonts, Metrics, Presets} from '../../theme';
// @ts-ignore
import {G, STRINGS} from "../../tools";
import {ROUTES} from "../../routes";
import MyAlert from "../../components/MyAlert";
import {api_list, fetch, GET, POST, PUT} from "../../apis";

import {connect} from 'react-redux';
import {addFolder, deleteFolder, editFolder, listFolder, listManager2Folders, listUser2Folders} from '../../actions/folders';
import {listReport} from '../../actions/reports';
import CreateFolderFormsTab from './CreateFolderFormsTab';
import CreateFolderUsersTab from './CreateFolderUsersTab';

interface MyProps {
    folders: Array<any>,
    createFolderMode: any,
    listFolder: (folders: Array<any>) => void,
    addFolder: (folder: any) => void,
    deleteFolder: (folder: any) => void,
    editFolder: (folder: any) => void,
    listReport: (items: Array<any>) => void,
    listManager2Folders: (items: Array<any>) => void,
    listUser2Folders: (items: Array<any>) => void,
}

type Props = MyProps & NavigationScreenProps;

class CreateFolderScreen extends Component<Props> {
    newItemTypes = [
        {label: 'Text', value: 'Text'},
        {label: 'Calendar', value: 'Calendar'},
        {label: 'Dropdown', value: 'Dropdown'},
        {label: 'Checkbox', value: 'Checkbox'},
    ];

    state = {
        // showModal: false,
        // modalTitle: '',
        // modalMethod: '',

        showAlert: false,
        alertTitle: '',
        alertMessage: '',

        name: '',
        forms: [],
        users: [],
        formArray: [],
        userArray: [],
        formChecked: [],
        userChecked: [],

        doingSave: false,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        const self = this;
        if (this.props.createFolderMode.mode == 'edit') {
            const {name, forms, users} = this.props.createFolderMode.data;
            this.setState({
                name,
                forms,
                users,
                // columns,
            })
        }

        // @ts-ignore
        fetch(GET, api_list.formList, {})
            .then((response: any) => {
                if (response.result == STRINGS.success) {
                    const formArray = response.data;
                    const {forms} = self.state;

                    let form1: any;
                    let form2: any;
                    for (form1 of formArray) {
                        form1['checked'] = false;
                        for (form2 of forms) {
                            if (form1['_id'] == form2['_id']) {
                                form1['checked'] = form2['formUse'];
                                break;
                            }
                        }
                    }
                    this.setState({formArray: response.data, formChecked: formArray});
                } else {
                    this.setState({formArray: [], formChecked: []});
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({formArray: [], formChecked: []});
            });

        // @ts-ignore
        fetch(GET, api_list.userList, {})
            .then((response: any) => {
                if (response.result == STRINGS.success) {
                    // this.props.navigation.navigate(ROUTES.Profile);
                    this.setState({userArray: response.data});


                    const userArray = response.data;
                    const {users} = self.state;

                    let user1: any;
                    let user2: any;
                    for (user1 of userArray) {
                        user1['role'] = 'None';
                        for (user2 of users) {
                            if (user1['_id'] == user2['_id']) {
                                user1['role'] = user2['role'];
                                break;
                            }
                        }
                    }
                    this.setState({userArray: response.data, userChecked: userArray});
                } else {
                    this.setState({userArray: [], userChecked: []});
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({userArray: [], userChecked: []});
            });
    }
    //
    // hideModal = () => {
    //     this.setState({
    //         showModal: false,
    //     })
    // };

    hideAlert = () => {
        this.setState({
            showAlert: false,
        })
    };

    // hideConfirm = () => {
    //     this.setState({
    //         showConfirm: false,
    //     })
    // };

    onBackButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.FolderMain);
    };

    onSaveButtonPressed = () => {
        let {name, formChecked, userChecked} = this.state;
        // let {name, columns} = this.state;
        const userId = G.UserProfile.data._id;
        name = name.trim();
        if (name.length == 0) {
            this.setState({
                showAlert: true,
                alertTitle: STRINGS.name,
                alertMessage: STRINGS.folderNameRequired,
            });
            return;
        }
        let method;
        let url;
        let params;
        if (this.props.createFolderMode.mode == 'edit') {
            method = PUT;
            url = api_list.folderEdit;
            params = {
                _id: this.props.createFolderMode.data._id,
                name,
                forms: formChecked,
                users: userChecked,
            };
        } else {
            method = POST;
            url = api_list.folderAdd;
            params = {
                userId,
                name,
                forms: formChecked,
                users: userChecked,
            };
        }
        // console.log(params);
        // @ts-ignore
        fetch(method, url, params)
            .then((response: any) => {
                this.setState({
                    showAlert: true,
                    alertTitle: response.result,
                    alertMessage: response.message,
                });
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
                // @ts-ignore
                fetch(GET, api_list.folderList, {})
                    .then((response: any) => {
                        // console.log(response);
                        if (response.result == STRINGS.success) {
                            // this.props.navigation.navigate(ROUTES.Profile);
                            this.props.listFolder(response.data);
                        } else {
                            this.props.listFolder([]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.listFolder([]);
                    });
                    // .finally(() => {
                        // this.props.navigation.navigate(ROUTES.FolderMain);
                    // });

                // @ts-ignore
                fetch(GET, api_list.reportList, {})
                    .then((response: any) => {
                        // console.log(response);
                        if (response.result == STRINGS.success) {
                            // this.props.navigation.navigate(ROUTES.Profile);
                            this.props.listReport(response.data);
                        } else {
                            this.props.listReport([]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.listReport([]);
                    });
                // @ts-ignore
                fetch(GET, api_list.user2Folders, {userId: G.UserProfile.data._id, userRoles: STRINGS.folderManager})
                    .then((response: any) => {
                        // console.log(response);
                        if (response.result == STRINGS.success) {
                            // this.props.navigation.navigate(ROUTES.Profile);
                            this.props.listManager2Folders(response.data);
                        } else {
                            this.props.listManager2Folders([]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.listManager2Folders([]);
                    });
                // @ts-ignore
                fetch(GET, api_list.user2Folders, {userId: G.UserProfile.data._id, userRoles: STRINGS.folderManager + ',' + STRINGS.folderUser})
                    .then((response: any) => {
                        // console.log(response);
                        if (response.result == STRINGS.success) {
                            // this.props.navigation.navigate(ROUTES.Profile);
                            this.props.listUser2Folders(response.data);
                        } else {
                            this.props.listUser2Folders([]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.listUser2Folders([]);
                    });

            });
    };

    onKeyValueFieldChanged = (key: string, text: string) => {
        this.setState({
            [key]: text,
        });
    };

    onFormListItemChecked = (index: number, checked: boolean) => {
        let {formChecked} = this.state;
        // @ts-ignore
        formChecked[index]['checked'] = checked;
        this.setState({formChecked: formChecked});
    };

    onUserListItemChanged = (index: number, role: string) => {
        let {userChecked} = this.state;
        // @ts-ignore
        userChecked[index]['role'] = role;
        this.setState({userChecked: userChecked});
    };

    render() {
        const mode = this.props.createFolderMode.mode;
        const self = this;
        const {showAlert, alertTitle, alertMessage, name, userChecked, formChecked, doingSave} = self.state;

        return (
            <Container style={styles.container}>
                <Header
                    style={CommonStyles.header}>
                    <Left style={CommonStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={self.onBackButtonPressed}
                        >
                            <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"}
                                  name="angle-left"/>
                        </Button>
                    </Left>
                    <Body style={CommonStyles.headerBody}>
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{mode == 'edit' ? STRINGS.editFolder : STRINGS.createFolder}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                        <Button
                            transparent
                            onPress={self.onSaveButtonPressed}
                        >
                            <Icon style={[Presets.h2.regular, CommonStyles.headerIcon]} type={"MaterialIcons"}
                                  name="save"/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <Item regular style={styles.inputItem}>
                        <Icon style={styles.inputIcon} type={'FontAwesome'} name={'arrow-right'}/>
                        <Input disabled={!!doingSave} style={[styles.input, Presets.textFont.regular]} value={name}
                               placeholderTextColor={Colors.placeholder} placeholder={STRINGS.name}
                               onChangeText={(text) => self.onKeyValueFieldChanged('name', text)}/>
                    </Item>
                    <Tabs style={styles.tabs}>
                        <Tab
                            heading={ <TabHeading><Icon style={[Presets.h3.regular]} type={"FontAwesome5"} name="clipboard-list" /><Text>Forms</Text></TabHeading>}>
                            {CreateFolderFormsTab(formChecked, self.onFormListItemChecked)}
                        </Tab>
                        <Tab heading={ <TabHeading><Icon style={[Presets.h3.regular]} type={"FontAwesome"} name="user" /><Text>Users</Text></TabHeading>}>
                            {CreateFolderUsersTab(userChecked, self.onUserListItemChanged)}
                        </Tab>
                    </Tabs>
                    {/*<Label*/}
                        {/*style={[CommonStyles.title, Presets.titleFont.regular, styles.columnsTitle]}>{STRINGS.columns}</Label>*/}
                    {/*<ScrollView style={styles.scrollSec}>*/}
                        {/*<List style={styles.scrollSec}>*/}
                            {/*{columns.map((value: any) => {*/}
                                {/*columnIdx++;*/}
                                {/*return (*/}
                                    {/*<ListItem style={styles.listItem} onPress={() => self.onListItemPressed(value)}>*/}
                                        {/*/!*<Left>*!/*/}
                                            {/*/!*<Label style={Presets.h5.regular}>Name:</Label>*!/*/}
                                            {/*/!*<Label style={Presets.h6.regular}>Type:</Label>*!/*/}
                                        {/*/!*</Left>*!/*/}
                                        {/*<Body>*/}
                                        {/*<Label style={Presets.h5.regular}>Name: {value.name}</Label>*/}
                                        {/*<Label style={Presets.h6.regular}>Type: {value.type}</Label>*/}
                                        {/*/!*<Label style={Presets.h6.regular}>{columnIdx}</Label>*!/*/}
                                        {/*</Body>*/}
                                        {/*<Right>*/}
                                            {/*<Button*/}
                                                {/*transparent*/}
                                                {/*onPress={() => self.onDeleteListItemButtonPressed(value)}*/}
                                            {/*>*/}
                                                {/*<Icon*/}
                                                    {/*style={[Presets.h3.regular, CommonStyles.headerIcon, styles.listItemDeleteIcon]}*/}
                                                    {/*type={"FontAwesome5"} name="times"/>*/}
                                            {/*</Button>*/}
                                        {/*</Right>*/}
                                    {/*</ListItem>*/}
                                {/*);*/}
                            {/*})}*/}
                            {/*<ListItem style={[styles.listItem]}>*/}
                                {/*<Button block style={[Presets.primaryButton, styles.listItemAddButton]}*/}
                                        {/*onPress={self.onAddListItemButtonPressed}>*/}
                                    {/*<Icon type={"FontAwesome5"} name={"plus"}/>*/}
                                {/*</Button>*/}
                            {/*</ListItem>*/}
                        {/*</List>*/}
                    {/*</ScrollView>*/}
                    </Body>
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
    inputItem: {
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
    inputIcon: {
        margin: 0,
        color: Colors.placeholder,
        fontSize: Fonts.Size.text,
    },
    input: {
        color: Colors.textForeground,
    },

    tabs: {
        marginTop: Metrics.baseMargin,
    },

    // tabBarContainerStyle: {
    //     backgroundColor: Colors.mainBackground,
    // },
    //
    // tabBarUnderlineStyle: {
    //     backgroundColor: Colors.primaryButtonBackground,
    // },
    //
    // tab: {
    //     backgroundColor: Colors.mainBackground,
    // }
});

const mapStateToProps = (state: any) => {
    return {
        folders: state.folders.folders,
        createFolderMode: state.folders.createFolderMode,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        listFolder: (folders: any) => {
            dispatch(listFolder(folders));
        },
        addFolder: (folder: any) => {
            dispatch(addFolder(folder));
        },
        deleteFolder: (folder: any) => {
            dispatch(deleteFolder(folder));
        },
        editFolder: (prev: any, current: any) => {
            dispatch(editFolder(prev, current));
        },
        listReport: (items: any) => {
            dispatch(listReport(items));
        },
        listManager2Folders: (items: any[]) => {
            dispatch(listManager2Folders(items));
        },
        listUser2Folders: (items: any[]) => {
            dispatch(listUser2Folders(items));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CreateFolderScreen);
