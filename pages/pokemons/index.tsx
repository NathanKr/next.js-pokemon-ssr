import React, { useEffect, useState } from "react";
import styles from "../../styles/Pokemons.module.css";

const url = "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json";

export async function getServerSideProps() {
  const response = await fetch(url);
  const jsonPokemons = await response.json();

  return {
    // props will be passed to the page component as props
    props: {pokemons:jsonPokemons}
  };
}

interface IPokemon {
  id: number;
  name: string;
  image: string;
}

const Pokemons = (props: {pokemons : IPokemon[]}) => {
  console.log(props);

  const elems = props.pokemons.map((pokemon) => (
    <div key={pokemon.id}>
      <div>
        {/* might use Image of next */}
        <img src={pokemon.image} alt="image" />
        <h5>{pokemon.name}</h5>
      </div>
    </div>
  ));

  return (
    <div className={styles.Pokemons}>
        <h2>These pokemons are fetched using SSR function getServerSideProps</h2>
      <main className={styles.gridPokemons}>
        {elems}</main>
    </div>
  );
};

export default Pokemons;
