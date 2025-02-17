// hooks/useSocket.ts
import { useEffect, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, User } from '../utils/Chat';

interface UseSocketProps {
  userId: string;
  userName: string;
  room: string;
}

export const useSocket = ({ userId, userName, room }: UseSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');

    newSocket.on('connect', () => {
      newSocket.emit('join', { userId, userName, room });
    });

    newSocket.on('connect_error', (err) => {
      setError('Failed to connect to chat server');
      console.error('Socket connection error:', err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId, userName, room]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: Message) => {
      setMessages(prev => [...prev, message]);
    };

    const handleHistory = (history: Message[]) => {
      setMessages(history);
    };

    const handleUserJoined = (user: User) => {
      setActiveUsers(prev => [...prev, user]);
    };

    const handleUserLeft = (user: User) => {
      setActiveUsers(prev => prev.filter(u => u.userId !== user.userId));
    };

    const handleTyping = ({ userName, isTyping }: { userName: string; isTyping: boolean }) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        if (isTyping) {
          newSet.add(userName);
        } else {
          newSet.delete(userName);
        }
        return newSet;
      });
    };

    socket.on('message', handleMessage);
    socket.on('history', handleHistory);
    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);
    socket.on('userTyping', handleTyping);
    socket.on('error', ({ message }) => setError(message));

    return () => {
      socket.off('message', handleMessage);
      socket.off('history', handleHistory);
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
      socket.off('userTyping', handleTyping);
      socket.off('error');
    };
  }, [socket]);

  const sendMessage = useCallback((messageBody: string) => {
    if (socket && messageBody.trim()) {
      socket.emit('message', {
        userId,
        userName,
        messageBody,
        room
      });
    }
  }, [socket, userId, userName, room]);

  const changeRoom = useCallback((newRoom: string) => {
    if (socket) {
      socket.emit('changeRoom', {
        userId,
        userName,
        newRoom,
        oldRoom: room
      });
    }
  }, [socket, userId, userName, room]);

  const emitTyping = useCallback((isTyping: boolean) => {
    if (socket) {
      socket.emit('typing', { userName, room, isTyping });
    }
  }, [socket, userName, room]);

  return {
    messages,
    activeUsers,
    typingUsers: Array.from(typingUsers),
    sendMessage,
    changeRoom,
    emitTyping,
    error
  };
};