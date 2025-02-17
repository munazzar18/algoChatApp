// components/Chat.tsx
import { useRef, useEffect } from 'react'
import { Message as MessageType } from '../utils/Chat'
import { Message } from './MessageComponent'
import { MessageInput } from './MessageInput'
import { UsersList } from './UserList'

interface ChatProps {
  messages: MessageType[]
  activeUsers: { userId: string; userName: string; lastRoom: string }[]
  typingUsers: string[]
  currentUser: { userId: string; userName: string }
  onSendMessage: (message: string) => void
  onTyping: (isTyping: boolean) => void
}

export const Chat = ({
  messages,
  activeUsers,
  typingUsers,
  currentUser,
  onSendMessage,
  onTyping,
}: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex h-screen">
      <UsersList users={activeUsers} currentUser={currentUser} />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <Message
              key={message._id || index}
              message={message}
              isCurrentUser={message.userId === currentUser.userId}
            />
          ))}
          <div ref={messagesEndRef} />

          {typingUsers.length > 0 && (
            <div className="text-sm text-gray-500 italic">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'}{' '}
              typing...
            </div>
          )}
        </div>

        <MessageInput onSendMessage={onSendMessage} onTyping={onTyping} />
      </div>
    </div>
  )
}
