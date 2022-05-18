import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            return value;
        }
    } catch (err) {
        console.log(err)
    }
}

export default getToken;