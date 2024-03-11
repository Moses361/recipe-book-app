document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get('id'));
    const recipeDetailsContainer = document.getElementById('recipe-details');
    const ratingsContainer = document.querySelector(".recipe-container .right");
    const saveRecipeBtn = document.getElementById('save-recipe');

    // Sample recipes data (for demonstration)
    const recipes = [
        { id: 1, title: 'Spaghetti Carbonara', image: 'images/spaghetti.jpg', ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan'], instructions: 'Cook spaghetti, fry bacon, mix with beaten eggs and parmesan cheese.' },
        { id: 2, title: 'Chicken Curry', image: 'images/chicken_curry.jpg', ingredients: ['Chicken', 'Curry paste', 'Coconut milk', 'Vegetables'], instructions: 'Cook chicken with curry paste and coconut milk, add vegetables.' }
        // Add more recipes here
    ];

    // Find the recipe with the given id
    const recipe = recipes.find(r => r.id === recipeId);

    if (recipe) {
        renderRecipeDetails(recipe);
    } else {
        recipeDetailsContainer.innerHTML = '<p>Recipe not found</p>';
        ratingsContainer.style.display = "none";

    }

    // Function to render recipe details
    function renderRecipeDetails(recipe) {
        recipeDetailsContainer.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><b>Ingredients:</b> ${recipe.ingredients.join(', ')}</p>
            <p><b>Instructions:</b> ${recipe.instructions}</p>
        `;
    }

    // Event listener for saving recipe
    saveRecipeBtn.addEventListener('click', function() {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        const existingRecipe = savedRecipes.find(r => r.id === recipeId);
        if (!existingRecipe) {
            savedRecipes.push(recipe);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            alert('Recipe saved!');
        } else {
            alert('Recipe already saved!');
        }
    });
});