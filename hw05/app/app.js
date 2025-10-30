class Media {
  constructor(id, title, year, value) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.value = value;
  }

  getDetails() {
    return `<i>${this.title}</i> - $${this.value.toFixed(2)}`;
  }
}

class Book extends Media {
  constructor(id, title, year, value, author, genre) {
    super(id, title, year, value);
    this.author = author;
    this.genre = genre;
  }
  getDetails() {
    return `${super.getDetails()} (Author: ${this.author}, Genre: ${
      this.genre
    })`;
  }
}

class DVD extends Media {
  constructor(id, title, year, value, director, runtime) {
    super(id, title, year, value);
    this.director = director;
    this.runtime = runtime;
  }
  getDetails() {
    return `${super.getDetails()} (Director: ${this.director}, Runtime: ${
      this.runtime
    } minutes)`;
  }
}

class CD extends Media {
  constructor(id, title, year, value, artist, songCount) {
    super(id, title, year, value);
    this.artist = artist;
    this.songCount = songCount;
  }
  getDetails() {
    return `${super.getDetails()} (Artist: ${this.artist}, Song Count: ${
      this.songCount
    })`;
  }
}

class Catalog {
  constructor() {
    this.items = [];
  }
  addItem(...newItems) {
    this.items.push(...newItems);
    console.log(`${newItems.length} items added to catalog.`);
  }
  removeItem(removeId) {
    const initLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== removeId);

    if (this.items.length < initLength) {
      console.log(`Removed item (ID: ${removeId})`);
      return true;
    } else {
      console.log(`Item with ID ${removeId} not found.`);
      return false;
    }
  }
  totalValue() {
    const total = this.items.reduce((accumulator, item) => {
      return accumulator + item.value;
    }, 0);
    return total.toFixed(2);
  }
  displayCatalog() {
    if (this.items.length === 0) {
      return "<p>The catalog is empty.</p>";
    }
    const listItems = this.items
      .map((item) => `<li>${item.getDetails()}</li>`)
      .join("");
    return `<ul>${listItems}</ul>`;
  }
}

function updateDisplay(catalog) {
  const updatedCatalog = document.getElementById("updatedCatalog");

  updatedCatalog.innerHTML = "";

  updatedCatalog.innerHTML += "<h3>Updated Catalog Items</h3>";
  updatedCatalog.innerHTML += catalog.displayCatalog();
  updatedCatalog.innerHTML += `<p><strong>New Total Catalog Value: $${catalog.totalValue()}</strong></p>`;
}

function removeRandomItem(catalog) {
  if (catalog.items.length === 0) {
    console.log("Catalog is empty. Cannot remove item.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * catalog.items.length);
  const randomIdToRemove = catalog.items[randomIndex].id;

  catalog.removeItem(randomIdToRemove);

  updateDisplay(catalog);
}

document.addEventListener("DOMContentLoaded", () => {
  const libraryCatalog = new Catalog();

  const book1 = new Book(1, "The Martian", 2011, 15.5, "Andy Weir", "Sci-Fi");
  const dvd1 = new DVD(2, "Parasite", 2019, 19.99, "Bong Joon-ho", 132);
  const cd1 = new CD(3, "Dark Side of the Moon", 1973, 10.75, "Pink Floyd", 10);
  const book2 = new Book(4, "Educated", 2018, 12.0, "Tara Westover", "Memoir");
  const book3 = new Book(
    5,
    "Pride and Prejudice",
    1813,
    8.99,
    "Jane Austen",
    "Romance"
  );
  const dvd2 = new DVD(6, "The Matrix", 1999, 14.99, "Wachowskis", 136);
  const cd2 = new CD(7, "Lemonade", 2016, 17.5, "Beyoncé", 12);
  const dvd3 = new DVD(
    8,
    "Pulp Fiction",
    1994,
    11.25,
    "Quentin Tarantino",
    154
  );

  libraryCatalog.addItem(book1, dvd1, cd1, book2, book3, dvd2, cd2, dvd3);

  const catalog = document.getElementById("catalog");
  catalog.innerHTML += "<h3>Catalog Items</h3>";
  catalog.innerHTML += libraryCatalog.displayCatalog();
  catalog.innerHTML += `<p><strong>Total Catalog Value: $${libraryCatalog.totalValue()}</strong></p>`;

  removeRandomItem(libraryCatalog);

  updateDisplay(libraryCatalog);

  const removeButton = document.getElementById("removeItem");

  removeButton.addEventListener("click", () => {
    removeRandomItem(libraryCatalog);
  });
});
