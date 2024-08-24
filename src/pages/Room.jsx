import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../context/SocketProvider';

const Room = () => {

  const socket = useSocket ();

  const  handleUserJoined = useCallback(({email,id})=>{
    console.log(email );

  },[])

  useEffect(() =>{

    socket.on('user:joined')

    return () =>{
      socket.off('user:joined',handleUserJoined)
    }
  },[handleUserJoined,socket])

  return (
    <div>
        <h1>
            Room page
        </h1>
    </div>
  )
}

export default Room