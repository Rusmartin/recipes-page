/* =========================================================
   OUR RECIPE BOOK — RECIPE DATA + SEARCH/FILTER BEHAVIOUR

   TO ADD A RECIPE:
   1. Add a recipe card in index.html (copy the commented template).
   2. Add a matching object inside the recipes object below.
   3. Use the same ID in the HTML button and the recipe object key.
   4. Add ingredients and method steps as strings in the arrays.
   ========================================================= */

const recipes = {
  // EXAMPLE RECIPE 1 — use this structure for each new recipe.
  "lemon-pasta": {
    title: "Lemon & Spinach Pasta",
    category: "Pasta",
    time: "20 minutes",
    servings: "2 servings",
    description: "Fresh, creamy, bright and easy enough for a weeknight.",
    ingredients: [
      "200 g pasta",
      "2 handfuls fresh spinach",
      "1 lemon (zest and juice)",
      "2 cloves garlic, finely chopped",
      "2 tbsp olive oil",
      "30 g grated Parmesan",
      "Salt and black pepper, to taste"
    ],
    method: [
      "Cook the pasta in salted water according to the packet. Save a mug of pasta water before draining.",
      "Warm the olive oil in a pan. Add the garlic and cook gently for about 30 seconds.",
      "Add the spinach and stir until wilted.",
      "Mix in the lemon zest, lemon juice, Parmesan and a splash of pasta water.",
      "Toss the pasta through the sauce. Season with salt and pepper, then serve."
    ]
  },

  // EXAMPLE RECIPE 2.
  "chicken": {
    title: "Garlic Roasted Chicken",
    category: "Chicken",
    time: "35 minutes",
    servings: "2 servings",
    description: "Juicy chicken thighs with garlic, lemon and herbs.",
    ingredients: [
      "4 boneless chicken thighs",
      "1 tbsp olive oil",
      "2 cloves garlic, crushed",
      "1/2 lemon",
      "1 tsp dried oregano",
      "Salt and black pepper",
      "Green beans or another vegetable, to serve"
    ],
    method: [
      "Heat the oven to 220°C (425°F).",
      "Mix olive oil, garlic, lemon juice, oregano, salt and pepper.",
      "Coat the chicken thighs with the mixture and place them in a baking dish.",
      "Roast for about 20–25 minutes, depending on thickness, until the centre reaches 74°C (165°F).",
      "Rest for a few minutes and serve with vegetables."
    ]
  },

  // EXAMPLE RECIPE 3.
  "chickpeas": {
    title: "Crispy Chickpea Bowl",
    category: "Vegetarian",
    time: "25 minutes",
    servings: "2 servings",
    description: "A colourful bowl with crunchy chickpeas and a quick sauce.",
    ingredients: [
      "1 can chickpeas, drained and dried",
      "1 tbsp olive oil",
      "1 tsp paprika",
      "1 cucumber, chopped",
      "2 tomatoes, chopped",
      "100 g plain Greek yogurt",
      "1/2 lemon",
      "Salt and pepper"
    ],
    method: [
      "Heat the oven to 220°C (425°F).",
      "Toss chickpeas with olive oil, paprika, salt and pepper.",
      "Roast for 20 minutes, shaking the tray halfway through.",
      "Stir lemon juice into the yogurt and season to taste.",
      "Serve the crispy chickpeas over cucumber and tomatoes with the yogurt sauce."
    ]
  }

  /*
  COPY THIS OBJECT TO ADD A RECIPE:
  Remember to put a comma after the previous recipe's closing }.

  "your-unique-id": {
    title: "Recipe Name",
    category: "Chicken", // Must match a filter, or add a new filter in index.html.
    time: "30 minutes",
    servings: "2 servings",
    description: "A short sentence about the recipe.",
    ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3"
    ],
    method: [
      "Step one.",
      "Step two.",
      "Step three."
    ]
  }

  Then, in index.html, add a recipe card with:
  data-category="Chicken"
  data-search="recipe name ingredient 1 ingredient 2"
  and a button such as:
  onclick="openRecipe('your-unique-id')"
  */
};

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter");
const recipeCards = document.querySelectorAll(".recipe-card");
const recipeCount = document.getElementById("recipeCount");
const emptyState = document.getElementById("emptyState");
const recipeDialog = document.getElementById("recipeDialog");
const recipeDetails = document.getElementById("recipeDetails");
const closeDialog = document.getElementById("closeDialog");

let activeCategory = "All";

function filterRecipes() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  recipeCards.forEach((card) => {
    const category = card.dataset.category;
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLowerCase();
    const matchesCategory = activeCategory === "All" || category === activeCategory;
    const matchesSearch = searchableText.includes(searchTerm);
    const show = matchesCategory && matchesSearch;

    card.hidden = !show;
    if (show) visibleCount++;
  });

  recipeCount.textContent = `${visibleCount} ${visibleCount === 1 ? "recipe" : "recipes"}`;
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    filterRecipes();
  });
});

searchInput.addEventListener("input", filterRecipes);

function openRecipe(recipeId) {
  const recipe = recipes[recipeId];

  if (!recipe) {
    alert("Recipe details not found. Check that the button ID matches a key in script.js.");
    return;
  }

  recipeDetails.innerHTML = `
    <p class="detail-category">${escapeHtml(recipe.category)}</p>
    <h2>${escapeHtml(recipe.title)}</h2>
    <p class="detail-intro">${escapeHtml(recipe.description)}</p>
    <div class="detail-stats">
      <span>◷ ${escapeHtml(recipe.time)}</span>
      <span>♧ ${escapeHtml(recipe.servings)}</span>
    </div>
    <div class="detail-columns">
      <section>
        <h3>Ingredients</h3>
        <ul class="ingredient-list">
          ${recipe.ingredients.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
      <section>
        <h3>Method</h3>
        <ol class="method-list">
          ${recipe.method.map(step => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      </section>
    </div>
  `;

  recipeDialog.showModal();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

closeDialog.addEventListener("click", () => recipeDialog.close());
recipeDialog.addEventListener("click", (event) => {
  if (event.target === recipeDialog) recipeDialog.close();
});

filterRecipes();
