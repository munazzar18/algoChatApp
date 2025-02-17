import { useState, useRef } from 'react'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  onTyping: (isTyping: boolean) => void
}

export const MessageInput = ({
  onSendMessage,
  onTyping,
}: MessageInputProps) => {
  const [messageInput, setMessageInput] = useState('')
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    onTyping(true)
    typingTimeoutRef.current = setTimeout(() => onTyping(false), 1000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim()) {
      onSendMessage(messageInput)
      setMessageInput('')
      onTyping(false)
    }
  }

  return (
    <form onSubmit={handleSendMessage} className="p-4 border-t">
      <div className="flex gap-2">
        <textarea
          value={messageInput}
          onChange={handleMessageChange}
          className="flex-1 resize-none rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage(e)
            }
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </form>
  )
}
