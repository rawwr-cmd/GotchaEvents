import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    // store it in a database
    const client = await MongoClient.connect(
      "mongodb+srv://rawwr:kCIexrkEqPj0UFbf@cluster0.eyknml1.mongodb.net/newsletters?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("newsletters").insertOne({ email: email });

    // console.log(email);
    client.close();
    res.status(201).json({ message: "got you scooped!" });
  }
};

export default handler;
