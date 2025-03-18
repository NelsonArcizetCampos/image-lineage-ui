<script>
  import { onMount } from "svelte";

  let images = [];
  let error = null;

  async function fetchImages() {
    try {
      const response = await fetch("http://localhost:8080/images");
      if (!response.ok) {
        throw new Error("Erro ao carregar imagens");
      }
      images = await response.json();
    } catch (err) {
      error = err.message;
    }
  }

  onMount(fetchImages);
</script>

<main>
  <h1>Galeria de Imagens</h1>

  {#if error}
    <p class="error">{error}</p>
  {:else if images.length === 0}
    <p>A carregar imagens...</p>
  {:else}
    <div class="gallery">
      {#each images as image}
        <div class="image-container">
          <img src={"http://localhost:8080/" + image.url} alt={image.filename} />
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 2rem;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    justify-content: center;
    align-items: start;
  }

  .image-container {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px; /* Altura sincronizada */
    background: #f3f3f3; /* Fundo neutro */
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    max-width: 100%;
    height: 100%; /* Garante altura sincronizada */
    object-fit: cover; /* Mantém proporção e recorta o excesso */
    border-radius: 5px;
  }

  .error {
    color: red;
    font-weight: bold;
  }
</style>

