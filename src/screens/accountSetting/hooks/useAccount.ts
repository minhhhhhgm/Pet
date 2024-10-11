import { useEffect, useState } from "react";
import { RootAccount } from "../type";
import useRequest from "services";
import socket from "services/socket";



const useAccount = () => {

    const [users, setUsers] = useState<RootAccount>()
    const [currentSize, setCurrentSize] = useState(5)
    const { getRequest, postRequest } = useRequest()


    const getUsers = async ({ size }: { size: number }) => {
        const response = await getRequest<any, RootAccount>('/api/users', {
            page: 1,
            size: 9
        })
        
        
        setUsers(prevUsers => ({
            ...prevUsers,
            ...response,
        }));

    }

    const followUser =async (id:string)=>{
        const res = await postRequest<any , {message:string , status : boolean}>('api/users/follow',{
            userIdToFollow:id
        })
        socket.on('new-follower', (data) => {
            console.log('Connected to WebSocket server in App', data);
          });
        console.log(res);
        
    }   
    useEffect(() => {
        getUsers({ size: currentSize })
    },[currentSize])
    const loadMore = () => {
        setCurrentSize(20);
    };
    return {
        getUsers,
        users,
        loadMore,
        followUser
    }
}

export default useAccount;