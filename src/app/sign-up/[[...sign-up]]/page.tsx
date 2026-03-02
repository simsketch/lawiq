import { SignUp } from "@clerk/nextjs";
import OrbBackground from "@/components/OrbBackground";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
      <OrbBackground />
      <div className="relative z-10">
        <SignUp />
      </div>
    </div>
  );
}
