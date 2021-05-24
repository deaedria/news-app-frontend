import useSWR from 'swr'
import { fetcherDelete } from './fetcher'

const useRequest = (id) =>{
    const {data, error} = useSWR(`${process.env.API_URI}notification/remove?id=${id}`, fetcherDelete)
    const loading = !data
    console.log(data)
    return {notifResult:data, error, loading}
}

export default useRequest