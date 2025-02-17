// components/Message.tsx
import { Message as MessageType } from '../utils/Chat'

interface MessageProps {
  message: MessageType
  isCurrentUser: boolean
}

export const Message = ({ message, isCurrentUser }: MessageProps) => {
  return (
    <div
      className={`mb-4 ${
        isCurrentUser ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
        }`}
      >
        <div className="font-semibold text-sm mb-1">
          {message.userName}
          {isCurrentUser && ' (You)'}
        </div>
        <div>{message.messageBody}</div>
        <div className="text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
