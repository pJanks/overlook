import chai from 'chai';
import Manager from '../src/Manager'
const expect = chai.expect;


describe('Manager', () => {
  let manager, rooms, bookings, date, currentDate, bookingDate, finalDate,
    newRooms, newBookings;


  beforeEach(() => {
    date = new Date();
    currentDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" +
    date.getDate();
    finalDate = new Date(currentDate)

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
      date: "2020/01/19",
      roomNumber: 3,
      roomServiceCharges: []
    },
    {
      id: "5fwrgu4i7k55hl6t7",
      userID: 1,
      date: "2020/01/18",
      roomNumber: 4,
      roomServiceCharges: []
    },
    {
      id: "5fwrgu4i7k55hl6t8",
      userID: 14,
      date: "2020/01/18",
      roomNumber: 5,
      roomServiceCharges: []
    }
    ]
    manager = new Manager({
      id: 51,
      name: 'Johnny',
      currentDate: '2020/01/18'
    }, true)
  })

  it('should be able to see total rooms available today', () => {
    manager.checkRoomsAvailableToday(rooms, bookings)
    expect(manager.roomsAvailableToday.length).to.equal(3)
  })

  it('should get the daily total revenue', () => {
    expect(manager.seeTodaysRevenue(rooms, bookings)).to.equal((429.44 +
      340.17))
  })

  it('should be able to get a percentage of rooms booked', () => {
    manager.checkAvailableDates(bookings, rooms, '2020/01/19',
      manager.date)
    expect(manager.getOccupiedPercentage(rooms, bookings)).to.equal(20);
  })
});
