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
    Title, View, Text, Picker
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
import {listReport, addReport, deleteReport, deleteReportByForm, editReport, setSelectedFormData, setCreateReportMode, setCurrentReports2} from '../../actions/reports';

// @ts-ignore
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// @ts-ignore
import RNPrint from 'react-native-print';

interface MyProps {
    reportProcMode: string,
    selectedFolder: any,
    selectedFormId: any,
    selectedFormColumns: string[],
    reports: Array<any>,
    currentReports2: Array<any>,
    listReport: (items: Array<any>) => void,
    addReport: (item: any) => void,
    deleteReport: (item: any) => void,
    deleteReportByForm: (form: any) => void,
    editReport: (prev: any, current: any) => void,
    setSelectedFormId: (data: any) => void,
    setCreateReportMode: (data: any) => void,
    setCurrentReports2: (data: any[]) => void,
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
        range: '',

        reports: [],

        deletingReportId: -1,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
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

    list2Html = () => {
        const self = this;
        const {searchWord, range} = self.state;

        let searchWord2 = searchWord.length > 2 ? searchWord.split(' ') : [];
        searchWord2.push(range);

        const reports = self.props.currentReports2;
        const columns = self.props.selectedFormColumns;

        let html;
        let style;
        let thead;
        let tbody: string;

        style = '<style>table{font-size:24px;border-spacing:0}td,th{padding-left:5px;padding-right:5px;border:1px solid #ddd}th{color:#fff;background:#4caf50}tr:nth-child(odd){background-color:#f2f2f2}</style>';

        let column: any;
        thead = '<thead><th>No.</th>';
        for (column of columns) {
            thead += sprintf('<th>%s</th>', column.name);
        }
        thead += sprintf('<th>%s</th>', 'Completed?');
        thead += '</thead>';

        let report: any;
        let index = 0;
        tbody = '<tbody>';
        for (report of reports) {
            let valueJoined: any[] = [];
            // @ts-ignore
            Object.entries(report).forEach((entry: any) => {
                let key = entry[0];
                let value = entry[1];
                if (key.indexOf('_id') == -1) {
                    if (value instanceof Date) {
                        // @ts-ignore
                        valueJoined.push(sprintf("%02d/%02/%04d", value.getMonth() + 1, value.getDate(), value.getFullYear()));
                    } else {
                        // @ts-ignore
                        valueJoined.push(String(value));
                    }
                }
            });
            const valueJoinedString = valueJoined.join(',');
            // console.log(valueJoinedString, searchWord2);
            for (let word of searchWord2) {
                if (valueJoinedString.includes(word)) {
                    tbody += '<tr>';
                    tbody += sprintf("<td>%d</td>", ++index);
                    for (column of columns) {
                        tbody += sprintf('<td>%s</td>', report[column.name]);
                    }
                    tbody += sprintf('<td>%s</td>', report['completed'] == 'Completed' ? 'Completed' : 'Not yet');
                    tbody += '</tr>';
                    break;
                }
            }
        }
        tbody += '</tbody>';

        html = sprintf("<html>%s<table>%s%s</table></html>", style, thead, tbody);
        return html;
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

    onPrintButtonPressed = async () => {
        const html = this.list2Html();
        await RNPrint.print({
            html: html,
        });
    };

    onPdfButtonPressed = async () => {
        const html = this.list2Html();
        const today = new Date();
        // console.log('html', html);
        const results = await RNHTMLtoPDF.convert({
            html: html,
            fileName: sprintf("DataCollector %04d-%02d-%02d", today.getFullYear(), today.getMonth() + 1, today.getDate()),
            directory: '',
            // base64: true,
        });

        this.setState({
            showAlert: true,
            alertTitle: 'Convert to PDF',
            alertMessage: 'Successfully converted\nFile Name: ' + results.filePath,
        });
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
    //
    // renderListItemBody = (value: any) => {
    //
    //     let items: Array<any> = [];
    //     Object.entries(value).forEach((entry: any) => {
    //         let key = entry[0];
    //         let value = entry[1];
    //         if (key == '_id' || key == 'formId') return;
    //         items.push(
    //             <Label style={Presets.h5.regular}>{key}: {value}</Label>
    //         )
    //     });
    //     console.log('items', items);
    //     return items;
    // };

    render() {
        const self = this;
        const {showConfirm, confirmTitle, confirmMessage, showAlert, alertTitle, alertMessage, searchWord, range} = self.state;

        let searchWord2 = searchWord.length > 2 ? searchWord.split(' ') : [];
        searchWord2.push(range);

        const {reportProcMode, selectedFolder} = self.props;
        const folderRole = selectedFolder.userRole;
        // const userRole = G.UserProfile.data.role;
        // let report: any;
        // let reportsByForm: Array<any> = [];
        // for (report of reports) {
        //     // console.log(report, selectedFormId);
        //     if (report._id == selectedFormId) {
        //         // console.log(report);
        //         reportsByForm = report.reports;
        //         break;
        //     }
        // }
        const reports = self.props.currentReports2;
        let idx = 0;

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
                        {reportProcMode == STRINGS.maintenanceMain && <Button
                            transparent
                            onPress={self.onPlusButtonPressed}
                        >
                            <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"} name={"plus"}/>
                        </Button>}
                        {reportProcMode == STRINGS.reportMain &&
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Button
                                transparent
                                onPress={self.onPrintButtonPressed}
                            >
                                <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"}
                                      name={"print"}/>
                            </Button>
                            <Button
                                transparent
                                onPress={self.onPdfButtonPressed}
                            >
                                <Icon style={[Presets.h3.regular, CommonStyles.headerIcon]} type={"FontAwesome5"}
                                      name={"file-pdf"}/>
                            </Button></View>}
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <Item regular style={styles.credentialItem}>
                        <Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'search'}/>
                        <Input style={[styles.credential, Presets.textFont.regular]} value={searchWord} placeholderTextColor={Colors.placeholder} placeholder={STRINGS.search} onChangeText={(text) => self.onKeyValueFieldChanged('searchWord', text)}/>
                        {/*<Icon style={styles.credentialIcon} type={'FontAwesome5'} name={'arrow-right'} onPress={}/>*/}
                    </Item>
                    <Item regular style={styles.credentialItem}>
                        <Picker style={styles.picker} selectedValue={range} onValueChange={(value) => self.onKeyValueFieldChanged('range', value)}>
                            <Picker.Item label={'All'} value={''} />
                            <Picker.Item label={'Completed'} value={'Completed'} />
                            <Picker.Item label={'Not Completed'} value={'Not yet'} />
                        </Picker>
                    </Item>
                    <ScrollView style={styles.scrollSec}>
                        <List style={styles.scrollSec}>
                            {reports.map((value: any, index: number) => {
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
                                        // idx++;
                                        return (
                                            <ListItem key={value._id} style={styles.listItem}
                                                      onPress={() => self.onListItemPressed(value)}>
                                                <Body style={styles.listItemBody}>
                                                {/*{self.renderListItemBody(value)}*/}
                                                <Label style={Presets.h5.regular}>{++idx}. </Label>
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

    picker: {
        // flex: 1,
        width: '100%',
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
        selectedFormColumns: state.reports.selectedFormColumns,
        reports: state.reports.items,
        reportProcMode: state.reports.reportProcMode,
        selectedFolder: state.folders.selectedFolder,
        currentReports2: state.reports.currentReports2,
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
        setCurrentReports2: (data: any[]) => {
            dispatch(setCurrentReports2(data));
        },
    }
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ReportListScreen);
