import React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";
import {Body, List, ListItem, Right, Switch} from "native-base";
import {Colors, Metrics, Presets} from "../../theme";

const formsTab = (items: any[], onListItemClicked: (index: number, checked: boolean) => void) => {
    return (
        <ScrollView style={styles.scrollSec}>
            <List style={styles.scrollSec}>
                {items.map((value, index) => {
                    return (
                        <ListItem style={styles.listItem}>
                            <Body style={styles.listItemBody}>
                            <Text style={Presets.h5.regular}>{index + 1}. {value.name}</Text>
                            {/*<Text style={Presets.h6.regular}>{value.lastModifiedDate}</Text>*/}
                            </Body>
                            <Right>
                                <Switch thumbColor={Colors.primaryButtonBackground}
                                        trackColor={{false: Colors.placeholder, true: Colors.secondaryButtonBackground}}
                                        value={value.checked}
                                        onValueChange={(value) => onListItemClicked(index, value)}/>
                            </Right>
                        </ListItem>
                    );
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
        // flex: 1,
    },
});

export default formsTab;