import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../context/SocketProvider";

import peer from "../service/peer";

const Room = () => {
  const socket = useSocket();

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await peer.getOffer();

    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  },[remoteSocketId,socket]);

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(email);
    setRemoteSocketId(id);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);

    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [handleUserJoined, socket]);

  return (
    <div>
      <h1>Room page</h1>
      <h4>{remoteSocketId ? "Connected" : "Emprt room"} </h4>

      <div>
        <h1> your video </h1>
        {remoteSocketId && <button onClick={handleCallUser}>CALL </button>}
        {myStream && (
          <ReactPlayer
            playing
            muted
            height="300px"
            width="500px"
            url={myStream}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
