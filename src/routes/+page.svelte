<script lang="ts">
  import { onMount } from "svelte"
  import { createClient } from "@supabase/supabase-js"
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

  let images: { id: string; url: string }[] = []
  let error: string | null = null

  async function fetchImages() {
    error = null

    const { data, error: fetchError } = await supabase
      .from('images')
      .select('*')

    if (fetchError) {
      error = fetchError.message
      return
    }

    if (!Array.isArray(data)) {
      error = 'Resposta inesperada da API.'
      return
    }

    images = data
  }

  onMount(fetchImages)
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
          <img src={image.url} alt="Imagem" />
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
    height: 250px;
    background: #f3f3f3;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .error {
    color: red;
    font-weight: bold;
  }
</style>

