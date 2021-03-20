import RegisterForm from "@/components/register-form";
import Container from "@/components/container";

export default function register() {
  return (
    <Container className="w-full">
      <p className="text-xl">Register</p>
      <RegisterForm />
    </Container>
  );
}
