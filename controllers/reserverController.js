const Reserve = require("../models/reserve");
const sendEmail = require("../utilis/sendEmail")

const postReserve = async (req, res) => {
  try {
    const newReserve = new Reserve({
      ...req.body
    });
    await newReserve.save();
    res.status(201).json({ message: "Car reserved successfully", reserve: newReserve });
  }
  catch (error) {
    console.error("Error reserving car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getReserves = async (req, res) => {
  try {
    const email = req.query.email;

    let reserves;
    if (email) {
      // find only reserves for this email
      reserves = await Reserve.find({ email });
    } else {
      // if no email provided, return all reserves
      reserves = await Reserve.find();
    }

    res.status(200).json(reserves);
  } catch (error) {
    console.error("Error fetching reserves:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllReserves = async (req, res) => {
  try {
    const reserves = await Reserve.find();
    res.status(200).json(reserves);
  } catch (error) {
    console.error("Error fetching all reserves:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Express controller
const updateReserve = async (req, res) => {
  try {
    const { id } = req.params;

    // Update isPending to false
    const updatedReserve = await Reserve.findByIdAndUpdate(
      id,
      { isPending: false },
      { new: true }
    );
    console.log("location", updatedReserve.pickupLocation);
    if (!updatedReserve) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Send email here if needed
    await sendEmail(
      updatedReserve.email,
      "Your Car Booking is Confirmed!",
      `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #1a73e8; color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Booking Confirmed!</h1>
      </div>

      <div style="padding: 20px;">
        <p>Hi <strong>${updatedReserve.name}</strong>,</p>

        <p>We are excited to confirm your car booking with <strong>${updatedReserve.brand}</strong>.</p>

        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Car Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${updatedReserve.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Pick-Up Location:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${updatedReserve.pickupLocation}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Drop Location:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${updatedReserve.dropoffLocation}</td>
          </tr>
        </table>

        <p>Thank you for choosing our service! We look forward to serving you.</p>

        <p style="margin-top: 30px;">Best regards,<br><strong>Car Rental Team</strong></p>
      </div>

      <div style="background-color: #f2f2f2; text-align: center; padding: 10px; font-size: 12px; color: #555;">
        © ${new Date().getFullYear()} Car Rental. All rights reserved.
      </div>
    </div>
  </div>
  `
    );


    res.json({ success: true, data: updatedReserve });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { postReserve, getReserves, getAllReserves, updateReserve };