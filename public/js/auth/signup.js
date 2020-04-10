import axios from 'axios'

const testUserSign = (e) => {
    e.preventDefault()

    console.log("TESTING SIGN UP")

    axios.post('/api/auth/login', { username: 'username', password: 'password'})
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
}

export default testUserSign