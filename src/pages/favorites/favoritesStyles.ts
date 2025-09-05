import { StyleSheet } from "react-native";

export const favoritesStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 24,
        height: 140,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 16,
        height: 40,
        width: '80%',
        paddingLeft: 16
    },
    buttonSend: {
        height: 40,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4630EB',
        borderRadius: 16
    },
        showAll: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
})