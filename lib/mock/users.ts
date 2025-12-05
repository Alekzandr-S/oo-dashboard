export interface User {
  id: number
  name: string
  email: string
  password: string
  role: UserRole
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Jane Officer",
    email: "officer@example.com",
    password: "password123",
    role: "officer"
  },  
  {
    id: 2,
    name: "John Supervisor",
    email: "supervisor@example.com",
    password: "password123",
    role: "supervisor"
  },  
]  

export type UserRole = "officer" | "supervisor"

