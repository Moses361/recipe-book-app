document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const recipeList = document.getElementById('recipe-list');

    // Sample recipes data (for demonstration)
    const recipes = [
        { id: 1, title: 'Spaghetti Carbonara', image: 'images/spaghetti.jpg', ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan'], instructions: 'Cook spaghetti, fry bacon, mix with beaten eggs and parmesan cheese.' },
        { id: 2, title: 'Chicken Curry', image: 'images/chicken_curry.jpg', ingredients: ['Chicken', 'Curry paste', 'Coconut milk', 'Vegetables'], instructions: 'Cook chicken with curry paste and coconut milk, add vegetables.' },
        { id: 3, title: 'Chocolate Cake', image: 'images/chocolate_cake.jpg', ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Eggs', 'Milk'], instructions: 'Mix dry ingredients, add wet ingredients, bake in oven.' },
        { id: 4, title: 'Caesar Salad', image: 'images/caesar_salad.jpg', ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing'], instructions: 'Toss lettuce with dressing, add croutons and cheese.' },
        { id: 5, title: 'Pancakes', image: 'images/pancakes.jpg', ingredients: ['Flour', 'Milk', 'Eggs', 'Butter', 'Baking powder'], instructions: 'Mix ingredients, pour onto griddle, cook until golden brown.' },
        { id: 6, title: 'Tacos', image: 'images/tacos.jpg', ingredients: ['Tortillas', 'Ground beef', 'Lettuce', 'Tomatoes', 'Cheese', 'Sour cream'], instructions: 'Cook ground beef, warm tortillas, assemble tacos with desired toppings.' },
        { id: 7, title: 'Vegetable Soup', image: 'images/vegetable_soup.jpg', ingredients: ['Carrots', 'Potatoes', 'Onions', 'Celery', 'Vegetable broth', 'Tomatoes', 'Garlic'], instructions: 'Chop vegetables, simmer in broth until tender, season to taste.' },
        { id: 8, title: 'Sushi Rolls', image: 'images/sushi_rolls.jpg', ingredients: ['Sushi rice', 'Nori sheets', 'Fresh fish or vegetables', 'Soy sauce', 'Wasabi', 'Pickled ginger'], instructions: 'Cook sushi rice, assemble rolls with desired fillings, slice and serve with soy sauce and wasabi.' }

        // Add more recipes here
    ];

    // Display recipes on page load
    displayRecipes(recipes);

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm));
        displayRecipes(filteredRecipes);
    });

    // Function to display recipes
    function displayRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe');
            recipeCard.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}">
                <button class="view-details-btn" data-id="${recipe.id}">View Details</button>
            `;
            recipeList.appendChild(recipeCard);
        });
    }

    // Function to save recipe to localStorage
    recipeList.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-details-btn')) {
            const recipeId = parseInt(event.target.dataset.id);
            window.location.href = "recipe.html?id="+recipeId;
        }
    });
});
