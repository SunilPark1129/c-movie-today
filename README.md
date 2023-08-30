# C Movie Today
![c movie today](https://github.com/SunilPark1129/c-movie-today/assets/106734133/5118bf43-7438-4937-b480-77c96edebfa8)

Aug, 2023 deployed website - [Link](https://cmovietoday.netlify.app/)<br>

-------------------

## Self-improvement

This project is completed in three versions. The reason for creating the same project three times was that I wanted to experience my own development and growth firsthand. By re-creating it multiple times, I could confidently assess how much my skills had improved over time. The website, which went through several versions over a year, reflects my evolving journey.

During this latest re-creation, I focused on improving web performance and UI design, along with folder structure and fixing various bugs. I enhanced the component structure and minimized re-rendering by using Redux to manage state between components, instead of drilling state down. Additionally, I excluded unnecessary features in this new project.

Overall, this process allowed me to witness my progress and implement improvements that have led to a faster, more efficient, and refined project.

> <img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/63cc2c2e-5550-4995-8014-bf4084e6538b" width="300" ><br>
Jun, 2022 first version - [Github Link](https://github.com/SunilPark1129/cinema-movie)<br>

> <img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/dcb0fb1b-df5e-4190-90c2-9f2908f3a7a2" width="300" ><br>
Nov, 2022 second version - [Github Link](https://github.com/SunilPark1129/re-cinema-movie)<br>

> <img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/5118bf43-7438-4937-b480-77c96edebfa8" width="300" ><br>
Aug, 2023 latest version - current page


## Project Description

- "C Movie Today" is a website that provides a service to easily access information about the latest movies, old movies, ratings, overviews, and more through a user-friendly UI.

## Features
> Features that I would like to introduce.

|Feature|Description|
|:--:|:--|
|Lists|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/d76ffd8d-d91a-42ed-af9f-3ddeffc57eca" width="400"><br><br>To make it applicable to all devices, I have added the style properties `flex-basis: %` and `padding-bottom: %` to each movie poster. When the window size reaches the tablet size, the movies are displayed in rows of four, and on mobile size, they are displayed in rows of two by setting the media query.<br><br>Additionally, to prevent the movie list from adjusting the width on its own (if there is only one item in the movie list, the width of the item will cover all the width because of `flex` property), I applied a value of `0` to `flex-grow` and `flex-shrink` attributes. This ensures that the movie posters maintain a consistent layout without resizing automatically.<br><br>By using these techniques, the movie list adapts smoothly to various screen sizes and ensures a user-friendly experience on all devices.|
|IntersectionObserver<br>Fetching<br>Loading|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/1c2d9784-8423-4027-a4ad-6e416b8e2f75" width="400"><br><br>When fetching movies, collects 20 items in a list and display them on the screen. I used `IntersectionObserver` to detect when the user reaches the last movie poster in the group. Once the `IntersectionObserver` returns true, I used `useEffect` to fetch the next page of 20 movie items.<br><br>To subscribe the `IntersectionObserver` only to the last movie out of 20 items, I grouped the fetched 20 items into a single `array`. Then, created `components` using `map()` method, and applied the `Observer` subscription only to the movie poster with the last index. This optimization is done to improve web performance.<br><br>This process continues until there are no more pages to fetch. During the fetching process, I have implemented a `loading` animation effect to provide a better user experience.|
|Recommended Movie|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/87284086-a901-4829-9f71-82c637da34dd" width="400"><br><br>This section selects a random movie recommendation from the fetched movie lists each time a new movie list is fetched. The movies are stored in an `array` structured as `array[page][item]`, and the random selection is done using `Math.random()` for both the number of pages and the number of items.<br><br>There are two functionalities in this section. First, there is a view button where users can see movie information, and second, there is a refresh button that provides a new random movie recommendation. The refresh button selects a movie from the existing `array` without triggering additional `rendering`.|
|Selected Movie|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/c335bc89-6bcb-486d-92a6-35af026748fb" width="400"><br><br>In the `state management`, the modal `component`, which is `subscribing` to the `state`, receives the targeted movie information value as a `state` when the user clicks on a movie poster, leading to the opening of the modal.<br><br>In the styling, the layout is divided into two main `divs`. One `div` contains the front poster, and the other contains movie information with the `overflow-y` property set (To enhance the design, the scroll bar is intentionally removed).<br><br>Using `useEffect`, when the modal opens, the style value `overflow: hidden` is immediately applied to the `body`. And when the modal is closed (through the useEffect's return), the style value is reset to `overflow: auto` on the `body`.|
|Responsive Selected Movie|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/68989ce9-0380-4e67-bef4-54712df6a300" height="400"><br><br>This is a responsive design of the modal section.<br><br>As mentioned on the above, this `section` consists of two main `divs`, and one of them uses the `overflow-y` property. Through `media queries`, when the size becomes narrower, the `overflow-y` value is changed to `initial` to prevent scrolling within the `div`. Now, users can scroll the `section` instead of the `div`, providing a smoother UI experience.|
|Aside|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/a03a2c25-92e3-47ab-b862-e20b076ccad0" height="400"><br><br>In this `aside` section, users determine the type of movies they want to fetch before making the `API` call. Each time a button is clicked, the `URL` value changes and is sent to the server via the `API` to fetch the corresponding movie data. The resulting data is then sent to the `components`.<br><br>To add a unique design touch, I created an `after` attribute for each button in the `aside` section. When a user clicks a button, the `after` element animates by `transforming` from right to left, creating a connected visual effect.|
|Responsive Aside|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/fa42b799-5bdc-40e1-bed0-23c8c442c6bf" height="400"><br><br>This is the `responsive` styling for the `aside` section. When the `window` size decreases, the `aside` changes to a `position: fixed` format that can be opened and closed. The animation effects for the buttons are removed in this context as they do not fit well.<br><br>When the `aside` is opened, the `body` is set to `overflow: hidden`, and the aside itself is set to `overflow-y: auto`. This allows the user to scroll within the `aside` without affecting the scrolling of the body.|
|Search|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/0bff4348-fdbb-4424-8a22-ac4b3ff7f0b1" width="400"><br><br>This `page` is responsible for handling search in this project. When users perform a search, it fetches the movie list and reuses the list `component` previously used on the Home page (see first feature on the above). In addition, to reduce JavaScript size in this project, many `components` are reused, but further details will be omitted.<br><br>In the `aside` contains an `input` field for search, and the `nav` section also includes an `input` field for search. Both inputs are the same `component`, and the input in the `nav` section is designed to be usable on other pages as well.|
|Related Query|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/ed7839d7-0d5a-47ed-bffa-3766b7dccdbf" ><br><br>When the user searches for a movie title in the `input` field, related search terms are fetched to provide relevant suggestions. To prevent server overload and maintain web performance, `debouncing` is used to send the query value to the server every 0.5 seconds instead of every input value.<br><br>If the user does not have `focus` on the `input`, the related search terms are hidden.<br><br>When the user clicks on a related search term, the fetch process is initiated with that targeted title the user pressed.|
|Searched History|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/e601e8c0-6169-49c7-b603-d1d416a3573d" ><br><br>When the user performs a search, the searched movie titles are recorded in the search history. This history is managed as an `array`, and when the user clicks the "x" button, the corresponding title is removed from the history. Clicking on a title will trigger a new search with that targeted title.<br><br>In this project, no `caching` mechanism is used, so when the user closes the `window`, the entire search history is cleared.<br><br>The history `array` has a predefined limit for the number of entries it can hold. When the limit is reached, the last entry is removed, and new entries are added to the front of the `array`.<br><br>Additionally, when the user performs a search, any existing matching entries in the history `array` are removed, and the searched title is added to the front of the `array`.|
|Error Pages|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/130564f9-b3ae-422d-8ac0-9a1d3ca77d80" width="400"><br><br>This project includes three error pages.<br><br>There is a page that handles the situation when there is no movie information after fetching, and it catches and displays an error before using the map() function on the empty array.<br><br>There is a page that handles errors that occur when using the API. It receives the error message and displays the relevant information in the page.<br><br>There is a 404 page that is displayed when the user accesses a non-existent endpoint.|
|Menu Trigger|<img src="https://github.com/SunilPark1129/c-movie-today/assets/106734133/c181faad-961a-43a8-832f-63999dfe8364" height="200"><br><br>When the `window` size reaches the tablet size, the `aside` is hidden, and the menu trigger is set to `display: block` to become visible. Clicking on this trigger button will make the `aside` appear, and clicking it again will make the `aside` disappear.|

## Technology Used

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![SCSS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) 

## Key Skills

- IntersectionObserver
- State Mangaement (Redux)
- Custom Hooks
- API Fetch
- Debounced
- Refactoring
- Catch Error Pages
- Responsive Design
- Metadata

## Installation
1. Clone the repo
```
git clone https://github.com/SunilPark1129/c-movie-today.git
```
2. Install all dependencies
```
npm install
```
> Dependencies I have installed :<br>axios<br> react-router-dom<br> redux<br> redux toolkit<br>  

3. run the website
```
npm start
```

## Project Status
Completed
