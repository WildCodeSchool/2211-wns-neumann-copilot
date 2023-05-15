import { FlatList, StyleSheet, Text, View } from "react-native";
import { useGetUsersQuery } from "../gql/generated/schema";

export default function Trajet() {

    const { data: getUsers, loading, error } = useGetUsersQuery();
    console.log(getUsers);
    console.log(getUsers?.getUsers[0].email);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>Page des trajets</Text>
            </View>
            <Text>test d'affichage de listes d'utilisateurs :</Text>
            {/* {getUsers.getUsers.map(user => (
                <View>
                    <Text>id : {user.id}</Text>
                    <Text>email : {user.email}</Text>
                </View>
            ))} */}
            <FlatList
                data={getUsers?.getUsers}
                renderItem={({item}) => (
                    <View>
                        <Text>id : {item.id}</Text>
                        <Text>email : {item.email}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text>aucun utilisateur</Text>}
                ItemSeparatorComponent={() => <View style={styles.list} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 10,
    },
    title: {
        alignItems: "center",
        marginBottom: 20,
    },
    list: {
        height: 1,
    },
});