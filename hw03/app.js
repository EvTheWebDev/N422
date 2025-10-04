// Promises Section of Site
document.addEventListener("DOMContentLoaded", () => {
  // console.log('DOM fully loaded and parsed');
});

const promisesHolder = document.getElementById("promisesHolder");
const quoteUrl =
  "https://motivational-spark-api.vercel.app/api/quotes/random/10";

const fetchQuotes = async (quotes) => {
  promisesHolder.innerHTML = "";
  quotes.forEach((quoteData) => {
    const quoteHolder = document.createElement("div");
    quoteHolder.classList.add("quoteHolder");
    quoteHolder.innerHTML = `
            <p class="quoteText">"${quoteData.quote}"</p>
            <p class="quoteAuthor">- ${quoteData.author}</p>
        `;
    promisesHolder.appendChild(quoteHolder);
  });
};

fetch(quoteUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error Fetching Quotes: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    fetchQuotes(data);
  })
  .catch((error) => {
    console.error("Fetch Error:", error);
    promisesHolder.innerHTML = `<p class="error">Failed to load quotes. Please try again later.</p>`;
  });


// Async / Await Section of Site
const asyncHolder = document.getElementById("asyncHolder");
const dogUrl = "https://dog.ceo/api/breeds/image/random/20";

const displayDogs = async (imageUrls) => {
  asyncHolder.innerHTML = ""; 

  imageUrls.forEach((url) => {
    const dogCard = document.createElement("div");
    dogCard.classList.add("dogCard");

    const img = document.createElement("img");
    img.src = url;
    img.alt = "A random dog";

    dogCard.appendChild(img);
    asyncHolder.appendChild(dogCard);
  });
};

function displayError(message) {
  asyncHolder.innerHTML = `<p class="error">${message}</p>`;
}

const fetchAndDisplayDogs = async () => {
  try {
    const response = await fetch(dogUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    await displayDogs(data.message);
  } catch (error) {
    displayError(error.message);
  }
};

fetchAndDisplayDogs();
