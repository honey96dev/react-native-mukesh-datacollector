import React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";
import {Body, List, ListItem, Picker, Right, Switch, View} from "native-base";
import {Colors, Metrics, Presets} from "../../theme";
import {STRINGS} from "../../tools";

const usersTab = (items: any[], onListItemPickerClicked: (index: number, role: string) => void) => {
    // console.log(items);
    return (
        <ScrollView style={styles.scrollSec}>
            <List style={styles.scrollSec}>
                {items.map((value, index) => {
                    if (value.userRole != STRINGS.admin) {
                        return (
                            <ListItem style={styles.listItem}>
                                <Body style={styles.listItemBody}>
                                <Text style={Presets.h4.regular}>{index + 1}. </Text>
                                <View style={styles.userInfoSec}>
                                    <Text style={Presets.h5.regular}>{value.name}</Text>
                                    <Text style={Presets.h6.regular}>{value.email}</Text>
                                </View>
                                </Body>
                                <Right style={styles.listItemRight}>
                                    <Picker
                                        mode="dropdown"
                                        note={false}
                                        style={[Presets.textFont.regular, styles.rolePicker]}
                                        selectedValue={value.role}
                                        placeholder={STRINGS.selectRole}
                                        onValueChange={(value) => onListItemPickerClicked(index, value)}>

                                        <Picker.Item key={STRINGS.folderNone} label={STRINGS.folderNone}
                                                     value={STRINGS.folderNone}/>
                                        <Picker.Item key={STRINGS.folderUser} label={STRINGS.folderUser}
                                                     value={STRINGS.folderUser}/>
                                        <Picker.Item key={STRINGS.folderManager} label={STRINGS.folderManager}
                                                     value={STRINGS.folderManager}/>
                                    </Picker>
                                    {/*<Switch thumbTintColor={Colors.primaryButtonBackground}*/}
                                    {/*trackColor={{false: Colors.placeholder, true: Colors.secondaryButtonBackground}}*/}
                                    {/*value={value.checked}*/}
                                    {/*onValueChange={(value) => onListItemClicked(index, value)}/>*/}
                                </Right>
                            </ListItem>
                        );
                    }
                })}
            </List>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollSec: {
        width: '100%',
    },
    listItem: {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    listItemBody: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemRight: {
        flex: 2,
        textAlign: 'right',
    },
    userInfoSec: {
        marginLeft: Metrics.smallMargin,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rolePicker: {
        // flex: 1,
        width: '100%',
        color: Colors.textForeground,
    },
});

export default usersTab;