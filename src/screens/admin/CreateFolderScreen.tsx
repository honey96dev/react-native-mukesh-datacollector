import React, {Component} from "react";
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps, StackActions} from "react-navigation";
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
    Title, View, Text, Row, Col, Picker,
} from 'native-base';
// @ts-ignore
import {Colors, CommonStyles, Fonts, Metrics, ModalStyles, Presets} from '../../theme';
// @ts-ignore
import {G, NUMBERS, STRINGS} from "../../tools";
import {ROUTES} from "../../routes";
import Modal from "react-native-modal";
import MyAlert from "../../components/MyAlert";
import MyConfirm from "../../components/MyConfirm";
import {sprintf} from "sprintf-js";
import {api_list, fetch, GET, POST, PUT} from "../../apis";

import {connect} from 'react-redux';
import {listFolder, addFolder, deleteFolder, editFolder} from '../../actions/folders';
import {listReport} from '../../actions/reports';

interface MyProps {
    folders: Array<any>,
    createFolderMode: any,
    listFolder: (folders: Array<any>) => void,
    addFolder: (folder: any) => void,
    deleteFolder: (folder: any) => void,
    editFolder: (folder: any) => void,
    listReport: (items: Array<any>) => void,
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

        // showConfirm: false,
        // confirmTitle: '',
        // confirmMessage: '',


        name: '',
        // columns: [],

        // newItemName: '',
        // newItemType: '',
        // newItemValues: '',
        //
        // deletingListItemIdx: -1,

        doingSave: false,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.createFolderMode.mode == 'edit') {
            const {name, columns} = this.props.createFolderMode.data;
            this.setState({
                name,
                // columns,
            })
        }
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
        let {name} = this.state;
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
                // columns,
            };
        } else {
            method = POST;
            url = api_list.folderAdd;
            params = {
                userId,
                name,
                // columns,
            };
        }
        console.log(params);
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
                        console.log(response);
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
            });
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
    };

    onKeyValueFieldChanged = (key: string, text: string) => {
        this.setState({
            [key]: text,
        });
    };
    //
    // onAddListItemButtonPressed = () => {
    //     this.setState({
    //         newItemName: '',
    //         newItemType: 'Text',
    //         newItemValues: '',
    //         showModal: true,
    //         modalTitle: STRINGS.newColumn,
    //         modalMethod: 'add',
    //     });
    // };
    //
    // onListItemPressed = (value: any) => {
    //     let {columns} = this.state;
    //     // @ts-ignore
    //     const index = columns.indexOf(value);
    //     console.log(index);
    //     const {name, type, values} = columns[index];
    //     this.setState({
    //         newItemName: name,
    //         newItemType: type,
    //         newItemValues: values,
    //         showModal: true,
    //         modalTitle: STRINGS.editColumn,
    //         modalMethod: 'edit',
    //         deletingListItemIdx: index,
    //     });
    // };
    //
    // onDeleteListItemButtonPressed = (value: any) => {
    //     let {columns} = this.state;
    //     // @ts-ignore
    //     const index = columns.indexOf(value);
    //     // console.log(index);
    //     // @ts-ignore
    //     const message = sprintf("Column name: %s", value.name);
    //     this.setState({
    //         deletingListItemIdx: index,
    //         showConfirm: true,
    //         confirmTitle: STRINGS.delete,
    //         confirmMessage: message,
    //     });
    // };
    //
    // onAddListItem = () => {
    //     let {columns, newItemName, newItemType, newItemValues, modalMethod, deletingListItemIdx} = this.state;
    //     newItemName = newItemName.trim();
    //     if (newItemName.length == 0) {
    //         this.setState({
    //             showAlert: true,
    //             alertTitle: STRINGS.name,
    //             alertMessage: STRINGS.newColumnNameRequired,
    //         });
    //         return;
    //     }
    //     if (modalMethod == 'add') {
    //         // @ts-ignore
    //         columns.push({name: newItemName, type: newItemType, values: newItemValues});
    //         this.setState({
    //             columns: columns,
    //             showModal: false,
    //         });
    //     } else {
    //         let {columns} = this.state;
    //         // @ts-ignore
    //         columns[deletingListItemIdx].name = newItemName;
    //         // @ts-ignore
    //         columns[deletingListItemIdx].type = newItemType;
    //         // @ts-ignore
    //         columns[deletingListItemIdx].values = newItemValues;
    //         this.setState({
    //             columns: columns,
    //             showModal: false,
    //         });
    //     }
    // };
    //
    // onDeleteListItem = () => {
    //     let {columns} = this.state;
    //     columns.splice(this.state.deletingListItemIdx, 1);
    //     this.setState({
    //         showConfirm: false,
    //         columns: columns,
    //     });
    // };

    render() {
        const mode = this.props.createFolderMode.mode;
        const self = this;
        const {showAlert, alertTitle, alertMessage, name, doingSave} = self.state;
        // const {showModal, modalTitle, modalMethod, showAlert, alertTitle, alertMessage, showConfirm, confirmTitle, confirmMessage, name, columns, newItemName, newItemType, newItemValues, doingSave} = self.state;
        const newItemTypes = self.newItemTypes;
        let columnIdx = -1;
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
                {/*<Modal*/}
                    {/*style={ModalStyles.modal}*/}
                    {/*isVisible={showModal}*/}
                    {/*animationIn={"bounceIn"}*/}
                    {/*animationInTiming={NUMBERS.modalAnimationTiming3}*/}
                    {/*animationOut={"bounceOut"}*/}
                    {/*animationOutTiming={NUMBERS.modalAnimationTiming2}*/}
                    {/*backdropColor={Colors.mainBackground1}*/}
                {/*>*/}
                    {/*<View style={ModalStyles.modalContent}>*/}
                        {/*<Text style={[Presets.h3.bold, ModalStyles.modalTitle]}>{modalTitle}</Text>*/}
                        {/*<Text*/}
                            {/*style={[Presets.textFont.regular, ModalStyles.modalDescription]}>{STRINGS.newColumnDescription}</Text>*/}
                        {/*<Item regular style={ModalStyles.credentialItem}>*/}
                            {/*<Icon style={ModalStyles.credentialIcon} type={'FontAwesome'} name={'arrow-right'}/>*/}
                            {/*<Input style={[ModalStyles.credential, Presets.textFont.regular]} value={newItemName}*/}
                                   {/*placeholderTextColor={Colors.modalPlaceholder} placeholder={STRINGS.name}*/}
                                   {/*onChangeText={(text) => self.onKeyValueFieldChanged('newItemName', text)}/>*/}
                        {/*</Item>*/}
                        {/*<Item regular style={ModalStyles.credentialItem}>*/}
                            {/*<Picker*/}

                                {/*mode="dropdown"*/}
                                {/*// iosHeader="Select Language"*/}
                                {/*// iosIcon={<Icon type={"FontAwesome5"} name={"caret-down"} style={{ color: Colors.mainForeground, fontSize: 25 }} />}*/}
                                {/*note={false}*/}
                                {/*style={[Presets.textFont.regular, styles.picker]}*/}
                                {/*selectedValue={newItemType}*/}
                                {/*placeholder={STRINGS.selectRole}*/}
                                {/*// placeholderStyle={{ color: "#bfc6ea" }}*/}
                                {/*onValueChange={(value) => self.onKeyValueFieldChanged('newItemType', value)}*/}
                            {/*>*/}
                                {/*{newItemTypes.map((item: any, key) => {*/}
                                    {/*let label = item.label;*/}
                                    {/*let value = item.value;*/}
                                    {/*return (*/}
                                        {/*<Picker.Item key={value} label={label} value={value}/>*/}
                                    {/*);*/}
                                {/*})}*/}
                                {/*/!*<Picker.Item label="User1" value="en" />*!/*/}
                                {/*/!*<Picker.Item label="Vietnamese" value="vt" />*!/*/}
                            {/*</Picker>*/}
                        {/*</Item>*/}
                        {/*{(newItemType == 'Dropdown' || newItemType == 'Checkbox') &&*/}
                        {/*<Item regular style={ModalStyles.credentialItem}>*/}
                            {/*<Input style={[ModalStyles.credential, Presets.textFont.regular]} value={newItemValues}*/}
                                   {/*placeholderTextColor={Colors.modalPlaceholder} placeholder={STRINGS.values}*/}
                                   {/*onChangeText={(text) => self.onKeyValueFieldChanged('newItemValues', text)}/>*/}
                        {/*</Item>}*/}
                        {/*<View style={ModalStyles.modalButtonsSec}>*/}
                            {/*<Row>*/}
                                {/*<Col style={ModalStyles.modalButtonSec}>*/}
                                    {/*<Button style={[Presets.modalRejectButton, ModalStyles.modalButton]}*/}
                                            {/*onPress={self.hideModal}>*/}
                                        {/*<Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]}*/}
                                              {/*type={'FontAwesome5'} name={'times'}/>*/}
                                        {/*<Text uppercase={false}*/}
                                              {/*style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.cancel}</Text>*/}
                                    {/*</Button>*/}
                                {/*</Col>*/}
                                {/*<Col style={ModalStyles.modalButtonSec}>*/}
                                    {/*<Button style={[Presets.modalAcceptButton, ModalStyles.modalButton]}*/}
                                            {/*onPress={self.onAddListItem}>*/}
                                        {/*<Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]}*/}
                                              {/*type={'FontAwesome5'}*/}
                                              {/*name={modalMethod == 'add' ? 'plus' : 'edit'}/>*/}
                                        {/*<Text uppercase={false}*/}
                                              {/*style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{modalMethod == 'add' ? STRINGS.add : STRINGS.edit}</Text>*/}
                                    {/*</Button>*/}
                                {/*</Col>*/}
                            {/*</Row>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</Modal>*/}
                {MyAlert(showAlert, alertTitle, alertMessage, self.hideAlert)}
                {/*{MyConfirm(showConfirm, confirmTitle, confirmMessage, self.hideConfirm, self.onDeleteListItem)}*/}
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
    columnsTitle: {
        marginTop: Metrics.baseMargin,
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

    picker: {
        // flex: 1,
        width: '100%',
        color: Colors.textForeground,
    },
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
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CreateFolderScreen);
