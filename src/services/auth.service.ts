import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = import.meta.env.VITE_API_URL + "/api/auth"

const login = async (data: any) =>
    await axios.post(API_URL + '/login', data).then((res) => {
        const expires = 12 * 60 * 60 * 1000
        const in12Hour = new Date(new Date().getTime() + expires)
        Cookies.set('admin_data', JSON.stringify(res.data), { expires: in12Hour })
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