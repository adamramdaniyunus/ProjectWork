import mongoose, { model, models } from 'mongoose';

const SumSchema = new mongoose.Schema({
    total: Number
}, {
    timestamps: true
})

export const Sum = models.Sum || model("Sum", SumSchema);