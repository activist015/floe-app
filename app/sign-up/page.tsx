import { SignUp } from "@/components/auth/SignUp";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <SignUp />
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="...">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}