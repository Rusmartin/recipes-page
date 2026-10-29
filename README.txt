OUR RECIPE BOOK — QUICK START

OPEN THE WEBSITE
1. Extract the recipe-library.zip folder.
2. Open index.html in Chrome, Edge, Firefox or Safari.
3. Keep index.html, style.css and script.js in the same folder.

ADD A RECIPE
1. Open index.html in a text editor (VS Code is a good free choice).
2. Find "ADD YOUR NEW RECIPE CARDS ABOVE THIS COMMENT".
3. Copy one existing <article class="recipe-card">...</article> block.
4. Paste it above that comment and edit the title, category, time,
   description, emoji and data-search words.
5. Give the button a unique ID and call openRecipe('your-unique-id').

6. Open script.js.
7. Find the recipes object near the top.
8. Copy the commented recipe object template near the bottom of that object.
9. Paste it after the last recipe (add a comma after the previous recipe),
   then edit the title, category, time, servings, description, ingredients,
   and method.
10. The ID used in openRecipe('your-unique-id') must exactly match the
    key "your-unique-id" in script.js.
11. Save both files and refresh the browser.

CATEGORY FILTERS
The categories in the filter bar are in index.html. To create a new category,
add a filter button there, then use the exact same category spelling in
data-category on the card and category in script.js.

IMPORTANT
This starter version stores recipes in the code files, not online. It does
not automatically sync between your devices or between you and your fiancée.
To share it online or edit recipes through a form, the next step would be
hosting it and adding a database or shared storage.
