const indexHtmlContent = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yami Lat - Tu Guía de Anime</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" href=""https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/css/styles.css" as="style" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/css/styles.css" media="all" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
      rel="stylesheet"
      media="print"
      onload="this.media='all'"
    />
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  </head>
  <body class="bg-gray-900 text-white">
    <div id="app-root"></div>

    <!-- Facebook SDK for Comments Plugin (from series/index.html and favoritos/inicio-app.html) -->
    <div id="fb-root"></div>
    <script>
      window.fbAsyncInit = function () {
        FB.init({
          appId: "1320266426121861", // Reemplaza con tu App ID real
          xfbml: true,
          version: "v18.0",
        });
        FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/es_LA/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    </script>



    <template id="series-template">
      <section id="series-section" class="py-8 px-4">
        <div id="series-content" class="grid grid-cols-3 gap-3 md:gap-4">
          <!-- Content will be dynamically loaded here -->
    </template>

    <template id="buscador-template">
      <main3 id="main3-content" class="container mx-auto max-w-screen-xl">
        <div class="flex flex-col sticky top-0 bg-gray-900/80 backdrop-blur-sm z-40 py-2 px-4">
          <div class="flex justify-between items-center w-full">
            <button id="back-button" class="text-gray-400 hover:text-white transition">
              <i class="fas fa-arrow-left text-2xl"></i>
            </button>
            <div class="flex items-center space-x-2">
              <svg
                class="h-6 w-6 md:h-7 md:w-7 text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9a2.25 2.25 0 0 0-2.25 2.25v9A2.25 2.25 0 0 0 4.5 18.75Z"
                />
              </svg>
              <h1 class="text-xl md:text-2xl font-bold text-white">
                Yami<span class="text-orange-500">Lat</span>
              </h1>
            </div>
            <button id="add-content-button" class="text-white hover:text-gray-200 transition-colors">
              <i class="fas fa-plus text-2xl"></i>
            </button>
          </div>
          <div class="relative flex-grow mt-4 w-full">
            <input
              type="text"
              id="search-input"
              placeholder="Buscar películas, series, animes..."
              class="w-full p-3 pl-10 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-500"
            />
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div id="default-content-slider" class="mt-6 mb-8 px-4">
          <div id="slider-content" class="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
            <!-- Default content posters will be loaded here -->
          </div>
        </div>


        <h2 id="recommended-title" class="text-lg font-bold mb-4 text-white text-center">Animes y películas recomendadas</h2>
        <h2 id="search-results-title" class="text-xl font-bold mb-4 text-white text-center hidden">Resultados de búsqueda</h2>
        <div id="search-results" class="flex flex-col gap-4 mx-4">
          <!-- Search results will be loaded here -->
        </div>

        <!-- Nuevo contenedor -->
        <div id="additional-content-container" class="mt-8 px-4 mb-8">
          <div id="additional-content" class="flex flex-col gap-4">
            <!-- Contenido adicional se cargará aquí -->
          </div>
        </div>

      </main3>
    </template>

    <template id="adult-content-template">
      <main3 id="main3-content" class="pb-20">

        <!-- Hero Slider for Adult Content -->
        <section
          id="adult-hero-slider-section"
          class="relative w-full h-[60vh] overflow-hidden mt-4"
        >
          <!-- Adult Hero slider content will be loaded here -->
        </section>

        <!-- Prestigio Plus Section for Adult Content -->
        <section id="adult-prestigio-plus-section" class="py-1">
          <h2 class="text-3xl font-bold text-prestigio-plus-gradient mb-6 text-center">Membreria Prestigio Plus</h2>
          <div id="prestigio-plus-content" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <!-- Content for Prestigio Plus will be dynamically loaded here -->
          </div>
        </section>




        <!-- Sliders Section for Adult Content -->
        <section id="adult-sliders-section" class="container mx-auto px-4 py-8">
          <!-- Adult content sliders will be loaded here -->
        </section>

      </main3>
    </template>


    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/script.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/home.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/series.js" defer></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/adultContent.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/configuracion.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/aboutAndDMCA.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/buscador.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/config.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/adsdsdsds@main/home10/./js/favoritos.js"></script>

    <template id="peliculas-template">
      <section id="movies-section" class="py-8 px-4">
        <div id="movies-content" class="grid grid-cols-3 gap-3 md:gap-4">
          <!-- Content will be dynamically loaded here -->
        </div>
      </section>
    </template>

    <template id="favoritos-template">
      <div class="w-full min-h-screen bg-slate-900 text-white font-sans">
        <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }

                .text-shadow-custom {
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
            </style>

            <!-- Contenedor del Título con GIF de fondo -->
            <div class="relative rounded-xl overflow-hidden shadow-2xl shadow-orange-500/20 mb-10 mt-4">
                <img src="https://cdn.jsdelivr.net/gh/geminiproai37-blip/Y4m1L4T-Styles@latest/gifs/favorite.webp" class="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Fondo animado abstracto">
                <div class="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
                <h2 class="relative text-4xl sm:text-5xl md:text-6xl font-bold text-center py-10 z-20 font-poppins text-shadow-custom">
                    <span class="text-white">Mis</span>
                    <span class="text-orange-500">Favoritos</span>
                </h2>
            </div>

            <div class="flex justify-around mb-6 border-b border-gray-700 w-full">
              <button id="all-tab-btn" class="filter-btn text-gray-400 hover:text-white text-sm font-semibold py-3 px-4 transition-colors duration-200 border-b-2 border-transparent flex-1 text-center" data-filter="all">Todos</button>
              <button id="movie-tab-btn" class="filter-btn text-gray-400 hover:text-white text-sm font-semibold py-3 px-4 transition-colors duration-200 border-b-2 border-transparent flex-1 text-center" data-filter="movie">Películas</button>
              <button id="tv-tab-btn" class="filter-btn text-gray-400 hover:text-white text-sm font-semibold py-3 px-4 transition-colors duration-200 border-b-2 border-transparent flex-1 text-center" data-filter="tv">Anime</button>
              <button id="adult-tab-btn" class="filter-btn text-gray-400 hover:text-purple-500 text-sm font-semibold py-3 px-4 transition-colors duration-200 border-b-2 border-transparent flex-1 text-center" data-filter="adult">+18</button>
            </div>

            <div id="favorites-content-container">
              <div id="all-content" class="tab-content"></div>
              <div id="movie-content" class="tab-content hidden"></div>
              <div id="tv-content" class="tab-content hidden"></div>
              <div id="adult-content" class="tab-content hidden"></div>
            </div>


            <!-- Delete Confirmation Modal -->
            <div id="delete-confirmation-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden">
              <div class="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <h3 class="text-lg font-bold text-white mb-4">Confirmar Eliminación</h3>
                <p class="text-gray-300 mb-6">¿Estás seguro de que quieres eliminar <span id="item-name-to-delete" class="font-semibold text-orange-400"></span> de tus favoritos?</p>
                <div class="flex justify-end gap-3">
                  <button id="cancel-delete-btn" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200">Cancelar</button>
                  <button id="confirm-delete-btn" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200">Eliminar</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </template>

    <template id="request-modal-template">
      <div id="request-modal" class="modal hidden">
        <div class="modal-content-wrapper">
          <button id="close-modal-btn" class="absolute top-2 right-2 text-gray-300 hover:text-white text-xl sm:text-2xl transition-colors duration-200 focus:outline-none">
            <i class="fas fa-times-circle"></i>
          </button>
          <div class="flex justify-center items-center mb-2">
            <h2 class="text-lg sm:text-xl font-extrabold text-white text-center">Solicitar Contenido</h2>
            <div id="request-count-container" class="ml-2 flex items-center text-yellow-400">
              <i class="fas fa-coins mr-1"></i>
              <span id="request-count">--</span>
            </div>
          </div>

          <!-- Step 1: Search TMDB -->
          <div id="modal-step-1">
            <div id="no-requests-message" class="hidden text-center text-white mb-4">
              <p>No tienes solicitudes disponibles. Para obtener más, ve a <a href="#" id="config-link" class="text-orange-500 underline">Configuración</a> y consigue puntos para solicitar tu anime favorito.</p>
            </div>
            <div class="flex items-center mb-3 space-x-2 sm:space-x-3">
              <div class="relative flex-grow">
                <input
                  type="text"
                  id="modal-search-input"
                  placeholder="Buscar en TMDB (películas, series...)"
                  class="w-full p-2 pl-8 text-sm sm:p-2.5 sm:pl-10 sm:text-base rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <i class="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:left-3"></i>
              </div>
              <button id="modal-search-button" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 text-sm sm:py-2.5 sm:px-4 sm:text-base rounded-md transition-colors">
                Buscar
              </button>
            </div>
            <div id="tmdb-search-results" class="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3 max-h-48 sm:max-h-60 overflow-y-auto custom-scrollbar hidden">
              <!-- TMDB search results will be displayed here -->
            </div>
            <button id="next-step-btn" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 text-sm sm:py-2.5 sm:px-4 sm:text-base rounded-md transition-colors opacity-50 cursor-not-allowed" disabled>
                Siguiente
              </button>
            </div>

            <!-- Step 2: Confirm Request -->
            <div id="modal-step-2" class="hidden">
              <!-- Removed selected-content-preview as per user request -->

              <div id="in-app-question" class="mb-4">
                <p class="text-white text-center mb-3 text-sm sm:text-base">¿Es una serie y quieres solicitar un episodio específico?</p>
                <div class="flex justify-center space-x-3">
                  <button id="in-app-yes-btn" class="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 text-sm sm:py-2 sm:px-5 sm:text-base rounded-md transition-colors">Sí</button>
                  <button id="in-app-no-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-4 text-sm sm:py-2 sm:px-5 sm:text-base rounded-md transition-colors">No</button>
                </div>
              </div>

              <div id="episode-request-fields" class="hidden mb-4">
                <div class="mb-3">
                  <label for="season-number-input" class="block text-white text-xs sm:text-sm font-bold mb-1">Temporada:</label>
                  <input type="number" id="season-number-input" min="1" class="w-full p-2 text-sm sm:p-2.5 sm:text-base rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 transition-colors" placeholder="Ej: 1">
                </div>
                <div>
                  <label for="episode-number-input" class="block text-white text-xs sm:text-sm font-bold mb-1">Episodio:</label>
                  <input type="number" id="episode-number-input" min="1" class="w-full p-2 text-sm sm:p-2.5 sm:text-base rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-orange-500 transition-colors" placeholder="Ej: 5">
                </div>
              </div>

              <div class="flex justify-between space-x-3">
                <button id="back-to-step-1-btn" class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-3 text-sm sm:py-2.5 sm:px-4 sm:text-base rounded-md transition-colors">
                  Atrás
                </button>
                <button id="submit-request-btn" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 text-sm sm:py-2.5 sm:px-4 sm:text-base rounded-md transition-colors opacity-50 cursor-not-allowed" disabled>
                  Enviar Solicitud
                </button>
              </div>
            </div>
          </div>
        </template>
        <div id="notification-container"></div>
      </body>
    </html>
`;
export default indexHtmlContent;
