import { useState, useEffect } from 'react'
import Link from 'next/link'
import ChatContainer from "../components/ChatContainer"
import { BsLinkedin } from 'react-icons/bs'
import { AiOutlineMail, AiOutlineInfoCircle, AiOutlineCloseCircle } from 'react-icons/ai'

export default function Home() {
  const [show, setShow] = useState(true)
  const [windowWidth, setWindowWidth] = useState()
  
  const updateWindowWidth = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }

  useEffect(() => {
    updateWindowWidth()
    window.addEventListener("resize", updateWindowWidth)
  },[])

  useEffect(() => {
    windowWidth < 720 ? setShow(false) : setShow(true)
  },[windowWidth])


  const InfoSection = () => (
    <div className={`${show ? "transition-all ease-in duration-700 block" : "transition-all ease-in duration-700 hidden" } "flex flex-col md:w-1/2 m-auto px-2 pb-6"`}>
        <div className="px-4 text-gray-200 px-4">
          <h1 className="py-2">
            <span className="text-3xl text-gray-100 font-semibold">Hi, my name is&nbsp;</span>
            <span className="font-bold text-4xl text-white font-extrabold">Arif Oyong</span>
          </h1>
          <h3 className="text-lg italic">
            ~ Always learning ~
          </h3>
          <p className="mt-4">
            This is a chat bot designed to answer interview questions.
            Like most of chat bot, if you find it not enough for the job, you can interview me directly. 
          </p>
          <p className="mt-4">
            You can reach me through: 
          </p>
          <div className="flex space-x-2 ">
            <Link href="https://www.linkedin.com/in/arif-wicaksono-oyong-62087721">
              <a><BsLinkedin className="w-6 h-6"/></a>
            </Link>
            <Link href="mailto:arifoyong@gmail.com">
              <a><AiOutlineMail className="w-6 h-6"/></a>
            </Link>
          </div>
        </div>
      </div>
  )

  const InfoButton = () => (
    <div className="text-white block md:hidden px-2 py-2 flex justify-end">
      <button className="flex items-center space-x-1 hover:text-gray-200"
            onClick={() => setShow(!show)}>
        {show ? <AiOutlineCloseCircle  className="w-6 h-6"/> : <AiOutlineInfoCircle className="w-6 h-6"/>}
      </button>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-l from-rose-400 via-fuchsia-500 to-indigo-500">
      <InfoButton /> 
      <InfoSection />
      
      <div className="flex-grow overflow-y-hidden w-full h-full md:w-1/2 m-auto px-2 py-2 md:px-8 md:py-12">
        <ChatContainer />
      </div>
    </div>
  )
}