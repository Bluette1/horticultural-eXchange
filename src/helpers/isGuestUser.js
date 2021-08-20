const isGuestUser = (user) => {
  if (user.created_at === null || user.id === null) {
    return true;
  }
  return false;
};

export default isGuestUser;
