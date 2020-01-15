import chai from 'chai';
import Hotel from '../src/Hotel'
const expect = chai.expect;



describe('Hotel', () => {
  let hotel, customers, rooms, bookings;


  beforeEach(() => {
    customers = [{
      id: 1,
      name: "Leatha Ullrich",
    },
    {
      id: 2,
      name: "foo",
    },
    {
      id: 3,
      name: "bar",
    }
    ]
    rooms = [{
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    },
    {
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    },
    {
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
    },
    {
      number: 4,
      roomType: "junior suite",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 429.44
    },
    {
      number: 5,
      roomType: "single room",
      bidet: true,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 340.17
    }
    ]

    bookings = [{
      id: "5fwrgu4i7k55hl6sz",
      userID: 1,
      date: "2020/01/04",
      roomNumber: 1,
      roomServiceCharges: []
    },
    {
      id: "5fwrgu4i7k55hl6t5",
      userID: 43,
      date: "2020/01/24",
      roomNumber: 2,
      roomServiceCharges: []
    },
    {
      id: "5fwrgu4i7k55hl6t6",
      userID: 1,
      date: "2020/01/12",
      roomNumber: 3,
      roomServiceCharges: []
    },
    {
      id: "5fwrgu4i7k55hl6t7",
      userID: 1,
      date: "2020/02/16",
      roomNumber: 4,
      roomServiceCharges: []
    },
    {
      id: "5fwrgu4i7k55hl6t8",
      userID: 14,
      date: "2020/02/05",
      roomNumber: 5,
      roomServiceCharges: []
    }
    ]
    hotel = new Hotel(customers, rooms, bookings)
  })

  describe('default properties', () => {

    it('should have a user array', () => {
      expect(hotel.users.length).to.equal(3);
    })

    it('should have a rooms array', () => {
      expect(hotel.roomData.length).to.equal(5);
    })

    it('should have a bookings array', () => {
      expect(hotel.bookingData.length).to.equal(5);
    })
  })
})
