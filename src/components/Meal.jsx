import React, { useEffect, useState } from "react";
import "../css/meal.css";

const Meal = () => {
    const [mealData, setMealData] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [area, setArea] = useState("indian");
    const [inputData, setInputData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch meals based on the selected area
    const fetchDataFromAPI = async (selectedArea) => {
        setErrorMessage(""); // Clear error message
        const api = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
        );
        const data = await api.json();
        setMealData(data.meals);
    };

    useEffect(() => {
        fetchDataFromAPI(area);
    }, [area]);

    // Handle meal selection for details
    const fetchMealDetails = async (mealId) => {
        const api = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await api.json();
        setSelectedMeal(data.meals[0]);
    };

    // Search meals by name
    const submitHandler = async (e) => {
        e.preventDefault();
        const api = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
        );
        const data = await api.json();
        if (data.meals) {
            setMealData(data.meals);
            setErrorMessage("");
        } else {
            setMealData([]);
            setErrorMessage("No results found.😢");
        }
        setInputData("");
    };

    // Handle region button click
    const handleAreaClick = (selectedArea) => {
        if (selectedArea === area) {
            fetchDataFromAPI(selectedArea); // Force fetch data if same area is clicked
        } else {
            setArea(selectedArea); // Change area
        }
    };

    return (
        <>
            {/* Page Header */}
            <header className="page-header">
                <div className="header-content">
                    <div className="logo-container">
                        <img
                            src="public\logo.png"
                            alt="Meal App Logo"
                            className="logo"
                        />
                    </div>
                    <div className="header-text">
                        <h1 className="page-title animate__animated animate__fadeInDown">
                            <span style={{ color: "#FF5733", fontWeight: "bold" }}>Delicious</span> Meals Explorer
                        </h1>
                        <p className="page-subtitle animate__animated animate__fadeInUp">
                            Discover meals from around the world, all at your fingertips! 🌍🍴
                        </p>
                    </div>
                </div>
            </header>


            {/* Main Content */}
            {!selectedMeal ? (
                <>
                    {/* Meal Area Buttons */}
                    <div className="mx-auto text-center my-4">
                        <button
                            onClick={() => handleAreaClick("indian")}
                            type="button"
                            className="btn btn-outline-light mx-2 region-btn animate__animated animate__bounce"
                        >
                            Indian
                        </button>
                        <button
                            onClick={() => handleAreaClick("canadian")}
                            type="button"
                            className="btn btn-outline-light mx-2 region-btn "
                        >
                            Canadian
                        </button>
                        <button
                            onClick={() => handleAreaClick("american")}
                            type="button"
                            className="btn btn-outline-light mx-2 region-btn"
                        >
                            American
                        </button>
                        <button
                            onClick={() => handleAreaClick("thai")}
                            type="button"
                            className="btn btn-outline-light mx-2 region-btn"
                        >
                            Thai
                        </button>
                        <button
                            onClick={() => handleAreaClick("british")}
                            type="button"
                            className="btn btn-outline-light mx-2 region-btn"
                        >
                            British
                        </button>
                        <button
                            onClick={() => handleAreaClick("russian")}
                            type="button"
                            className="btn btn-outline-light mx-2 region-btn"
                        >
                            Russian
                        </button>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={submitHandler} className="mx-auto text-center my-4 search-form">
                        <div className="input-group">
                            <input
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                type="text"
                                className="form-control rounded search-input"
                                placeholder="Search meal by name..."
                            />
                            <button type="submit" className="btn btn-primary search-btn ">
                                🔍 Search
                            </button>
                        </div>
                    </form>

                    {/* Error Message */}
                    {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

                    {/* Display Meal Cards */}
                    <div className="meal-cards-container">
                        {mealData?.map((meal) => (
                            <div
                                key={meal.idMeal}
                                className="meal-card"
                                onClick={() => fetchMealDetails(meal.idMeal)}
                            >
                                <div className="meal-symbol">🍽️</div>
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="meal-image"
                                />
                                <h5 className="meal-title">{meal.strMeal}</h5>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="meal-details">
                    <button
                        onClick={() => setSelectedMeal(null)}
                        className="btn colorful-btn back-btn"
                    >
                        Back to Meals
                    </button>

                    <div className="details-container">
                        <div className="details-image-container">
                            <img
                                src={selectedMeal.strMealThumb}
                                alt={selectedMeal.strMeal}
                                className="meal-detail-image"
                            />
                        </div>
                        <div className="details-text-container">
                            <h2 className="details-title">{selectedMeal.strMeal}</h2>
                            <p><strong>Category:</strong> {selectedMeal.strCategory}</p>
                            <p><strong>Area:</strong> {selectedMeal.strArea}</p>
                            <p><strong>Instructions:</strong></p>
                            <p>{selectedMeal.strInstructions}</p>
                            <a
                                href={selectedMeal.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-warning mt-3"
                            >
                                Watch Recipe on YouTube
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="page-footer text-center py-3 mt-4">
                <p>
                    Made with ❤️ by <strong>Faizan Arif Khan</strong>
                </p>
            </footer>
        </>
    );
};

export default Meal;
