document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".sidebar-button[data-tooltip='Añadir un servidor']");
    const exploreButton = document.querySelector(".sidebar-button[data-tooltip='Explorar servidores']");
    const noServerMessage = document.getElementById("no-server-message");
    const searchContainer = document.getElementById("search-container");
    const serverGrid = document.getElementById("server-grid");
    const selectedServersContainer = document.getElementById("selected-servers");
    const channelList = document.querySelector(".channel-list");
    const channelSidebar = document.getElementById("channel-sidebar");
    const mainContent = document.querySelector('.main-content');
    let currentChat = null;

    exploreButton.addEventListener("click", function () {
        noServerMessage.style.display = "none";
        searchContainer.style.display = "block";
        createServerButtons();
    });

    addButton.addEventListener("click", function () {
        noServerMessage.style.display = "none";
        const createServerModal = createCreateServerModal();
        document.body.appendChild(createServerModal);
    });

    function createServerButton(serverName, serverIcon) {
        const button = document.createElement("button");
        button.classList.add("server-button");
        button.innerHTML = `
            <img src="${serverIcon}" alt="${serverName}">
            <span>${serverName}</span>
        `;

        button.addEventListener("click", function () {
            const confirmModal = createConfirmationModal(serverName);
            document.body.appendChild(confirmModal);
        });

        return button;
    }

    function createConfirmationModal(serverName) {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Unirse a un servidor";

        const modalText = document.createElement("p");
        modalText.textContent = `¿Quieres unirte a ${serverName}?`;

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirmar";
        confirmButton.addEventListener("click", function () {
            addSelectedServer(serverName);
            closeModal();
        });

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancelar";
        cancelButton.addEventListener("click", closeModal);

        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalContent.appendChild(confirmButton);
        modalContent.appendChild(cancelButton);

        modal.appendChild(modalContent);

        return modal;
    }

    function createCreateServerModal() {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Crear un servidor";

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Nombre del nuevo servidor";

        const nameInput = document.createElement("input");
        nameInput.type = "text";

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirmar";
        confirmButton.addEventListener("click", function () {
            const serverName = nameInput.value;
            if (serverName) {
                addSelectedServer(serverName);
                closeModal();
            }
        });

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancelar";
        cancelButton.addEventListener("click", closeModal);

        modalContent.appendChild(modalTitle);
        modalContent.appendChild(nameLabel);
        modalContent.appendChild(nameInput);
        modalContent.appendChild(confirmButton);
        modalContent.appendChild(cancelButton);

        modal.appendChild(modalContent);

        return modal;
    }

    function closeModal() {
        const modal = document.querySelector(".modal");
        if (modal) {
            modal.parentElement.removeChild(modal);
        }
    }

    channelSidebar.classList.add('hidden');

    function addSelectedServer(serverName) {
        const selectedServerButton = document.createElement("button");
        selectedServerButton.classList.add("selected-server-button");
        selectedServerButton.innerHTML = `
            <img src="server-icon.svg" alt="${serverName}">
            <span>${serverName}</span>
        `;

        selectedServersContainer.appendChild(selectedServerButton);

        channelSidebar.classList.remove('hidden');

        if (selectedServersContainer.childElementCount === 0) {
            channelSidebar.classList.add('hidden');
        }
    }

    function createServerButtons() {
        const chatContainer = document.querySelector('.chat-container');
        chatContainer.innerHTML = '';
        chatContainer.classList.add('hidden');

        const server1 = createServerButton("Servidor 1", "server-icon.svg");
        const server2 = createServerButton("Servidor 2", "server-icon.svg");
        const server3 = createServerButton("Servidor 3", "server-icon.svg");
        const server4 = createServerButton("Servidor 4", "server-icon.svg");

        serverGrid.appendChild(server1);
        serverGrid.appendChild(server2);
        serverGrid.appendChild(server3);
        serverGrid.appendChild(server4);

        addChannel("Canal 1");
        addChannel("Canal 2");
        addChannel("Canal 3");
        addChannel("Canal 4");
    }

    function addChannel(channel) {
        const channelBtn = document.createElement('button');
        channelBtn.textContent = channel;
        channelBtn.id = 'channel-' + channel;

        channelBtn.addEventListener('click', () => {
            openChat(channel);
        });

        channelList.appendChild(channelBtn);
    }

    function openChat(channel) {
        if (currentChat) {
            currentChat.style.display = 'none';
        }

        const existingChat = document.getElementById('chat-' + channel);
        if (existingChat) {
            existingChat.style.display = 'block';
            currentChat = existingChat;
        } else {
            const chat = document.createElement('div');
            chat.id = 'chat-' + channel;
            chat.classList.add('chat');
            chat.innerHTML = `<div class="chat-history" id="chat-history-${channel}"></div>
            <div class="chat-input">
                <input type="text" id="message-input-${channel}" placeholder="Escribe un mensaje...">
                <button id="send-button-${channel}">
                    <img src="send.svg" style="width: 24px; height: 24px;" alt="Enviar">
                </button>
            </div>`;
            mainContent.appendChild(chat);
            currentChat = chat;
        }

        const chatContainer = document.querySelector('.chat-container');
        chatContainer.classList.remove('hidden');

        mainContent.style.display = 'none';
    }
});
