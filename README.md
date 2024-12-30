# Booking System API

This project implements a seat booking system with the ability to reserve multiple seats at once, ensuring efficient booking and grouping of adjacent seats. It uses modern tools and a clean architecture for handling seat reservations and database interactions.

---

## Tech Stack

### Backend:
- **Next.js**: Framework for building the server-side API endpoints.
- **Supabase**: Backend-as-a-service platform for database management and authentication.

### Database:
- **PostgreSQL**: Database managed by Supabase, storing user, ticket, and seat information.

### Language:
- **JavaScript/Node.js**: For implementing backend logic and API endpoints.

### Libraries:
- **Supabase Client**: For interacting with the Supabase database.
- **NextResponse**: To handle API responses in Next.js.
- **Stytch**: For user authentication and management.

---

## Prerequisites

Before running this project, ensure you have the following installed on your local system:
- **Node.js** (>= 14.x)
- **npm** or **yarn**
- A Supabase project set up with the required database schema.

---

## Database Schema

### `coach_seats` Table
| Column       | Type    | Description                       |
|--------------|---------|-----------------------------------|
| `seat_number`| Integer | Unique seat number for each seat |
| `is_booked`  | Boolean | Status of the seat (booked/free) |

### `tickets` Table
| Column    | Type    | Description                      |
|-----------|---------|----------------------------------|
| `pnr`     | String  | Unique identifier for the ticket |
| `user_id` | String  | ID of the user who booked        |
| `seats`   | Array   | Array of seat numbers booked     |

### `users` Table
| Column    | Type    | Description                      |
|-----------|---------|----------------------------------|
| `id`      | String  | Unique identifier for the user   |
| `email`   | String  | Email id of the user             |
| `name`    | String  | Name of the user                 |

---

## Setup and Running Locally

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the root of your project and add the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=<Your Supabase URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Your Supabase Public Anon Key>
```
These values can be found in your Supabase project settings.

### Step 4: Start the Development Server
```bash
npm run dev
# or
yarn dev
```
The server will run on `http://localhost:3000` by default.

---

## Notes
- Ensure the database schema matches the provided structure.
- Supabase configuration is crucial for proper API functionality.

---

## Future Improvements
- Add user authentication and role-based access control.
- Implement additional validation and seat locking mechanisms for better concurrency handling.
- Build a frontend for users to visualize and book seats interactively.

---

## License
This project is licensed under the [MIT License](LICENSE).

