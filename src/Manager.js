import Customer from './Customer'
import $ from 'jquery'
let userId, userName, foundUser;


class Manager extends Customer {
  constructor(user) {
    super(user, true)
    this.roomsAvailableToday = []
    this.bookedRoomsToday = [];
    this.customerBookings = []
  }

  checkRoomsAvailableToday(rooms, bookings) {
    bookings.forEach(booking => {
      rooms.forEach(room => {
        if (booking.date === this.date && booking.roomNumber === room.number) {
          this.bookedRoomsToday.push(room)
        }
      })
    })
    bookings.forEach(booking => {
      rooms.forEach(room => {
        if (booking.date !== this.date && booking.roomNumber === room.number && !this.roomsAvailableToday.includes(room) && !this.bookedRoomsToday.includes(room)) {
          this.roomsAvailableToday.push(room)
        }
      })
    })
  }

  findBookingsByUser(rooms, bookings, users, user) {
    foundUser = users.find(person => {
      return person.name.toLowerCase() === user.toLowerCase()
    })
    if (foundUser) {
      userId = foundUser.id;
      userName = foundUser.name;
      bookings.forEach(booking => {
        if (userId === booking.userID && !this.customerBookings.includes(booking)) {
          this.customerBookings.push(booking);
        }
      })
    }
    return foundUser
  }

  deleteCustomerBookingWithNumber(i) {
    $(`#${i}`).html('')
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: parseInt($(event.target).attr('data-id'))
        })
    })
  }

  deleteCustomerBookingWithString(i) {
    $(`#${i}`).html('')
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: $(event.target).attr('data-id')
        })
    })
  }

  seeTodaysRevenue(rooms, bookings) {
    return bookings.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (booking.date === this.date && booking.roomNumber === room.number) {
          acc += room.costPerNight
        }
      })
      return acc;
    }, 0)
  }

  getOccupiedPercentage(rooms) {
    return (this.unavailableRoomsByDate.length / rooms.length) * 100
  }
}

export default Manager;
