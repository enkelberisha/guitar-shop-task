# Online Guitar Shop

This is a 3-page guitar shop application built with **Next.js** and **Apollo Client** that fetches data from a GraphQL API. It displays guitar brands, models, and detailed specs with musicians.

## Features

- **Page 1 – Guitar Brands**  
  Displays all guitar brands fetched from the API.  
  Clicking a brand navigates to the models page for that brand.

- **Page 2 – Guitar Models**  
  Displays models for the selected brand.  
  Includes a search bar to filter models by name and a filter to narrow by guitar type.  
  Clicking a model navigates to the guitar details page.

- **Page 3 – Guitar Details**  
  Displays detailed information about a selected guitar in two tabs:  
  - Specs (body wood, bridge, pickups)  
  - Musicians (shows 2 musicians at a time with pagination dots)

- Loading and error handling are implemented on all pages.

## Technologies Used

- Next.js (React framework)  
- Apollo Client for GraphQL data fetching  
- CSS Modules for styling  

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)  
- npm or yarn  

### Installation

```bash
git clone https://github.com/enkelberisha/guitar-shop-task.git
cd guitar-shop-task

npm install
# or
yarn install

npm run dev
# or
yarn dev

Open http://localhost:3000 to view the app in your browser.

Folder Structure
/app — Contains Next.js page components

/components — Reusable React components

/styles — CSS Modules for styling

/graphql — GraphQL queries

Notes
The GraphQL API used: https://graphql-api-brown.vercel.app/api/graphql

You can navigate through brands, filter and search models, and view guitar details with specs and musicians.
