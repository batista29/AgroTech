import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Manutencao() {

    const [manutencoes, setManutencoes] = useState([])
    const [lida, setLida] = useState([]);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("token");
            console.log(value)
            setLida(value)
        } catch (err) {
            console.log(err);
        }
    }

    if (lida.length == 0) getData();

    useEffect(() => {
        fetch("http://10.87.207.35:3000/manutencao")
            .then(res => { return res.json() })
            .then(data => {
                setManutencoes(data)
            })
    })

    const finalizarManutencao = (id, descricao, valor, dataFim) => {

        let dados = {
            id: id,
            descricao: descricao,
            valor: valor,
            data_fim: dataFim
        }
        console.log(dados)

        fetch('http://10.87.207.35:3000/manutencao'
            , {
                "method": "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: lida
                },
                body: JSON.stringify(dados)
            })
            .then(response => {
                if (response.status === 200) {
                    alert("Finalizado");
                    window.location.reload()
                } else {
                    console.log(response.status);
                }
            })
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    manutencoes.map((e, index) => {
                        let now = new Date()
                        let fim = (now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)) + "-" + now.getDate())
                        let dataFim = fim + "T00:00:00.000Z"

                        var dateInicio = new Date(e.data_inicio);
                        let dataInicioFormatada = dateInicio.toLocaleDateString("pt-BR", {
                            timeZone: "UTC",
                        });
                        if (e.data_fim === null) {
                            let dataFImFormatada = null;

                            return (
                                <View key={index} style={styles.manutencao}>
                                    <Text style={styles.texto}>{e.descricao}</Text>
                                    <Text style={styles.texto}>Valor: R${e.valor}</Text>
                                    <Text style={styles.texto}>Data Inicio: {dataInicioFormatada}</Text>
                                    <Text style={styles.texto}>Data Fim: {dataFImFormatada}</Text>
                                    <TouchableOpacity onPress={() => { finalizarManutencao(e.id, e.descricao, e.valor, dataFim) }}>
                                        <Text style={styles.texto3}>Finalizar</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        } else {
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
                                    <TouchableOpacity onPress={() => { finalizarManutencao(e.id, e.descricao, e.valor, dataFim) }}>
                                        <Text style={styles.texto3}>Finalizar</Text>
                                    </TouchableOpacity>
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
    },
    texto3: {
        marginBottom: 5,
        fontSize: 22,
        color: 'red',
        fontFamily: 'Arial',
    },
})