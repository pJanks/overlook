import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates'
import './images/turing-logo.png'

// fetch dataset
const getUserData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .catch(() => {
      window.alert('There was an error.')
    })
}

const getRoomData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .catch(() => {
      window.alert('There was an error.')
    })
}

const getBookingData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .catch(() => {
      window.alert('There was an error.')
    })
}

const getData = () => {
  Promise.all([getUserData(), getRoomData(), getBookingData()])
    .then(values => console.log(values))
    .catch((error) => window.alert(`There was an error: ${error}`))
}

  getData()
