'use strict';

function render_UI() {

  // main wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";


  // sidebar
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.setAttribute("aria-label", "Sidebar");

  // logo
  const logo = document.createElement("a");
  logo.href = "https://doto-notes.vercel.app";
  logo.className = "logo";

  const logoSpan = document.createElement("span");
  logoSpan.textContent = "Doto ";

  const svgLogo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgLogo.setAttribute("viewBox", "0 -0.5 25 25");
  svgLogo.classList.add("logo-svg");
  svgLogo.innerHTML = `
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M9.808 4.00001H15.329C15.3863 4.00001 15.4433 4.00367 15.5 4.01101C17.7473 4.16817 19.4924 6.0332 19.5 8.28601V14.715C19.4917 17.0871 17.5641 19.0044 15.192 19H9.808C7.43551 19.0044 5.50772 17.0865 5.5 14.714V8.28601C5.50772 5.91353 7.43551 3.99558 9.808 4.00001Z"
                stroke="#00ff00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M19.5 9.03599C19.9142 9.03599 20.25 8.7002 20.25 8.28599C20.25 7.87177 19.9142 7.53599 19.5 7.53599V9.03599ZM15.5 8.28599H14.75C14.75 8.7002 15.0858 9.03599 15.5 9.03599V8.28599ZM16.25 4.01099C16.25 3.59677 15.9142 3.26099 15.5 3.26099C15.0858 3.26099 14.75 3.59677 14.75 4.01099H16.25ZM14.5 12.75C14.9142 12.75 15.25 12.4142 15.25 12C15.25 11.5858 14.9142 11.25 14.5 11.25V12.75ZM8.5 11.25C8.08579 11.25 7.75 11.5858 7.75 12C7.75 12.4142 8.08579 12.75 8.5 12.75V11.25ZM11.5 9.74999C11.9142 9.74999 12.25 9.4142 12.25 8.99999C12.25 8.58577 11.9142 8.24999 11.5 8.24999V9.74999ZM8.5 8.24999C8.08579 8.24999 7.75 8.58577 7.75 8.99999C7.75 9.4142 8.08579 9.74999 8.5 9.74999V8.24999ZM15.5 15.75C15.9142 15.75 16.25 15.4142 16.25 15C16.25 14.5858 15.9142 14.25 15.5 14.25V15.75ZM8.5 14.25C8.08579 14.25 7.75 14.5858 7.75 15C7.75 15.4142 8.08579 15.75 8.5 15.75V14.25ZM19.5 7.53599H15.5V9.03599H19.5V7.53599ZM16.25 8.28599V4.01099H14.75V8.28599H16.25ZM14.5 11.25H8.5V12.75H14.5V11.25ZM11.5 8.24999H8.5V9.74999H11.5V8.24999ZM15.5 14.25H8.5V15.75H15.5V14.25Z"
                fill="#00ff00"></path>
            </g>
  `;

  logoSpan.appendChild(svgLogo);
  logo.appendChild(logoSpan);

  const br = document.createElement("br");
  const notesText = document.createTextNode("Notes");

  logo.appendChild(br);
  logo.appendChild(notesText);

  sidebar.appendChild(logo);


  // menu
  const nav = document.createElement("nav");
  nav.className = "menu-container";
  nav.setAttribute("aria-label", "Controls");

  const addBtn = document.createElement("button");
  addBtn.id = "add-btn";
  addBtn.className = "add-button";
  addBtn.setAttribute("aria-pressed", "false");
  addBtn.textContent = "+";

  nav.appendChild(addBtn);
// color options
  const colorWrapper = document.createElement("div");
  colorWrapper.id = "color-options";
  colorWrapper.className = "color-options";

  const colors = ["orange","yellow","green","blue","purple"];

  colors.forEach(color => {
    const circle = document.createElement("div");
    circle.className = `color-circle ${color}`;
    circle.setAttribute("role","button");
    circle.setAttribute("tabindex","0");
    circle.setAttribute("aria-label", `color ${color}`);
    colorWrapper.appendChild(circle);
  });

  // multicolo wrapper
  const multiWrapper = document.createElement("div");
  multiWrapper.className = "multi-color-wrapper";

  const multiTrigger = document.createElement("div");
  multiTrigger.className = "multi-color-trigger";
  multiTrigger.setAttribute("aria-label","Open color creator");

  const colorPanel = document.createElement("div");
  colorPanel.className = "color-panel";
  colorPanel.setAttribute("aria-hidden","true");

  const title = document.createElement("h3");
  title.textContent = "Create Custom Color Note";

  const inputWrapper = document.createElement("div");
  inputWrapper.className = "color-input-wrapper";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.className = "color-code-input";
  textInput.placeholder = "Enter color";

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.value = "#ffff00";
  colorInput.id = "colorInput";
  colorInput.setAttribute("aria-label","Pick a color");

  const randomBtn = document.createElement("button");
  randomBtn.className = "random-color-btn";
  randomBtn.innerHTML = `
    <svg fill="" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g fill-rule="evenodd">
                        <path
                          d="M47.895 88.097c.001-4.416 3.064-9.837 6.854-12.117l66.257-39.858c3.785-2.277 9.915-2.277 13.707.008l66.28 39.934c3.786 2.28 6.853 7.703 6.852 12.138l-.028 79.603c-.001 4.423-3.069 9.865-6.848 12.154l-66.4 40.205c-3.781 2.29-9.903 2.289-13.69-.01l-66.167-40.185c-3.78-2.295-6.842-7.733-6.84-12.151l.023-79.72zm13.936-6.474l65.834 36.759 62.766-36.278-62.872-36.918L61.83 81.623zM57.585 93.52c0 1.628-1.065 71.86-1.065 71.86-.034 2.206 1.467 4.917 3.367 6.064l61.612 37.182.567-77.413s-64.48-39.322-64.48-37.693zm76.107 114.938l60.912-38.66c2.332-1.48 4.223-4.915 4.223-7.679V93.125l-65.135 37.513v77.82z">
                        </path>
                        <path
                          d="M77.76 132.287c-4.782 2.762-11.122.735-14.16-4.526-3.037-5.261-1.622-11.765 3.16-14.526 4.783-2.762 11.123-.735 14.16 4.526 3.038 5.261 1.623 11.765-3.16 14.526zm32 21c-4.782 2.762-11.122.735-14.16-4.526-3.037-5.261-1.622-11.765 3.16-14.526 4.783-2.762 11.123-.735 14.16 4.526 3.038 5.261 1.623 11.765-3.16 14.526zm-32 16c-4.782 2.762-11.122.735-14.16-4.526-3.037-5.261-1.622-11.765 3.16-14.526 4.783-2.762 11.123-.735 14.16 4.526 3.038 5.261 1.623 11.765-3.16 14.526zm32 21c-4.782 2.762-11.122.735-14.16-4.526-3.037-5.261-1.622-11.765 3.16-14.526 4.783-2.762 11.123-.735 14.16 4.526 3.038 5.261 1.623 11.765-3.16 14.526zm78.238-78.052c-4.783-2.762-11.122-.735-14.16 4.526-3.037 5.261-1.623 11.765 3.16 14.526 4.783 2.762 11.123.735 14.16-4.526 3.038-5.261 1.623-11.765-3.16-14.526zm-16.238 29c-4.782-2.762-11.122-.735-14.16 4.526-3.037 5.261-1.622 11.765 3.16 14.526 4.783 2.762 11.123.735 14.16-4.526 3.038-5.261 1.623-11.765-3.16-14.526zm-17 28c-4.782-2.762-11.122-.735-14.16 4.526-3.037 5.261-1.622 11.765 3.16 14.526 4.783 2.762 11.123.735 14.16-4.526 3.038-5.261 1.623-11.765-3.16-14.526zM128.5 69c-6.351 0-11.5 4.925-11.5 11s5.149 11 11.5 11S140 86.075 140 80s-5.149-11-11.5-11z">
                        </path>
                      </g>
                    </g>
                  </svg>
  `;

  inputWrapper.append(textInput, colorInput, randomBtn);

  const topColors = document.createElement("div");
  topColors.className = "top-colors";

  const article = document.createElement("article");
  article.innerHTML = "Top Picks&nbsp;:";

  const topColorNames = ["green","yellow","bisque","blue","red","orange"];

  topColors.appendChild(article);

  topColorNames.forEach(c => {
    const span = document.createElement("span");
    span.className = `multi-circle ${c}`;
    topColors.appendChild(span);
  });

  const createColorBtn = document.createElement("button");
  createColorBtn.className = "create-color-btn";
  createColorBtn.textContent = "Create Note ";

  colorPanel.append(title, inputWrapper, topColors, createColorBtn);
  multiWrapper.append(multiTrigger, colorPanel);

  nav.appendChild(colorWrapper);
  nav.appendChild(multiWrapper);

  sidebar.appendChild(nav);

// right side
  const main = document.createElement("main");
  main.className = "right-panel";
  main.setAttribute("role","main");
  main.setAttribute("aria-label","Main content");


  // search wrapper
  const headerRow = document.createElement("div");
  headerRow.className = "header-row";

  const searchWrapper = document.createElement("div");
  searchWrapper.className = "search-wrapper";
  const searchIcon = document.createElement("span");
  searchIcon.innerHTML = `
  <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
                  stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M17.029 16.5295L19.5 19.0005" stroke="" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </g>
            </svg>
  `;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "note-search";
  searchInput.placeholder = "Search notes...";
  searchInput.setAttribute("autocomplete","off");
  searchInput.setAttribute("aria-label","Search notes");


 searchWrapper.appendChild(searchIcon);
  searchWrapper.appendChild(searchInput);
  headerRow.appendChild(searchWrapper);


  // main content
  const section = document.createElement("section");
  section.className = "main-content";
  section.setAttribute("aria-label","Notes area");

  const header = document.createElement("header");
  header.className = "main-container-header";

  const h1 = document.createElement("h1");
  h1.textContent = "Your Notes";

  const filterBtns = document.createElement("div");
  filterBtns.className = "notes-filters-btns";

  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn activeFilter";
  allBtn.dataset.filter = "all";
  allBtn.textContent = "All Notes";

  const favBtn = document.createElement("button");
  favBtn.className = "filter-btn";
  favBtn.dataset.filter = "favourite";
  favBtn.textContent = "Favourites";

  filterBtns.append(allBtn, favBtn);
  header.append(h1, filterBtns);

  const notesGrid = document.createElement("div");
  notesGrid.id = "notes-grid";
  notesGrid.className = "notes-grid";
  notesGrid.setAttribute("aria-live","polite");
  notesGrid.setAttribute("aria-label","Notes grid");

  section.append(header, notesGrid);


//  faq container
  const faqBtn = document.createElement("button");
  faqBtn.className = "toggle-faqs-btn";

  faqBtn.innerHTML = `
   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M8 18h10.237L20 19.385V9h1a1 1 0 0 1 1 1v13.5L17.545 20H9a1 1 0 0 1-1-1v-1zm-2.545-2L1 19.5V4a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v12H5.455z">
              </path>
            </g>
          </g>
        </svg>
  `;

  const faqContainer = document.createElement("div");
  faqContainer.className = "faq-container";

  const faqTitle = document.createElement("h3");
  faqTitle.textContent = "Frequently Asked Questions";

  faqContainer.appendChild(faqTitle);

  const faqQuestions = [
    "Where are my notes saved?",
    "Why did the default notes disappear?",
    "How do I create a new note?",
    "How do Favorites work?",
    "How can I find a specific note?",
    "How do I delete a note?"
  ];

  const faqAnswers = [
    "Your notes are saved locally in your browser's LocalStorage...",
    "The 5 starter notes only appear on first visit...",
    "Click the '+' button...",
    "Click the Heart icon...",
    "Use the Search Bar...",
    "Click the Trash Can icon..."
  ];

  faqQuestions.forEach((question, i) => {

    const item = document.createElement("div");
    item.className = "faq-item";

    const btn = document.createElement("button");
    btn.className = "faq-question";
    btn.textContent = question;

    const answer = document.createElement("div");
    answer.className = "faq-answer";

    const p = document.createElement("p");
    p.textContent = faqAnswers[i];

    answer.appendChild(p);
    item.append(btn, answer);
    faqContainer.appendChild(item);
  });


  // appending all to the main wrapper
  main.append(headerRow, section, faqBtn, faqContainer);
  wrapper.append(sidebar, main);
  document.body.appendChild(wrapper);
}

render_UI();
