const Room = (mongoose) => {
  mongoose.model("Room", { users: [{ id: String }] });
};

module.exports = { Room };
