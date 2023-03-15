import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'

export default function Manutencao() {

    const [manutencoes, setManutencoes] = useState([])

    useEffect(() => {
        fetch("http://10.87.207.35:3000/manutencao")
            .then(res => { return res.json() })
            .then(data => {
                setManutencoes(data)
            })
    })

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    manutencoes.map((e, index) => {
                        var dateInicio = new Date(e.data_inicio);
                        let dataInicioFormatada = dateInicio.toLocaleDateString("pt-BR", {
                            timeZone: "UTC",
                        });
                        var dateFim = new Date(e.data_fim);
                        let dataFImFormatada = dateFim.toLocaleDateString("pt-BR", {
                            timeZone: "UTC",
                        });
                        return (
                            <View key={index} style={styles.manutencao}>
                                <Text style={styles.texto}>{e.descricao}</Text>
                                <Text style={styles.texto}>Valor: R${e.valor}</Text>
                                <Text style={styles.texto}>Data Inicio: {dataInicioFormatada}</Text>
                                <Text style={styles.texto}>Data Fim: {dataFImFormatada}</Text>
                            </View>
                        )
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