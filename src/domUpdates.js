import $ from 'jquery';

const domUpdates = {
  validateInputs: () => {
    if ($('.username').val() && $('.password').val()) {
      $('.submitLogin').removeAttr("disabled");
    }
  },

  loadPage: (hotel) => {
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
    console.log(hotel);
  },


}

export default domUpdates;
