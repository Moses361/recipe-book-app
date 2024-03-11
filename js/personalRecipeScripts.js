document.addEventListener('DOMContentLoaded', function() {
    const savedRecipesContainer = document.getElementById('saved-recipes');
    const editModal = document.getElementById('edit-modal');
    const editTitleInput = document.getElementById('edit-title');
    const editIngredientsInput = document.getElementById('edit-ingredients');
    const editInstructionsInput = document.getElementById('edit-instructions');
    const saveEditBtn = document.getElementById('save-edit-btn');
    let editedRecipeId = null;

    // Load saved recipes from localStorage
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    // Display saved recipes
    savedRecipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        savedRecipesContainer.appendChild(recipeCard);
    });

    // Function to create recipe card
    function createRecipeCard(recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe');
        recipeCard.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><b>Ingredients:</b> ${recipe.ingredients.join(', ')}</p>
            <p><b>Instructions:</b> ${recipe.instructions}</p>
            <button class="edit-btn" data-id="${recipe.id}">Edit</button>
            <button class="delete-btn" data-id="${recipe.id}">Delete</button>
        `;
        return recipeCard;
    }

    // Event listener for editing recipe
    savedRecipesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const recipeId = parseInt(event.target.dataset.id);
            const recipeToEdit = savedRecipes.find(recipe => recipe.id === recipeId);
            editedRecipeId = recipeId;
            editTitleInput.value = recipeToEdit.title;
            editIngredientsInput.value = recipeToEdit.ingredients.join('\n');
            editInstructionsInput.value = recipeToEdit.instructions;
            editModal.style.display = 'block';
        }
    });

    // Event listener for saving edited recipe
    saveEditBtn.addEventListener('click', function() {
        const editedRecipe = {
            id: editedRecipeId,
            title: editTitleInput.value,
            ingredients: editIngredientsInput.value.split('\n').map(ingredient => ingredient.trim()),
            instructions: editInstructionsInput.value
        };
        const updatedRecipes = savedRecipes.map(recipe => {
            return recipe.id === editedRecipeId ? { ...editedRecipe, image: recipe.image } : recipe;
        });
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
        editModal.style.display = 'none';
        location.reload(); // Refresh the page to reflect changes
    });

    // Event listener for deleting recipe
    savedRecipesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const recipeId = parseInt(event.target.dataset.id);
            if (confirm('Are you sure you want to delete this recipe?')) {
                const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
                localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
                event.target.parentNode.remove(); // Remove recipe card from UI
                alert('Recipe deleted!');
            }
        }
    });

    // Close the edit modal when clicking on the close button
    editModal.querySelector('.close').addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    // Close the edit modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    }
});
