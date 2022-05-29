import React, { useState, useEffect, useRef } from 'react'

const INITIAL_CHATS = [
  {user: 'bot', msg: 'Hi, this is an interview chat bot.'},
  {user: 'bot', msg: 'You can ask common interview questions "like tell me about yourself", etc'},
  {user: 'guest', msg: 'Hello there'},
  {user: 'bot', msg: 'Hi'},
  // {user: 'guest', msg: 'What is your name?'},
  // {user: 'bot', msg: 'My name is Arif Wicaksono Oyong'},
  // {user: 'guest', msg: 'Where are you from?'},
  // {user: 'bot', msg: 'I am from Indonesia'},
  // {user: 'guest', msg: 'What do you do currently?'},
  // {user: 'bot', msg: 'I am currently working as Engineering Manager for Murata Electronics Singapore Pte Ltd'},
  // {user: 'guest', msg: 'What is your job scope?'},
  // {user: 'bot', msg: 'Our team is in charge of machine improvement. With recent trends of Industry 4.0, we are focusing on machine data colleciton, visualizatioin & data analysis'},
  // {user: 'guest', msg: 'What do you do currently?'},
  // {user: 'bot', msg: 'I am currently working as Engineering Manager for Murata Electronics Singapore Pte Ltd'},
  // {user: 'guest', msg: 'What is your job scope?'},
  // {user: 'bot', msg: 'Our team is in charge of machine improvement. With recent trends of Industry 4.0, we are focusing on machine data colleciton, visualizatioin & data analysis'},
]

const API_ENDPOINT = "http://localhost:8000/question"

const ChatContainer = () => {
  const [chats, setChats] = useState(INITIAL_CHATS)
  const [inputVal, setInputVal] = useState("")

  const messagesEndRef = useRef(null)
  const scrollToBottom = () =>  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

  useEffect(() => {
    // triggerAPI()
    scrollToBottom()
  }, [chats])

  const handleKeypress = (e) => (e.key === "Enter" && inputVal !== "") && sendMsg()
  const handleChange = (e) => setInputVal(e.target.value)
  const handleClick = () => (inputVal !== "") && sendMsg()

  const sendMsg = async () => {
    setChats([...chats, {msg: inputVal, user: 'guest'}])
  }

  const RenderChats = () => {
    const GuestChat = ({msg, i}) => (
      <li key={i} className="justify-start flex">
        <div className="justify-start rounded-r-2xl rounded-bl-2xl bg-green-200 max-w-xl px-4 py-2 text-gray-700 shadow">
          <span className="block">{msg}</span>
        </div>
      </li>
    )
  
    const BotChat = ({msg, i}) => (
      <li key={i} className="justify-end flex">
        <div className="justify-end rounded-l-2xl rounded-br-2xl bg-blue-200 max-w-xl px-4 py-2 text-gray-700 shadow">
          <span className="block">{msg}</span>
        </div>
      </li>
    )

    return (
      chats.map((chat,i) => (
        chat.user === 'bot' ? <BotChat msg={chat.msg} i={i}/> : <GuestChat msg={chat.msg} i={i}/>
      ))
    )
  }

  
  return (
    
      <div className="flex flex-col h-full bg-gray-100 rounded-lg">
        {/* Chat section */}
        <ul className="grow flex flex-col space-y-2 overflow-y-auto px-4 py-2 rounded-t-lg">
            {RenderChats()}
            <li ref={messagesEndRef} />
        </ul>

        {/* Send message section */}
        <div className="flex px-4 py-2">
          <input className="grow px-4 py-2 rounded-md"
              type="text" 
              placeholder="type your message here"
              value={inputVal}
              onChange={handleChange}
              onKeyPress={handleKeypress}
              />
          <button className="bg-blue-700 text-white px-4 py-2 ml-4 rounded-lg"
                  onClick={() => handleClick()}>
            Send
          </button>
        </div>

      </div>
    
  )
}

export default ChatContainer