import $ from 'jquery';
import Customer from './Customer'
import Manager from './Manager'

let hotelObj, user, selectedDateAsString, foundUser;

const domUpdates = {
  validateInputs: () => {
    if ($('.username').val() && $('.password').val()) {
      $('.submit-login').removeAttr("disabled");
    }
  },

  loadPage: (hotel) => {
    hotelObj = hotel;
    $('body').html(`<header>
      <h1>Welcome to Motel 16!</h1>
      <h2>Please, log in to proceed.</h2>
    </header>
    <section class='login-info'>
    <div class='username-info'
      <label for="user-name-input">Username:</label>
      <input aria-label='Username input' class='username login' type="text" placeholder="Input Username" id='user-name-input'>
    </div>
    <div class='password-info'
      <label for="password-input">Password:</label>
      <input aria-label='Password input' class='password login' type="password" placeholder="Input Password" id='password-input'>
    </div>
      <button class='submit-login' type="submit" aria-label='Submit user info' disabled='true'>Log In</button>
    </section>`)
    $('.login').keydown(domUpdates.validateInputs)
    $('.submit-login').click(domUpdates.changePage)
  },

  changePage: () => {
    let userType = $('.username').val().split('r')[0].toLowerCase();
    let userNumber = parseInt($('.username').val().split('r')[1])
    if (userType === 'custome' && $('.password').val() === 'overlook2019') {
      $('body').html(`
      <header>
        <h2>Hello <span class='user-name'></span>! You have spent <span class='user-spending'></span> with us so far.</h2>
      </header>
      <section class='user-content'>
        <section class='bookings'>
          <h3>Your Bookings:</h3>
        </section>
        <section class='form-holder'>
          <label class='search-bar'>Search for rooms available by date:</label>
          <input class='search-by-date' type="text" placeholder='yyyy/mm/dd'>
          <button class='search-date'>Search</button>
        </section>
      </section>`)
      let currentUser = hotelObj.users.users.find(user => {
        return user.id === userNumber
      })
      user = new Customer(currentUser)
      user.date = user.getCurrentDate()
      user.viewBookings(hotelObj.bookingData.bookings)
      user.calculateMoneySpent(hotelObj.roomData.rooms)
      $('.user-name').text(`${currentUser.name}`);
      $('.user-spending').text(`$${user.totalMoneySpent.toFixed(2)}`)
      user.customerBookings.forEach(booking => {
        let roomCost = hotelObj.roomData.rooms.find(room => {
          if (room.number === booking.roomNumber) {
            return room
          }
        })
        $('.bookings').append(`
          <div class='booking'>Date: ${booking.date}, Room: ${booking.roomNumber}, Cost: $${roomCost.costPerNight.toFixed(2)}</div>
        `)
      })
      $('.search-date').on('click', domUpdates.getAvailableRoomsByDate)
    } else if (userType === 'manage' && $('.password').val() === 'overlook2019') {
      user = new Manager({
        id: 51,
        name: 'Johnny Cassidy'
      }, true)
      user.getCurrentDate()
      user.checkRoomsAvailableToday(hotelObj.roomData.rooms,
        hotelObj.bookingData.bookings)
      $('body').html(`<header class='user-greeting'>
        <h1>Hello! Our occupancy today is <span class='occupancy'>${((user.bookedRoomsToday.length / 25) * 100).toFixed(2)}%</span> and total revenue is <span class'revenue'>$${user.seeTodaysRevenue(hotelObj.roomData.rooms, hotelObj.bookingData.bookings).toFixed(2)}</span>.</h1>
      </header>
      <section class='user-content'>
        <section class='bookings'>
          <h3>Bookings Today, ${user.date}:</h3>
        </section>
        <section class='form-holder'>
          <label class='search-user-bar'>Search for users by name:</label>
          <input class='search-by-user' type="text" placeholder='Enter a user's name'>
          <button class='search-user'>Search</button>
        </section>
      </section>`)
      user.roomsAvailableToday.sort((a, b) => {
        return a.number - b.number
      })
      user.roomsAvailableToday.forEach(room => {
        $('.bookings').append(`
          <div class='booking'>Room: ${room.number}, Cost: $${room.costPerNight.toFixed(2)}</div>
          `)
      })
    }
    $('.search-user').on('click', domUpdates.displayUser)
  },

  displayUser: () => {
    let i = -1
    if ($('.search-by-user').val()) {
      let enteredName = $('.search-by-user').val()
      foundUser = user.findBookingsByUser(hotelObj.roomData.rooms,
        hotelObj.bookingData.bookings, hotelObj.users.users, enteredName)
      if (user.customerBookings.length) {
        let userCost = hotelObj.roomData.rooms.reduce((acc, room) => {
          user.customerBookings.forEach(booking => {
            if (room.number === booking.roomNumber) {
              acc += room.costPerNight
            }
          })
          return acc
        }, 0)
        $('.bookings').html('');
        $('.bookings').html(`${enteredName} has spent $${userCost.toFixed(2)} on these bookings: `);
        user.customerBookings.forEach(booking => {
          i++
          if (Math.abs(new Date(booking.date)) < Math.abs(new Date(user.date))) {
            $('.bookings').append(`
            <div class='each-booked-room booking' data-id='${booking.id}' id='${i}'>Date: ${booking.date}, Room: ${booking.roomNumber} <button class='delete-booking' data-id='${booking.id}' disabled='true' id='${i}'>Delete Booking</booking></div>
            `)
          } else {
            $('.bookings').append(`
            <div class='each-booked-room booking' data-id='${booking.id}' id='${i}'>Date: ${booking.date}, Room: ${booking.roomNumber} <button class='delete-booking' data-id='${booking.id}' id='${i}'>Delete Booking</booking></div>
            `)
          }
          $('.form-holder').html(`
              <label class='search-bar'>Search for rooms available by date:</label>
              <input class='search-by-date' type="text" placeholder='yyyy/mm/dd'>
              <button class='search-date'>Search</button>`)
        })
      }
      $('.search-date').on('click', domUpdates.getAvailableRoomsByDate)
      $('.delete-booking').on('click', domUpdates.deleteBooking)
    }
  },

  deleteBooking: () => {
    user.deleteCustomerBookingWithNumber($(event.target).attr('id'));
    user.deleteCustomerBookingWithString($(event.target).attr('id'));

  },

  getAvailableRoomsByDate: () => {
    let i = -1;
    selectedDateAsString = $('.search-by-date').val()
    user.checkAvailableDates(hotelObj.bookingData.bookings,
      hotelObj.roomData.rooms, selectedDateAsString, user.date)
    if ($('.search-by-date').val() && user.availableRoomsByDate) {
      $('.form-holder').html(`
        <label class='filter-bar'>Filter by type of room:</label>
          <input class='filter-input' type="text" placeholder="Enter room type and press enter">
        `)
      $('.bookings').text(`Rooms available on ${selectedDateAsString}`)
      user.availableRoomsByDate.sort((a, b) => {
        return a.number - b.number
      }).forEach(room => {
        i++;
        $('.bookings').append(`
          <div class='availableRooms' id='${i}'>Room: ${room.number}, Room Type: ${room.roomType}, Number of Beds: ${room.numBeds}, Bed Size: ${room.bedSize}, Cost: $${room.costPerNight.toFixed(2)} <button class='book-room-button' id='${i}'>Book Now!</button></div>`)
      })
      $('.filter-input').on('keydown', domUpdates.filterRoomsByType)
    } else {
      window.alert('There are no rooms available for that day! I fierecly apologize!');
      return 'There are no rooms available for that day! I fierecly apologize!'
    }
    $('.book-room-button').click(domUpdates.bookARoom)
  },

  bookARoom: (event) => {
    user.postRoom($(event.target).attr('id'), selectedDateAsString, foundUser);
    user.bookRoom(event.target.number);
  },

  filterRoomsByType: () => {
    if ($('.filter-input').val()) {
      $('.bookings').text('');
      user.availableRoomsByDate.forEach(room => {
        if (room.roomType.toLowerCase() === $('.filter-input').val().toLowerCase()) {
          $('.bookings').append(`
            <div class='availableRooms'>Room: ${room.number}, Room Type: ${room.roomType}, Number of Beds: ${room.numBeds}, Bed Size: ${room.bedSize}, Cost: $${room.costPerNight.toFixed(2)} <button class='book-room-button'>Book Now!</button></div>`)
        }
      })
    }
  },
}

export default domUpdates;
