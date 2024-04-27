import mongoose, { model, models } from 'mongoose';

const PoinSchema = new mongoose.Schema({
    poin: Number
}, {
    timestamps: true
})

export const Poin = models.Poin || model("Poin", PoinSchema);