import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from "react-native";
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

    const [email, setEmail] = useState("teste@gmail.com");
    const [senha, setSenha] = useState("123");

    let dados = {
        email: email,
        senha: senha
    }

    const userLogin = () => {
        fetch("http://10.87.207.35:3000/usuario/login"
            , {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }
        )
            .then(res => {
                return res.json()

            })
            .then(data => {
                if (data.result.email !== undefined) {
                    AsyncStorage.setItem('token', data.result.token)
                    navigation.navigate("Home")
                } else {
                    alert('Erro')
                }
            })
    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.titulo}>ENTRAR NA CONTA</Text>
                <Text style={styles.text}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(value) => {
                        setEmail(value);
                    }}
                ></TextInput>
                <Text style={styles.text}>Senha</Text>

                <TextInput
                    style={styles.input}
                    value={senha}
                    onChangeText={(value) => {
                        setSenha(value);
                    }}
                ></TextInput>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        userLogin()
                    }}
                >
                    <Text style={styles.title}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "rgb(140, 138, 130)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        height: 300,
        width: 300,
        backgroundColor: "#4c4223",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        border: '4px solid rgb(255, 255, 255)'
    },
    input: {
        backgroundColor: "#fff",
        margin: 5,
    },
    titulo: {
        color: 'rgb(255, 255, 255)',
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        color: "black",
    },
    button: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: '5px',
        border: '3px solid #black',
        textAlign: 'center',
        marginTop: '2vh',
        width: '10vh'
    },
    text: {
        color: 'rgb(255, 255, 255)',
        fontSize: 20,
        fontWeight: 'bold',
    }
});