// components/UsersList.tsx
import { User, CurrentUser } from '../utils/Chat'

interface UsersListProps {
  users: User[]
  currentUser: CurrentUser
}

export const UsersList = ({ users, currentUser }: UsersListProps) => {
  return (
    <div className="w-64 bg-gray-50 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Active Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId} className="py-2 px-3 rounded mb-1">
            {user.userName}
            {user.userId === currentUser.userId && ' (You)'}
          </li>
        ))}
      </ul>
    </div>
  )
}
