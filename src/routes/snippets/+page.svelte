<script>
  import { HighlightSvelte } from "svelte-highlight";
  import dracula from "svelte-highlight/styles/dracula";
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  let { data } = $props();
  let snippets = data.snippets
 
  let selectedLanguage = $state('all');
  const filterByLanguage = (lang) => {
    selectedLanguage = lang;
  };
 




  const langs = ['all', 'JavaScript', 'Python', 'Java', 'C++', 'Ruby'];
</script>
<svelte:head>
  {@html dracula}
</svelte:head>
<main class="min-h-screen bg-black text-white pt-20  bg-gradient-to-b from-purple-900/20 to-transparent ">
    <nav class="bg-gradient-to-b from-purple-900/20 to-transparent bg-opacity-5 backdrop-blur-sm border-b border-white/10 fixed w-full top-0 z-50 ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
          <div class="flex items-center justify-between h-16 bg-transparent">
            <div class="flex items-center bg-transparent">
              <a href="/" class="text-white font-bold text-xl flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 22V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="2" fill="currentColor"/>
                </svg>
                SnipIt
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/snippets" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Public Snippets
              </a>
              <a href="/#new" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200" >
                New Snippet
              </a>
            </div>
          </div>
        </div>
      </nav>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <h1 class="text-4xl font-bold mb-8">Public Snippets</h1>

    <div class="mb-8 flex gap-4 flex-wrap">
      {#each langs as lang}
        <button
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                 {selectedLanguage === lang 
                   ? 'bg-purple-600 text-white' 
                   : 'bg-white/10 hover:bg-white/20 text-gray-300'}"
          onclick={() => filterByLanguage(lang)}
        >
          {lang}
        </button>
      {/each}
      <button
      class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ml-auto bg-gradient-to-t from-purple-500/20 to-transparent border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-200" 
      onclick={() => {
        window.location.reload();
      }}
    >
  
      Refresh
    </button>
    </div>

    <div class="grid gap-10 m-auto  ">
      {#each snippets as snippet (snippet.id)}
        {#if snippet.language === selectedLanguage || selectedLanguage === 'all'}

        <div class=" bg-gradient-to-b from-purple-900/20 to-transparent rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/30 hover:-translate-y-2" in:slide={{ duration: 150 }} out:fade={{ duration: 100 }}>
          <div class="flex justify-between items-center mb-4">
            
              
            
            <div class="">
              <h1 class="text-2xl mb-2 font-bold">{snippet.name}</h1>

              
              <span class="text-gray-400 mr-1">by {snippet.author}</span>
              <span class="text-gray-400 mr-1">•</span> <span class="text-purple-400">{snippet.language}</span>
            </div>
            <span class="text-gray-400 text-sm">{snippet.created_at}</span>
          </div>
          <div class="border-2 rounded-lg border-white/10">
          
            <HighlightSvelte class="custom-highlight" code={snippet.code}  />
          </div>
          <div class="mt-4 flex justify-end gap-4">
            <button 
              class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              onclick={() => {
                navigator.clipboard.writeText(snippet.code);
                const btn = event.currentTarget;
                btn.textContent = "Copied!";
                setTimeout(() => {
                  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                  </svg>Copy`;
                }, 2000);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
              </svg>
              Copy
            </button>
            <button class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
              Share
            </button>
          </div>
        </div>
        {/if}
      {/each}
    </div>
    
  </div>

</main>
<style>
  :global(.hljs) {
    background: #22222267 !important;
  }
</style>