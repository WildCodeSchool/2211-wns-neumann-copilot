import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import { useGetProfileQuery, useLoginMutation, useLogoutMutation } from "../gql/generated/schema";
import * as SecureStore from 'expo-secure-store';

export default function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    const [login] = useLoginMutation();
    const [logout] = useLogoutMutation();
    const [error, setError] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>page de login</Text>
            </View>
            {currentUser?.profile ?
                <View>
                    <Text style={{ textAlign: 'center', margin: 30 }}>Vous êtes connecté en tant que : {currentUser?.profile.email}</Text>
                    <Pressable style={styles.button}
                        onPress={async () => {
                            await logout();
                            client.resetStore();
                            SecureStore.setItemAsync('token', "");
                        }}
                    >
                        <Text style={styles.textOnButton}>Se déconnecter</Text>
                    </Pressable>
                </View>
                :
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val => setCredentials({ ...credentials, email: val }))}
                        value={credentials.email}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(val => setCredentials({ ...credentials, password: val }))}
                        value={credentials.password}
                    />
                    {error && <Text style={styles.error}>{error}</Text>}
                    <Pressable style={styles.button}
                        onPress={async () => {
                            console.log(credentials);
                            try {
                                setError('');
                                const res = await login({ variables: { data: credentials } });
                                SecureStore.setItemAsync('token', res.data?.login as string);
                                console.log({ res });
                            } catch (err) {
                                setError("Email ou mot de passe incorrect");
                            } finally {
                                client.resetStore();
                            }
                        }}
                    >
                        <Text style={styles.textOnButton}>Se connecter</Text>
                    </Pressable>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        color: "#518071",
    },
    title: {
        alignItems: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#518071",
        marginVertical: 12,
        marginHorizontal: 50,
        borderRadius: 5,
    },
    textOnButton: {
        textAlign: "center",
        padding: 12,
        fontWeight: "bold",
        color: "white"
    },
    error: {
        color: "red",
        textAlign: "center",
    }
});