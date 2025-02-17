// app/chat/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSocket } from './hooks/useSocket'
import { Chat } from './components/chat'
import { LoginForm } from './components/LoginForm'

export default function ChatPage() {
  const [userId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || uuidv4()
    }
    return uuidv4()
  })

  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('general')
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    const savedUserName = localStorage.getItem('userName')
    if (savedUserName) {
      setUserName(savedUserName)
      setIsJoined(true)
    }
  }, [])

  const {
    messages,
    activeUsers,
    typingUsers,
    sendMessage,
    changeRoom,
    emitTyping,
    error,
  } = useSocket({
    userId,
    userName,
    room,
  })

  const handleJoin = (name: string) => {
    if (name.trim()) {
      setUserName(name)
      localStorage.setItem('userId', userId)
      localStorage.setItem('userName', name)
      setIsJoined(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userName')
    setUserName('')
    setIsJoined(false)
  }

  if (!isJoined) {
    return <LoginForm onSubmit={handleJoin} />
  }

  return (
    <div className="min-h-screen">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Chat Room: {room}</h1>
          <select
            value={room}
            onChange={(e) => {
              setRoom(e.target.value)
              changeRoom(e.target.value)
            }}
            className="border rounded-lg px-3 py-1"
          >
            <option value="general">General</option>
            <option value="random">Random</option>
            <option value="support">Support</option>
          </select>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <Chat
        messages={messages}
        activeUsers={activeUsers}
        typingUsers={typingUsers}
        currentUser={{ userId, userName }}
        onSendMessage={sendMessage}
        onTyping={emitTyping}
      />
    </div>
  )
}
