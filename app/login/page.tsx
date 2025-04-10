"use client";

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/app/login/components/login-form"
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  // Use the client-side useSearchParams hook instead
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirectTo') || '/';
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm redirectUrl={redirectUrl} />
      </div>
    </div>
  )
}
