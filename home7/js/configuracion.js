import { setupAboutAndDMCAModals } from './aboutAndDMCA.js';
import { loadAdultContentSection } from './adultContent.js';
import { configuracionTemplate } from './templates/configuracionTemplate.js';

// Function to "encrypt" data (now just returns the data as is)
async function encryptData(data) {
  return data;
}

// Function to "decrypt" data (now just returns the data as is)
async function decryptData(data) {
  try {
    // Basic validation to ensure it's valid JSON
    JSON.parse(data);
    return data;
  } catch (e) {
    console.error('Decryption error: Invalid JSON format', e);
    throw new Error("Formato de datos de favoritos inválido - no es JSON válido.");
  }
}

// --- Favorites Export/Import Logic ---
const setupFavoritesManagement = () => {
  const exportButton = document.getElementById('export-favorites-button');
  const importButton = document.getElementById('import-favorites-button');
  const fileInput = document.getElementById('import-favorites-file-input');

  // Crear modal de importación
  if (!document.getElementById('import-favorites-modal')) {
    const importModalHtml = `
      <div id="import-favorites-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
        <div class="bg-slate-800 p-4 rounded-lg shadow-xl w-80 mx-auto">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-bold text-white">Importar Favoritos</h3>
            <button id="close-import-modal" class="text-slate-400 hover:text-white">
              <span class="material-icons-outlined text-xl">close</span>
            </button>
          </div>
          <div class="mb-3">
            <textarea id="import-favorites-text" class="w-full h-32 p-2 text-sm rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Pega aquí el código de favoritos..."></textarea>
          </div>
          <div class="flex justify-center">
            <button id="import-favorites-confirm" class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors flex items-center space-x-2 text-sm">
              <span class="material-icons-outlined text-sm">file_download</span>
              <span>Importar Favoritos</span>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', importModalHtml);
  }

  if (!exportButton || !importButton || !fileInput) {
    console.error('Favorites management elements not found.');
    return;
  }


  // Create export modal if it doesn't exist
  if (!document.getElementById('export-favorites-modal')) {
    const modalHtml = `
      <div id="export-favorites-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
        <div class="bg-slate-800 p-4 rounded-lg shadow-xl w-80 mx-auto">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-bold text-white">Exportar Favoritos</h3>
            <button id="close-export-modal" class="text-slate-400 hover:text-white">
              <span class="material-icons-outlined text-xl">close</span>
            </button>
          </div>
          <div class="mb-3">
            <textarea id="export-favorites-text" class="w-full h-32 p-2 text-sm rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500" readonly></textarea>
          </div>
          <div class="flex justify-center">
            <button id="copy-favorites" class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors flex items-center space-x-2 text-sm">
              <span class="material-icons-outlined text-sm">content_copy</span>
              <span>Copiar al Portapapeles</span>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  const exportModal = document.getElementById('export-favorites-modal');
  const closeExportModal = document.getElementById('close-export-modal');
  const copyFavoritesBtn = document.getElementById('copy-favorites');
  const exportTextArea = document.getElementById('export-favorites-text');

  exportButton.addEventListener('click', async () => {
    try {
      const favorites = localStorage.getItem('yamiLatFavorites');
      if (!favorites || favorites === '[]') {
        showToast("No hay favoritos para exportar.", "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/AI7yqKC5Ov0B2.webp");
        return;
      }

      const dataToExport = await encryptData(favorites);
      
      // Show modal with exported data
      exportTextArea.value = dataToExport;
      exportModal.classList.remove('hidden');
      toggleBodyScroll(true);

      // Selecciona el texto automáticamente
      exportTextArea.select();

    } catch (error) {
      console.error('Error exporting favorites:', error);
      showToast("Error al exportar favoritos.", "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/MdLFOyVZtoUPm.webp");
    }
  });

  // Copy to clipboard functionality
  copyFavoritesBtn.addEventListener('click', () => {
    try {
      // Selecciona el texto
      exportTextArea.select();
      // Ejecuta el comando de copiar
      document.execCommand('copy');
      // Deselecciona el texto
      window.getSelection().removeAllRanges();
      
      showToast("Copiado al portapapeles", "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/MdLFOyVZtoUPm.webp");
    } catch (err) {
      console.error('Error al copiar:', err);
      showToast("Error al copiar al portapapeles", "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/MdLFOyVZtoUPm.webp");
    }
  });

  // Close modal functionality
  closeExportModal.addEventListener('click', () => {
    exportModal.classList.add('hidden');
    toggleBodyScroll(false);
  });

  // Create import modal if it doesn't exist
  if (!document.getElementById('import-favorites-modal')) {
    const importModalHtml = `
      <div id="import-favorites-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
        <div class="bg-slate-800 p-4 rounded-lg shadow-xl w-80 mx-auto">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-bold text-white">Importar Favoritos</h3>
            <button id="close-import-modal" class="text-slate-400 hover:text-white">
              <span class="material-icons-outlined text-xl">close</span>
            </button>
          </div>
          <div class="mb-3">
            <textarea id="import-favorites-text" class="w-full h-32 p-2 text-sm rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Pega aquí el código de favoritos..."></textarea>
          </div>
          <div class="flex justify-center">
            <button id="import-favorites-confirm" class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors flex items-center space-x-2 text-sm">
              <span class="material-icons-outlined text-sm">file_download</span>
              <span>Importar Favoritos</span>
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', importModalHtml);
  }

  const importModal = document.getElementById('import-favorites-modal');
  const closeImportModal = document.getElementById('close-import-modal');
  const importConfirmBtn = document.getElementById('import-favorites-confirm');
  const importTextArea = document.getElementById('import-favorites-text');

  importButton.addEventListener('click', () => {
    importModal.classList.remove('hidden');
    importTextArea.value = '';
    toggleBodyScroll(true);
  });

  closeImportModal.addEventListener('click', () => {
    importModal.classList.add('hidden');
    toggleBodyScroll(false);
  });

  importConfirmBtn.addEventListener('click', async () => {
    try {
      const importedData = importTextArea.value.trim();
      if (!importedData) {
        showToast("Por favor, pega el código de favoritos.", "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/MdLFOyVZtoUPm.webp");
        return;
      }

      const parsedFavorites = JSON.parse(importedData);

      // Basic validation to ensure it's an array
      if (!Array.isArray(parsedFavorites)) {
        throw new Error("Formato de datos inválido.");
      }

      localStorage.setItem('yamiLatFavorites', JSON.stringify(parsedFavorites));
      showToast("Favoritos importados con éxito.", "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/ezgif-895ea998200bb6.webp");
      
      // Refresh the favorites page if it's currently active
      if (window.location.hash === '#favoritos' && window.renderFavorites) {
        window.renderFavorites(localStorage.getItem('lastActiveFavoriteFilter') || 'all');
      }
      // Also refresh the main content display
      if (window.refreshMainContentDisplay) {
        window.refreshMainContentDisplay(localStorage.getItem("adultContentEnabled") === "true");
      }
      
      // Close modal
      importModal.classList.add('hidden');
      toggleBodyScroll(false);
      
    } catch (error) {
      console.error('Error importing favorites:', error);
      let userMessage = "Error al importar favoritos: " + (error.message || "formato inválido");
      showToast(userMessage, "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/ezgif-895ea998200bb6.webp");
    }
  });
};

export const initConfiguracionPageContent = (appMainContent, configToggleStates) => {
  const currentScrollY = window.scrollY;

  // Remove legacy key management code since we now use a hardcoded key

  // Use the passed state from script.js
  const isAdvancedSettingsOpen = configToggleStates.isAdvancedSettingsOpen;
  const isInfoReportsOpen = configToggleStates.isInfoReportsOpen;
  console.log(`initConfiguracionPageContent: isAdvancedSettingsOpen (passed): ${isAdvancedSettingsOpen}`);
  console.log(`initConfiguracionPageContent: isInfoReportsOpen (passed): ${isInfoReportsOpen}`);

  appMainContent.innerHTML = `
    <main id="main-content" class="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8 pb-20">
      <div class="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6">

        <div class="bg-slate-800 rounded-xl mb-6 shadow-lg relative overflow-hidden">
          <!-- Banner de Red Social -->
          <div class="absolute top-0 left-0 w-full h-[88px] rounded-t-xl" style="background-image: url('${window.globalBannerUrl}'); background-size: cover; background-position: center;"></div>

          <div class="relative z-10 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 px-4 pt-[44px] pb-4">
            <div class="relative mt-[-44px]">
              <img 
                id="profile-gif"
                src="${window.globalProfileGifUrl}" 
                alt="Foto de perfil de anime" 
                class="w-20 h-20 rounded-full border-4 border-orange-500 object-cover "
              >
              <span class="material-icons-outlined absolute bottom-0 right-0 bg-orange-400 text-orange-500 rounded-full p-1 text-lg leading-none shadow-lg border-2 border-slate-800">
                star
              </span>
            </div>
            <div class="text-center sm:text-left flex-grow">
              <h2 class="text-xl font-bold">Yami<span class="text-orange-500">Lat</span></h2>
              <span class="bg-orange-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Versión: ${window.globalAppVersion}</span>
              <p class="text-slate-400 text-xs mt-1">Desarrollado por YamiLat Team</p>
              <p class="text-slate-400 text-sm mt-1">Tu portal al mundo del anime.</p>
            </div>
            <div class="flex space-x-2 mt-4 sm:mt-0">
              <button id="follow-us-button" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1.5 px-3 rounded-md transition-all duration-300 flex items-center space-x-1 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transform hover:-translate-y-0.5 text-sm">
                <span class="material-icons-outlined text-base">local_fire_department</span>
                <span>Síguenos</span>
              </button>
              <button id="support-us-button" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-3 rounded-md transition-all duration-300 flex items-center space-x-1 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 transform hover:-translate-y-0.5 text-sm">
                <span class="material-icons-outlined text-base">payments</span>
                <span>Apóyanos</span>
              </button>
            </div>
          </div>
        </div>

        <a href="http://action_noads"  id="prestigio-plus-link" class="block bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 mb-6 shadow-lg flex items-center justify-between cursor-pointer transform hover:scale-[1.01] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30">
            <div class="flex items-center space-x-3">
              <span class="material-icons-outlined text-3xl drop-shadow-lg">workspace_premium</span>
              <div>
                <h3 class="text-lg font-bold text-white drop-shadow-md">Únete a Prestigio Plus</h3>
                <p class="text-white/90 text-xs sm:text-sm">Disfruta de una experiencia sin anuncios.</p>
              </div>
            </div>
            <div class="bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200">
              <span class="material-icons-outlined text-lg">arrow_forward</span>
            </div>
        </a>

              <!-- Solicitudes Points Section -->
      <div class="mb-8">
        <a href="https://yamilatintern.blogspot.com/p/yamilat-puntos-usando-la-fuente-inter.html" class="block bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 shadow-lg flex items-center justify-between cursor-pointer transform hover:scale-[1.01] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30">
            <div class="flex items-center space-x-3">
              <span class="material-icons-outlined text-3xl drop-shadow-lg text-white">toll</span>
              <div>
                <h3 class="text-lg font-bold text-white drop-shadow-md">Puntos de Solicitud</h3>
                <p class="text-white/90 text-xs sm:text-sm">Obtén Puntos para solicitar tu contenido favorito.</p>
              </div>
            </div>
            <div class="bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200">
              <span class="material-icons-outlined text-lg text-white">arrow_forward</span>
            </div>
        </a>
      </div>

        <div class="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-700">
          <h3 class="text-xl font-bold mb-4 text-orange-500">Configuración</h3>
          
          <!-- Advanced Settings Toggle -->
          <div id="advanced-settings-toggle" class="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg mb-4 border border-slate-600 cursor-pointer hover:bg-slate-700 transition-colors duration-200">
            <div class="flex items-center space-x-3">
              <span class="material-icons-outlined text-2xl text-orange-500">settings</span>
              <div>
                <h4 class="font-semibold text-base text-white">Configuración Avanzada</h4>
              </div>
            </div>
            <span id="advanced-settings-icon" class="material-icons-outlined text-2xl text-orange-500 transition-transform duration-300">expand_more</span>
          </div>

          <!-- Advanced Settings Content -->
          <div id="advanced-settings-content" class="hidden">
            <div class="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg mb-4 border border-slate-600">
              <div class="flex items-center space-x-3">
                <span class="material-icons-outlined text-2xl text-orange-500">no_adult_content</span>
                <div>
                  <h4 class="font-semibold text-base text-white">Habilitar Contenido +18<span id="adult-content-status" class="text-sm font-normal text-slate-400 ml-2"></span></h4>
                  <p class="text-slate-400 text-xs">Muestra contenido para adultos en la aplicación.</p>
                </div>
              </div>
              
              <label for="adult-content-toggle" class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" id="adult-content-toggle" class="sr-only peer">
                <div class="w-12 h-7 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div class="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg mb-4 border border-slate-600">
              <div class="flex items-center space-x-3">
                <span class="material-icons-outlined text-2xl text-orange-500">visibility_off</span>
                <div>
                  <h4 class="font-semibold text-base text-white">Ocultar Adquisición Prestigio Plus<span id="hide-prestigio-plus-status" class="text-sm font-normal text-slate-400 ml-2"></span></h4>
                  <p class="text-slate-400 text-xs">Oculta los elementos de Prestigio Plus en la aplicación.</p>
                </div>
              </div>
              
              <label for="hide-prestigio-plus-toggle" class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" id="hide-prestigio-plus-toggle" class="sr-only peer">
                <div class="w-12 h-7 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div class="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg mb-6 border border-slate-600">
              <div class="flex items-center space-x-3">
                <span class="material-icons-outlined text-2xl text-orange-500">check_circle_outline</span>
                <div>
                  <h4 class="font-semibold text-base text-white">Marcado de Visto Automático<span id="auto-view-status" class="text-sm font-normal text-slate-400 ml-2"></span></h4>
                  <p class="text-slate-400 text-xs">Marca automáticamente los capítulos como vistos al reproducirlos.</p>
                </div>
              </div>
              
              <label for="auto-view-toggle" class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" id="auto-view-toggle" class="sr-only peer">
                <div class="w-12 h-7 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <!-- Favorites Management Section -->
            <div class="flex flex-col bg-slate-700/50 p-3 rounded-lg mb-4 border border-slate-600">
              <div class="flex items-center space-x-3 mb-3">
                <span class="material-icons-outlined text-2xl text-orange-500">favorite</span>
                <div>
                  <h4 class="font-semibold text-base text-white">Gestión de Favoritos</h4>
                  <p class="text-slate-400 text-xs">Exporta e importa tus favoritos</p>
                </div>
              </div>
              <div class="flex items-center space-x-2 ml-11">
                <button id="export-favorites-button" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-2.5 rounded transition-colors flex items-center justify-center space-x-1 text-xs">
                  <span class="material-icons-outlined text-sm">download</span>
                  <span>Exportar</span>
                </button>
                <button id="import-favorites-button" class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-1.5 px-2.5 rounded transition-colors flex items-center justify-center space-x-1 text-xs">
                  <span class="material-icons-outlined text-sm">upload</span>
                  <span>Importar</span>
                </button>
                <input type="file" id="import-favorites-file-input" accept=".yamilatfav" class="hidden">
              </div>
            </div>

            <!-- Espaciador -->
            <div class="mb-4"></div>
          </div>

          <!-- Information and Reports Toggle -->
          <div id="info-reports-toggle" class="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg mb-4 border border-slate-600 cursor-pointer mt-6 hover:bg-slate-700 transition-colors duration-200">
            <div class="flex items-center space-x-3">
              <span class="material-icons-outlined text-2xl text-orange-500">info</span>
              <div>
                <h4 class="font-semibold text-base text-white">Información y Reportes de la App</h4>
              </div>
            </div>
            <span id="info-reports-icon" class="material-icons-outlined text-2xl text-orange-500 transition-transform duration-300">expand_more</span>
          </div>

          <!-- Information and Reports Content -->
          <div id="info-reports-content" class="hidden">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button id="about-button" class="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg flex w-full cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30 border border-slate-700">
                  <div class="flex items-center justify-center space-x-3 w-full">
                    <span class="material-icons-outlined text-2xl text-orange-500">info</span>
                    <div class="text-center">
                      <h3 class="text-lg font-bold text-white drop-shadow-md">Acerca de</h3>
                      <p class="text-white/90 text-xs sm:text-sm">Versión y funciones.</p>
                    </div>
                  </div>
              </button>
              <button id="report-bug-button" class="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg flex w-full cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30 border border-slate-700">
                  <div class="flex items-center justify-center space-x-3 w-full">
                    <span class="material-icons-outlined text-2xl text-orange-500">bug_report</span>
                    <div class="text-center">
                      <h3 class="text-lg font-bold text-white drop-shadow-md">Reportar Fallos</h3>
                      <p class="text-white/90 text-xs sm:text-sm">Envía un informe.</p>
                    </div>
                  </div>
              </button>
              <button id="dmca-button" class="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg flex w-full cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30 border border-slate-700">
                  <div class="flex items-center justify-center space-x-3 w-full">
                    <span class="material-icons-outlined text-2xl text-orange-500">gavel</span>
                    <div class="text-center">
                      <h3 class="text-lg font-bold text-white drop-shadow-md">DMCA</h3>
                      <p class="text-white/90 text-xs sm:text-sm">Derechos de autor.</p>
                    </div>
                  </div>
              </button>
              <button id="official-website-button" class="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg flex w-full cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 ring-1 ring-white/10 hover:ring-white/30 border border-slate-700">
                  <div class="flex items-center justify-center space-x-3 w-full">
                    <span class="material-icons-outlined text-2xl text-orange-500">public</span>
                    <div class="text-center">
                      <h3 class="text-lg font-bold text-white drop-shadow-md">Web Oficial</h3>
                      <p class="text-white/90 text-xs sm:text-sm">Visita nuestra web.</p>
                    </div>
                  </div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Adult Content Warning Modal -->
    <div id="adult-content-warning-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
      <div class="bg-slate-800 p-6 rounded-lg shadow-xl max-w-xs mx-auto text-center">
        <h3 class="text-xl font-bold text-white mb-4">Advertencia de Contenido +18</h3>
        <p class="text-slate-300 mb-6">Al habilitar Contenido +18, aceptas que verás material para adultos que puede contener escenas sensibles o explícitas. ¿Estás seguro de que deseas continuar?</p>
        <div class="flex justify-center space-x-4">
          <button id="confirm-adult-content" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Aceptar
          </button>
          <button id="cancel-adult-content" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Report Bug Modal -->
    <div id="bug-report-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
      <div class="bg-slate-800 p-4 rounded-lg shadow-xl max-w-xs mx-auto text-center relative border border-slate-700">
        <button id="close-bug-report-modal" class="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors duration-200">
          <span class="material-icons-outlined">close</span>
        </button>
        <div id="bug-report-form">
          <h3 class="text-2xl font-bold text-white mb-4">Reportar Fallos de la Aplicación</h3>
          <p class="text-slate-300 mb-4">Si encuentras algún problema o fallo en la aplicación, por favor descríbelo a continuación y envíanoslo.</p>
          <textarea id="bug-report-description" class="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4" rows="4" placeholder="Describe el fallo aquí..."></textarea>
          <div class="flex justify-center space-x-4">
            <button id="send-bug-report-button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transform hover:-translate-y-0.5 text-sm">
              <span class="material-icons-outlined text-sm">bug_report</span>
              <span>Enviar Reporte</span>
            </button>
            <button id="cancel-bug-button" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1.5 px-3 rounded-lg transition-colors text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>


      </div>
    </main>

    <!-- Adult Content Warning Modal -->
    <div id="adult-content-warning-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
      <div class="bg-slate-800 p-6 rounded-lg shadow-xl max-w-xs mx-auto text-center">
        <h3 class="text-xl font-bold text-white mb-4">Advertencia de Contenido +18</h3>
        <p class="text-slate-300 mb-6">Al habilitar Contenido +18, aceptas que verás material para adultos que puede contener escenas sensibles o explícitas. ¿Estás seguro de que deseas continuar?</p>
        <div class="flex justify-center space-x-4">
          <button id="confirm-adult-content" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Aceptar
          </button>
          <button id="cancel-adult-content" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
        </div>
        </div>
    </div>

    <!-- Report Bug Modal -->
    <div id="bug-report-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
      <div class="bg-slate-800 p-4 rounded-lg shadow-xl max-w-xs mx-auto text-center relative border border-slate-700">
        <button id="close-bug-report-modal" class="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors duration-200">
          <span class="material-icons-outlined">close</span>
        </button>
        <div id="bug-report-form">
          <h3 class="text-2xl font-bold text-white mb-4">Reportar Fallos de la Aplicación</h3>
          <p class="text-slate-300 mb-4">Si encuentras algún problema o fallo en la aplicación, por favor descríbelo a continuación y envíanoslo.</p>
          <textarea id="bug-report-description" class="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4" rows="4" placeholder="Describe el fallo aquí..."></textarea>
          <div class="flex justify-center space-x-4">
            <button id="send-bug-report-button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transform hover:-translate-y-0.5 text-sm">
              <span class="material-icons-outlined text-sm">bug_report</span>
              <span>Enviar Reporte</span>
            </button>
            <button id="cancel-bug-button" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1.5 px-3 rounded-lg transition-colors text-sm">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hide Prestigio Plus Warning Modal -->
    <div id="hide-prestigio-plus-warning-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
      <div class="bg-slate-800 p-6 rounded-lg shadow-xl max-w-xs mx-auto text-center">
        <h3 class="text-xl font-bold text-white mb-4">Advertencia: Ocultar Prestigio Plus</h3>
        <p class="text-slate-300 mb-6">Al ocultar Prestigio Plus, no verás las opciones para unirte o las ventajas de una experiencia sin anuncios. ¿Estás seguro de que deseas continuar?</p>
        <div class="flex justify-center space-x-4">
          <button id="confirm-hide-prestigio-plus" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Aceptar
          </button>
          <button id="cancel-hide-prestigio-plus" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Auto View Warning Modal -->
    <div id="auto-view-warning-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
      <div class="bg-slate-800 p-6 rounded-lg shadow-xl max-w-xs mx-auto text-center">
        <h3 class="text-xl font-bold text-white mb-4">Advertencia: Marcado de Visto Automático</h3>
        <p class="text-slate-300 mb-6">Al habilitar el Marcado de Visto Automático, los capítulos se marcarán como vistos automáticamente al reproducirlos. ¿Estás seguro de que deseas continuar?</p>
        <div class="flex justify-center space-x-4">
          <button id="confirm-auto-view" class="bg-orange-500 hover:b
          g-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Aceptar
          </button>
          <button id="cancel-auto-view" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    </div>


  `;

  const loadProfileGif = async () => {
    const profileImage = document.getElementById("profile-gif");
    if (!profileImage) return;

    const staticGifUrl =
      window.globalProfileGifUrl;

    profileImage.src = staticGifUrl;
  };

  const setupAdultContentToggle = () => {
    const toggle = document.getElementById("adult-content-toggle");
    if (!toggle) return;

    const isAdultContentEnabled =
      localStorage.getItem("adultContentEnabled") === "true";
    toggle.checked = isAdultContentEnabled;

    const statusElement = document.getElementById("adult-content-status");

    const updateStatusText = (isEnabled) => {
      if (statusElement) {
        statusElement.textContent = isEnabled ? "Activado" : "Desactivado";
        statusElement.className = isEnabled
          ? "text-sm font-bold text-green-400 ml-2"
          : "text-sm font-bold text-red-400 ml-2";
      }
    };

    updateStatusText(isAdultContentEnabled);

    const adultContentWarningModal = document.getElementById("adult-content-warning-modal");
    const confirmAdultContentButton = document.getElementById("confirm-adult-content");
    const cancelAdultContentButton = document.getElementById("cancel-adult-content");

    toggle.addEventListener("change", (event) => {
      const isEnabled = event.target.checked;

      if (isEnabled) {
        if (adultContentWarningModal) {
          adultContentWarningModal.classList.remove("hidden");
          toggleBodyScroll(true); // Disable scroll when modal opens
        }

        const handleConfirm = () => {
          localStorage.setItem("adultContentEnabled", true);
          updateStatusText(true);
          if (window.updateNavigationBarVisibility) {
            window.updateNavigationBarVisibility();
          }
          if (adultContentWarningModal) {
            adultContentWarningModal.classList.add("hidden");
            toggleBodyScroll(false); // Enable scroll when modal closes
          }
          // Call refreshMainContentDisplay to re-render all relevant sections
          if (window.refreshMainContentDisplay) {
            window.refreshMainContentDisplay(true);
          }
          confirmAdultContentButton.removeEventListener("click", handleConfirm);
          cancelAdultContentButton.removeEventListener("click", handleCancel);
        };

        const handleCancel = () => {
          event.target.checked = false; // Revert toggle state
          localStorage.setItem("adultContentEnabled", false);
          updateStatusText(false);
          if (window.updateNavigationBarVisibility) {
            window.updateNavigationBarVisibility();
          }
          if (adultContentWarningModal) {
            adultContentWarningModal.classList.add("hidden");
            toggleBodyScroll(false); // Enable scroll when modal closes
          }
          // Call refreshMainContentDisplay to re-render all relevant sections
          if (window.refreshMainContentDisplay) {
            window.refreshMainContentDisplay(false);
          }
          confirmAdultContentButton.removeEventListener("click", handleConfirm);
          cancelAdultContentButton.removeEventListener("click", handleCancel);
        };

        confirmAdultContentButton.addEventListener("click", handleConfirm);
        cancelAdultContentButton.addEventListener("click", handleCancel);

      } else {
        localStorage.setItem("adultContentEnabled", isEnabled);
        updateStatusText(isEnabled);
        if (window.updateNavigationBarVisibility) {
          window.updateNavigationBarVisibility();
        }
        // Call refreshMainContentDisplay to re-render all relevant sections
        if (window.refreshMainContentDisplay) {
          window.refreshMainContentDisplay(isEnabled);
        }
      }
    });
  };

  loadProfileGif();
  setupAdultContentToggle();

  const setupHidePrestigioPlusToggle = () => {
    const toggle = document.getElementById("hide-prestigio-plus-toggle");
    if (!toggle) return;

    const isHidePrestigioPlusEnabled =
      localStorage.getItem("hidePrestigioPlusEnabled") === "true";
    toggle.checked = isHidePrestigioPlusEnabled;

    const statusElement = document.getElementById("hide-prestigio-plus-status");

    const updateStatusText = (isEnabled) => {
      if (statusElement) {
        statusElement.textContent = isEnabled ? "Activado" : "Desactivado";
        statusElement.className = isEnabled
          ? "text-sm font-bold text-green-400 ml-2"
          : "text-sm font-bold text-red-400 ml-2";
      }
    };

    updateStatusText(isHidePrestigioPlusEnabled);

    // Set initial visibility of Prestigio Plus link
    window.updateConfiguracionPrestigioPlusVisibility("prestigio-plus-link", isHidePrestigioPlusEnabled);

    const hidePrestigioPlusWarningModal = document.getElementById("hide-prestigio-plus-warning-modal");
    const confirmHidePrestigioPlusButton = document.getElementById("confirm-hide-prestigio-plus");
    const cancelHidePrestigioPlusButton = document.getElementById("cancel-hide-prestigio-plus");

    toggle.addEventListener("change", (event) => {
      const isEnabled = event.target.checked;

      if (isEnabled) {
        if (hidePrestigioPlusWarningModal) {
          hidePrestigioPlusWarningModal.classList.remove("hidden");
          toggleBodyScroll(true); // Disable scroll when modal opens
        }

        const handleConfirm = () => {
          localStorage.setItem("hidePrestigioPlusEnabled", true);
          updateStatusText(true);
          if (window.updateConfiguracionPrestigioPlusVisibility) {
            window.updateConfiguracionPrestigioPlusVisibility("prestigio-plus-link", true);
          }
          if (window.updatePrestigioPlusVisibilityHome) {
            window.updatePrestigioPlusVisibilityHome(true);
          }
          if (window.updatePrestigioPlusVisibilityAdult) {
            window.updatePrestigioPlusVisibilityAdult(true);
          }
          if (window.updatePrestigioPlusVisibility) {
            window.updatePrestigioPlusVisibility();
          }
          if (hidePrestigioPlusWarningModal) {
            hidePrestigioPlusWarningModal.classList.add("hidden");
            toggleBodyScroll(false); // Enable scroll when modal closes
          }
          confirmHidePrestigioPlusButton.removeEventListener("click", handleConfirm);
          cancelHidePrestigioPlusButton.removeEventListener("click", handleCancel);
        };

        const handleCancel = () => {
          event.target.checked = false; // Revert toggle state
          localStorage.setItem("hidePrestigioPlusEnabled", false);
          updateStatusText(false);
          if (window.updateConfiguracionPrestigioPlusVisibility) {
            window.updateConfiguracionPrestigioPlusVisibility("prestigio-plus-link", false);
          }
          if (window.updatePrestigioPlusVisibilityHome) {
            window.updatePrestigioPlusVisibilityHome(false);
          }
          if (window.updatePrestigioPlusVisibilityAdult) {
            window.updatePrestigioPlusVisibilityAdult(false);
          }
          if (window.updatePrestigioPlusVisibility) {
            window.updatePrestigioPlusVisibility();
          }
          if (hidePrestigioPlusWarningModal) {
            hidePrestigioPlusWarningModal.classList.add("hidden");
            toggleBodyScroll(false); // Enable scroll when modal closes
          }
          confirmHidePrestigioPlusButton.removeEventListener("click", handleConfirm);
          cancelHidePrestigioPlusButton.removeEventListener("click", handleCancel);
        };

        confirmHidePrestigioPlusButton.addEventListener("click", handleConfirm);
        cancelHidePrestigioPlusButton.addEventListener("click", handleCancel);

      } else {
        localStorage.setItem("hidePrestigioPlusEnabled", isEnabled);
        updateStatusText(isEnabled);
        if (window.updateConfiguracionPrestigioPlusVisibility) {
          window.updateConfiguracionPrestigioPlusVisibility("prestigio-plus-link", isEnabled);
        }
        if (window.updatePrestigioPlusVisibilityHome) {
          window.updatePrestigioPlusVisibilityHome(isEnabled);
        }
        if (window.updatePrestigioPlusVisibilityAdult) {
          window.updatePrestigioPlusVisibilityAdult(isEnabled);
        }
        if (window.updatePrestigioPlusVisibility) {
          window.updatePrestigioPlusVisibility();
        }
      }
    });
  };

  setupHidePrestigioPlusToggle();

  const setupAutoViewToggle = () => {
    const toggle = document.getElementById("auto-view-toggle");
    if (!toggle) return;

    const isAutoViewEnabled = localStorage.getItem("autoViewEnabled") === "true";
    toggle.checked = isAutoViewEnabled;

    const statusElement = document.getElementById("auto-view-status");

    const updateStatusText = (isEnabled) => {
      if (statusElement) {
        statusElement.textContent = isEnabled ? "Activado" : "Desactivado";
        statusElement.className = isEnabled
          ? "text-sm font-bold text-green-400 ml-2"
          : "text-sm font-bold text-red-400 ml-2";
      }
    };

    updateStatusText(isAutoViewEnabled);

    const autoViewWarningModal = document.getElementById("auto-view-warning-modal");
    const confirmAutoViewButton = document.getElementById("confirm-auto-view");
    const cancelAutoViewButton = document.getElementById("cancel-auto-view");

    toggle.addEventListener("change", (event) => {
      const isEnabled = event.target.checked;

      if (isEnabled) {
        if (autoViewWarningModal) {
          autoViewWarningModal.classList.remove("hidden");
          toggleBodyScroll(true); // Disable scroll when modal opens
        }

        const handleConfirm = () => {
          localStorage.setItem("autoViewEnabled", true);
          updateStatusText(true);
          if (autoViewWarningModal) {
            autoViewWarningModal.classList.add("hidden");
            toggleBodyScroll(false); // Enable scroll when modal closes
          }
          confirmAutoViewButton.removeEventListener("click", handleConfirm);
          cancelAutoViewButton.removeEventListener("click", handleCancel);
        };

        const handleCancel = () => {
          event.target.checked = false; // Revert toggle state
          localStorage.setItem("autoViewEnabled", false);
          updateStatusText(false);
          if (autoViewWarningModal) {
            autoViewWarningModal.classList.add("hidden");
            toggleBodyScroll(false); // Enable scroll when modal closes
          }
          confirmAutoViewButton.removeEventListener("click", handleConfirm);
          cancelAutoViewButton.removeEventListener("click", handleCancel);
        };

        confirmAutoViewButton.addEventListener("click", handleConfirm);
        cancelAutoViewButton.addEventListener("click", handleCancel);

      } else {
        localStorage.setItem("autoViewEnabled", isEnabled);
        updateStatusText(isEnabled);
      }
    });
  };

  setupAutoViewToggle();

  const setupFollowUsButton = () => {
    const followUsButton = document.getElementById("follow-us-button");
    if (!followUsButton) return;

    followUsButton.addEventListener("click", () => {
      window.open("https://www.tiktok.com/@yamilatteam", "_blank");
    });
  };

  setupFollowUsButton();
  setupSupportUsButton();
  setupAboutAndDMCAModals();
  setupOfficialWebsiteButton();
  setupBugReportModalFeature();
  setupAdvancedSettingsToggle();
  setupInfoReportsToggle();
  setupFavoritesManagement(); // Initialize favorites management

  console.log("initConfiguracionPageContent: After appMainContent.innerHTML and setup functions.");
  const newAdvancedSettingsContent = document.getElementById("advanced-settings-content");
  const newAdvancedSettingsIcon = document.getElementById("advanced-settings-icon");
  const newInfoReportsContent = document.getElementById("info-reports-content");
  const newInfoReportsIcon = document.getElementById("info-reports-icon");

  // Restore the state of the toggles using the passed states
  if (newAdvancedSettingsContent && newAdvancedSettingsIcon) {
    if (isAdvancedSettingsOpen) {
      newAdvancedSettingsContent.classList.remove("hidden");
      newAdvancedSettingsIcon.style.transform = "rotate(180deg)";
      console.log("initConfiguracionPageContent: Restored Advanced Settings to OPEN.");
    } else {
      newAdvancedSettingsContent.classList.add("hidden");
      newAdvancedSettingsIcon.style.transform = "rotate(0deg)";
      console.log("initConfiguracionPageContent: Restored Advanced Settings to CLOSED.");
    }
  }

  if (newInfoReportsContent && newInfoReportsIcon) {
    if (isInfoReportsOpen) {
      newInfoReportsContent.classList.remove("hidden");
      newInfoReportsIcon.style.transform = "rotate(180deg)";
      console.log("initConfiguracionPageContent: Restored Info Reports to OPEN.");
    } else {
      newInfoReportsContent.classList.add("hidden");
      newInfoReportsIcon.style.transform = "rotate(0deg)";
      console.log("initConfiguracionPageContent: Restored Info Reports to CLOSED.");
    }
  }

  // Restore scroll position
  window.scrollTo(0, currentScrollY);
};

// Helper function to manage body scroll
const toggleBodyScroll = (disableScroll) => {
  if (disableScroll) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const setupBugReportModalFeature = () => {
  const reportBugButton = document.getElementById("report-bug-button");
  const bugReportModal = document.getElementById("bug-report-modal");
  const sendBugReportButton = document.getElementById("send-bug-report-button");
  const cancelBugButton = document.getElementById("cancel-bug-button"); // Updated ID
  const closeBugReportModalButton = document.getElementById("close-bug-report-modal"); // New close button
  const bugReportDescription = document.getElementById("bug-report-description");

  if (!reportBugButton || !bugReportModal || !sendBugReportButton || !cancelBugButton || !closeBugReportModalButton || !bugReportDescription) return;

  reportBugButton.addEventListener("click", () => {
    bugReportModal.classList.remove("hidden");
    toggleBodyScroll(true); // Disable scroll when modal opens
  });

  const closeBugModal = () => {
    bugReportModal.classList.add("hidden");
    bugReportDescription.value = ""; // Clear the textarea on close/cancel
    toggleBodyScroll(false); // Enable scroll when modal closes
  };

  cancelBugButton.addEventListener("click", closeBugModal);
  closeBugReportModalButton.addEventListener("click", closeBugModal);

  sendBugReportButton.addEventListener("click", async () => {
    const description = bugReportDescription.value.trim();

    if (description === "") {
      alert("Por favor, describe el fallo antes de enviar el reporte.");
      return;
    }

    // Placeholder for Telegram API details.
    // Using fake data as requested, replace with actual credentials for functionality.
    const BOT_TOKEN = "7501592844:AAFR8K1wZEdie8g8F4FY3rVtKyM3EEZ8xg0"; // Fake Token
    const CHAT_ID = "-1003012512019";     // Fake Chat ID
    const TOPIC_ID = "307";   // Fake Topic ID

    // The following check is now for demonstration purposes with fake data.
    // In a real scenario, you'd want to ensure these are properly configured.
    if (BOT_TOKEN === "YOUR_TELEGRAM_BOT_TOKEN" || CHAT_ID === "YOUR_TELEGRAM_CHAT_ID") {
      alert("Error: Por favor, configura el token del bot de Telegram y el ID del chat en el código.");
      console.error("Telegram API credentials are not set.");
      return;
    }

    const message = `*Reporte de Fallo de la Aplicación*\n\n*Descripción:*\n${description}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
          message_thread_id: TOPIC_ID !== "YOUR_TELEGRAM_TOPIC_ID" ? TOPIC_ID : undefined,
        }),
      });

      if (response.ok) {
        bugReportModal.classList.add("hidden");
        bugReportDescription.value = ""; // Clear the textarea
        showToast("Reporte enviado. Lo solucionaremos pronto.", "https://cdn.jsdelivr.net/gh//geminiproai37-blip/dsfdfd@latest/HOME/report.webp"); // Placeholder for a different success GIF
        toggleBodyScroll(false); // Enable scroll after successful report
      } else {
        const errorData = await response.json();
        alert(`Error al enviar el reporte de fallo: ${errorData.description || response.statusText}`);
        console.error("Error sending bug report to Telegram:", errorData);
      }
    } catch (error) {
      alert("Error de red al enviar el reporte de fallo.");
      console.error("Network error sending bug report:", error);
    }
  });
};

const showToast = (message, gifUrl) => {
  console.log("showToast called with message:", message); // Debugging line
  const toastContainer = document.getElementById("toast-notification-container");
  if (!toastContainer) {
    console.error("Toast container not found!");
    return;
  }

  const toast = document.createElement("div");
  toast.className = "toast-notification bg-slate-800 text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 opacity-0 transition-opacity duration-300 w-80";
  toast.innerHTML = `
    <img src="${gifUrl}" alt="Confirmation GIF" class="w-10 h-10 rounded-full object-cover border-2 border-orange-500">
    <p>${message}</p>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 3000);
};

const setupOfficialWebsiteButton = () => {
  const officialWebsiteButton = document.getElementById("official-website-button");
  if (!officialWebsiteButton) return;

  officialWebsiteButton.addEventListener("click", () => {
    window.open("https://yamilat.blogspot.com/", "_blank"); // Replace with your official website URL
  });
};

const setupSupportUsButton = () => {
  const supportUsButton = document.getElementById("support-us-button");
  if (!supportUsButton) return;

  const supportModalHtml = `
    <div id="support-modal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] hidden">
      <div class="bg-slate-800 p-6 rounded-lg shadow-xl max-w-xs mx-auto text-center">
        <h3 class="text-xl font-bold text-white mb-4">Apoya a YamiLat</h3>
        <p class="text-slate-300 mb-6">Elige cómo quieres apoyar nuestro proyecto:</p>
        <div class="flex flex-col space-y-4">
          <button id="donate-button" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <span class="material-icons-outlined">volunteer_activism</span>
            <span>Donar</span>
          </button>
          <button id="watch-ads-button" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <span class="material-icons-outlined">play_circle_outline</span>
            <span>Ver Anuncios</span>
          </button>
          <button id="close-support-modal" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `;

  // Append modal HTML to the body if it doesn't exist
  if (!document.getElementById("support-modal")) {
    document.body.insertAdjacentHTML('beforeend', supportModalHtml);
  }

  const supportModal = document.getElementById("support-modal");
  const donateButton = document.getElementById("donate-button");
  const watchAdsButton = document.getElementById("watch-ads-button");
  const closeSupportModalButton = document.getElementById("close-support-modal");

  supportUsButton.addEventListener("click", () => {
    if (supportModal) {
      supportModal.classList.remove("hidden");
      toggleBodyScroll(true); // Disable scroll when modal opens
    }
  });

  if (closeSupportModalButton) {
    closeSupportModalButton.addEventListener("click", () => {
      if (supportModal) {
        supportModal.classList.add("hidden");
        toggleBodyScroll(false); // Enable scroll when modal closes
      }
    });
  }

  if (donateButton) {
    donateButton.addEventListener("click", () => {
      window.location.href = "https://demos-code4alls-7.blogspot.com/"; // Specific URL for donations
      if (supportModal) {
        supportModal.classList.add("hidden");
        toggleBodyScroll(false); // Enable scroll when modal closes
      }
    });
  }

  if (watchAdsButton) {
    watchAdsButton.addEventListener("click", () => {
      window.location.href = "https://vvsbgfbtdntrntrbtr.blogspot.com/"; // Specific URL for watching ads
      if (supportModal) {
        supportModal.classList.add("hidden");
        toggleBodyScroll(false); // Enable scroll when modal closes
      }
    });
  }
};

window.updateConfiguracionPrestigioPlusVisibility = (elementId, hidePrestigioPlus) => {
  const prestigioPlusLink = document.getElementById(elementId);
  if (prestigioPlusLink) {
    prestigioPlusLink.classList.toggle("hidden", hidePrestigioPlus);
  }
};

  // Ya no necesitamos actualizar íconos ya que la clave está hardcodeada

  const setupAdvancedSettingsToggle = () => {
  const toggleButton = document.getElementById("advanced-settings-toggle");
  const content = document.getElementById("advanced-settings-content");
  const icon = document.getElementById("advanced-settings-icon");  if (toggleButton && content && icon) {
    toggleButton.addEventListener("click", () => {
      const isHidden = content.classList.contains("hidden");
      if (isHidden) {
        content.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
      } else {
        content.classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
      }
    });

    // Prevent clicks inside the advanced settings content from closing the section
    content.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
};

const setupInfoReportsToggle = () => {
  const toggleButton = document.getElementById("info-reports-toggle");
  const content = document.getElementById("info-reports-content");
  const icon = document.getElementById("info-reports-icon");

  if (toggleButton && content && icon) {
    toggleButton.addEventListener("click", () => {
      const isHidden = content.classList.contains("hidden");
      if (isHidden) {
        content.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
      } else {
        content.classList.add("hidden");
        icon.style.transform = "rotate(0deg)";
      }
    });
  }
};

// Ensure toast container is added to the body once
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('toast-notification-container')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="toast-notification-container" class="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-[1050] flex flex-col space-y-2"></div>
    `);
  }
});
