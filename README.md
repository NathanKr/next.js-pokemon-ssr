<h2>Motivation</h2>
play with server side rendering using getServerSideProps

<h2>Top level schema</h2>

![top-level-schema](./figs/server-side-rendering.png)


<h2>The core idea</h2>
A page component that implement getServerSideProps (Pokemons component) fetch data and render on the server and the resulting HTML is downloaded to the client !!!!!!!!!!

<h2>HTML is created on the server</h2>

![html-created](./figs/html_is_rendered_on_the_server_and_donload_to_the_client.png)

<h2>Implementation</h2>

<p>This function is defined in pokemons page</p>


```ts
export async function getServerSideProps() {
  const response = await fetch(url);
  const jsonPokemons = await response.json();

  return {
    // props will be passed to the page component as props
    props: {pokemons:jsonPokemons}
  };
}
```

<p>getServerSideProps is invoked on the server and jsonPokemons is passed to Pokemons component as props. so no need for useState and useEffect in Pokemons</p>

```ts
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

```




