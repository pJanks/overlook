// import Booking from './Booking'

class Customer {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.customerBookings = [];
    this.date = user.currentDate;
    this.unavailableRoomsByDate = []
  }

  getCurrentDate() {
    let firstDate = new Date();
    let finalDate = new Date(firstDate)
    let year = finalDate.getFullYear();
    let month, day;
    if ((finalDate.getMonth() + 1) < 10) {
      month = `0${finalDate.getMonth() + 1}`
    }
    if (finalDate.getDate() < 10) {
      day = `0${finalDate.getDate()}`
    } else {
      month = (finalDate.getMonth() + 1);
      day = finalDate.getDate();
    }
    return year + "/" + month + "/" + day;
  }

  viewBookings(allBookings) {
    allBookings.forEach(booking => {
      if (this.id === booking.userID) {
        this.customerBookings.push(booking);
      }
    })
  }

  calculateMoneySpent(bookings, rooms) {
    let bookingDate;
    this.totalMoneySpent = rooms.reduce((acc, room) => {
      bookings.forEach(booking => {
        bookingDate = new Date(booking.date);
        if (room.number === booking.roomNumber && (Math.abs(this.date) -
            Math.abs(bookingDate)) >= 0 && this.id === booking.userID) {
          acc += room.costPerNight
        }
      })
      return acc;
    }, 0)
  }

  sortRoomByType(roomType, rooms) {
    let sortedRooms = rooms.filter(room => {
      return room.roomType === roomType
    })
    if (sortedRooms.length) {
      return sortedRooms
    } else {
      return 'We do not have that room type. I fiercely apologize!'
    }
  }

  checkAvailableDates(bookings, rooms, bookingDateAsString, todayAsString) {
    let index;
    let selectedDate = new Date(bookingDateAsString);
    let today = new Date(todayAsString)
    if (Math.abs(today) >= Math.abs(selectedDate)) {
      return 'That day has already passed'
    } else {
      this.availableRoomsByDate = bookings.reduce((acc, booking) => {
        rooms.forEach(room => {
          if (room.number === booking.roomNumber && booking.date === bookingDateAsString && !this.unavailableRoomsByDate.includes(room)) {
            this.unavailableRoomsByDate.push(room)
          } else if (booking.date !== bookingDateAsString && booking.roomNumber === room.number && !acc.includes(room)) {
            acc.push(room)
          }
        })
        return acc;
      }, []);
      this.availableRoomsByDate = this.availableRoomsByDate.reduce((acc, availableRoom) => {
        bookings.forEach(booking => {
          if (booking.roomNumber === availableRoom.number && ((Math.abs(today) - Math.abs(new Date(booking.date))) < 1)) {
            acc.push(availableRoom)
          } else if (booking.roomNumber === availableRoom.number && ((Math.abs(today) - Math.abs(new Date(booking.date))) > 1)) {
            this.unavailableRoomsByDate.push(availableRoom)
          }
        })
        return acc
      }, [])
      if (!this.availableRoomsByDate.length) {
        return 'There are no rooms available for that day! I fierecly apologize!'
      }
    }
  }

  bookRoom(roomNumber, date) {
    this.availableRoomsByDate.forEach(room => {
      if (room.number === roomNumber) {
        this.customerBookings.push(room)
        return 'Your room was booked!'
      }
    })
  }
}

export default Customer;
