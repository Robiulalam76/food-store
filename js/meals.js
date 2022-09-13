const loadMealDetails = (mealsId) => {
    const mealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealsId}`
    fetch(mealURL)
        .then(res => res.json())
        .then(data => displayMealsDetails(data.meals[0]))
}


const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}


const displayMeals = (meals) => {
    const mealscontainer = document.getElementById('meals-container');
    mealscontainer.innerHTML = ``;
    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        `
        mealscontainer.appendChild(div)
    });
}

const search = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    loadMeals(searchFieldText)
    searchField.value = '';
}

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key) {
        const searchField = document.getElementById('search-field').value;
        loadMeals(searchField)
        searchField.value = '';
    }
})


const displayMealsDetails = (meal) => {
    const detailContainer = document.getElementById('details-container');
    detailContainer.innerHTML = ``;
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
        </div>
    `
    detailContainer.appendChild(div);
}

loadMeals('all')