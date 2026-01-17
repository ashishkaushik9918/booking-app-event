import { Button } from "@/components/ui/button";
import { Chrome, Facebook, Github } from "lucide-react"

const handleGoogleLogin = () => {
  window.location.href = "http://127.0.0.1:8181/auth/google";
};
const handleFacebookLogin = () => {
  window.location.href = 'http://localhost:8181/auth/facebook';
};


const handleGithubLogin = () => {
  window.location.href = 'http://localhost:8181/auth/github';
};
export const SocialLoginButton = () => {
    return (
        <div className="flex flex-col gap-3">
            <Button onClick={handleGoogleLogin}
                asChild
                className="w-full justify-center gap-3 bg-[#4285F4] text-white hover:bg-[#4285F4]/90"
            >
                <a href="#">
                    <Chrome className="h-5 w-5" />
                    Continue with Google
                </a>
            </Button>
            <Button
                onClick={handleFacebookLogin}
                asChild
                className="w-full justify-center gap-3 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
            >
                <a href="#">
                    <Facebook className="h-5 w-5" />
                    Continue with Facebook
                </a>
            </Button>
            <Button
                onClick={handleGithubLogin}
                asChild
                className="w-full justify-center gap-3 bg-[#24292F] text-white hover:bg-[#24292F]/90"
            >
                <a href="#">
                    <Github className="h-5 w-5" />
                    Continue with GitHub
                </a>
            </Button>
        </div>
    );
}