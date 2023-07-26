<script lang="ts">
    import { page } from "$app/stores";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import SortableList from "$lib/components/SortableList.svelte";
    import UserLink from "$lib/components/UserLink.svelte";
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
    } from "firebase/firestore";
    import { writable } from "svelte/store";
  
    const icons = [
      "Twitter",
      "YouTube",
      "TikTok",
      "LinkedIn",
      "GitHub",
      "Custom",
    ];
    const formDefaults = {
      icon: "custom",
      title: "",
      url: "https://",
    };
    const formData = writable(formDefaults);
  
    let showForm = false;
  
    $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
    $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
    $: formIsValid = urlIsValid && titleIsValid;
  
    function sortList(e: CustomEvent) {
      const newList = e.detail;
      const userRef = doc(db, "users", $user!.uid);
      setDoc(userRef, { links: newList }, { merge: true });
    }
  
    async function addLink(e: SubmitEvent) {
      const userRef = doc(db, "users", $user!.uid);
  
      await updateDoc(userRef, {
        links: arrayUnion({
          ...$formData,
          id: Date.now().toString(),
        }),
      });
  
      formData.set({
        icon: "",
        title: "",
        url: "",
      });
  
      showForm = false;
    }
  
    async function deleteLink(item: any) {
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        links: arrayRemove(item),
      });
    }
  
    async function toggleProfileStatus(item: any) {
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        published: !$userData?.published,
      });
    }
  
    function cancelLink() {
      formData.set(formDefaults);
      showForm = false;
    }
  </script>
  
  <main class="max-w-xl mx-auto">
    {#if $userData?.username == $page.params.username}
      <h1 class="mx-2 mt-8 mb-4 text-2xl font-bold text-center">
        Edit your Profile
      </h1>
  
      <div class="mb-8 text-center">
        <p>
          Profile Link:
          <a
            href={`/${$userData?.username}`}
            class="link link-accent"
          >
            https://kung.foo/{$userData?.username}
          </a>
        </p>
      </div>
  
      <div class="my-4 text-center">
        <a class="btn btn-outline btn-xs" href="/login/photo">Change photo</a>
        <a class="btn btn-outline btn-xs" href={`/${$userData.username}/bio`}>Edit Bio</a>
      </div>
  
      <form class="form-control">
        <label class="flex items-start justify-center cursor-pointer label">
          <span class="mr-6 label-text">
            <div
              class="tooltip group-hover:tooltip-open"
              data-tip="If public, the world can see your profile"
            >
              {$userData?.published ? "Public profile" : "Private profile"}
            </div>
          </span>
          <input
            type="checkbox"
            class="toggle toggle-success"
            checked={$userData?.published}
            on:change={toggleProfileStatus}
          />
        </label>
      </form>
  
      <SortableList list={$userData?.links} on:sort={sortList} let:item let:index>
        <div class="relative group">
          <UserLink {...item} />
          <button
            on:click={() => deleteLink(item)}
            class="absolute invisible transition-all btn btn-xs btn-error group-hover:visible -right-6 bottom-10"
            >Delete</button
          >
        </div>
      </SortableList>
      {#if showForm}
        <form
          on:submit|preventDefault={addLink}
          class="w-full p-6 mx-auto bg-base-200 rounded-xl"
        >
          <select
            name="icon"
            class="select select-sm"
            bind:value={$formData.icon}
          >

            {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input
            name="title"
            type="text"
            placeholder="Title"
            class="input input-sm"
            bind:value={$formData.title}
          />
          <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-sm"
            bind:value={$formData.url}
          />
          <div class="my-4">
            {#if !titleIsValid}
              <p class="text-xs text-error">Must have valid title</p>
            {/if}
            {#if !urlIsValid}
              <p class="text-xs text-error">Must have a valid URL</p>
            {/if}
            {#if formIsValid}
              <p class="text-xs text-success">Looks good!</p>
            {/if}
          </div>
  
          <button
            disabled={!formIsValid}
            type="submit"
            class="block btn btn-success">Add Link</button
          >
  
          <button type="button" class="my-4 btn btn-xs" on:click={cancelLink}>Cancel</button>
        </form>
      {:else}
        <button
          on:click={() => (showForm = true)}
          class="block mx-auto my-4 btn btn-outline btn-info"
        >
          Add a Link
        </button>
      {/if}
    {/if}
  </main>