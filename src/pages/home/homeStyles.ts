import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 70,
        paddingBottom: 24,
        height: 120,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
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
    loading: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    filter: {
        backgroundColor: '#e4e4e4ff',
        width: '50%',
        padding: 20,
        marginTop: 136,
        borderBottomLeftRadius: 16
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    filterSubTitle: {
        fontSize: 16,
        marginBottom: 12
    },
    checkbox: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    buttonView: {
        alignItems: 'center',
        marginTop: 24
    },
    buttonApply: {
        backgroundColor: '#4630EB',
        height: 30,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    applyText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
})