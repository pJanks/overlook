// import Booking from './Booking'
import $ from 'jquery'
class Customer {
  constructor(user, isManager = false) {
    this.id = user.id;
    this.name = user.name;
    this.customerBookings = [];
    this.date = user.currentDate;
    this.unavailableRoomsByDate = []
    this.isManager = isManager;

  }

  getCurrentDate() {
    let firstDate = new Date();
    let finalDate = new Date(firstDate);
    let year = finalDate.getFullYear();
    let month, day;
    if ((finalDate.getMonth() + 1) < 10) {
      month = `0${finalDate.getMonth() + 1}`
    } else {
      month = finalDate.getMonth() + 1
    }
    if (finalDate.getDate() < 10) {
      day = `0${finalDate.getDate()}`
    } else {
      day = finalDate.getDate();
    }
    this.date = year + "/" + month + "/" + day;
    return year + "/" + month + "/" + day;
  }

  viewBookings(allBookings) {
    allBookings.forEach(booking => {
      if (this.id === booking.userID) {
        this.customerBookings.push(booking);
      }
    })
  }

  calculateMoneySpent(rooms) {
    this.totalMoneySpent = this.customerBookings.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
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
    if (Math.abs(today) > Math.abs(selectedDate)) {
      return 'That day has already passed'
    } else {
      this.availableRoomsByDate = bookings.reduce((acc, booking) => {
        rooms.forEach(room => {
          if (room.number === booking.roomNumber && booking.date === bookingDateAsString && !this.unavailableRoomsByDate.includes(room)) {
            this.unavailableRoomsByDate.push(room)
          } else if (booking.date !== bookingDateAsString && booking.roomNumber === room.number && !acc.includes(room) && !this.unavailableRoomsByDate.includes(room)) {
            acc.push(room)
          }
        })
        return acc;
      }, []);
      this.availableRoomsByDate = this.availableRoomsByDate.reduce((acc, availableRoom) => {
        bookings.forEach(booking => {
          if (booking.roomNumber === availableRoom.number && booking.date !== bookingDateAsString && ((Math.abs(today) - Math.abs(new Date(booking.date))) < 1) && !acc.includes(availableRoom) && !this.unavailableRoomsByDate.includes(availableRoom)) {
            acc.push(availableRoom)
          }
        })
        return acc
      }, [])
    }
    if (!this.availableRoomsByDate.length) {
      return 'There are no rooms available for that day! I fierecly apologize!'
    }
  }

  bookRoom(roomNumber) {
    this.availableRoomsByDate.forEach(room => {
      if (room.number === roomNumber) {
        this.customerBookings.push(room);
      }
    })
  }

  postRoom(i, dateAsString, foundUser) {
    $(`#${i}`).html('')
    if (this.id !== 51) {
      return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: parseInt(this.id),
          date: dateAsString,
          roomNumber: parseInt(this.availableRoomsByDate[i].number)
        })
      })
    } else {
      return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: parseInt(foundUser.id),
          date: dateAsString,
          roomNumber: parseInt(this.availableRoomsByDate[i].number)
        })
      })
    }
  }
}

export default Customer;
