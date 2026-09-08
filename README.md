# ICT Service Request System

This is a web application for managing service requests in an ICT (Information and Communications Technology) department. Users can create, edit, delete, and track service requests with different statuses and priorities.

## What It Does

The system lets you:
- **Create service requests** - Submit new requests with details about what you need
- **View all requests** - See all requests in a table with information like requester name, department, category, priority, and status
- **Edit requests** - Update existing requests if something changes
- **Delete requests** - Remove requests you no longer need
- **Search and filter** - Find requests quickly by searching the requester name or description, filtering by status or priority
- **Dashboard** - See a quick overview with total, pending, in progress, and completed requests
- **Login system** - Each user has their own account so they can only see and manage their own requests

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend/Database:** Supabase (a Firebase alternative)
- **Authentication:** Supabase Auth

## Files Breakdown

### HTML Files
- **index.html** - Main dashboard page where you can create, view, and manage requests
- **login.html** - Login page where users enter their email and password

### JavaScript Files
- **js/app.js** - Main application logic for creating, editing, deleting, and displaying requests
- **js/auth.js** - Handles login functionality
- **js/supabase.js** - Supabase configuration and client setup

### CSS
- **css/style.css** - All the styling for the website

## Features

### Dashboard
Shows 4 cards with stats:
- Total number of requests
- Number of pending requests
- Number of in progress requests
- Number of completed requests

### Service Request Form
When you create or edit a request, you fill in:
- **Requester Name** - Your name
- **Department** - Which department you're from
- **Category** - What type of problem (Computer Repair, Software Installation, Network Problem, etc.)
- **Description** - Details about what you need
- **Priority** - How urgent it is (Low, Medium, High)
- **Status** - Current state (Pending, In Progress, Completed)

### Search and Filter
- Search by requester name or description
- Filter by status (All, Pending, In Progress, Completed)
- Filter by priority (All, Low, Medium, High)

## How to Use

1. Go to login.html and enter your email and password
2. Once logged in, you're taken to the dashboard
3. Fill out the service request form to create a new request
4. Your request appears in the table below
5. Click "Edit" to update a request
6. Click "Delete" to remove a request
7. Use the search bar and filters to find requests
8. Click "Logout" when you're done

## Database Structure

The app uses a Supabase table called "service_requests" with these fields:
- id - Request ID
- requester_name - Name of person making the request
- department - Department
- category - Type of request
- description - Details
- priority - Urgency level
- status - Current status
- created_at - When the request was made
- user_id - ID of the user who created it

## Security Notes

- Each user only sees their own requests (checked with user_id)
- Passwords are managed by Supabase Auth
- HTML special characters are escaped to prevent security issues
- Users must be logged in to access the main app

## How Everything Works

When you load the app:
1. JavaScript checks if you're logged in
2. If not, you get sent to the login page
3. Once logged in, it loads all your service requests from Supabase
4. The requests display in a table
5. The dashboard updates with stats
6. You can then create, edit, delete, or search for requests

All changes are saved to Supabase immediately, so if you close and reopen the app, all your data is still there.


