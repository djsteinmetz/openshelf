import LoginForm from "@/components/login-form";
import Container from "@/components/container";

export default function login() {
  return (
    <Container className="w-full">
      <p className="text-xl">Login</p>
      <LoginForm />
    </Container>
  );
}
