<script>
  export let title;
  export let description;
  export let author;
  export let url;
  export let img;
  export let publishDate;
  export let showExcerpt;
  export let size = 'md';
  export let twColor = 'text-pink-300';
  export let category = 'Ukraine';

  const colSpan = {
      sm: ['col-span-12', 'col-span-12'],
      md: ['col-span-3 order-2', 'col-span-9'],
      lg: ['col-span-12', 'col-span-12']
  };

  const getColspan = () => {
      return colSpan[size] || ['col-span-3', 'col-span-9'];
  };
</script>

<a href={url} class="hover:underline">
  <div class="grid overflow-hidden md grid-cols-12 auto-rows-auto gap-2">
      {#if size !== 'xs'}
          <div class={`${getColspan()[0]}`}>
              <img class="w-full h-full object-cover" src={img && img.startsWith('http') ? img : `/images/${img}`} alt="" />
          </div>
      {/if}
      <div class={`${getColspan()[1]}`}>
          {#if size !== 'xs'}
              <p class={`font-black ${twColor}`}>{category}</p>
          {/if}
          <h1 class="text-gray-900 font-bold py-2 text-lg ">{title}</h1>
          {#if description && showExcerpt && size != 'xs'}
              <p class="font-normal text-gray-400">{description}</p>
          {/if}
          
          {#if author && size != 'xs'}
              <p class="font-bold py-1 text-gray-600 text-sm">By {author}</p>
          {/if}
          {#if publishDate}
              <p class="font-normal text-gray-400">{new Date(publishDate).toLocaleString()}</p>
          {/if}
      </div>
  </div>
</a>
