export const favoritosTemplate = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

.font-poppins {
    font-family: 'Poppins', sans-serif;
}

.text-shadow-custom {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>

<!-- Favorites Management Section -->
<div class="flex items-center justify-center space-x-4 mx-auto max-w-3xl px-4 py-2 bg-blue-900/80 rounded-lg shadow-lg border border-orange-500/30 mb-6 mt-4">
    <h2 class="text-lg font-bold font-poppins whitespace-nowrap">
        <span class="text-white">Mis</span>
        <span class="text-orange-500">Favoritos</span>
    </h2>
    <div class="flex gap-3">
        <button id="all-tab-btn" class="filter-btn text-gray-300 hover:text-orange-400 text-sm font-semibold px-3 py-1 rounded-md transition-colors duration-200 bg-blue-800/50 hover:bg-blue-800" data-filter="all">Todos</button>
        <button id="movie-tab-btn" class="filter-btn text-gray-300 hover:text-orange-400 text-sm font-semibold px-3 py-1 rounded-md transition-colors duration-200 bg-blue-800/50 hover:bg-blue-800" data-filter="movie">Películas</button>
        <button id="tv-tab-btn" class="filter-btn text-gray-300 hover:text-orange-400 text-sm font-semibold px-3 py-1 rounded-md transition-colors duration-200 bg-blue-800/50 hover:bg-blue-800" data-filter="tv">Anime</button>
    </div>
</div>

<div id="favorites-content-container">
  <div id="all-content" class="tab-content"></div>
  <div id="movie-content" class="tab-content hidden"></div>
  <div id="tv-content" class="tab-content hidden"></div>
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
`;
