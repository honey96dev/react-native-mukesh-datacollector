import React, {Component} from "react";
import {Animated, ScrollView, StyleSheet} from 'react-native';
import {NavigationScreenProps} from "react-navigation";
import {Body, Button, Container, Content, Header, Icon, Label, Left, List, ListItem, Right, Title} from 'native-base';
// @ts-ignore
import {Colors, CommonStyles, Metrics, Presets} from '../../theme';
// @ts-ignore
import {STRINGS} from "../../tools";
import {ROUTES} from "../../routes";
import {api_list, DELETE, fetch, GET} from "../../apis";
import {sprintf} from "sprintf-js";
import MyAlert from "../../components/MyAlert";
import MyConfirm from "../../components/MyConfirm";

import {connect} from 'react-redux';
import {listReport, addReport, deleteReport, deleteReportByForm, editReport, setSelectedFormData, setCreateReportMode} from '../../actions/reports';

interface MyProps {
    reports: Array<any>,
    listReport: (items: Array<any>) => void,
    addReport: (item: any) => void,
    deleteReport: (item: any) => void,
    deleteReportByForm: (form: any) => void,
    editReport: (prev: any, current: any) => void,
    setSelectedFormData: (data: any) => void,
    setCreateReportMode: (data: any) => void,
}

type Props = MyProps & NavigationScreenProps;

class ReportMainScreen extends Component<Props> {
    state = {
        showAlert: false,
        alertTitle: '',
        alertMessage: '',

        showConfirm: false,
        confirmTitle: '',
        confirmMessage: '',

        deletingFormId: -1,
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
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
            // .finally(() => {
            //     this.setState({
            //         doingRegister: false,
            //     });
            // });
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

    onListItemPressed = (value: any) => {
        // let {forms} = this.state;
        // // @ts-ignore
        // const index = columns.indexOf(value);
        // console.log(value);
        this.props.setSelectedFormData({
            id: value._id,
            columns: value.columns,
        });
        this.props.navigation.navigate(ROUTES.ReportList);
    };

    onDeleteListItemButtonPressed = (value: any) => {
        let {reports} = this.props;
        // @ts-ignore
        const index = forms.indexOf(value);
        console.log(index);
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

    render() {
        const self = this;
        const {showConfirm, confirmTitle, confirmMessage, showAlert, alertTitle, alertMessage} = self.state;
        const {reports} = self.props;
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
                    <Title style={[Presets.h4.bold, CommonStyles.headerTitle]}>{STRINGS.reportMain}</Title>
                    </Body>
                    <Right style={CommonStyles.headerRight}>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Body style={styles.body}>
                    <ScrollView style={styles.scrollSec}>
                        <List style={styles.scrollSec}>
                            {reports.map((value: any) => {
                                return (
                                    <ListItem key={value._id} style={styles.listItem} onPress={() => self.onListItemPressed(value)}>
                                        {/*<Left style={styles.listItemLeft}>*/}
                                            {/*<Label style={Presets.h5.regular}>Name:</Label>*/}
                                            {/*<Label style={Presets.h6.regular}>Columns Count:</Label>*/}
                                        {/*</Left>*/}
                                        <Body>
                                        <Label style={Presets.h5.regular}>Form Name: {value.name}</Label>
                                        <Label style={Presets.h6.regular}>Reports Count: {value.reports.length}</Label>
                                        {/*<Label style={Presets.h6.regular}>{columnIdx}</Label>*/}
                                        </Body>
                                        <Right>
                                            <Button
                                                transparent
                                                onPress={() => self.onDeleteListItemButtonPressed(value)}
                                            >
                                                <Icon
                                                    style={[Presets.h3.regular, CommonStyles.headerIcon, styles.listItemDeleteIcon]}
                                                    type={"FontAwesome5"} name="times"/>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                );
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
        reports: state.reports.items,
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
export default connect(mapStateToProps, mapDispatchToProps)(ReportMainScreen);
