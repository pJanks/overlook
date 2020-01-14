import Customer from './Customer'
class Manager extends Customer {
  constructor(user) {
    super(user, true)
    this.roomsAvailableToday = []

  }

  checkRoomsAvailableToday(rooms, bookings) {
    bookings.forEach(booking => {
      rooms.forEach(room => {
        if (booking.date !== this.date && booking.roomNumber === room.number && !this.roomsAvailableToday.includes(room)) {
          this.roomsAvailableToday.push(room)
        }
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
