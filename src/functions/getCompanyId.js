import AsyncStorage from '@react-native-async-storage/async-storage';

const getCompanyId = async () => {

    try {
        const value = await AsyncStorage.getItem('companyId')
        if (value !== null) {
            return value;
        }
    } catch (err) {
        console.log(err)
    }
}

export default getCompanyId