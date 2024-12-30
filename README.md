# Outfitly

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Database Structure](#database-structure)
4. [Getting Started](#getting-started)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Front-End Integration](#front-end-integration)

---

## Project Overview
**Outfitly** is a full-stack application that allows users to manage outfits, events, and scheduling. It features robust back-end support for data management and an interactive front-end for seamless user experience. Users can organize outfits, associate them with events, and create custom schedules.

---

## Features
- User management and authentication.
- Event and week management.
- Outfit management with image support.
- Schedule outfits to specific days.
- Track and manage outfit suggestions for events.
- CRUD operations on relationships between items, events, outfits, and suggestions.
- Interactive front-end for managing garments, outfits, and events.

---

## Database Structure
Outfitly's database consists of 11 tables that store data for users, outfits, events, and relationships. Here’s an overview:

1. **Users** - Stores user information and authentication data.
2. **Events** - Details about events that users can attend.
3. **Weeks** - Weekly structure to help with event and outfit scheduling.
4. **Items** - Individual clothing items that make up outfits.
5. **Outfits** - Groups of items creating complete outfits.
6. **Outfit Suggestions** - Outfit suggestions related to user events.
7. **Schedule** - Links outfits to specific days for planning.
8. **Attends** - Tracks user attendance at events.
9. **Associated With** - Links items to events.
10. **Contains** - Links items to outfits.
11. **Related To** - Relates outfit suggestions to events.

---

## Getting Started
Follow these instructions to set up and run the Outfitly project locally.

### Prerequisites
- **Node.js** and **npm**: Make sure you have Node.js (v14 or later) and npm installed.
- **MySQL**: A MySQL server instance for database management.
- **Git**: To clone and manage the repository.

---

## Installation
### Backend Setup
1. **Clone the repository**:
    ```bash
    git clone https://github.com/MateoBitar/OUTFITLY-API
    ```

2. **Install dependencies**:
    The project relies on several key packages. To install them, run:

    ```bash
    npm install
    ```
    - **dotenv**
    - **express**
    - **express-validator**
    - **moment**
    - **mysql2**
    - **nodemon**
    - **sharp**
    - **express-session**

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add the following configurations:
      ```plaintext
      DB_HOST=your_db_host
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_NAME=your_db_name
      PORT=your_preferred_port
      ```

4. **Initialize the Database**:
   Use the database schema file provided (`Outfitly(DB).sql`) to create tables and initialize your MySQL database.

5. **Start the server**:
   ```bash
   npm run dev
   ```

### Front-End Integration
The front-end provides an intuitive interface for users to manage garments, outfits, and events.

1. **Views**:
   - All EJS views are located in the `/views` folder, which includes:
     - `welcomeView.ejs`: For the landing page.
     - `aboutus.ejs`: For the About us Page.
     - `TermsView.ejs`: For Outfitly Terms.
     - `PrivacyView.ejs`: For Outfitly Privacy.
     - `login.ejs`: For the Login Page.
     - `signIn.ejs`: For the Sign in Page.
     - `eventsView.ejs`: Events management.
     - `addEventView.ejs`: Used for the event creation.
     - `eventSuggestionView.ejs`: Used for the event suggestion.
     - `garmentsView.ejs`: Displays a list of user garments.
     - `addGarmentView.ejs`: Allows users to add new garments.
     - `outfitsView.ejs`: Shows user-created outfits.
     - `selectItemsView.ejs`: Used for the outfit suggestion.
     - `addOutfitView.ejs`: Enables adding outfits with associated items.
     - `suggestOutfitView.ejs`: Used for the event creation.
     - `user.ejs`: Used for User Edit.
     - `errorView.ejs`: Displays errors with custom messages.

2. **Styling**:
   - CSS files are in the `/css` folder and include:
     - `welcomeView.css`: For the landing page.
     - `aboutus.css`: For the About us Page.
     - `TermsView.css`: For Outfitly Terms.
     - `PrivacyView.css`: For Outfitly Privacy.
     - `login.css`: For the Login Page.
     - `signIn.css`: For the Sign in Page.
     - `eventsView.css`: Styling for events management.
     - `addEventView.css`: Used for the event creation form.
     - `eventSuggestionView.css`: Used for the event suggestion form.
     - `garmentsView.css`: Styling for garments management.
     - `addGarmentView.css`: Used for the garment creation form.
     - `outfitsView.css`: Styles for the outfit list and details view.
     - `selectItemsView.css`: Used for the outfit suggestion form.
     - `addOutfitView.css`: Used for adding outfits.
     - `suggestOutfitView.css`: Used for the event creation form.
     - `user.css`: Used for User Edit form.
     - `errorView.css`: Shared styling for error pages.

3. **Static Assets**:
   - Images, fonts, and other assets are located in `/css`.

4. **Routes**:
   - Ensure routes for items and outfits are properly linked in `app.js`.
   - Example:
     ```javascript
     app.use('/outfitly/items', itemRoutes);
     app.use('/outfitly/outfits', outfitRoutes);
     ```
---

## Usage
- **Garments Management**:
  - View garments in the `garmentsView.ejs`.
  - Add new garments through `addGarmentView.ejs`.

- **Outfits Management**:
  - View outfits in `outfitsView.ejs`.
  - Add outfits using `addOutfitView.ejs`.

- **Events Management**:
  - View events in `eventsView.ejs`.
  - Add events using `addEventView.ejs`.

- **Error Handling**:
  - Errors are displayed through `errorView.ejs`, styled consistently with the application theme.

---

For additional questions or issues, please refer to the documentation or contact the repository maintainer.
