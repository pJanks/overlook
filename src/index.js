import './css/base.scss';
import domUpdates from './domUpdates'
import Hotel from './Hotel'
import './images/turing-logo.png'

// fetch dataset

const getUserData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .catch((error) => window.alert(`There was an error: ${error}.`))
}

const getRoomData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .catch((error) => window.alert(`There was an error: ${error}.`))
}

const getBookingData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .catch((error) => window.alert(`There was an error: ${error}.`))
}

const getData = () => {
  Promise.all([getUserData(), getRoomData(), getBookingData()])
    .then(values => {
      let hotel = new Hotel(values[0], values[1], values[2])
      domUpdates.loadPage(hotel);

    })
    .catch((error) => window.alert(`There was an error: ${error}.`))
}


getData()


export default getData;
