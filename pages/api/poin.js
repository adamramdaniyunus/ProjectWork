import mongooseConnect from "@/lib/mongoose";
import { Poin } from "@/models/Poin";
import { Sum } from "@/models/Sum";

export default async function handle(req, res) {

    const { poin } = req.body;
    try {
        await mongooseConnect();

        await Poin.create({
            poin
        });

        const myPoin = await Poin.find();

        if (myPoin.length > 0) {
            const totalPoinData = myPoin.reduce((acc, curr) => acc + curr.poin, 0);

            // jumlahkan poin dan buat poin jika belum ada
            const totalPoinEntry = await Sum.findOne();
            if (totalPoinEntry) {
                totalPoinEntry.total = totalPoinData;
                await totalPoinEntry.save();
            } else {
                await Sum.create({ total: totalPoinData });
            }
        }

        res.json("OK");
    } catch (error) {
        console.log(error);
    }
}