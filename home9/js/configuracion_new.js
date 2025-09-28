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

const setupFavoritesManagement = () => {
  const exportButton = document.getElementById('export-favorites-button');
  const importButton = document.getElementById('import-favorites-button');

  if (!exportButton || !importButton) {
    console.error('Favorites management elements not found.');
    return;
  }

  // Create export modal
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

  // Create import modal
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

  const exportModal = document.getElementById('export-favorites-modal');
  const closeExportModal = document.getElementById('close-export-modal');
  const copyFavoritesBtn = document.getElementById('copy-favorites');
  const exportTextArea = document.getElementById('export-favorites-text');

  const importModal = document.getElementById('import-favorites-modal');
  const closeImportModal = document.getElementById('close-import-modal');
  const importConfirmBtn = document.getElementById('import-favorites-confirm');
  const importTextArea = document.getElementById('import-favorites-text');

  // Export functionality
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

  // Close export modal
  closeExportModal.addEventListener('click', () => {
    exportModal.classList.add('hidden');
    toggleBodyScroll(false);
  });

  // Import functionality
  importButton.addEventListener('click', () => {
    importModal.classList.remove('hidden');
    importTextArea.value = '';
    toggleBodyScroll(true);
  });

  // Close import modal
  closeImportModal.addEventListener('click', () => {
    importModal.classList.add('hidden');
    toggleBodyScroll(false);
  });

  // Import confirmation
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
  const isAdvancedSettingsOpen = configToggleStates.isAdvancedSettingsOpen;
  const isInfoReportsOpen = configToggleStates.isInfoReportsOpen;

  appMainContent.innerHTML = configuracionTemplate;

  const loadProfileGif = async () => {
    const profileImage = document.getElementById("profile-gif");
    if (!profileImage) return;
    profileImage.src = window.globalProfileGifUrl;
  };

  loadProfileGif();
  setupAdultContentToggle();
  setupHidePrestigioPlusToggle();
  setupAutoViewToggle();
  setupFollowUsButton();
  setupSupportUsButton();
  setupAboutAndDMCAModals();
  setupOfficialWebsiteButton();
  setupBugReportModalFeature();
  setupAdvancedSettingsToggle();
  setupInfoReportsToggle();
  setupFavoritesManagement();

  // Restore toggle states
  const newAdvancedSettingsContent = document.getElementById("advanced-settings-content");
  const newAdvancedSettingsIcon = document.getElementById("advanced-settings-icon");
  const newInfoReportsContent = document.getElementById("info-reports-content");
  const newInfoReportsIcon = document.getElementById("info-reports-icon");

  if (newAdvancedSettingsContent && newAdvancedSettingsIcon) {
    if (isAdvancedSettingsOpen) {
      newAdvancedSettingsContent.classList.remove("hidden");
      newAdvancedSettingsIcon.style.transform = "rotate(180deg)";
    } else {
      newAdvancedSettingsContent.classList.add("hidden");
      newAdvancedSettingsIcon.style.transform = "rotate(0deg)";
    }
  }

  if (newInfoReportsContent && newInfoReportsIcon) {
    if (isInfoReportsOpen) {
      newInfoReportsContent.classList.remove("hidden");
      newInfoReportsIcon.style.transform = "rotate(180deg)";
    } else {
      newInfoReportsContent.classList.add("hidden");
      newInfoReportsIcon.style.transform = "rotate(0deg)";
    }
  }

  // Restore scroll position
  window.scrollTo(0, currentScrollY);
};