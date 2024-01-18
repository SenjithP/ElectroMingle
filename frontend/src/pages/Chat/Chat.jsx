import { useRef, useState } from "react";
import ChatBox from "../../components/Chatbox/Chatbox";
import Conversation from "../../components/Conversation/Conversation";
import "./Chat.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  useGetUserMutation,
  useUserChatsMutation,
} from "../../slices/chatApiSlice";

const Chat = () => {
  const socket = useRef();
  const { userInfo, electricianInfo } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [userChats] = useUserChatsMutation();
  const [getUser] = useGetUserMutation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const idToFetch = userInfo?._id || electricianInfo?._id;

        if (idToFetch) {
          const { data } = await getUser(idToFetch);
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [userInfo?._id, electricianInfo?._id]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const userId = userInfo?._id || electricianInfo?._id;
  
        if (userId) {
          const { data } = await userChats(userId);
  
          // Sort chats based on the timestamp of the last message
          const sortedChats = data.map((chat) => ({
            ...chat,
            lastMessageTimestamp: new Date(
              chat.messages[chat.messages.length - 1]?.createdAt
            ),
          }));
  
          sortedChats.sort((a, b) =>
            b.lastMessageTimestamp - a.lastMessageTimestamp
          );
  
          setChats(sortedChats, "chatData");
  
          // Set the last chat as the default chat
          if (sortedChats.length > 0) {
            setCurrentChat(sortedChats[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getChats();
  }, [userInfo?._id, electricianInfo?._id]);
  



  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("wss://www.electromingle.senjith.shop");

    const userId = userInfo?._id || electricianInfo?._id;

    if (userId) {
      socket.current.emit("new-user-add", userId);
    }

    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userInfo?._id, electricianInfo?._id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const userId = userInfo?._id || electricianInfo?._id;

    if (userId) {
      const chatMember = chat.members.find((member) => member !== userId);
      const online = onlineUsers.find((user) => user.userId === chatMember);
      return online ? true : false;
    }

    return false; // Default to false if userId is not available
  };

  return (
    <div className="grid grid-cols-1  sm:grid-cols-5 mr-2 gap-2">
  {/* Left Side */}
  <div className="sm:col-span-1  m-4">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-gray-100 rounded p-4 overflow-auto h-auto min-h-[95vh]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Chats</h2>
        <div className="flex flex-col gap-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setCurrentChat(chat);
              }}
              className="hover:bg-gray-200 cursor-pointer rounded p-2 transition-colors duration-300 ease-in-out"
            >
              <Conversation
                data={chat}
                currentUser={userInfo?._id || electricianInfo?._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Right Side */}
  <div className="sm:col-span-4 flex flex-col gap-4">
    <div className="self-end">{/* NavIcons */}</div>
    <ChatBox
      chat={currentChat}
      currentUser={userInfo?._id || electricianInfo?._id}
      setSendMessage={setSendMessage}
      receivedMessage={receivedMessage}
    />
  </div>
</div>
  );
};

export default Chat;
