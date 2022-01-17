const formChangePassword = document.getElementById('form-change-password');

formChangePassword.addEventListener('submit', async event => {
  event.preventDefault();

  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmedPassword = document.getElementById('confirmed-password').value;

  try {
    if (newPassword === confirmedPassword) {
      const checkPasswordUrl = '/users/checkPassword';

      const checkPasswordRes = await fetch(checkPasswordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword
        })
      });

      const { msg: checkPasswordMsg } = await checkPasswordRes.json();

      if (checkPasswordMsg === 'success') {
        const changePasswordUrl = '/users/changePassword';
        const changePasswordRes = await fetch(changePasswordUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmedPassword
          })
        });

        const { msg: changePasswordMsg } = await changePasswordRes.json();

        if (changePasswordMsg === 'success') {
          history.back();
        }
        else {
          location.reload();
        }

      } else {
        throw new Error('Incorrect current password');
      }
    } else {
      throw new Error('Password not matches');
    }
  } catch (e) {
    const errorPane = document.getElementById('error-pane');

    errorPane.firstElementChild.innerText = e.message;
  }
});