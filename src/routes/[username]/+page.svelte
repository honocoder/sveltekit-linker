<script lang="ts">
    import UserLink from "$lib/components/UserLink.svelte";
import type { PageData } from "./$types";
    
    export let data: PageData;
  
</script>
  
  <svelte:head>
    <title>@{data.username} Links</title>
    <meta name="description" content={data.bio} />
  </svelte:head>
  
  
  <main class="mx-auto mt-8 prose text-center">

    <h1 class="text-purple-500 text-7xl">
      @{data.username}
    </h1>
  
    <img
      src={data.photoURL ?? "/user.png"}
      alt="photoURL"
      width="256"
      class="mx-auto"
    />
  
    <p class="my-8 text-xl">{data.bio ?? "no bio yet..."}</p>
    <ul class="list-none">
      {#each data.links as item}
        <li>
            <UserLink {...item} />
        </li>
      {/each}
    </ul>
  
  </main>