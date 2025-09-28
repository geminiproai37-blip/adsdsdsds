export const configuracionTemplate = `
<div class="min-h-screen bg-gray-900 text-white">
  <!-- Navbar will be loaded here -->
  <nav id="navbar-placeholder"></nav>

  <main class="container mx-auto p-4 pb-20">
    <h2 class="text-3xl font-bold text-center mb-8 text-vibrant-orange">
      Ajustes de Sección
    </h2>
      <div class="bg-gray-800 rounded-lg shadow-lg p-4">
      <div class="relative flex items-center mb-4 pt-2 min-h-[100px] overflow-hidden rounded-t-lg">
        <!-- Banner de Red Social -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-lg z-0" style="background-image: url('${window.globalBannerUrl}'); background-size: cover; background-position: center;">
        </div>
        <img
          src="${window.globalProfileGifUrl}"
          alt="User Avatar"
          class="w-16 h-16 rounded-full object-cover border-2 border-vibrant-orange relative z-10 ml-4"
        />
        <h3 class="text-lg font-semibold text-white relative z-10 ml-4">
          ${window.globalDeveloperName}
        </h3>
      </div>      <div class="mb-8">
        <h4 class="text-lg font-bold text-vibrant-orange mb-4">
          Versión de la Aplicación: <span class="text-white">${window.globalAppVersion}</span>
        </h4>
        <h4 class="text-lg font-bold text-vibrant-orange mb-4">
          Volverse VIP
        </h4>
        <p class="text-gray-300 mb-4">
          Desbloquea contenido exclusivo y una experiencia sin anuncios.
        </p>
        <button
          class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          ¡Hazte VIP ahora!
        </button>
      </div>

      <!-- Solicitudes Points Section -->
      <div class="mb-8">
        <a href="http://action_points" class="block bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 shadow-lg flex items-center justify-between cursor-pointer transform hover:scale-[1.01] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30">
            <div class="flex items-center space-x-3">
              <span class="material-icons-outlined text-3xl drop-shadow-lg text-white">toll</span>
              <div>
                <h3 class="text-lg font-bold text-white drop-shadow-md">Puntos de Solicitud</h3>
                <p class="text-white/90 text-xs sm:text-sm">Obtén más solicitudes para agregar tu contenido favorito.</p>
              </div>
            </div>
            <div class="bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200">
              <span class="material-icons-outlined text-lg text-white">arrow_forward</span>
            </div>
        </a>
      </div>

      <!-- Gestión de Favoritos Section -->
      <div class="mb-8">
        <div class="block bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-3 shadow-lg flex items-center justify-between cursor-pointer transform hover:scale-[1.01] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30 max-w-2xl mx-auto">
            <div class="flex items-center space-x-2">
              <span class="material-icons-outlined text-2xl drop-shadow-lg text-white">star</span>
              <div>
                <h3 class="text-base font-bold text-white drop-shadow-md">Gestión de Favoritos</h3>
                <p class="text-white/90 text-xs">Exportar, importar o gestionar tus favoritos</p>
              </div>
            </div>
            <div class="flex gap-1">
              <button id="export-favorites-button" class="bg-white/20 hover:bg-white/30 rounded-full w-7 h-7 flex items-center justify-center transition-colors duration-200">
                <span class="material-icons-outlined text-sm text-white">download</span>
              </button>
              <button id="import-favorites-button" class="bg-white/20 hover:bg-white/30 rounded-full w-7 h-7 flex items-center justify-center transition-colors duration-200">
                <span class="material-icons-outlined text-sm text-white">upload</span>
              </button>
            </div>
            <input type="file" id="import-favorites-file-input" accept=".yamilatfav" class="hidden">
        </div>
      </div>
    </div>
  </main>
</div>
`;
