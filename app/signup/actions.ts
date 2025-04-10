"use server";

import { createClient } from "@/utils/supabase/server";

export async function signupWithEmailVerification(formData: FormData) {
  const supabase = await createClient();

  // Extract form data
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = {
    email,
    password,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`,
        email,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  };

  const { error, data: signupData } = await supabase.auth.signUp(data);

  // Return the result instead of redirecting
  return {
    success: !error,
    error: error?.message,
    email,
    isEmailConfirmationSent: signupData?.user?.identities?.length === 0 || 
                            signupData?.user?.identities?.[0]?.identity_data?.email_verified === false
  };
}
