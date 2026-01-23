document.addEventListener('DOMContentLoaded', () => {
  /************************************************************************
   *  ELEMENT LOOKUPS
   ************************************************************************/

  const addBtn = document.getElementById('add-btn');
  const colorOptions = document.getElementById('color-options');
  const colorInputWrapper = document.querySelector('.color-input-wrapper');
  const notes_grid = document.getElementById('notes-grid');
  const color_circles = document.querySelectorAll('.color-circle');

  const setting_menu = document.querySelector('.setting-menu');
  const setting_menu_btn = document.querySelector('.setting-menu-btn');
  const appSettings = document.querySelector('.app-settings');

  const trigger = document.querySelector('.multi-color-trigger');
  const panel = document.querySelector('.color-panel');
  const picker = document.querySelector('.color-code-input');
  const colorInput = document.getElementById('colorInput');
  const randomColorGen = document.querySelector('.random-color-btn');
  const multiColorCircles = document.querySelectorAll('.multi-circle');
  const createCustomColorNoteBtn = document.querySelector('.create-color-btn');

  const filterBtns = document.querySelectorAll('.filter-btn');

  /************************************************************************
   *  STORAGE KEYS & STATE
   ************************************************************************/
  const STORAGE_KEY_NOTES = 'note-card';
  const STORAGE_KEY_COLOR_WRAPPER = 'color-wrapper-state';
  const STORAGE_KEY_NOTE_FILTERS = 'note-filters';
  const STORAGE_KEY_ACTIVE_FILTER = 'active-filter';

  /************************************************************************
   *  HELPERS: filters stored as space-separated tokens in data-filter-value
   ************************************************************************/
  function getFilters(note) {
    return (note?.dataset?.filterValue || 'all').split(' ').filter(Boolean);
  }

  function setFilters(note, filters) {
    note.dataset.filterValue = filters.join(' ');
  }

  /************************************************************************
   *  ADD-BUTTON (open color options) behavior
   ************************************************************************/
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (colorOptions) colorOptions.classList.toggle('show');

      const multiTrigger = document.querySelector('.multi-color-trigger');
      if (multiTrigger) {
        if (colorOptions && colorOptions.classList.contains('show'))
          multiTrigger.classList.add('show');
        else multiTrigger.classList.remove('show');
      }

      addBtn.classList.toggle('rotate', colorOptions && colorOptions.classList.contains('show'));

      const wrapperState =
        colorOptions && colorOptions.classList.contains('show') ? 'open' : 'closed';
      localStorage.setItem(STORAGE_KEY_COLOR_WRAPPER, wrapperState);
    });
  }

  setTimeout(() => {
    if (colorOptions) colorOptions.classList.add('show');
    if (trigger) trigger.classList.add('show');
  }, 5000);

  // restore wrapper state
  const wrapperState = localStorage.getItem(STORAGE_KEY_COLOR_WRAPPER);
  if (wrapperState === 'open') {
    colorOptions?.classList.add('show');
    colorInputWrapper?.classList.add('showInput');
    addBtn?.classList.add('rotate');
    document.querySelector('.multi-color-trigger')?.classList.add('show');
  }

  /************************************************************************
   *  CREATE NOTE
   ************************************************************************/
  function createNote(
    color = '#ffffff',
    text = 'This is Docket note.',
    isNew = true,
    id = null,
    filters = ['all'],
  ) {
    if (!notes_grid) return;

    const note_card = document.createElement('div');
    note_card.className = 'note-card';

    note_card.dataset.id = id ? String(id) : String(Date.now());
    setFilters(
      note_card,
      Array.isArray(filters)
        ? filters
        : String(filters || 'all')
            .split(' ')
            .filter(Boolean),
    );

    const full_date = new Date();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    note_card.innerHTML = `
      <textarea class="note-text-area">${text}</textarea>
      <div class="note-card-info">
        <div class="current-date">
          <span class="month">${months[full_date.getMonth()]}</span>
          <span class="day">${full_date.getDate()}</span>,
          <span class="year">${full_date.getFullYear()}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 7px">
          <button class="note-fav-btn" aria-label="Favourite note">
           <svg fill="" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 573.471 573.471" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M377.631,180.344C364.166,117.92,335.402-13.66,266.247,8.984c-30.6,9.792-47.124,50.796-58.14,77.112 c-14.076,33.048-25.092,71.604-26.316,108.324C136.503,181.568,2.475,145.46,0.027,220.736 c-1.224,34.884,39.78,66.096,63.648,84.456c21.42,17.136,50.796,40.392,78.948,51.408c-22.644,29.987-39.168,66.708-52.632,100.979 c-13.464,34.272-26.928,75.276,7.344,100.368c55.692,41.004,149.94-66.708,182.988-113.832 c43.452,35.496,169.524,146.268,210.528,72.828c16.523-29.988-10.404-73.44-24.48-98.532c-11.016-18.972-29.376-58.14-50.184-76.5 c29.988-17.748,60.588-35.496,88.74-56.304c23.867-17.136,68.544-47.736,68.544-81.396 C573.471,133.22,431.486,172.388,377.631,180.344z"></path> </g> </g></svg>
          </button>

          <button class="note-delete-btn" aria-label="Delete note">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    const deleteNodeBtn = note_card.querySelector('.note-delete-btn');
    if (deleteNodeBtn) {
      deleteNodeBtn.addEventListener('click', () => {
        note_card.remove();
        uploadToStorage();
        saveNotesFilters();
        notificationAlert('Note deleted successfully!');
      });
    }

    note_card.style.backgroundColor = color;
    notes_grid.prepend(note_card);
    setTimeout(() => note_card.classList.add('showCard'), 10);

    const textArea = note_card.querySelector('.note-text-area');
    if (isNew && textArea) {
      textArea.focus();
      textArea.selectionStart = textArea.value.length;
      textArea.selectionEnd = textArea.value.length;
    }

    if (textArea) textArea.addEventListener('input', uploadToStorage);

    const favBtn = note_card.querySelector('.note-fav-btn');
    if (favBtn && getFilters(note_card).includes('favourite')) {
      favBtn.classList.add('active-fav');
    }

    uploadToStorage();
    saveNotesFilters();

    // if (note_card) notificationAlert('Note created successfully!');
    // Inside createNote function, wrap the alert:
    if (isNew) notificationAlert('Note created successfully!');
  }

  /************************************************************************
   *  STORAGE FUNCTIONS
   ************************************************************************/
  function uploadToStorage() {
    const allNotes = Array.from(document.querySelectorAll('.note-card')).map(card => {
      const txtEl = card.querySelector('.note-text-area');
      const txt = txtEl ? txtEl.value : '';
      return {
        id: card.dataset.id,
        color: card.style.backgroundColor || '#ffffff',
        text: txt,
        filters: getFilters(card),
      };
    });

    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(allNotes));
    } catch (err) {
      console.error('Failed to save notes to storage', err);
    }
  }

  function restoreNotesFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_NOTES);
      const saved = raw ? JSON.parse(raw) : [];
      if (Array.isArray(saved) && saved.length && notes_grid) {
        saved
          .slice()
          .reverse()
          .forEach(n => {
            const filters = Array.isArray(n.filters)
              ? n.filters
              : String(n.filters || 'all')
                  .split(' ')
                  .filter(Boolean);
            createNote(n.color, n.text, false, n.id, filters);
          });
      }
    } catch (err) {
      console.error('Failed to restore notes', err);
    }
  }

  /************************************************************************
   *  COLOR CIRCLE, SETTINGS, PANEL, RANDOM, MULTI-COLOR LOGIC
   ************************************************************************/
  color_circles.forEach(circle => {
    circle.addEventListener('click', () => {
      const colorCircle_bg = window.getComputedStyle(circle).backgroundColor || '#ffffff';
      createNote(colorCircle_bg);
    });
  });

  if (setting_menu_btn) {
    setting_menu_btn.addEventListener('click', e => {
      setting_menu?.classList.toggle('active');
      const toggleState = setting_menu?.classList.contains('active') ? 'open' : 'close';
      localStorage.setItem('setting-menu', toggleState);
      e.stopPropagation();
    });
  }

  document.addEventListener('click', e => {
    if (!appSettings?.contains(e.target)) {
      setting_menu?.classList.remove('active');
      localStorage.setItem('setting-menu', 'close');
    }
  });

  const toggleState = localStorage.getItem('setting-menu');
  if (toggleState === 'open') setting_menu?.classList.add('active');

  if (picker && colorInput) picker.value = colorInput.value;

  trigger?.addEventListener('click', e => {
    panel?.classList.toggle('active');
    const panelState = panel?.classList.contains('active') ? 'open' : 'close';
    localStorage.setItem('panel-state', panelState);
    e.stopPropagation();
  });

  document.addEventListener('click', e => {
    if (panel && !panel.contains(e.target)) {
      panel.classList.remove('active');
      localStorage.setItem('panel-state', 'close');
    }
  });

  const panelState = localStorage.getItem('panel-state');
  if (panelState === 'open') panel?.classList.add('active');

  if (picker) {
    picker.addEventListener('input', () => {
      if (colorInput) colorInput.value = picker.value;
    });
  }
  if (colorInput) {
    colorInput.addEventListener('input', () => {
      if (picker) picker.value = colorInput.value;
    });
  }

  function getRandomColor() {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  }

  randomColorGen?.addEventListener('click', () => {
    const randomColor = getRandomColor();
    if (colorInput) colorInput.value = randomColor;
    if (picker) picker.value = randomColor;
    randomColorGen.classList.remove('animate');
    void randomColorGen.offsetWidth;
    randomColorGen.classList.add('animate');
  });

  multiColorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      const multiCircleBg = window.getComputedStyle(circle).backgroundColor || '#ffffff';
      if (picker) picker.value = multiCircleBg;
    });
  });

  createCustomColorNoteBtn?.addEventListener('click', () => {
    const pickerVal = picker?.value;
    if (pickerVal) createNote(pickerVal);
    if (panel?.classList.contains('active')) panel.classList.remove('active');
  });

  /************************************************************************
   *  FILTERS LOGIC
   ************************************************************************/
  function applyFilter(filterType) {
    const note_cards = notes_grid?.querySelectorAll('.note-card') || [];
    note_cards.forEach(note => {
      const noteFilters = getFilters(note);
      if (filterType === 'all' || noteFilters.includes(filterType)) {
        note.style.display = 'block';
      } else {
        note.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.querySelector('.activeFilter');
      if (active) active.classList.remove('activeFilter');
      btn.classList.add('activeFilter');

      const filterBtnType = btn.getAttribute('data-filter');
      localStorage.setItem(STORAGE_KEY_ACTIVE_FILTER, filterBtnType);
      applyFilter(filterBtnType);
      applyFiltersAndSearch();
    });
  });

  if (notes_grid) {
    notes_grid.addEventListener('click', e => {
      const favBtn = e.target.closest('.note-fav-btn');
      if (!favBtn) return;

      const note = favBtn.closest('.note-card');
      if (!note) return;

      let filters = getFilters(note);
      if (filters.includes('favourite')) {
        filters = filters.filter(f => f !== 'favourite');
        notificationAlert('Removed from favourites');
        favBtn.classList.remove('active-fav');
      } else {
        filters.push('favourite');
        notificationAlert('Added to favourites ❤️');
        favBtn.classList.add('active-fav');
      }

      setFilters(note, filters);
      uploadToStorage();
      saveNotesFilters();
    });
  }

  function saveNotesFilters() {
    const noteCards = document.querySelectorAll('.note-card');
    const filtersData = Array.from(noteCards).map(note => ({
      id: note.dataset.id,
      filters: getFilters(note),
    }));
    localStorage.setItem(STORAGE_KEY_NOTE_FILTERS, JSON.stringify(filtersData));
    uploadToStorage();
  }

  function restoreFilters() {
    const savedFilters = JSON.parse(localStorage.getItem(STORAGE_KEY_NOTE_FILTERS) || '[]');
    savedFilters.forEach(saved => {
      const note = document.querySelector(`.note-card[data-id="${saved.id}"]`);
      if (!note) return;
      setFilters(note, saved.filters);
      const favBtn = note.querySelector('.note-fav-btn');
      if (saved.filters.includes('favourite') && favBtn) favBtn.classList.add('active-fav');
    });
  }

  /************************************************************************
   *  NOTIFICATION ALERT
   ************************************************************************/
  function notificationAlert(text, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `toast toast-${type}`;
    alert.innerHTML = `
      <span class="toast-text">${text}</span>
      <span class="toast-progress"></span>
    `;
    document.body.appendChild(alert);
    requestAnimationFrame(() => alert.classList.add('show'));
    setTimeout(() => {
      alert.classList.remove('show');
      alert.classList.add('hide');
      alert.addEventListener('transitionend', () => alert.remove(), { once: true });
    }, 1500);
  }

  /************************************************************************
   *  SEARCH LOGIC
   ************************************************************************/
  const searchInput = document.getElementById('note-search');
  let currentSearchQuery = '';
  searchInput.addEventListener('input', () => {
    currentSearchQuery = searchInput.value.toLowerCase().trim();
    applyFiltersAndSearch();
  });

  function applyFiltersAndSearch() {
    const activeFilterBtn = document.querySelector('.filter-btn.activeFilter');
    const activeFilter = activeFilterBtn?.dataset.filter || 'all';
    const notes = notes_grid.querySelectorAll('.note-card');

    notes.forEach(note => {
      const noteText = note.querySelector('.note-text-area')?.value.toLowerCase() || '';
      const noteFilters = getFilters(note);
      const matchesFilter = activeFilter === 'all' || noteFilters.includes(activeFilter);
      const matchesSearch = currentSearchQuery === '' || noteText.includes(currentSearchQuery);
      note.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
    });
  }

  /************************************************************************
   *  EMPTY STATE HANDLER
   ************************************************************************/
  function updateEmptyState() {
    if (!notes_grid) return;
    const existingMsg = notes_grid.querySelector('.empty-msg');
    const hasNotes = notes_grid.querySelectorAll('.note-card').length > 0;

    if (!hasNotes) {
      if (!existingMsg) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-msg';
        emptyMsg.style.cssText =
          'color:#888;font-size:22px;text-align:center;padding:30px 0; position:absolute ; top:50%  ; left:52% ; transform:translate(-50% , -50%)';
        emptyMsg.textContent = "No notes yet. Click '+' to add your first note!";
        notes_grid.appendChild(emptyMsg);
      }
    } else {
      if (existingMsg) existingMsg.remove();
    }
  }

  function hookEmptyStateListeners() {
    updateEmptyState();
    const observer = new MutationObserver(() => updateEmptyState());
    observer.observe(notes_grid, { childList: true });
  }

  /************************************************************************
   *  BOOTSTRAP DEFAULT NOTES (first-time load)
   ************************************************************************/
  /************************************************************************
   * BOOTSTRAP DEFAULT NOTES (Only on very first visit)
   ************************************************************************/
  function bootDefaultNotes() {
    // Check if the user has ever visited before
    const hasVisited = localStorage.getItem('docket-has-visited');

    if (!hasVisited) {
      const defaultColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff'];
      const defaultTexts = [
        'Welcome to Docket! 📝',
        'Click here to edit this note.',
        "Use the '+' button to add more notes.",
        'Change colors or mark favourite notes.',
        'Enjoy organizing your thoughts!',
      ];

      // Create defaults
      defaultTexts.forEach((text, index) => {
        createNote(defaultColors[index], text, false); // isNew = false so it doesn't autofocus
      });

      // Save them and set the "visited" flag permanently
      uploadToStorage();
      localStorage.setItem('docket-has-visited', 'true');
    }
  }

  /************************************************************************
   * --- DOMContentLoaded BOOT LOGIC ---
   ************************************************************************/

  // 1. Try to restore existing notes first
  const rawNotes = localStorage.getItem(STORAGE_KEY_NOTES);
  const parsedNotes = rawNotes ? JSON.parse(rawNotes) : [];

  if (parsedNotes.length > 0) {
    // User has notes (defaults or their own), just restore them
    restoreNotesFromStorage();
  } else {
    // Storage is empty. Is it because they deleted everything or first time?
    bootDefaultNotes();
  }

  // 2. Restore filters and UI states
  restoreFilters();

  const savedActiveFilter = localStorage.getItem(STORAGE_KEY_ACTIVE_FILTER) || 'all';
  const btnToActivate = document.querySelector(`.filter-btn[data-filter="${savedActiveFilter}"]`);
  if (btnToActivate) {
    document.querySelector('.activeFilter')?.classList.remove('activeFilter');
    btnToActivate.classList.add('activeFilter');
  }
  applyFilter(savedActiveFilter);

  // 3. Hook empty state
  hookEmptyStateListeners();

  // faqs

  const toggleFaqsBtn = document.querySelector('.toggle-faqs-btn');
  const faqQuestions = document.querySelectorAll('.faq-question');
  const faqsContainer = document.querySelector('.faq-container');

  // 1. Accordion Logic (Individual Questions)
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;

      // Close other FAQ items (Accordion effect)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // 2. Toggle Container Logic (Outside the loop!)
  if (toggleFaqsBtn && faqsContainer) {
    toggleFaqsBtn.addEventListener('click', () => {
      faqsContainer.classList.toggle('showFaqs');
      console.log('FAQ container toggled');
    });
  }
});
