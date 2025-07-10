function pokeApiRequest() {
  return fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(json => { return json })
}



