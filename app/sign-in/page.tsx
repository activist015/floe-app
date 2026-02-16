import { SignIn } from "@/components/auth/SignIn";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <SignIn />
        <p className="text-center text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/sign-up" className="...">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}