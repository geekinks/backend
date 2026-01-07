import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.user._id
        });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }   
};

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find().populate("createdBy", "email");
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.params.id).populate("createdBy", "email");
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ event });
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }   
        if (event.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await event.remove();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }   
};
