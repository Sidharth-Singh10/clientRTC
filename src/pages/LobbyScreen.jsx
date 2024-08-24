import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useSocket} from '../context/SocketProvider'
const LobbyScreen = () => {

    const [room, setRoom] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const socket = useSocket();

    // console.log(socket);


    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        // join room logic here
        socket.emit('room:join',{email,room});

    },[email,room,socket])

    const handleJoinRoom = useCallback( (data) => {

        const {email, room} = data

        navigate(`/room/${room}`)


    }, [navigate])

    useEffect(() => {
    
        socket.on ('room:join', handleJoinRoom)
        return () => {
            socket.off('room:join', handleJoinRoom)
        }  

    },[socket,handleJoinRoom])
    

    return (

        <div className="h-screen w-screen flex flex-col ">
            <div className="w-full h-20 flex justify-center bg-black">
                Lobby Screen
            </div>

            <div>
                <form onSubmit={handleSubmitForm}  >
                
                <label >Email id </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />


                <label >Room no </label>
                <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />

                <button> JOIN </button>

                </form>


            </div>



            
        </div>


    )


}




export default LobbyScreen