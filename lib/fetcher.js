import axios from 'axios'

const fetcherAuth = (data) => axios.post(`${process.env.API_URI}auth/login`,data).then(result=>{
    localStorage.setItem('userToken',JSON.stringify(result.data.data.token))
}).catch(error=>{
    alert('Wrong email/password')
})

const fetcherReg = (data) => axios.post(`${process.env.API_URI}auth/register`,data).then(result=>{
    alert(result.data.message)
}).catch(error=>{
    alert('Wrong email/password')
})

const fetcherUpdate = (url,data) => axios.patch(url,data).then(result=>{
    return result.data.data
})

const fetcherGet = (...args) => axios.get(...args).then(result=>{
    return result.data.data
})

const fetcherDelete = (...args) => axios.delete(...args).then(result=>{
    return result.data.data
    // alert("Delete Notification Success")
})

const fetcherLoggedIn = () => {
    if(localStorage.getItem('userToken')){
        const initial = {
            user : null
        }
        const users = localStorage.getItem('userToken')
        return {...initial, user: users}
    }else{
        throw error
    }
}

const fetcherLogout = () => {
    localStorage.clear()
}

export {fetcherAuth, fetcherReg, fetcherGet, fetcherDelete, fetcherUpdate, fetcherLoggedIn, fetcherLogout}
