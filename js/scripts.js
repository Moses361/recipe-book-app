document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const recipeList = document.getElementById('recipe-list');

    // Sample recipes data (for demonstration)
    const recipes = [
        { id: 1, title: 'Spaghetti Carbonara', image: 'images/spaghetti.jpg', ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan'], instructions: 'Cook spaghetti, fry bacon, mix with beaten eggs and parmesan cheese.' },
        { id: 2, title: 'Chicken Curry', image: 'images/chicken_curry.jpg', ingredients: ['Chicken', 'Curry paste', 'Coconut milk', 'Vegetables'], instructions: 'Cook chicken with curry paste and coconut milk, add vegetables.' }
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
