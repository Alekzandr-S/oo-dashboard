"use server"

import { FormState, SigninFormSchema } from "@/lib/definitions";
import { mockUsers } from "@/lib/mock/users";
import { redirect } from "next/navigation";
import { success } from "zod";

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"), 
  })

  if(!validatedFields.success) {
    return {errors: validatedFields.error.flatten().fieldErrors,}
  }

  
  const {email, password} = validatedFields.data;
  // console.log(email, "\n", password);

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    return {
      message: "Invalid credentials. Please check your email or password"
    }
  }

  console.log("Logged in as:", user.email, "Role:", user.role);

  // redirect("/dashboard")
  return {
    success: true, user
  }
}