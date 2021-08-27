const isGuestUser = (user) => {
  if (user.created_at === undefined || user.id === undefined) {
    return true;
  }
  return false;
};

export default isGuestUser;
