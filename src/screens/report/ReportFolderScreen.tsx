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
import {api_list, fetch, GET} from "../../apis";

import {connect} from 'react-redux';
import {listManager2Folders, listUser2Folders, setSelectedFolder} from '../../actions/folders';

interface MyProps {
    reportProcMode: any,
    manager2Folders: any[],
    user2Folders: any[],
    setSelectedFolder: (items: any) => void,
    listManager2Folders: (items: any[]) => void,
    listUser2Folders: (items: any[]) => void,
}

type Props = MyProps & NavigationScreenProps;

class ReportFolderScreen extends Component<Props> {
    state = {
        searchWord: '',
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        // @ts-ignore
        fetch(GET, api_list.user2Folders, {userId: G.UserProfile.data._id, userRoles: STRINGS.folderManager + ',' + STRINGS.folderUser})
        // fetch(GET, api_list.user2Folders, {userId: G.UserProfile.data._id, userRoles: STRINGS.folderManager + ',' + STRINGS.folderUser})
            .then((response: any) => {
                if (response.result == STRINGS.success) {
                    let folders1 = response.data;

                    // @ts-ignore
                    fetch(GET, api_list.folderList, {})
                        .then((response: any) => {
                            if (response.result == STRINGS.success) {
                                let folders2 = response.data;
                                for(let folder1 of folders1) {
                                    folder1['forms'] = [];
                                    for (let folder2 of folders2) {
                                        if (folder1._id == folder2._id) {
                                            for (let form of folder2.forms) {
                                                if (form['formUse'] == true) {
                                                    folder1['forms'].push(form);
                                                }
                                            }
                                            // folder1['forms'] = folder2['forms'];
                                            break;
                                        }
                                    }
                                }
                                this.props.listUser2Folders(folders1);
                                // this.props.listManager2Folders(response.data);
                            } else {
                                this.props.listUser2Folders([]);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.props.listUser2Folders([]);
                        });

                    // this.props.listUser2Folders(response.data);
                } else {
                    this.props.listUser2Folders([]);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.listUser2Folders([]);
            });
        if (G.UserProfile.data.role == STRINGS.admin) {
            // @ts-ignore
            fetch(GET, api_list.folderList, {})
                .then((response: any) => {
                    // console.log(response);
                    if (response.result == STRINGS.success) {
                        let folders = response.data;
                        for (let folder of folders) {
                            let forms = [];
                            for (let form of folder['forms']) {
                                if (form['formUse']) {
                                    forms.push(form);
                                }
                            }
                            folder['forms'] = forms;
                        }
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
        } else {
            // @ts-ignore
            fetch(GET, api_list.user2Folders, {userId: G.UserProfile.data._id, userRoles: STRINGS.folderManager + ',' + STRINGS.folderUser})
            // fetch(GET, api_list.user2Folders, {userId: G.UserProfile.data._id, userRoles: STRINGS.folderManager})
                .then((response: any) => {
                    // console.log(response);
                    if (response.result == STRINGS.success) {
                        let folders1 = response.data;

                        // @ts-ignore
                        fetch(GET, api_list.folderList, {})
                            .then((response: any) => {
                                if (response.result == STRINGS.success) {
                                    let folders2 = response.data;
                                    for(let folder1 of folders1) {
                                        folder1['forms'] = [];
                                        for (let folder2 of folders2) {
                                            if (folder1._id == folder2._id) {
                                                for (let form of folder2.forms) {
                                                    if (form['formUse'] == true) {
                                                        folder1['forms'].push(form);
                                                    }
                                                }
                                                // folder1['forms'] = folder2['forms'];
                                                break;
                                            }
                                        }
                                    }
                                    this.props.listManager2Folders(folders1);
                                    // this.props.listManager2Folders(response.data);
                                } else {
                                    this.props.listManager2Folders([]);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                this.props.listManager2Folders([]);
                            });

                        // this.props.listManager2Folders(response.data);
                    } else {
                        this.props.listManager2Folders([]);
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.props.listManager2Folders([]);
                });
        }
    }

    onSignOutButtonPressed = () => {
        // this.props.navigation.navigate(ROUTES.SignIn);
        this.props.navigation.openDrawer();
    };

    onKeyValueFieldChanged = (key: any, value:any) => {
        this.setState({
            [key]: value,
        });
    };

    onListItemPressed = (value: any) => {
        this.props.setSelectedFolder(value);
        this.props.navigation.navigate(ROUTES.ReportMain);
    };

    render() {
        const self = this;
        const {searchWord} = self.state;
        const {reportProcMode, manager2Folders, user2Folders} = self.props;
        const userRole = G.UserProfile.data.role;
        const folders = (userRole == STRINGS.admin || reportProcMode == STRINGS.maintenanceMain) ? manager2Folders : user2Folders;
        const searchWord2 = searchWord.length > 2 ? searchWord : '';
        console.log(userRole, folders, manager2Folders, user2Folders);
        return (
            <Container style={styles.container}>
                <Header
                    style={CommonStyles.header}>
                    <Left style={CommonStyles.headerLeft}>
                        <Button
                            transparent
                            onPress={self.onSignOutButtonPressed}
                        >
                            <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} name="menu"/>
                            {/*<Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"} name="sign-out-alt"/>*/}
                            {/*<Label>Sign out</Label>*/}
                        </Button>
                    </Left>
                    <Body style={CommonStyles.headerBody}>
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{STRINGS.formFolder}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                        {/*{userRole == STRINGS.admin && <Button*/}
                            {/*transparent*/}
                            {/*onPress={self.onPlusButtonPressed}*/}
                        {/*>*/}
                            {/*<Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"} name="plus"/>*/}
                        {/*</Button>}*/}
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
                            {folders.map((value: any, index: number) => {
                                if (value.name.includes(searchWord2)) {
                                    return (
                                        <ListItem style={styles.listItem} onPress={() => self.onListItemPressed(value)}>
                                            {/*<Left style={styles.listItemLeft}>*/}
                                            {/*<Label style={Presets.h5.regular}>Name:</Label>*/}
                                            {/*<Label style={Presets.h6.regular}>Columns Count:</Label>*/}
                                            {/*</Left>*/}
                                            <Body>
                                            <Label style={Presets.h5.regular}>{index + 1}. {value.name}</Label>
                                            {/*<Label style={Presets.h6.regular}>Modified*/}
                                                {/*Date: {value.lastModifiedDate}</Label>*/}
                                            </Body>
                                            <Right>
                                                <Label style={Presets.h6.regular}>#{value.forms.length}</Label>
                                            </Right>
                                        </ListItem>
                                    );
                                }
                            })}
                        </List>
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
});

const mapStateToProps = (state: any) => {
    // console.log('manager2Folders', state.folders);
    return {
        reportProcMode: state.reports.reportProcMode,
        manager2Folders: state.folders.manager2Folders,
        user2Folders: state.folders.user2Folders,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setSelectedFolder: (item: any) => {
            dispatch(setSelectedFolder(item));
        },
        listUser2Folders: (items: any[]) => {
            dispatch(listUser2Folders(items));
        },
        listManager2Folders: (items: any[]) => {
            dispatch(listManager2Folders(items));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ReportFolderScreen);
