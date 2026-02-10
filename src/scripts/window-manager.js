const icons = document.querySelectorAll('.icon');
const windows = document.querySelectorAll('.window');
const tagline = document.querySelector('.tagline');

let activeApp = null;

function clearSelections() {
  icons.forEach((icon) => {
    icon.classList.remove('is-selected');
  });
}

function closeAllWindows() {
  windows.forEach((window) => {
    window.classList.remove('is-open');
  });

  if (activeApp) {
    const activeIcon = document.querySelector(
      `.icon[data-app="${activeApp}"]`
    );
    if (activeIcon) {
      activeIcon.focus();
    }
  }

  activeApp = null;
  clearSelections();

  if (tagline) {
    tagline.classList.remove('is-hidden');
  }
}


icons.forEach((icon) => {
  icon.addEventListener('click', () => {
    const appName = icon.dataset.app;

    console.log('Opening app:', appName);
    console.log(
      'Window found:',
      document.querySelector(`.window[data-window="${appName}"]`)
    );

    closeAllWindows();

    icon.classList.add('is-selected');

    const targetWindow = document.querySelector(
      `.window[data-window="${appName}"]`
    );

    if (targetWindow) {
      targetWindow.classList.add('is-open');
      activeApp = appName;

      if (tagline) {
        tagline.classList.add('is-hidden');
      }
    }
  });

  icon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      icon.click();
    }
  });
});


windows.forEach((window) => {
  const closeButton = window.querySelector('.window-close');
  const closeHitarea = window.querySelector('.window-close-hitarea');

  if (closeButton && closeHitarea) {
    closeButton.addEventListener('click', () => {
      closeAllWindows();
    });

    closeHitarea.addEventListener('click', () => {
      closeButton.click();
    });
  }
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAllWindows();
  }
});





