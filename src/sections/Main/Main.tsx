"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetPokemonByNameQuery } from "@/services/pokemon";

export default function Main() {
  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: pokemonDataIsLoading,
  } = useGetPokemonByNameQuery("bulbasaur");

  return (
    <>
      {pokemonError ? (
        <h2>OH NO! SOMETHING WENT WRONG!</h2>
      ) : pokemonDataIsLoading ? (
        <h2>LOADING...</h2>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <h4>POKEMON DATA</h4>
            <span>{(pokemonData as any).species.name}</span>
            <img src={(pokemonData as any).sprites.front_shiny} />
          </div>
        </>
      )}
    </>
  );
}
