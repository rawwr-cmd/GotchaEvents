const handler = (req, res) => {
  const { eventId } = req.query;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "rawwr", text: "A first comment!" },
      { id: "c1", name: "rawwr1", text: "A first comment2!" },
    ];

    res.status(200).json({ comments: dummyList });
  }
};

export default handler;
