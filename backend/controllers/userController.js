import User from "../models/User.js";


// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    res.status(200).json({ succes: true, message: 'user updated', data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'failed to update' });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ succes: true, message: 'user deleted' });
  } catch (error) {
    res.status(500).json({ message: 'failed to delete user' });
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({ succes: true, message: 'successfull', data: user });
  } catch (error) {
    res.status(404).json({ message: 'user not found' });
  }
};

// get single user
export const getAllUsers = async (req, res) => {
 
  try {
    const user = await User.find().select("-password");

    res.status(200).json({ succes: true, message: 'successfull', data: user });
  } catch (error) {
    res.status(404).json({ message: ' not found' });
  }
};
