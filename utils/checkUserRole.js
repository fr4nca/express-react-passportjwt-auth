module.exports = role => {
  return (req, res, next) => {
    const { user } = req;
    if (role.includes(user.role)) {
      next();
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
  };
};
