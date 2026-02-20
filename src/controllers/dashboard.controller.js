import User from "../models/user.model.js";
import Inquiry from "../models/inquiry.model.js";
import Contact from "../models/contact.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const totalContacts = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalInquiries,
        totalContacts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};
