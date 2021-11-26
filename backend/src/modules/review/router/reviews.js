import express from "express";
import ReviewController from "../controller/reviews.js";

const reviewRouter = express.Router();

const reviewController = new ReviewController();

reviewRouter.post(
	"/job-seeker/company-details/add-review",
	reviewController.create
);

reviewRouter.put(
	"/job-seeker/company-details/helpfulness-count",
	reviewController.setHelpfulness
);

export default reviewRouter;