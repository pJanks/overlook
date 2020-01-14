import $ from 'jquery';
import Customer from './Customer'

let hotelObj, user, selectedDateAsString;

const domUpdates = {
  validateInputs: () => {
    if ($('.username').val() && $('.password').val()) {
      $('.submitLogin').removeAttr("disabled");
    }
  },

  loadPage: (hotel) => {
    hotelObj = hotel;
    console.log(hotelObj);
    $('body').html(`<header>
      <h1>Motel Trece</h1>
      <h2>Please, log in to proceed</h2>
    </header>
    <section class='login-info'>
      <label for="user-name-input">Username:</label>
      <input class='username login' type="text" placeholder="Input Username" id='user-name-input'>
      <label for="password-input">Password:</label>
      <input class='password login' type="text" placeholder="Input Password" id='password-input'>
      <button class='submitLogin' type="submit" aria-label='Submit user info' disabled='true'>Log In</button>
    </section>`)
    $('.login').keydown(domUpdates.validateInputs)
    $('.submitLogin').click(domUpdates.changePage)
  },

  changePage: () => {
    let userType = $('.username').val().split('r')[0].toLowerCase();
    let userNumber = parseInt($('.username').val().split('r')[1])
    if (userType === 'custome' && $('.password').val() === 'overlook2019') {
      $('body').html(`
      <header class='user-greeting'>
        Hello <span class='user-name'></span>! You have spent <span class='user-spending'></span>
      </header>
      <section class='user-bookings'>
      <h3>Your Bookings:</h3>
      </section>
      <section class='form-holder'>
        <label class='search-bar'>Search for rooms available by date:</label>
        <input class='search-by-date' type="text" placeholder='yyyy/mm/dd'>
        <button class='search-date'>Search</button>
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
        $('.user-bookings').append(`
          <div class='booking'>Date: ${booking.date}, Room: ${booking.roomNumber}, Cost: $${roomCost.costPerNight.toFixed(2)}</div>
        `)
      })
      $('.search-date').on('click', domUpdates.getAvailableRoomsByDate)

    } else if (userType === 'manage' && $('.password').val() === 'overlook2019') {
      $('body').html(`<h1>FuCk YoU</h1>`)
    }
  },

  getAvailableRoomsByDate: () => {
    let i = -1;
    selectedDateAsString = $('.search-by-date').val()
    if ($('.search-by-date').val()) {
      $('.form-holder').html(`
        <label class='filter-bar'>Filter by type of room:</label>
        <input class='filter-by-type' type="text" placeholder='Enter room type here'>
        <button class='filter-type'>Search</button>`)
      $('.user-bookings').text(`Rooms available on ${selectedDateAsString}`)
      user.checkAvailableDates(hotelObj.bookingData.bookings, hotelObj.roomData.rooms, selectedDateAsString, user.date)
      user.availableRoomsByDate.sort((a, b) => {
        return a.number - b.number
      }).forEach(room => {
        i++;
        $('.user-bookings').append(`
          <div class='availableRooms' id='${i}'>Room: ${room.number}, Room Type: ${room.roomType}, Number of Beds: ${room.numBeds}, Bed Size: ${room.bedSize}, Cost: $${room.costPerNight.toFixed(2)} <button class='book-room-button' id='${i}'>Book Now!</button></div>`)

      })
      // $('.book-room-button').(domUpdates.bookARoom())
    }
    $('.book-room-button').click(domUpdates.bookARoom)
  },

  bookARoom: (event) => {
    user.postRoom($(event.target).attr('id'), selectedDateAsString)
  }
}

export default domUpdates;
