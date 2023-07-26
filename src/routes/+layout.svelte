<script lang="ts">
  import { user, userData } from "$lib/firebase";
    import "../app.css";

    $user;
    $userData;
</script>

<div class="flex flex-col min-h-screen">
    <slot />
</div>