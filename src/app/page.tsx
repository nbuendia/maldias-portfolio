'use client'

import { Box } from "@/components/Box";
import { Container } from "@/components/Container";
import { useGreeting } from "@/hooks";
import { Greeting } from "@/sections/Greeting";

export default function Home() {
  const {showComponent} = useGreeting();

  return (
    <Container column style={{background: "#2D2C2C", justifyContent: 'center'}}>
      <Greeting />

      {/* REMOVE USE CLIENT ONCE THIS IS IN ITS OWN FILE */}
      {!showComponent && (
        <Box>
          <div>REST OF APP</div>
        </Box>
      )}
    </Container>
  );
}
