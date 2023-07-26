<script>
    export let icon = 'default';
    export let url = 'foo';
    export let title = 'some cool title';
</script>


<a href={url} class="flex items-center justify-center w-full max-w-md p-4 text-center no-underline rounded-lg stack bg-base-300 not-prose">
  <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8" />
  <span class="text-lg font-bold text-white">{title}</span>
</a>