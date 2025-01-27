import React, {Component} from "react";
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content, DatePicker,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem, Picker,
    Right,
    Title, View, Text, Row, Col
} from 'native-base';
// @ts-ignore
import MultiSelect from 'react-native-multiple-select';
// import format from 'date-fns/fp/format';
// @ts-ignore
import {Colors, CommonStyles, Fonts, Metrics, ModalStyles, Presets} from '../../theme';
import {connect} from 'react-redux';
import {
    addReport,
    deleteReport,
    deleteReportByForm,
    editReport,
    listReport,
    setCreateReportMode,
    setSelectedFormData,
    setCurrentReports, setCurrentReports2,
} from '../../actions/reports';
import {ROUTES} from "../../routes";
import {G, NUMBERS, STRINGS} from "../../tools";
import {fetch, api_list, GET, POST, PUT} from "../../apis";
import MyAlert from "../../components/MyAlert";
import sprintfJs from 'sprintf-js';
import Modal from "react-native-modal";

interface MyProps {
    selectedFolder: any,
    selectedFormId: any,
    selectedFormColumns: Array<any>,
    reports: Array<any>,
    createReportMode: any,
    listReport: (items: Array<any>) => void,
    addReport: (item: any) => void,
    deleteReport: (item: any) => void,
    deleteReportByForm: (form: any) => void,
    editReport: (prev: any, current: any) => void,
    setSelectedFormData: (data: any) => void,
    setCreateReportMode: (data: any) => void,
    reportProcMode: string,
    setCurrentReports: (data: any[]) => void,
    setCurrentReports2: (data: any[]) => void,
}

type Props = MyProps & NavigationScreenProps;

class CreateReportScreen extends Component<Props> {
    completed = 'Completed';
    completedArray = [
        {label: 'Completed', value: 'Completed'},
        {label: 'Not yet', value: 'Not yet'},
    ];
    // itemTypes = [
    //     {label: 'Text', value: 'Text'},
    //     {label: 'Calendar', value: 'Calendar'},
    //     {label: 'Dropdown', value: 'Dropdown'},
    //     {label: 'Checkbox', value: 'Checkbox'},
    // ];

    saveIgnoreFields = [
        'showModal',
        'modalTitle',
        'modalMessage',
        'modalMethod',
        'modalTargetField',
        'modalValue',

        'showAlert',
        'alertTitle',
        'alertMessage',

        '_id',
        'formId',
    ];

    state = {
        showModal: false,
        modalTitle: '',
        modalMessage: '',
        modalMethod: '',
        modalTargetField: '',
        modalValue: '',

        showAlert: false,
        alertTitle: '',
        alertMessage: '',

        completed: 'Not yet',
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.createReportMode.mode == 'edit') {
            // console.log(this.props.createReportMode.data);
            const newState = Object.assign(this.state, this.props.createReportMode.data);
            //
            // const state = this.state;
            // const saveIgnoreFields = this.saveIgnoreFields;
            // const completed = true;
            // // @ts-ignore
            // Object.entries(state).forEach((entry: any) => {
            //     let key = entry[0];
            //     let value = entry[1];
            //     if (saveIgnoreFields.indexOf(key) == -1) {
            //         if (value.toString().length == 0) {
            //
            //         }
            //     }
            // });

            this.setState(newState);
        }
    }

    hideModal = () => {
        this.setState({
            showModal: false,
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
        if (this.state.alertTitle == STRINGS.success) {
            setTimeout(this.onBackButtonPressed, NUMBERS.modalAnimationTiming2);
        }
    };

    onBackButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.ReportList);
    };

    onSaveButtonPressed = () => {
        const state = this.state;
        const saveIgnoreFields = this.saveIgnoreFields;
        let params: object = {};
        // @ts-ignore
        Object.entries(state).forEach((entry: any) => {
            let key = entry[0];
            let value = entry[1];
            if (saveIgnoreFields.indexOf(key) == -1) {
                if (value instanceof Date) {
                    // @ts-ignore
                    params[key] = value.toISOString();
                } else {
                    // @ts-ignore
                    params[key] = value;
                }
            }
        });
        // @ts-ignore
        params['byWho'] = G.UserProfile.data.name;
        // @ts-ignore
        params['folderId'] = this.props.selectedFolder._id;
        // @ts-ignore
        params['formId'] = this.props.selectedFormId;
        // @ts-ignore
        params['completed'] = this.completed;

        let method;
        let url;
        // let params;
        if (this.props.createReportMode.mode == 'edit') {
            method = PUT;
            url = api_list.reportEdit;
            // @ts-ignore
            params['_id'] = this.props.createReportMode.data._id;
        } else {
            method = POST;
            url = api_list.reportAdd;
        }

        console.log(method, url, params, JSON.stringify(params));
        // return;

        let result: any;
        let message: any;

        // @ts-ignore
        fetch(method, url, params)
            .then((response: any) => {
                result = response.result;
                message = response.message;
            })
            .catch((err: any) => {
                console.log(err);
                this.setState({
                    showAlert: true,
                    alertTitle: STRINGS.error,
                    alertMessage: STRINGS.unknownServerError,
                });
            })
            .finally(() => {
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
                    .catch((err: any) => {
                        console.log(err);
                        this.props.listReport([]);
                    });
                    // .finally(() => {
                        // this.props.navigation.navigate(ROUTES.FormMain);
                    // });

                const {selectedFolder, selectedFormId} = this.props;
                // @ts-ignore
                fetch(GET, api_list.reportListByForm, {folderId: selectedFolder._id, formId: selectedFormId})
                    .then((response: any) => {
                        // console.log(response);
                        if (response.result == STRINGS.success) {
                            // this.props.navigation.navigate(ROUTES.Profile);
                            this.props.setCurrentReports2(response.data);
                            // this.setState({reports: response.data});
                        } else {
                            this.props.setCurrentReports2([]);
                            // this.setState({reports: []});
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.props.setCurrentReports2([]);
                        // this.setState({reports: []});
                    });


                // @ts-ignore
                fetch(GET, api_list.folder2Forms, {folderId: this.props.selectedFolder._id})
                    .then((response: any) => {
                        // console.log(response);
                        if (response.result == STRINGS.success) {
                            let forms = response.data;
                            let cnt = forms.length;
                            let idx = 0;
                            for (let form of forms) {
                                form['reports'] = [];
                                // @ts-ignore
                                fetch(GET, api_list.reportListByForm, {folderId: this.props.selectedFolder._id, formId: form._id})
                                    .then((response: any) => {
                                        // console.log(response);
                                        if (response.result == STRINGS.success) {
                                            form['reports'] = response.data;
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                                    .finally(() => {
                                        idx++;
                                        if (idx == cnt) {
                                            // this.setState({forms: forms});
                                            this.props.setCurrentReports(forms);
                                            this.setState({
                                                showAlert: true,
                                                alertTitle: result,
                                                alertMessage: message,
                                            });
                                        }
                                    });
                            }

                        } else {
                            // this.setState({forms: []});
                            this.props.setCurrentReports([]);
                            this.setState({
                                showAlert: true,
                                alertTitle: result,
                                alertMessage: message,
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        // this.setState({forms: []});
                        this.props.setCurrentReports([]);
                        this.setState({
                            showAlert: true,
                            alertTitle: result,
                            alertMessage: message,
                        });
                    });
            });
    };

    onKeyValueFieldChanged = (key: string, text: string) => {
        // console.log(key, text);
        this.setState({
            [key]: text,
            completed: this.completed,
        });
    };

    onKeyArrayFieldChanged = (key: string, arr: Array<any>) => {
        this.setState({
            [key]: arr.join(','),
            completed: this.completed,
        });
    };

    onModalFieldPressed = (name: string) => {
        // @ts-ignore
        const value = this.state[name];
        const message = sprintfJs.sprintf("Please enter value of '%s'", name);
        this.setState({
            showModal: true,
            modalTitle: name,
            modalMessage: message,
            modalTargetField: name,
            modalValue: value,
        });
    };

    onModalOkayButtonPressed = () => {
        const {modalTargetField, modalValue} = this.state;
        this.setState({
            showModal: false,
            [modalTargetField]: modalValue
        })
    };

    render() {
        const mode = this.props.createReportMode.mode;
        const columns = this.props.selectedFormColumns;
        const reportProcMode = this.props.reportProcMode;
        const self = this;
        const state = self.state;
        const {showModal, modalTitle, modalMessage, modalValue, showAlert, alertTitle, alertMessage} = state;

        // console.log('completed', completed);
        let headerTitle;
        if (reportProcMode == STRINGS.maintenanceMain) {
            if (mode == 'edit') {
                headerTitle = STRINGS.editReport;
            } else {
                headerTitle = STRINGS.createReport;
            }
        } else if (reportProcMode == STRINGS.reportMain) {
            headerTitle = STRINGS.viewReport;
        }
        self.completed = 'Completed';
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
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{headerTitle}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                        {(reportProcMode == STRINGS.maintenanceMain) && <Button
                            transparent
                            onPress={self.onSaveButtonPressed}
                        >
                            <Icon style={[Presets.h2.regular, CommonStyles.headerIcon]} type={"MaterialIcons"}
                                  name="save"/>
                        </Button>}
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    {/*<Label*/}
                        {/*style={[CommonStyles.title, Presets.titleFont.regular, styles.columnsTitle]}>{STRINGS.columns}</Label>*/}
                    <ScrollView style={styles.scrollSec}>
                        <List style={styles.scrollSec}>
                            {/*{self.renderListItemBody(reportData)}*/}
                            {columns.map((column:any) => {
                                // @ts-ignore
                                const value = state[column.name];
                                if (typeof value == 'undefined' || value.toString().length == 0) {
                                    self.completed = 'Not yet';
                                    console.log('Not yet', column.name, value);
                                }
                                const values = !!column.values ? column.values.split(',') : [];
                                // const values = (column.values instanceof String) ? column.values.split(',') : [];
                                let kvValues = [];
                                for (let v of values) {
                                    kvValues.push({label: v, value: v,});
                                }
                                const selectedItems = !!value ? value.toString().split(',') : [];

                                const date = !!value ? new Date(value) : new Date();
                                const dateString = sprintfJs.sprintf("%02d/%02d/%04d", date.getMonth() + 1, date.getDate(), date.getFullYear());
                                return (
                                    <ListItem key={Math.random()} style={[styles.listItem]}>
                                        <Label style={Presets.h6.regular}>{column.name}</Label>
                                        {reportProcMode == STRINGS.reportMain && <Text style={[styles.credential2, Presets.textFont.regular]}>{column.type == 'Calendar' ? dateString : value}</Text>}
                                        {(reportProcMode == STRINGS.maintenanceMain) && <Item regular style={styles.credentialItem}>
                                            {/*<Icon style={styles.credentialIcon} type={'FontAwesome'} name={'envelope'}/>*/}
                                            {column.type == 'Text' && <Text style={[styles.credential, Presets.textFont.regular]} onPress={() => self.onModalFieldPressed(column.name)}>{value}</Text>}
                                            {column.type == 'Calendar' && <DatePicker

                                                placeHolderTextStyle={styles.picker}
                                                textStyle={styles.picker}
                                                defaultDate={date}
                                                minimumDate={new Date(2001, 1, 1)}
                                                maximumDate={new Date(2050, 12, 31)}
                                                // format="MM/DD/YYYY"
                                                // formatChosenDate={format("MM/DD/YYYY")}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                placeHolderText={dateString}
                                                // textStyle={{ color: "green" }}
                                                // placeHolderTextStyle={{ color: "#d3d3d3" }}

                                                onDateChange={(text) => self.onKeyValueFieldChanged(column.name, text)}
                                                disabled={false}
                                            />}
                                            {column.type == 'Dropdown' && <Picker

                                                mode="dropdown"
                                                // iosHeader="Select Language"
                                                // iosIcon={<Icon type={"FontAwesome5"} name={"caret-down"} style={{ color: Colors.mainForeground, fontSize: 25 }} />}
                                                note={false}
                                                style={[Presets.textFont.regular, styles.picker]}
                                                selectedValue={value}
                                                placeholder={STRINGS.selectRole}
                                                // placeholderStyle={{ color: "#bfc6ea" }}
                                                onValueChange={(value) => self.onKeyValueFieldChanged(column.name, value)}
                                            >
                                                {/*{!value && <Picker.Item key={0} label={'(Select)'} value={''}/>}*/}
                                                <Picker.Item key={0} label={'(Select)'} value={''}/>
                                                {values.map((item: any, key: number) => {
                                                    return (
                                                        <Picker.Item key={key + 1} label={item} value={item}/>
                                                    );
                                                })}
                                            </Picker>}
                                            {column.type == 'Checkbox' && <View style={{flex: 1, marginTop: Metrics.smallMargin}}>
                                                <MultiSelect
                                                    // hideTags

                                                    items={kvValues}
                                                    // single={true}
                                                    // items={[
                                                    //     {
                                                    //         id: '92iijs7yta',
                                                    //         name: 'Ondo',
                                                    //     }, {
                                                    //         id: 'a0s0a8ssbsd',
                                                    //         name: 'Ogun',
                                                    //     }, {
                                                    //         id: '16hbajsabsd',
                                                    //         name: 'Calabar',
                                                    //     }, {
                                                    //         id: 'nahs75a5sg',
                                                    //         name: 'Lagos',
                                                    //     }, {
                                                    //         id: '667atsas',
                                                    //         name: 'Maiduguri',
                                                    //     },
                                                    //     ]}
                                                    onSelectedItemsChange={(value: Array<any>) => self.onKeyArrayFieldChanged(column.name, value)}
                                                    selectedItems={selectedItems}
                                                    selectText="Pick Items"
                                                    searchInputPlaceholderText="Search Items..."
                                                    tagRemoveIconColor="#CCC"
                                                    tagBorderColor="#CCC"
                                                    tagTextColor="#CCC"
                                                    selectedItemTextColor="#CCC"
                                                    selectedItemIconColor="#CCC"
                                                    itemTextColor="#000"
                                                    uniqueKey="value"
                                                    displayKey="label"
                                                    // searchInputStyle={{color: '#CCC'}}
                                                    submitButtonColor={Colors.primaryButtonBackground}
                                                    submitButtonText="Submit"
                                                />
                                            </View>}
                                        </Item>}
                                    </ListItem>
                                )
                            })}
                            <ListItem style={[styles.listItem]}>
                                <Label style={Presets.h6.regular}>Is Completed</Label>
                                <Text style={[styles.credential2, Presets.textFont.regular]}>{self.completed}</Text>
                            </ListItem>
                        </List>
                    </ScrollView>
                    </Body>
                </Content>
                <Modal
                    style={ModalStyles.modal}
                    isVisible={showModal}
                    animationIn={"bounceIn"}
                    animationInTiming={NUMBERS.modalAnimationTiming3}
                    animationOut={"bounceOut"}
                    animationOutTiming={NUMBERS.modalAnimationTiming2}
                    backdropColor={Colors.mainBackground1}
                >
                    <View style={ModalStyles.modalContent}>
                        <Text style={[Presets.h3.bold, ModalStyles.modalTitle]}>{modalTitle}</Text>
                        <Text style={[Presets.textFont.regular, ModalStyles.modalDescription]}>{modalMessage}</Text>
                        <Item regular style={ModalStyles.credentialItem}>
                            <Icon style={ModalStyles.credentialIcon} type={'FontAwesome5'} name={'arrow-right'}/>
                            <Input style={[ModalStyles.credential, Presets.textFont.regular]} value={modalValue} placeholderTextColor={Colors.modalPlaceholder} placeholder={STRINGS.value} onChangeText={(text) => self.onKeyValueFieldChanged('modalValue', text)}/>
                        </Item>
                        <View style={ModalStyles.modalButtonsSec}>
                            <Row>
                                <Col style={ModalStyles.modalButtonSec}>
                                    <Button style={[Presets.modalRejectButton, ModalStyles.modalButton]}
                                            onPress={self.hideModal}>
                                        <Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'} name={'times'}/>
                                        <Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.cancel}</Text>
                                    </Button>
                                </Col>
                                <Col style={ModalStyles.modalButtonSec}>
                                    <Button style={[Presets.modalAcceptButton, ModalStyles.modalButton]}
                                            onPress={self.onModalOkayButtonPressed}>
                                        <Icon style={[Presets.textFont.regular, ModalStyles.modalButtonIcon]} type={'FontAwesome5'} name={'check'}/>
                                        <Text uppercase={false} style={[Presets.textFont.semiBold, ModalStyles.modalButtonText]}>{STRINGS.okay}</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </View>

                        {/*{!!didResetPassword && <Text style={[Presets.textFont.regular, styles.modalDidResetPassword]}>*/}
                        {/*New password is sent to your email!*/}
                        {/*</Text>}*/}
                    </View>
                </Modal>
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
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    credentialItem: {
        marginTop: Metrics.smallMargin,
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
        padding: Metrics.smallPadding,
        flex: 1,
        color: Colors.textForeground,
    },
    credential2: {
        width: '100%',
        padding: Metrics.smallPadding,
        // flex: 1,
        color: Colors.textForeground,
    },

    picker: {
        // flex: 1,
        width: '100%',
        color: Colors.textForeground,
    },
    calendar: {
        // flex: 1,
        width: '100%',
        color: Colors.textForeground,
    },
});

const mapStateToProps = (state: any) => {
    // console.log(state);
    return {
        selectedFolder: state.folders.selectedFolder,
        selectedFormId: state.reports.selectedFormId,
        selectedFormColumns: state.reports.selectedFormColumns,
        reports: state.reports.items,
        createReportMode: state.reports.createReportMode,
        reportProcMode: state.reports.reportProcMode,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        listReport: (forms: any) => {
            dispatch(listReport(forms));
        },
        addReport: (form: any) => {
            dispatch(addReport(form));
        },
        deleteReport: (form: any) => {
            dispatch(deleteReport(form));
        },
        deleteReportByForm: (form: any) => {
            dispatch(deleteReportByForm(form));
        },
        editReport: (prev: any, current: any) => {
            dispatch(editReport(prev, current));
        },
        setSelectedFormData: (data: any) => {
            dispatch(setSelectedFormData(data));
        },
        setCreateReportMode: (data: any) => {
            dispatch(setCreateReportMode(data));
        },
        setCurrentReports: (data: any[]) => {
            dispatch(setCurrentReports(data));
        },
        setCurrentReports2: (data: any[]) => {
            dispatch(setCurrentReports2(data));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CreateReportScreen);
