export interface User {
  id: number
  name: string
  email: string
  password: string
  avatar?: string
  role: UserRole
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Jane Officer",
    avatar: "/avatars/shadcn.jpg",
    email: "officer@example.com",
    password: "password123",
    role: "officer"
  },  
  {
    id: 2,
    name: "John Supervisor",
    avatar: "/avatars/shadcn.jpg",
    email: "supervisor@example.com",
    password: "password123",
    role: "supervisor"
  },  
]  

export type UserRole = "officer" | "supervisor"

