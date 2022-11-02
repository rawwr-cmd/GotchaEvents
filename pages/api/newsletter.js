import { connectDatabase, insertDocument } from "../../helpers/db-util";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    // store it in a database
    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
    }

    try {
      await insertDocument(client, "newsletter", {
        email,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    // console.log(email);
    res.status(201).json({ message: "got you scooped!" });
  }
};

export default handler;
