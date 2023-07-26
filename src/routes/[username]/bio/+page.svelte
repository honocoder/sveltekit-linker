<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from '$app/stores';
    import { enhance } from "$app/forms";

  
    export let data: PageData;
  
  </script>
  

<main class="max-w-lg mx-auto my-6 prose text-center">
  
    <p>Current Bio: <span class="text-info">{data.bio}</span></p>
  
    <p>Status Code: {$page.status}</p>
    <p class="text-error">{$page.form?.problem ?? ''}</p>
  
    <form method="POST" use:enhance>
      <div class="form-control">
        <label for="bio" class="label">
          <span class="label-text">Your bio</span>
        </label>
        <textarea
          name="bio"
          class="textarea textarea-bordered textarea-accent"
          value={data.bio}
        />
      </div>
      <button class="my-5 btn btn-primary">Update Bio</button>
    </form>
  </main>
  