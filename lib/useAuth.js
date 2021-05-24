import useSWR from 'swr'
import {fetcherLoggedIn } from './fetcher'

const useAuth = () =>{
    const {mutate, error, data} = useSWR(`userLogin`, fetcherLoggedIn)
    const loading = !data 
    const loggedOut = error 
    return {loadingAuth:loading, loggedOut, userToken:data, mutate}
}

export default useAuth