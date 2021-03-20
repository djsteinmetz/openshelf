import LoginForm from "@/components/login-form";
import Container from "@/components/container";

export default function login() {
  return (
    <Container className="w-full lg:w-1/4">
      <LoginForm />
    </Container>
  );
}
