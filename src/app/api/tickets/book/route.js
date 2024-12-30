import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    // Parse request payload
    const { userId, requiredSeats } = await req.json();
    const numSeats = parseInt(requiredSeats);
    // Validate seat booking request
    if (numSeats > 7) {
      return NextResponse.json(
        { error: "You can only book up to 7 seats at a time." },
        { status: 400 }
      );
    }

    // Fetch available seats from the database
    const { data: availableSeats, error: seatError } = await supabaseClient
      .from("coach_seats")
      .select("seat_number")
      .eq("is_booked", false);

    if (seatError || availableSeats.length < numSeats) {
        return NextResponse.json({ error: "Not enough seats available" }, { status: 400 });
    }

    // Initialize seat layout for internal processing
    const seats = initializeSeatLayout(availableSeats);

    // Attempt to book seats in the most optimal way
    const bookedSeatNumbers = findAndBookSeats(seats, numSeats);

    // Save the booking in the database
    await saveBookingToDatabase(userId, bookedSeatNumbers);

    return NextResponse.json({
      message: `Successfully booked ${numSeats} seats`,
      bookedSeatNumbers,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to book seats" }, { status: 400 });
  }
}

/**
 * Initializes the seat layout as a 2D array representing the seating rows.
 * @param {Array} availableSeats - List of available seat numbers from the database.
 * @returns {Array} A 2D array representing the seating layout with booked and unbooked seats.
 */
const initializeSeatLayout = (availableSeats) => {
  const seats = Array.from({ length: 11 }, () => Array(7).fill(0)).concat([Array(3).fill(0)]);
  const seatNumbers = availableSeats.map((seat) => seat.seat_number).sort((a, b) => a - b);

  for (let i = 1; i <= 80; i++) {
    if (!seatNumbers.includes(i)) {
        if(i % 7 === 0) {
            seats[Math.floor(i / 7) -1][6] = 1;
        } else {
            seats[Math.floor(i / 7)][(i % 7) - 1] = 1;
        }
    }
  }
  return seats;
};

/**
 * Finds and books seats based on the requested number.
 * @param {Array} seats - The current seating layout.
 * @param {number} numSeats - The number of seats to book.
 * @returns {Array} A list of booked seat numbers.
 */
const findAndBookSeats = (seats, numSeats) => {
  const bookedSeatNumbers = [];

  // Try to find consecutive seats in the same row
  for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
    const row = seats[rowIndex];
    const availableSeats = row.filter((seat) => seat === 0).length;

    if (availableSeats >= numSeats) {
      const startIndex = row.indexOf(0);

      for (let i = 0; i < numSeats; i++) {
        row[startIndex + i] = 1;
        bookedSeatNumbers.push(getSeatNumber(seats, rowIndex, startIndex + i));
      }

      return bookedSeatNumbers;
    }
  }

  // If no consecutive seats are found, find the best group of nearby seats
  const allAvailableSeats = getAvailableSeatNumbers(seats);
  const bestGroup = findBestSeatGroup(allAvailableSeats, numSeats);

  // Mark the best group as booked
  bestGroup.forEach((seatNumber) => {
    const { row, col } = getRowColFromSeatNumber(seats, seatNumber);
    seats[row][col] = 1;
    bookedSeatNumbers.push(seatNumber);
  });

  return bookedSeatNumbers;
};

/**
 * Saves the booked seats to the database.
 * @param {string} userId - The ID of the user making the booking.
 * @param {Array} bookedSeats - The list of booked seat numbers.
 */
const saveBookingToDatabase = async (userId, bookedSeats) => {
  const { error: ticketError } = await supabaseClient.from("tickets").insert({
    user_id: userId,
    seats: bookedSeats, // Save as an array
  });

  if (ticketError) throw ticketError;

  const { error: seatUpdateError } = await supabaseClient
    .from("coach_seats")
    .update({ is_booked: true })
    .in("seat_number", bookedSeats);

  if (seatUpdateError) throw seatUpdateError;
};

/**
 * Retrieves a seat number from its row and column indices.
 * @param {Array} seats - The seating layout.
 * @param {number} row - The row index.
 * @param {number} index - The column index.
 * @returns {number} The seat number.
 */
const getSeatNumber = (seats, row, index) =>
  seats.slice(0, row).reduce((sum, r) => sum + r.length, 0) + index + 1;

/**
 * Converts a seat number to its row and column indices.
 * @param {Array} seats - The seating layout.
 * @param {number} seatNumber - The seat number.
 * @returns {Object} An object containing the row and column indices.
 */
const getRowColFromSeatNumber = (seats, seatNumber) => {
  let seatIndex = seatNumber - 1; // Convert to 0-based index
  let row = 0;
  while (seatIndex >= seats[row].length) {
    seatIndex -= seats[row].length;
    row++;
  }
  return { row, col: seatIndex };
};

/**
 * Finds the best group of nearby seats for booking.
 * @param {Array} availableSeats - A list of available seat numbers.
 * @param {number} numSeats - The number of seats to book.
 * @returns {Array} The best group of seat numbers.
 */
const findBestSeatGroup = (availableSeats, numSeats) => {
  const groups = [];
  for (let i = 0; i <= availableSeats.length - numSeats; i++) {
    groups.push(availableSeats.slice(i, i + numSeats));
  }

  const groupDifferences = groups.map((group) => [
    group,
    Math.max(...group) - Math.min(...group),
  ]);

  return groupDifferences.reduce((minGroup, currentGroup) =>
    currentGroup[1] < minGroup[1] ? currentGroup : minGroup
  )[0];
};

/**
 * Retrieves all available seat numbers from the seating layout.
 * @param {Array} seats - The seating layout.
 * @returns {Array} A list of available seat numbers.
 */
const getAvailableSeatNumbers = (seats) =>
  seats
    .flatMap((row, rowIndex) =>
      row.map((seat, colIndex) =>
        seat === 0 ? getSeatNumber(seats, rowIndex, colIndex) : null
      )
    )
    .filter(Boolean);
