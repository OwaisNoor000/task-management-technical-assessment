# To Do Application

## Table of Contents

- [Overview](#overview)  
- [Video Demo](#video-demo)  
- [Application Architecture](#application-architecture)  
- [Functionality](#functionality)  
- [Routes](#routes)  
- [Query Params](#query-params)  
- [JWT Payload](#jwt-payload)  
- [Strengths of my system](#strengths-of-my-system)  
- [Weaknesses of my system](#weaknesses-of-my-system)  
- [Steps to run the application](#steps-to-run-the-application)
- [Scripts to run](#scripts)
- [Contact Info](#contact-info)


## Overview

I built a To Do application as you instructed using the following technologies:

1. NodeJS + ExpressJS  
2. TypeScript  
3. Postgres SQL  
4. Tailwind CSS  
5. Tanstack Query and Axios  

## Video Demo

[Watch the demo on YouTube](https://youtu.be/aKRIMIGHBD8)

## Application Architecture

I have a surprise for you here!  
This is my architecture:

**Backend:**  
Database Layer (Model) <--> Service Layer (DTO) <--> Controller Layer (SCHEMA) <--> Routes (SCHEMA) <--> Middleware ---> Req/Res

Did you notice anything new?  
I hope you did! I added an extra Database layer to enhance the application scalability.

You can find each respective layer in the following folders:

- Database Layer - `backend/src/daos`  
- Service Layer - `backend/src/services`  
- Controller Layer - `backend/src/controllers`  
- Routes - `backend/src/routes`  
- Middleware - `backend/src/middleware`  

As for the data objects passed between each layer, I would like to define each of them:

- **Model** - A TypeScript class mapping class methods to DB columns  
- **DTO** - A TypeScript interface to define the structure of a request/response  
- **SCHEMA** - A Zod schema to validate requests in the ReqValMiddleware. Identical to DTOs with extra validation  

You can find all the data objects in the following folders:  
`backend/src/models` and `backend/src/type`

## Functionality

Here is what my system can do:

- Login and Register Users  
- CRUD tasks  
- Filter and Sort  
- Pagination (only for backend, ran out of time)  

## Routes

My application consists of the following API endpoints:

- `POST /api/auth/register` - User registration  
- `POST /api/auth/login` - User login  
- `GET /api/auth/profile` - Get current user profile (protected)  

- `GET /api/tasks` - Get user's tasks (protected)  
- `POST /api/tasks` - Create new task (protected)  
- `PUT /api/tasks/:id` - Update task (protected)  

Oops, I didn't implement a delete route. Oh well, I hope the rest of my application makes up for it!

## Query Params

This is my favorite part because of how well designed it is (in my opinion).  
I have added query parameters to my GET tasks route with the following features:

- Filtering - `?status=complete&priority=high`  
- Sorting - `?sortBy=status&sortOrder=Ascending`  
- Pagination - `?page=2&pageSize=10`  

## JWT Payload

The JWT authentication flow is as follows:

1. `/api/register` creates a route and sends a JWT token in its request  
2. Frontend retrieves JWT token from request and stores it in localStorage  
3. Frontend uses JWT token in Authorization Header of requests for protected routes  
4. Backend validates JWT token and retrieves userID to use in SQL queries  

## Strengths of my system

My system (especially the backend) has been optimized for scalability and robustness.  
I designed the system with the goal of changing minimal lines of code to make a change.  
Everything has a type and is validated.  
Not to mention, the application has been divided into 5 major layers each with its own purpose.

## Weaknesses of my system

Okay, let me try to be unbiased, even if this is my baby :-(

- I hardcoded all my colors  
- My UI is ugly. I designed all my elements from scratch (could have used a component library to be consistent)  
- I could have packed all my Tanstack queries into a separate file  

## Steps to run the application

1. Download the repository  
2. `cd frontend` and run `npm install`  
3. `cd backend` and run `npm install`  
4. Run the scripts provided in the scripts folder  
5. Add a `.env` file (example provided), add your JWT secret and DB connection string  
6. Run the frontend server using `cd frontend && npm run dev`  
7. Run the backend server using `cd backend && npm run dev`  

## Scripts to run
```
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


## Contact Info

If you want to reach me, here is my contact information:  

- Email: mowaisnoor000@gmailcom.com  
- LinkedIn: [https://www.linkedin.com/in/mohammad-owais-502a48221/]([https://www.linkedin.com/in/mohammad-owais-502a48221/])  
