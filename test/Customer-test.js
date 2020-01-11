import chai from 'chai';
import Customer from '../src/Customer'
const expect = chai.expect;



describe('Customer', () => {
  let customer, rooms, bookings, date, currentDate, bookingDate, finalDate, newRooms, newBookings;


  beforeEach(() => {
    date = new Date();
    currentDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    finalDate = new Date(currentDate)
    customer = new Customer({
      id: 1,
      name: "Leatha Ullrich",
      currentDate: finalDate,
    })
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
  })
  describe('default properties', () => {
    it('should know the current date', () => {
      let year = customer.date.getFullYear();
      let month, day;
      if ((customer.date.getMonth() + 1) < 10) {
        month = `0${customer.date.getMonth() + 1}`
      }
      if (customer.date.getDate() < 10) {
        day = `0${customer.date.getDate()}`
      } else {
        month = (customer.date.getMonth() + 1);
        day = customer.date.getDate();
      }
      let customerDateAsString = year + "/" + month + "/" + day;
      expect(customer.getCurrentDate()).to.equal(customerDateAsString);
    });

    it('should be an object', () => {
      expect(customer).to.be.a('object');
    });

    it('have an id', () => {
      expect(customer.id).to.equal(1);
    });

    it('should have a name', () => {
      expect(customer.name).to.equal("Leatha Ullrich");
    });

    it('should start with an empty array of customer bookings', () => {
      expect(customer.customerBookings.length).to.equal(0);
    });

    it('should start with an empty arry of unavailable bookings', () => {
      expect(customer.unavailableRoomsByDate.length).to.equal(0);
    });
  });

  describe('customerBookings', () => {
    it('should be able to see all bookings made', () => {
      customer.viewBookings(bookings);
      expect(customer.customerBookings.length).to.equal(3);
    })
  });

  describe('calculateMoneySpent', () => {
    it('should be able to see total cost spent on rooms', () => {
      customer.calculateMoneySpent(bookings, rooms);
      expect(customer.totalMoneySpent).to.equal(358.4)
    })
  })

  describe('checkAvailableDates', () => {
    it('should receive a message if the date has already passed', () => {
      expect(customer.checkAvailableDates(bookings, rooms, '2020/01/04',
        customer.getCurrentDate())).to.equal('That day has already passed')
    })

    it('should keep track of rooms that aren\'t available on a date', () => {
      customer.checkAvailableDates(bookings, rooms, '2020/01/12',
        customer.getCurrentDate())
      expect(customer.unavailableRoomsByDate.length).to.equal(2)
    })

    it('should keep track of rooms that are available on a date', () => {
      customer.checkAvailableDates(bookings, rooms, '2020/01/12',
        customer.getCurrentDate())
      expect(customer.availableRoomsByDate.length).to.equal(3)
    })

    it('should apologize fiercely if there are no available rooms', () => {
      newRooms = [{
        id: "5fwrgu4i7k55hl6t6",
        userID: 1,
        date: "2020/01/12",
        roomNumber: 3,
        roomServiceCharges: []
      }]

      newBookings = [{
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
      }]
      expect(customer.checkAvailableDates(newBookings, newRooms, '2020/01/12',
        customer.getCurrentDate())).to.equal('There are no rooms available for that day! I fierecly apologize!')
    })
  })

  describe('sortRoomByType', () => {
    it('should be able to sort rooms by type', () => {
      expect(customer.sortRoomByType('single room', rooms)).to.deep.equal([{
          number: 3,
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 491.14
        },
        {
          number: 5,
          roomType: "single room",
          bidet: true,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 340.17
        }
      ])
    })

    it('should respond with a message if there are no rooms of that type', () => {
      expect(customer.sortRoomByType('foo', rooms)).to.equal('We do not have that room type. I fiercely apologize!')
    })
  })

  describe('bookRoom', () => {
    it('should allow a user to select an available room', () => {
      customer.checkAvailableDates(bookings, rooms, '2020/01/16',
        customer.getCurrentDate())
      customer.bookRoom(3, "2020/01/16")
      expect(customer.customerBookings.length).to.equal(1)
    })

    it('should not allow a user to select an unavailable room', () => {
      customer.checkAvailableDates(bookings, rooms, '2020/01/12',
        customer.getCurrentDate())
      customer.bookRoom(3, "2020/01/12")
      expect(customer.customerBookings.length).to.equal(0)
    })
  })
})
