import axios from '../../components/config/axios'

export const registerNewUser = (data, history) => dispatch => {
    axios.post(`catchup/register`, data)
        .then(res => {
            localStorage.setItem('user-auth', res.data.token)
            dispatch(setUser(res.data))
            history.push(`/catchup/home`)
            console.log(history)
            console.log(res.data)
        })
        .catch(err => console.log(err))
}

export const loginUser = (data, history) => dispatch => {
    axios.post(`catchup/login`, data)
        .then(res => {
            localStorage.setItem('user-auth', res.data.response.token)
            dispatch(setUser(res.data.response.user))
            history.push(`/catchup/home`)
            console.log(history)
            console.log(res.data.response.token)
            console.log(res.data.response.user)
        })
        .catch(err => console.log(err))
}

export const setUser = user => {
    return {
        type: 'AUTHENTICATE_USER',
        payload: user
    }
}

// account

export const StartSetUser = () => {
    return (dispatch) => {
        axios.get('/catchup/account', {
            headers: {
                'x-auth': localStorage.getItem('user-auth')
            }
        })
        .then((response) => {
            dispatch(setUser(response.data))
            console.log(response.data)
        })
    }
}


