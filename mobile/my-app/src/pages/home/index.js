import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from "react-native";
// import { useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

    return (
        <View style={styles.main}>
            <Text>teste home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#0C153C",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});