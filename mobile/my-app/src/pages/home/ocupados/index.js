import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'

export default function Indisponiveis() {

    const [frotas, setFrotas] = useState([])

    useEffect(() => {
        fetch("http://10.87.207.35:3000/frotas")
            .then(res => { return res.json() })
            .then(data => {
                setFrotas(data)
            })
    })

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    frotas.map((e, index) => {
                        if (e.status === false) {
                            return (
                                <View key={index} style={styles.manutencao}>
                                    <Text style={styles.texto}>ID: {e.id}</Text>
                                    <Text style={styles.texto}>Marca: {e.marca}</Text>
                                    <Text style={styles.texto}>Modelo: {e.modelo}</Text>
                                    <Text style={styles.texto}>Placa: {e.placa}</Text>
                                </View>
                            )
                        }
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgb(140, 138, 130)',
        alignItems: 'center',
    },
    texto: {
        marginBottom: 5,
        fontSize: 22,
        color: 'rgb(255, 216, 44)',
        fontFamily: 'Arial',
    },
    manutencao: {
        height: '230px',
        width: '370px',
        border: '1px solid white',
        marginTop: '30px',
        backgroundColor: 'rgb(44, 42, 31)',
        textAlign: 'center',
        justifyContent: 'center'
    }
})