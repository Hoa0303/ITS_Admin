import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = "https://localhost:7171/api" + '/auth'

const login = async (data: any) =>
    await axios.post(API_URL + '/login', data).then((res) => {
        const expires = 12 * 60 * 60 * 1000
        const in12Hour = new Date(new Date().getTime() + expires)
        Cookies.set('nstore_data', JSON.stringify(res.data), { expires: in12Hour })
        return res
    })

const authService = {
    login,
    // register,
    // logout,
    // sendCode,
    // getCurrentUser,
    // loginGoogle,
}
export default authService