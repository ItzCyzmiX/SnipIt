<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  let code = $state('');
  let copied = $state(false);
  let author = $state('');
  let language = $state('');
  let snippetName = $state('');
  let created = $state(false)
  let snippet = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;
let loading = $state(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => copied = false, 2000);
  };
  const scrollToNew = () => {
    const newSection = document.getElementById('new');
    newSection.scrollIntoView({ behavior: 'smooth' });
  };
  let error = $state('');
  const newSnippet = async () => {
    if (code === '' || author === '' || language === '') {
      error = 'Please fill all fields!'
      setTimeout(() => error = '', 2000);
      return;
    }
    const res = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({
        code,
        author,
        language,
        snippetName
      })
    })

    if (res.status !== 200) {
      error = 'Error while creating snippet try again later!'
      setTimeout(() => error = '', 2000);
      return;
    } else {
      created = true
      setTimeout(() => created = false, 2000);
      return;
    }

  }
</script>

<svelte:head>
  <title>SnipIt - Share Code Snippets</title>
</svelte:head>

<main class="min-h-screen bg-transparent text-white">
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
          <a href="/snippets" data-sveltekit-preload-data="hover" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Public Snippets
          </a>
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200" onclick={scrollToNew}>
            New Snippet
          </button>
        </div>
      </div>
    </div>
  </nav>
  <!-- Hero Section -->
  <div class=" top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
    <div class="absolute top-[15%] left-[12%] transform -rotate-3 bg-gradient-to-b from-purple-900/20 to-transparent p-6 rounded-lg border border-white/10 w-fit hidden md:block">
      <pre class="text-sm">
        <code>{snippet}</code>
      </pre>
    </div>

    <div class="absolute top-[15%] right-[12%] transform rotate-3 bg-gradient-to-b from-purple-900/20 to-transparent p-6 rounded-lg border border-white/10 w-[300px] hidden md:block">
      <pre class="text-sm">
        <code>{`
class Node:
  def __init__(self, val = 0):
      self.val = val
      self.left = None
      self.right = None`} </code>
      </pre>
    </div>

    <div class="absolute top-[35%] left-[45%] transform -translate-x-1/2 bg-gradient-to-b from-purple-900/20 to-transparent p-6 rounded-lg border border-white/10 w-[300px] hidden md:block">
      <pre class="text-sm">
        <code>{`
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};`}</code>
      </pre>
    </div>
  </div>
  <div class="py-24 bg-gradient-to-b from-purple-900/20 to-transparent mt-2">
    
    <div class="max-w-4xl mx-auto text-center ">
      <h1 class="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-purple-100 via-purple-400 to-purple-600">
        SnipIt
      </h1>
      <h1 class="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400 ">
        Share Code <span class="italic text-white border-b-2 text-gradient-to-r from-white to-purple-400 z-10">Effortlessly</span>
      </h1>
      <p class="text-xl text-gray-300 mb-8 leading-relaxed ">
        A simple, fast, and elegant way to share your code snippets with anyone.
      </p>
      
    </div>
  </div>

  <!-- Features Section -->
  <div class="">
    <h1 class="text-4xl font-bold mb-8 text-center text-white">Why SnipIt?</h1>
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-gradient-to-tr from-purple-900/30 to-transparent bg-opacity-5 rounded-lg p-6 shadow-lg hover:bg-opacity-10 transition-all duration-200 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-900/30 hover:translate-y-2">
          <div class="text-2xl mb-4">🚀</div>
          <h3 class="text-xl font-bold mb-2">Lightning Fast</h3>
          <p class="text-gray-300">Share your code in seconds with anyone, anywhere.</p>
        </div>
        <div class="bg-gradient-to-t from-purple-900/30 to-transparent bg-opacity-5 rounded-lg p-6 shadow-lg hover:bg-opacity-10 transition-all duration-200 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-900/30 hover:translate-y-2  ">
          <div class="text-2xl mb-4">🔒</div>
          <h3 class="text-xl font-bold mb-2">Secure</h3>
          <p class="text-gray-300">Your code stays private and secure.</p>
        </div>
        <div class="bg-gradient-to-tl from-purple-900/30 to-transparent bg-opacity-5 rounded-lg p-6 shadow-lg hover:bg-opacity-10 transition-all duration-200 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-900/30 hover:translate-y-2">
          <div class="text-2xl mb-4">✨</div>
          <h3 class="text-xl font-bold mb-2">Beautiful</h3>
          <p class="text-gray-300">Clean, minimal interface for distraction-free sharing.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div id="new" class="p-6 mt-10 mb-24">
    <div class="max-w-4xl mx-auto ">
      <h2 class="text-4xl font-bold mb-8">Share A Snippet Now!</h2>
      
      <div class="space-y-6 space-x-6 bg-gradient-to-b from-purple-900/20 to-transparent bg-opacity-5 rounded-lg p-6 shadow-lg hover:bg-opacity-10 transition-all duration-200 border border-white/10  hover:shadow-lg hover:shadow-purple-900/30">
        <div class="flex gap-3 mb-4">
          <div class="grid grid-cols-2 gap-3">
            <input
              type="text" 
              bind:value={snippetName}
              placeholder="Snippet name"
              class="mr-auto bg-white bg-opacity-5 text-white p-4 rounded-lg
                     focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200 w-80"
            />
            <input
              type="text"
              bind:value={author}
              placeholder="Author name"
              class="mx-auto flex-1 bg-white bg-opacity-5 text-white p-4 rounded-lg
                     focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200 w-full"
            />
          </div>
          
          <select 
            bind:value={language}
            style="appearance: none;"
            class="ml-auto bg-white/5 text-white p-4 rounded-lg w-48
                   focus:outline-none focus:ring-1 focus:ring-white/20 
                   border border-white/10 hover:border-white/20
                   transition-all duration-200 appearance-none
                   bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNyAxMGw1IDUgNS01IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] 
                   bg-no-repeat bg-[center_right_1rem]"
          >
            <option class="text-white bg-transparent" style="appearance: none;" value="" disabled selected>Select Language</option>
            <option class="text-white bg-transparent" style="appearance: none;" value="JavaScript">JavaScript</option>
            <option class="text-white bg-transparent" style="appearance: none;" value="Python">Python</option>
            <option class="text-white bg-transparent" style="appearance: none;" value="Java">Java</option>
            <option class="text-white bg-transparent" style="appearance: none;" value="C++">C++</option>
            <option class="text-white bg-transparent" style="appearance: none;" value="Ruby">Ruby</option>
          </select>
        </div>

        <div class="relative bg-transparent bg-opacity-5 rounded-lg shadow-lg ml-10">
          <textarea
            bind:value={code}
            placeholder="Paste your code here..."
            class="w-full h-64 bg-white bg-opacity-5 text-white p-4 rounded-lg font-mono 
                   focus:outline-none focus:ring-1 focus:ring-white/20 resize-none transition-all duration-200  inset-0"
          ></textarea>
        </div>

        <div class=" flex justify-center items-center ">
          {#if error}
            <div class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 border-2 border-white/10 shadow-lg shadow-red-900/30" in:slide out:fade>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {error}
              <button
                aria-label="Close"
                class="ml-2 text-white hover:text-gray-300 transition-colors "
                onclick={() => {
                  error = '';
                  setTimeout(() => error = '', 2000);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          {/if}
           {#if created}
            <div class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 border-2 border-white/10 shadow-lg shadow-green-900/30" in:slide out:fade>
  
              Snippet created succsesfully!
              <button
                aria-label="Close"
                class="ml-2 text-white hover:text-gray-300 transition-colors "
                onclick={() => {
                  created = false;
                  setTimeout(() => created = false, 2000);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          {/if}

          {#if loading}
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-black border-2 border-white/10  drop-shadow-lg rounded-lg p-6 flex flex-col items-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p class="mt-4 text-white font-bold">Creating your snippet...</p>
              </div>
            </div>
          {/if}
          <button
            onclick={async () => {
              loading = true;
              await newSnippet();
              loading = false;
            }}
            class="bg-white text-black
                   hover:from-emerald-600 hover:to-teal-700 px-8 py-3 rounded-lg
                   transition-all duration-200 focus:outline-none focus:ring-2 
                   focus:ring-purple-500 font-medium shadow-lg hover:shadow-xl
                   flex items-center gap-2 transition-all duration-200"
          >
            Publish
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-bold mb-8 mt-8">Or check out some of our public snippets</h1><span class="text-blue-500 hover:text-blue-600"><a class="bg-white text-black px-4 py-2 rounded-lg" href="/snippets">Here</a></span>
      </div>
    </div>
  </div>

</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #000;
  }

  textarea {
    font-family: 'Fira Code', 'Courier New', Courier, monospace;
  }
</style>
