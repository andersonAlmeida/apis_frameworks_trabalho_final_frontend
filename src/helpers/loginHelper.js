const loginHelpers = {
  isLoggedIn(status) {
    if (status === 401) {
      return false;
    }

    return true;
  },
};

export default loginHelpers;
