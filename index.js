const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let hotels = [
  {
    id: 1,
    name: 'Romantic Getaway',
    category: 'Resort',
    rating: 2.2,
    reviews: 4572,
    amenity: 'Spa',
    price: 10464,
    country: 'South Africa',
  },
  {
    id: 2,
    name: 'Wellness Retreat',
    category: 'Family',
    rating: 2.8,
    reviews: 2114,
    amenity: 'Pool',
    price: 13243,
    country: 'Australia',
  },
  {
    id: 3,
    name: 'Romantic Getaway',
    category: 'Luxury',
    rating: 3.1,
    reviews: 4359,
    amenity: 'Restaurant',
    price: 3299,
    country: 'Germany',
  },
  {
    id: 4,
    name: 'Luxury Suites',
    category: 'Family',
    rating: 4.9,
    reviews: 3651,
    amenity: 'Bar',
    price: 16359,
    country: 'United Kingdom',
  },
  {
    id: 5,
    name: 'Luxury Suites',
    category: 'Budget',
    rating: 4.6,
    reviews: 688,
    amenity: 'Gym',
    price: 15570,
    country: 'France',
  },
  {
    id: 6,
    name: 'Cultural Heritage Hotel',
    category: 'Boutique',
    rating: 2.0,
    reviews: 219,
    amenity: 'Pet Friendly',
    price: 2321,
    country: 'USA',
  },
  {
    id: 7,
    name: 'Business Hotel',
    category: 'Mid-Range',
    rating: 3.7,
    reviews: 1040,
    amenity: 'Free WiFi',
    price: 4523,
    country: 'India',
  },
  {
    id: 8,
    name: 'Historic Plaza Hotel',
    category: 'Mid-Range',
    rating: 3.5,
    reviews: 300,
    amenity: 'Parking',
    price: 8543,
    country: 'Australia',
  },
  {
    id: 9,
    name: 'Adventure Resort',
    category: 'Boutique',
    rating: 4.2,
    reviews: 1222,
    amenity: 'Gym',
    price: 11894,
    country: 'South Africa',
  },
  {
    id: 10,
    name: 'Mountain Retreat',
    category: 'Resort',
    rating: 4.8,
    reviews: 4015,
    amenity: 'Spa',
    price: 17560,
    country: 'India',
  },
  {
    id: 11,
    name: 'Eco Friendly Lodge',
    category: 'Family',
    rating: 2.4,
    reviews: 528,
    amenity: 'Restaurant',
    price: 3124,
    country: 'Germany',
  },
  {
    id: 12,
    name: 'Urban Boutique Hotel',
    category: 'Mid-Range',
    rating: 3.9,
    reviews: 1401,
    amenity: 'Free WiFi',
    price: 9245,
    country: 'France',
  },
  {
    id: 13,
    name: 'Beachfront Hotel',
    category: 'Luxury',
    rating: 4.5,
    reviews: 489,
    amenity: 'Pool',
    price: 14567,
    country: 'USA',
  },
  {
    id: 14,
    name: 'Ocean View Resort',
    category: 'Budget',
    rating: 3.3,
    reviews: 783,
    amenity: 'Spa',
    price: 7432,
    country: 'United Kingdom',
  },
  {
    id: 15,
    name: 'City Central Hotel',
    category: 'Boutique',
    rating: 4.1,
    reviews: 2133,
    amenity: 'Bar',
    price: 9823,
    country: 'Australia',
  },
  {
    id: 16,
    name: 'Casino Resort',
    category: 'Luxury',
    rating: 4.9,
    reviews: 5000,
    amenity: 'Bar',
    price: 18900,
    country: 'South Africa',
  },
  {
    id: 17,
    name: 'Golf Resort',
    category: 'Mid-Range',
    rating: 4.7,
    reviews: 789,
    amenity: 'Gym',
    price: 16340,
    country: 'France',
  },
  {
    id: 18,
    name: 'Family Fun Hotel',
    category: 'Family',
    rating: 3.2,
    reviews: 1322,
    amenity: 'Pool',
    price: 7500,
    country: 'Germany',
  },
  {
    id: 19,
    name: 'Spa and Relaxation Hotel',
    category: 'Luxury',
    rating: 4.4,
    reviews: 2314,
    amenity: 'Spa',
    price: 14900,
    country: 'United Kingdom',
  },
  {
    id: 20,
    name: 'Country House Hotel',
    category: 'Budget',
    rating: 3.6,
    reviews: 1876,
    amenity: 'Parking',
    price: 6234,
    country: 'Australia',
  },
];

// function hotelPricingSort(hotel1, hotel2, pricing) {
//   if (pricing === 'low-to-high') {
//     return hotel1.price - hotel2.price;
//   } else {
//     return hotel2.price - hotel1.price;
//   }
// }

// app.get('/hotels/sort/pricing', (req, res) => {
//   let pricing = req.query.pricing;
//   let result = hotels.slice();
//   result.sort(hotelPricingSort, pricing);
//   result = res.json({ hotels: result });
// });

// Function to sort hotels based on pricing preference
function hotelPricingSort(hotel1, hotel2, pricing) {
  return pricing === 'low-to-high'
    ? hotel1.price - hotel2.price
    : hotel2.price - hotel1.price;
}

// Express route to sort hotels by pricing
app.get('/hotels/sort/pricing', (req, res) => {
  const pricing = req.query.pricing; // Get the query parameter
  if (!pricing || (pricing !== 'low-to-high' && pricing !== 'high-to-low')) {
    return res.status(400).json({
      error: 'Invalid pricing parameter. Use "low-to-high" or "high-to-low".',
    });
  }

  const sortedHotels = hotels
    .slice()
    .sort((hotel1, hotel2) => hotelPricingSort(hotel1, hotel2, pricing));

  res.json({ hotels: sortedHotels });
});

// Function to sort hotels based on rating preference
function hotelRatingSort(hotel1, hotel2, rating) {
  return rating === 'low-to-high'
    ? hotel1.rating - hotel2.rating
    : hotel2.rating - hotel1.rating;
}

// Express route to sort hotels by rating
app.get('/hotels/sort/rating', (req, res) => {
  const rating = req.query.rating; // Get the query parameter
  if (!rating || (rating !== 'low-to-high' && rating !== 'high-to-low')) {
    return res.status(400).json({
      error: 'Invalid rating parameter. Use "low-to-high" or "high-to-low".',
    });
  }

  const sortedHotels = hotels
    .slice()
    .sort((hotel1, hotel2) => hotelRatingSort(hotel1, hotel2, rating));

  res.json({ hotels: sortedHotels });
});

// Function to sort hotels based on reviews preference
function hotelReviewsSort(hotel1, hotel2, reviews) {
  return reviews === 'least-to-most'
    ? hotel1.reviews - hotel2.reviews
    : hotel2.reviews - hotel1.reviews;
}

// Express route to sort hotels by reviews
app.get('/hotels/sort/reviews', (req, res) => {
  const reviews = req.query.reviews; // Get the query parameter
  if (
    !reviews ||
    (reviews !== 'least-to-most' && reviews !== 'most-to-least')
  ) {
    return res.status(400).json({
      error:
        'Invalid reviews parameter. Use "least-to-most" or "most-to-least".',
    });
  }

  const sortedHotels = hotels
    .slice()
    .sort((hotel1, hotel2) => hotelReviewsSort(hotel1, hotel2, reviews));

  res.json({ hotels: sortedHotels });
});

// Function to filter hotels based on one or multiple selected amenities
function filterByAmenities(hotels, amenities) {
  const amenitiesLower = amenities.map((amenity) => amenity.toLowerCase()); // Convert all to lowercase
  return hotels.filter(
    (hotel) =>
      hotel.amenity && amenitiesLower.includes(hotel.amenity.toLowerCase())
  );
}

// Express route to filter hotels by amenity
app.get('/hotels/filter/amenity', (req, res) => {
  let amenities = req.query.amenity; // Get the amenity query parameter(s)

  // Check if the amenity parameter exists
  if (!amenities) {
    return res.status(400).json({ error: 'Amenity parameter is required.' });
  }

  // Ensure amenities is always an array for uniform processing
  if (!Array.isArray(amenities)) {
    amenities = [amenities];
  }

  // Call the filter function with the provided amenities
  const filteredHotels = filterByAmenities(hotels, amenities);

  if (filteredHotels.length === 0) {
    return res.status(404).json({
      message: `No hotels found with the provided amenities: ${amenities.join(
        ', '
      )}`,
    });
  }

  res.json({ hotels: filteredHotels });
});

// Function to filter hotels based on one or multiple selected countries
function filterByCountries(hotels, countries) {
  const countriesLower = countries.map((country) => country.toLowerCase()); // Convert all to lowercase
  return hotels.filter(
    (hotel) =>
      hotel.country && countriesLower.includes(hotel.country.toLowerCase())
  );
}

// Express route to filter hotels by one or multiple countries
app.get('/hotels/filter/country', (req, res) => {
  let countries = req.query.country; // Get the country query parameter(s)

  // Check if the country parameter exists
  if (!countries) {
    return res.status(400).json({ error: 'Country parameter is required.' });
  }

  // Ensure countries is always an array for uniform processing
  if (!Array.isArray(countries)) {
    countries = [countries];
  }

  // Call the filter function with the provided countries
  const filteredHotels = filterByCountries(hotels, countries);

  // If no hotels match the countries, return a 404 response
  if (filteredHotels.length === 0) {
    return res.status(404).json({
      message: `No hotels found in the provided countries: ${countries.join(
        ', '
      )}.`,
    });
  }

  // Return the filtered list of hotels
  res.json({ hotels: filteredHotels });
});

// Function to filter hotels based on one or multiple selected categories
function filterByCategory(hotels, categories) {
  const categoriesLower = categories.map((category) => category.toLowerCase()); // Convert all to lowercase
  return hotels.filter(
    (hotel) =>
      hotel.category && categoriesLower.includes(hotel.category.toLowerCase())
  );
}

// Express route to filter hotels by category
app.get('/hotels/filter/category', (req, res) => {
  let categories = req.query.category; // Get the category query parameter(s)

  // Check if the category parameter exists
  if (!categories) {
    return res.status(400).json({ error: 'Category parameter is required.' });
  }

  // Ensure categories is always an array for uniform processing
  if (!Array.isArray(categories)) {
    categories = [categories];
  }

  // Call the filter function with the provided categories
  const filteredHotels = filterByCategory(hotels, categories);

  // If no hotels match the categories, return a 404 response
  if (filteredHotels.length === 0) {
    return res.status(404).json({
      message: `No hotels found in the provided categories: ${categories.join(
        ', '
      )}.`,
    });
  }

  // Return the filtered list of hotels
  res.json({ hotels: filteredHotels });
});

// Express route to return all hotels
app.get('/hotels', (req, res) => {
  res.json({ hotels });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
