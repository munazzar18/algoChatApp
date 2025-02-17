// types/chat.ts
export interface Message {
    _id: string;
    userId: string;
    userName: string;
    messageBody: string;
    timestamp: string;
    room: string;
}

export interface User {
    userId: string;
    userName: string;
    lastRoom: string;
}

export interface ChatRoom {
    name: string;
    activeUsers: User[];
}

export interface CurrentUser {
    userId: string;
    userName: string;
}