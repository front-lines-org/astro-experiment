<script>
    export let title;
    export let description;
    export let author;
    export let url;
    export let img;
    export let showExcerpt;
  </script>
  
  <a href={url} class="hover:underline">
    <div class="flex flex-wrap justify-evenly">
      <div class="item w-44">
        <img src={img?.startsWith('http') ? img : `/images/${img}`} alt="" />
      </div>
      <div class="item w-32 h-44 flex-grow p-4">
        <p style="color: #f9a1bc;" class="font-black">Ukraine</p>
        <h1 class="text-gray-900 font-bold py-2 text-lg ">{ title}</h1>
        {#if description && showExcerpt}
          <p class="font-normal text-gray-400">{description}</p>
        {/if}
        {#if author}
          <p class="font-bold py-1 text-gray-600 text-sm"> By {author}</p>
        {/if}
      </div>
    </div>
  </a>
  