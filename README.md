# Web Development Project 4 - Veni Vici! 🐾 Discover Random Cats

Submitted by: **Cinthia Ochoa Torre**

This web app:  
A React app that fetches random cat images and breed data from TheCatAPI. Users can explore cats by viewing breed name, origin, and temperament traits. Clicking on any trait adds it to a ban list that filters future cats to avoid those traits. The app also keeps a history of previously viewed cats.

Time spent: **12 hours** spent in total

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**  
  - Displays breed name, origin, temperament, and an image.
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**  
  - Only one cat and its attributes shown at once.
- [x] **API call response results should appear random to the user**  
  - Clicking "Discover Another!" fetches a new random cat.
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**  
  - Breed, origin, and temperament traits are clickable and added to the ban list.
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**  
  - Cats with banned traits do not appear on new fetches.
- [x] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_

## Optional Features

- [x] Multiple types of attributes (breed, origin, temperament) are clickable and ban-able.
- [x] Users can see a stored history of previously displayed cats during the session.

## Additional Features

- Popup welcome message appears on page load and auto-closes after 3 seconds.
- Ban list attributes appear inside clickable colored boxes for easy removal.
- Clean and organized UI with separate panels for history, current cat, and ban list.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' alt='Video Walkthrough' />

<!-- Replace the above URL with your actual walkthrough GIF -->

GIF created with [Kap](https://getkap.co/).

## Notes

Describe any challenges encountered while building the app:  
- Managing retries and filtering to ensure banned traits do not appear.  
- Designing a user-friendly UI with clickable traits and ban list.  
- State management for ban list and history updates.

## License

