import { Container } from "@/components/Container";
import { Greeting } from "@/sections/Greeting";
import { Main } from "@/sections/Main";

export default function Home() {

  return (
    <Container column style={{background: "#2D2C2C", height: "100vh"}}>
      <Greeting />
      <Main />
    </Container>
  );
}
