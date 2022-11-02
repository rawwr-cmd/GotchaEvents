import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { eventId } = req.query;

  const client = await MongoClient.connect(
    "mongodb+srv://rawwr:kCIexrkEqPj0UFbf@cluster0.eyknml1.mongodb.net/events?retryWrites=true&w=majority"
  );

  const db = client.db();

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    //add server-side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    // const dummyList = [
    //   { id: "c1", name: "rawwr", text: "A first comment!" },
    //   { id: "c1", name: "rawwr1", text: "A first comment2!" },
    // ];

    //sorting by the latest
    const documents = await db
      .collection("comments")
      .find({ eventId: eventId })
      .sort({ _id: -1 }) //sort by desceonding order
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
};

export default handler;
