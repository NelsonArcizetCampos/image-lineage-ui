<script lang="ts">
  import { onMount } from "svelte"
  import ImageService from '$lib/services/ImageService'

  let images: { id: string; url: string }[] = []
  let error: string | null = null
  let loaded = false

  async function fetchImages() {
    try {
      images = await ImageService.getImages()
    } catch (e) {
      error = String(e)
    } finally {
      loaded = true
    }
  }

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) return

    try {
      const newImages = await ImageService.addImages(target.files)
      images = [...images, ...newImages]
    } catch (e) {
      error = String(e)
    }
  }

  async function deleteImage(imageId: string) {
    try {
      await ImageService.removeImage(imageId)
      images = images.filter(img => img.id !== imageId)
    } catch (e) {
      error = String(e)
    }
  }

  onMount(fetchImages)
</script>

<main>
  <div class="top-bar">
  <div class="app-title">Image Lineage</div>
  <label class="upload-button">
    Upload
    <input type="file" accept="image/*" multiple on:change={handleFileUpload} hidden />
  </label>
</div>


  {#if error}
    <p class="error">{error}</p>
  {:else if !loaded}
    <p>A carregar imagens...</p>
  {:else if images.length === 0}
    <p>Sem imagens.</p>
  {:else}
    <div class="gallery">
      {#each images as image}
        <div class="image-container">
          <img src={image.url} alt="Imagem" />
          <button class="delete-button" on:click={() => deleteImage(image.id)}>✕</button>
        </div>
      {/each}
    </div>
  {/if}

</main>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Cantarell&display=swap');

:global(body) {
  margin: 0;
  font-family: 'Cantarell', system-ui, sans-serif;
  background-color: #1f2b38;
  color: #f0f0f0;
}

main {
  text-align: center;
  padding: 2rem;
  background-color: #1f2b38;
  min-height: 100vh;
  color: #f0f0f0;
}

  .top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.app-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #f0f0f0;
}

  .upload-button {
  cursor: pointer;
  padding: 0.4rem 1rem;
  background-color: #7b2031;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

.upload-button:hover {
  background-color: #681b2a;
}


  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }

  .image-container {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    background: #f3f3f3;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
  }

  .error {
    color: red;
    font-weight: bold;
  }
</style>

