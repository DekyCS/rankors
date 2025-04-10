"use server";

import { login } from "@/lib/auth-actions";

/**
 * Server action to handle login with redirect URL
 */
export async function handleLogin(formData: FormData) {
  const redirectUrl = formData.get('redirectUrl') as string;
  
  // Create a new FormData instance to pass to the login function
  const loginFormData = new FormData();
  loginFormData.append('email', formData.get('email') as string);
  loginFormData.append('password', formData.get('password') as string);
  loginFormData.append('redirectUrl', redirectUrl || '/');
  
  return login(loginFormData);
}
