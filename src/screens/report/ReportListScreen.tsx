import React, {Component} from "react";
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon, Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Title, View, Text
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
import {listReport, addReport, deleteReport, deleteReportByForm, editReport, setSelectedFormData, setCreateReportMode} from '../../actions/reports';

interface MyProps {
    reportProcMode: string,
    selectedFolder: any,
    selectedFormId: any,
    reports: Array<any>,
    listReport: (items: Array<any>) => void,
    addReport: (item: any) => void,
    deleteReport: (item: any) => void,
    deleteReportByForm: (form: any) => void,
    editReport: (prev: any, current: any) => void,
    setSelectedFormId: (data: any) => void,
    setCreateReportMode: (data: any) => void,
}

type Props = MyProps & NavigationScreenProps;

class ReportListScreen extends Component<Props> {
    state = {
        showAlert: false,
        alertTitle: '',
        alertMessage: '',

        showConfirm: false,
        confirmTitle: '',
        confirmMessage: '',

        searchWord: '',

        deletingReportId: -1,
    };

    constructor(props: Props) {
        super(props);
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

    onBackButtonPressed = () => {
        this.props.navigation.navigate(ROUTES.ReportMain);
    };

    onPlusButtonPressed = () => {
        this.props.setCreateReportMode({
            mode: 'create',
        });
        this.props.navigation.navigate(ROUTES.CreateReport);
    };

    onKeyValueFieldChanged = (key: any, value:any) => {
        this.setState({
            [key]: value,
        });
    };


    onListItemPressed = (value: any) => {
        const {selectedFolder, reportProcMode} = this.props;
        const folderRole = selectedFolder.userRole;
        // const userRole = G.UserProfile.data.role;
        // console.log(selectedFolder);
        // if (userRole == STRINGS.user2 && this.props.reportProcMode == STRINGS.maintenanceMain)  {
        if (folderRole == STRINGS.folderUser && reportProcMode == STRINGS.maintenanceMain)  {
            return;
        }
        this.props.setCreateReportMode({
            mode: 'edit',
            data: value,
        });
        this.props.navigation.navigate(ROUTES.CreateReport);
    };

    onDeleteListItemButtonPressed = (value: any) => {
        // @ts-ignore
        const message = sprintf("Form name: %s", value.name);
        console.log(message);
        this.setState({
            deletingReportId: value._id,
            showConfirm: true,
            confirmTitle: STRINGS.delete,
            confirmMessage: STRINGS.deleteDescription,
        });
    };

    onDeleteReport = () => {
        // @ts-ignore
        fetch(DELETE, api_list.reportDelete, {_id: this.state.deletingReportId})
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
                fetch(GET, api_list.reportList, {})
                    .then((response: any) => {
                        console.log(response);
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
            });
    };

    renderListItemBody = (value: any) => {

        let items: Array<any> = [];
        Object.entries(value).forEach((entry: any) => {
            let key = entry[0];
            let value = entry[1];
            if (key == '_id' || key == 'formId') return;
            items.push(
                <Label style={Presets.h5.regular}>{key}: {value}</Label>
            )
        });
        console.log('items', items);
        return items;
    };

    render() {
        const self = this;
        const {showConfirm, confirmTitle, confirmMessage, showAlert, alertTitle, alertMessage, searchWord} = self.state;

        const searchWord2 = searchWord.length > 2 ? searchWord.split(' ') : [''];

        const {reports, selectedFormId, reportProcMode, selectedFolder} = self.props;
        const folderRole = selectedFolder.userRole;
        const userRole = G.UserProfile.data.role;
        let report: any;
        let reportsByForm: Array<any> = [];
        for (report of reports) {
            // console.log(report, selectedFormId);
            if (report._id == selectedFormId) {
                // console.log(report);
                reportsByForm = report.reports;
                break;
            }
        }

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
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{reportProcMode == STRINGS.maintenanceMain ? STRINGS.maintenanceList : STRINGS.reportList}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                        {(reportProcMode == STRINGS.maintenanceMain) && <Button
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
                            {reportsByForm.map((value: any, index: number) => {
                                let valueJoined: any[] = [];
                                // @ts-ignore
                                Object.entries(value).forEach((entry: any) => {
                                    let key = entry[0];
                                    let value = entry[1];
                                    if (key.indexOf('_id') == -1) {
                                        if (value instanceof Date) {
                                            // @ts-ignore
                                            valueJoined.push(sprintf("%02d/%02/%04d", value.getMonth() + 1, value.getDate(), value.getFullYear()));
                                        } else {
                                            // @ts-ignore
                                            valueJoined.push(value);
                                        }
                                    }
                                });
                                const valueJoinedString = valueJoined.join(',');
                                // console.log(valueJoinedString, searchWord2);
                                for (let word of searchWord2) {
                                    if (valueJoinedString.includes(word)) {
                                        return (
                                            <ListItem key={value._id} style={styles.listItem}
                                                      onPress={() => self.onListItemPressed(value)}>
                                                <Body style={styles.listItemBody}>
                                                {/*{self.renderListItemBody(value)}*/}
                                                <Label style={Presets.h5.regular}>{index + 1}. </Label>
                                                <View>
                                                    <Label style={Presets.h5.regular}>{value.byWho}</Label>
                                                    <Label style={Presets.h6.regular}>Modified
                                                        Date: {value.lastModifiedDate}</Label>
                                                </View>
                                                {/*<Label style={Presets.h6.regular}>Columns Count: {value._id}</Label>*/}
                                                {/*<Label style={Presets.h6.regular}>{value.aaaa}</Label>*/}
                                                </Body>
                                                <Right>
                                                    {/*{(userRole == STRINGS.admin && reportProcMode == STRINGS.maintenanceMain) && <Button*/}
                                                    {(folderRole == STRINGS.folderManager && reportProcMode == STRINGS.maintenanceMain) && <Button
                                                        transparent
                                                        onPress={() => self.onDeleteListItemButtonPressed(value)}
                                                    >
                                                        <Icon
                                                            style={[Presets.h3.regular, CommonStyles.headerIcon, styles.listItemDeleteIcon]}
                                                            type={"FontAwesome5"} name="times"/>
                                                    </Button>}
                                                    {/*{(userRole == STRINGS.user2 && reportProcMode == STRINGS.reportMain) && <Icon*/}
                                                    {/*style={[Presets.h4.regular, CommonStyles.headerIcon]}*/}
                                                    {/*type={"FontAwesome5"} name="angle-right"/>}*/}
                                                    {/*{(userRole == STRINGS.user1) && <Icon*/}
                                                    {/*style={[Presets.h4.regular, CommonStyles.headerIcon]}*/}
                                                    {/*type={"FontAwesome5"} name="angle-right"/>}*/}
                                                    {(folderRole == STRINGS.folderUser) && <Icon
                                                        style={[Presets.h4.regular, CommonStyles.headerIcon]}
                                                        type={"FontAwesome5"} name="angle-right"/>}
                                                </Right>
                                            </ListItem>
                                        );
                                    }
                                }
                            })}
                        </List>
                    </ScrollView>
                    </Body>
                </Content>
                {MyAlert(showAlert, alertTitle, alertMessage, self.hideAlert)}
                {MyConfirm(showConfirm, confirmTitle, confirmMessage, self.hideConfirm, self.onDeleteReport)}
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
    listItemBody: {
        flexDirection: 'row',
        alignItems: 'center',
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
        selectedFormId: state.reports.selectedFormId,
        reports: state.reports.items,
        reportProcMode: state.reports.reportProcMode,
        selectedFolder: state.folders.selectedFolder,
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
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ReportListScreen);
