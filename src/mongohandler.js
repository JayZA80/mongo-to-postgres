import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const fetchRecords = async () => {
    const MongoURL = process.env.mongoURL;
    const mongoClient = new MongoClient(MongoURL);

    try {
        await mongoClient.connect();
        const db = mongoClient.db('videos');
        const collection = db.collection('info');

        const records = await collection.find({}).toArray();
        return records;
    } catch (e) {
        console.error(`Something went wrong with trying to fetch records: ${e.message}`);
    } finally {
        await mongoClient.close();
    }
}

(async () => {
    const data = await fetchRecords();
    console.log(data[0]);
})();
