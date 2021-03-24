import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LedsList = props => {

    const { leds } = props;
    console.log("LED LIST" + leds)
    if (leds.length == 0)
        return (<View></View>)
    const ret = leds.map(led => {

        const { qtd, name } = led;
        return (
            <View style={styles.container} key={qtd}>
                <Text style={[styles.default, styles.id]}> {qtd}</Text>
                <Text style={[styles.default, styles.nome]}> {name} </Text>
            </View>
        );
    });

    return (
        <View>
            {ret}
        </View>
    )

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    default: {
        padding: 20,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        borderStyle: 'solid',
    },
    id: {
        flex: 0.1,
        textAlign: 'center',
    },
    nome: {
        flex: 0.9,
    }
});

export default LedsList;