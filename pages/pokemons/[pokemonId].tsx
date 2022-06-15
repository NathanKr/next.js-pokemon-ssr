import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/PokemonDetails.module.css";

interface IStat {
  name: string;
  value: number;
}

interface IPokemonDetails {
  name: string;
  type: string[];
  stats: IStat[];
  image: string;
}

const PokemonDetails = () => {
  const router = useRouter();
  const { pokemonId } = router.query;
  useEffect(getPokemon, [pokemonId]);
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails>();

  function getPokemon() {
    if (pokemonId) {
      const url = `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${pokemonId}.json`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setPokemonDetails(data))
        .catch((err) => console.error(err));
    }
  }

  if (!pokemonDetails) {
    return <div>Details are undefined ........</div>;
  }

  const statsElem = pokemonDetails.stats.map((it,i) => (
    <tr key={i}>
      <td>{it.name}</td>
      <td>{it.value}</td>
    </tr>
  ));
  const tableElem = (
    <table>
      <tr>
        <th>Name</th>
        <th>Value</th>
      </tr>
      {statsElem}
    </table>
  );
  const imgUrl = `/${pokemonDetails.image}`;
  return (
    <div className={styles.PokemonDetails}>
      <img src={imgUrl} alt="image" />
      <div>
        <h3>{pokemonDetails.name}</h3>
        <p>{pokemonDetails.type}</p>
        {tableElem}
      </div>
    </div>
  );
};

export default PokemonDetails;