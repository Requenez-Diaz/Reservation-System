import React from 'react';
import { saveRoom } from '../../actions/rooms/save';
import { bookingsForms } from '@/app/actions/bookings/booking';

export default async function addRooms() {
  return (
    <form action={saveRoom}>
      <div className="bg-gray">
        <label htmlFor="number">Number</label>
        <input type="text" id="number" name="number" />
      </div>

      <div>
        <label htmlFor="description"></label>
        <input type="text" id="description" name="description" />
      </div>

      <div>
        <label htmlFor="price"></label>
        <input type="text" id="price" name="price" />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
