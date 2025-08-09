export function showModal(title, content) {
  const modal = document.createElement('div');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  const titleId = 'modal-title';
  const contentId = 'modal-content';
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 apple-shadow-lg">
      <div class="text-center">
        <h3 id="${titleId}" class="text-2xl font-bold mb-4">${title}</h3>
        <p id="${contentId}" class="text-apple-text-secondary dark:text-gray-400 mb-8">${content}</p>
        <button class="bg-accent-gold hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-medium transition-colors">
          Verstanden
        </button>
      </div>
    </div>`;
  modal.setAttribute('aria-labelledby', titleId);
  modal.setAttribute('aria-describedby', contentId);
  modal.querySelector('button').addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = 'auto';
  });
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

window.showModal = showModal;
