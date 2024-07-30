import Review from '../models/Review.js'
import Tour from '../models/Tour.js';

export const createReview = async (req, res) => {

    const { id } = req.params;
    const newReview = new Review({ ...req.body })

    try {
        const savedReview = await newReview.save();

        // updating reviews of tour
        await Tour.findByIdAndUpdate(id, {
            $push: { reviews: savedReview._id }
        })

        res.status(200).json({ succes: true, message: "Review submitted", data: savedReview })
    } catch (error) {
        res.status(500).json({ succes: false, message: "Failed to submit" })
    }
}