document.addEventListener("DOMContentLoaded", () => {
  const fileListContainer = document.getElementById("fileListContainer");
  const API_BASE_URL = "http://localhost:8081/uploads";

  // DOM elements for buttons
  const createFolderBtn = document.getElementById("createFolderBtn");
  const createFileBtn = document.getElementById("createFileBtn");

  // DOM elements for popups
  const createFolderPopup = document.getElementById("createFolderPopup");
  const folderNameInput = document.getElementById("folderName");
  const confirmCreateFolderBtn = document.getElementById("confirmCreateFolder");
  const cancelCreateFolderBtn = document.getElementById("cancelCreateFolder");
  const closeCreateFolderBtn = document.getElementById("closeCreateFolderBtn");

  const createFilePopup = document.getElementById("createFilePopup");
  const fileNameInput = document.getElementById("fileName");
  const fileContentInput = document.getElementById("fileContent");
  const confirmCreateFileBtn = document.getElementById("confirmCreateFile");
  const cancelCreateFileBtn = document.getElementById("cancelCreateFile");
  const closeCreateFileBtn = document.getElementById("closeCreateFileBtn");

  const viewPopup = document.getElementById("viewPopup");
  const viewFileName = document.getElementById("viewFileName");
  const viewFileContent = document.getElementById("viewFileContent");
  const closeViewBtn = document.getElementById("closeViewBtn");

  const updatePopup = document.getElementById("updatePopup");
  const updateContent = document.getElementById("updateContent");
  const confirmUpdateBtn = document.getElementById("confirmUpdate");
  const cancelUpdateBtn = document.getElementById("cancelUpdate");

  const deletePopup = document.getElementById("deletePopup");
  const deleteFileName = document.getElementById("deleteFileName");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  // State
  let currentFile = null;

  // Initialize
  setupEventListeners();
  listFiles();

  function setupEventListeners() {
    // Create buttons
    createFolderBtn.addEventListener("click", () => {
      folderNameInput.value = "";
      createFolderPopup.style.display = "flex";
    });

    createFileBtn.addEventListener("click", () => {
      fileNameInput.value = "";
      fileContentInput.value = "";
      createFilePopup.style.display = "flex";
    });

    // Create folder popup
    confirmCreateFolderBtn.addEventListener("click", createFolder);
    cancelCreateFolderBtn.addEventListener(
      "click",
      () => (createFolderPopup.style.display = "none")
    );
    closeCreateFolderBtn.addEventListener(
      "click",
      () => (createFolderPopup.style.display = "none")
    );

    // Create file popup
    confirmCreateFileBtn.addEventListener("click", createFile);
    cancelCreateFileBtn.addEventListener(
      "click",
      () => (createFilePopup.style.display = "none")
    );
    closeCreateFileBtn.addEventListener(
      "click",
      () => (createFilePopup.style.display = "none")
    );

    // View popup
    closeViewBtn.addEventListener(
      "click",
      () => (viewPopup.style.display = "none")
    );

    // Update popup
    confirmUpdateBtn.addEventListener("click", updateFile);
    cancelUpdateBtn.addEventListener(
      "click",
      () => (updatePopup.style.display = "none")
    );

    // Delete popup
    confirmDeleteBtn.addEventListener("click", deleteFile);
    cancelDeleteBtn.addEventListener(
      "click",
      () => (deletePopup.style.display = "none")
    );

    // Close popups when clicking outside
    [
      createFolderPopup,
      createFilePopup,
      viewPopup,
      updatePopup,
      deletePopup,
    ].forEach((popup) => {
      popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
      });
    });
  }

  // Main function to list all files
  async function listFiles() {
    try {
      fileListContainer.innerHTML =
        '<div class="loading">Loading files...</div>';

      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);

      const files = await response.json();
      renderFiles(files);
    } catch (error) {
      console.error("Failed to load files:", error);
      fileListContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
  }

  function renderFiles(files) {
    fileListContainer.innerHTML = "";

    if (files.length === 0) {
      fileListContainer.innerHTML = '<div class="empty">No files found</div>';
      return;
    }

    // Group files by folder
    const folderStructure = {};

    files.forEach((file) => {
      const pathParts = file.name.split("/");

      if (file.isDirectory) {
        const folderName = file.name;
        folderStructure[folderName] = {
          folder: file,
          files: [],
        };
      } else {
        // Find which folder this file belongs to
        const folderPath = file.name.substring(
          0,
          file.name.lastIndexOf("/") + 1
        );

        if (folderStructure[folderPath]) {
          folderStructure[folderPath].files.push(file);
        } else {
          // File is in root directory
          if (!folderStructure["/"]) {
            folderStructure["/"] = {
              folder: {
                name: "/",
                isDirectory: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              files: [],
            };
          }
          folderStructure["/"].files.push(file);
        }
      }
    });

    // Render folders and their files
    for (const [folderPath, folderData] of Object.entries(folderStructure)) {
      const folderCard = createFolderCard(folderData.folder, folderData.files);
      fileListContainer.appendChild(folderCard);
    }
  }

  function createFolderCard(folder, files) {
    const folderCard = document.createElement("div");
    folderCard.className = "folder-card";

    const dateStr = formatDate(new Date(folder.createdAt));
    const folderName =
      folder.name === "/"
        ? "Root"
        : folder.name.split("/").filter(Boolean).join("/");

    folderCard.innerHTML = `
      <div class="folder-header">
        <div class="folder-icon">
          <i class="fas fa-folder"></i>
        </div>
        <div class="folder-info">
          <div class="folder-name">${folderName}</div>
          <div class="folder-meta">${dateStr}</div>
        </div>
        <div class="folder-actions">
          <button class="add-file-btn" title="Add File"><i class="fas fa-plus"></i></button>
          <button class="delete-btn" title="Delete"><i class="fas fa-trash uni"></i></button>
        </div>
      </div>
      <div class="folder-contents" id="contents-${folder.name.replace(
        /\//g,
        "-"
      )}"></div>
    `;

    // Get the contents div
    const contentsDiv = folderCard.querySelector(".folder-contents");

    if (files.length === 0) {
      contentsDiv.innerHTML = '<div class="empty-folder">Empty folder</div>';
    } else {
      files.forEach((file) => {
        contentsDiv.appendChild(createFileItem(file));
      });
    }

    // Add event listeners
    folderCard.querySelector(".add-file-btn").addEventListener("click", () => {
      fileNameInput.value = folder.name === "/" ? "" : folder.name;
      fileContentInput.value = "";
      createFilePopup.style.display = "flex";
    });

    folderCard
      .querySelector(".delete-btn")
      .addEventListener("click", () => confirmDelete(folder));

    return folderCard;
  }

  function createFileItem(file) {
    const dateStr = formatDate(new Date(file.createdAt));
    const fileName = file.name.split("/").pop();
    const sizeStr = formatFileSize(file.size);

    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.dataset.path = file.name;

    fileItem.innerHTML = `
      <div class="file-icon">
        <i class="fas fa-file"></i>
      </div>
      <div class="file-info">
        <div class="file-name">${fileName}</div>
        <div class="file-meta">
          <span>${dateStr}</span>
          <span> · ${sizeStr}</span>
        </div>
      </div>
      <div class="file-actions">
        <button class="view-btn" title="View"><i class="fas fa-eye"></i></button>
        <button class="update-btn" title="Edit"><i class="fas fa-pen"></i></button>
        <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    `;

    // Add event listeners
    fileItem
      .querySelector(".view-btn")
      .addEventListener("click", () => viewFile(file));
    fileItem
      .querySelector(".update-btn")
      .addEventListener("click", () => prepareUpdate(file));
    fileItem
      .querySelector(".delete-btn")
      .addEventListener("click", () => confirmDelete(file));

    return fileItem;
  }

  async function createFolder() {
    const folderName = folderNameInput.value.trim();
    if (!folderName) {
      alert("Please enter a folder name");
      return;
    }

    try {
      // Ensure the folder name ends with a slash
      const folderPath = folderName.endsWith("/")
        ? folderName
        : `${folderName}/`;

      const response = await fetch(`${API_BASE_URL}/${folderPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "" }), // Empty content for folders
      });

      if (!response.ok) throw new Error(await response.text());

      createFolderPopup.style.display = "none";
      listFiles(); // Refresh the list
    } catch (error) {
      console.error("Create folder error:", error);
      alert(`Failed to create folder: ${error.message}`);
    }
  }

  async function createFile() {
    const fileName = fileNameInput.value.trim();
    const content = fileContentInput.value.trim();

    if (!fileName) {
      alert("Please enter a file name");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${fileName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error(await response.text());

      createFilePopup.style.display = "none";
      listFiles(); // Refresh the list
    } catch (error) {
      console.error("Create file error:", error);
      alert(`Failed to create file: ${error.message}`);
    }
  }

  async function viewFile(file) {
    try {
      // Fetch the file content if it's not already available
      if (!file.content && !file.isDirectory) {
        const response = await fetch(`${API_BASE_URL}/${file.name}`);
        if (!response.ok) throw new Error("Failed to fetch file content");
        const fileData = await response.json();
        file.content = fileData.content;
      }

      currentFile = file;
      viewFileName.textContent = file.name;
      viewFileContent.textContent = file.isDirectory
        ? "This is a directory"
        : file.content || "No content available";
      viewPopup.style.display = "flex";
    } catch (error) {
      console.error("Error viewing file:", error);
      alert("Failed to load file content");
    }
  }

  function prepareUpdate(file) {
    currentFile = file;
    updateContent.value = file.content || "";
    updatePopup.style.display = "flex";
  }

  async function updateFile() {
    if (!currentFile) return;

    const content = updateContent.value.trim();
    try {
      const response = await fetch(`${API_BASE_URL}/${currentFile.name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error(await response.text());

      updatePopup.style.display = "none";
      listFiles(); // Refresh the list
    } catch (error) {
      console.error("Update error:", error);
      alert(`Failed to update file: ${error.message}`);
    }
  }

  function confirmDelete(file) {
    currentFile = file;
    deleteFileName.textContent = file.name;
    deletePopup.style.display = "flex";
  }

  async function deleteFile() {
    if (!currentFile) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${currentFile.name}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(await response.text());

      deletePopup.style.display = "none";
      listFiles(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      alert(`Failed to delete file: ${error.message}`);
    }
  }

  // Helper functions
  function formatDate(date) {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
});
