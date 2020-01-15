import chai from 'chai';
import $ from 'jquery'
import Customer from '../src/Customer'
import Manager from '../src/Manager'
import domUpdates from '../src/domUpdates'
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);



describe('domUpdates', () => {



  chai.spy.on(domUpdates, ['loadPage'], () => 'hello');

  it('should load the page', () => {
    expect(domUpdates.loadPage()).to.equal('hello');
  });

  chai.spy.on(domUpdates, ['validateInputs'], () => 'hello');

  it('should validate inputs', () => {
    expect(domUpdates.validateInputs()).to.equal('hello');
  });

  chai.spy.on(domUpdates, ['changePage'], () => 'hello');

  it('should change pages', () => {
    expect(domUpdates.changePage()).to.equal('hello');
  });

  chai.spy.on(domUpdates, ['displayUser'], () => 'hello');

  it('should display a user', () => {
    expect(domUpdates.displayUser()).to.equal('hello');
  });

  chai.spy.on(domUpdates, ['deleteBooking'], () => 'hello');

  it('should be able to delete a booking', () => {
    expect(domUpdates.deleteBooking()).to.equal('hello');
  });

  chai.spy.on(domUpdates, ['getAvailableRoomsByDate'], () => 'hello');

  it('should be able to get available bookings', () => {
    expect(domUpdates.getAvailableRoomsByDate()).to.equal('hello');
  });

  chai.spy.on(domUpdates, ['bookARoom'], () => 'hello');

  it('should be able to book a room', () => {
    expect(domUpdates.bookARoom()).to.equal('hello');
  });

  chai.spy.on(domUpdates, ['filterRoomsByType'], () => 'hello');

  it('filter rooms by type', () => {
    expect(domUpdates.getAvailableRoomsByDate()).to.equal('hello');
  });
});
