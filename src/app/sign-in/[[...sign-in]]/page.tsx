import { SignIn } from "@clerk/nextjs";
import OrbBackground from "@/components/OrbBackground";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <OrbBackground />
      <div className="relative z-10">
        <SignIn />
      </div>
    </div>
  );
}
