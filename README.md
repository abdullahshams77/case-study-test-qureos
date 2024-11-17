# Habit Tracking Application

This repository is organized into two main folders: 

- **frontend**: Contains the code for the user interface and client-side logic.  
- **backend**: Contains the code for server-side logic and API implementation.

---

## Frontend

The frontend of the application is built using the following technologies:  

- **PrimeReact**: UI library for creating beautiful and responsive components.  
- **NEXT.js**: Framework for server-side rendering and static site generation.  
- **SWR**: Used for efficient and lightweight data fetching.  
- **Redux and Middleware**: State management and handling of efficient data posting and processing.

---

## Backend

The backend of the application is built using the following technologies and concepts:  

- **NestJS**: Framework for building scalable and efficient server-side applications.  
- **Nest Middleware**: Used to parse the `userId` from headers and pass it to every controller for consistent user context.  
- **Nest Interceptor**: Handles generic responses and request DTOs for streamlined API communication.  
- **MongoDB**: Database for managing persistent storage.

---

## Application Workflow

1. **User Registration**:  
   - The user provides their email address, which creates a user in the system.  

2. **Habit Management**:  
   - Users can create, update, archive habits, and mark them as completed for the day.  

3. **Streak Tracking**:  
   - The application calculates and displays the streak count for each habit based on consecutive completions.  

4. **Filtering and Sorting**:  
   - Users can filter habits by:
     - **Title**  
     - **Past week**
   - Sorting options are available for:
     - **Creation Date**  
     - **Streak**  
     - **Priority**
