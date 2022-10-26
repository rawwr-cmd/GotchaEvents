const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Windows For The Nerds",
    description:
      "In this live event, we are going to get the basics on some advanced features of the window operating system",
    location: "New Delhi, India, 800002",
    date: "2021-5-12",
    image: "images/dell-event-details.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Poster-making",
    description: "Poster-making is a great way to express your creativity",
    location: "Patna, India, 800001",
    date: "2021-5-12",
    image: "images/microsoft-event-details.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Email-marketing",
    description:
      "Email-marketing is to make marketing campaign easier and to send the status of your business",

    location: "Raipur India, 800004",
    date: "2021-5-12",
    image: "images/mailchimp-event-details.jpg",
    isFeatured: true,
  },
];

const getFeaturedEvents = () => {
  return DUMMY_EVENTS.filter((e) => e.isFeatured);
};

const getAllEvents = () => {
  return DUMMY_EVENTS;
};

const getFilteredEvents = (dateFilter) => {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((e) => {
    const eventDate = new Date(e.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

const getEventById = (id) => {
  return DUMMY_EVENTS.find((e) => e.id === id);
};

export { getFeaturedEvents, getAllEvents, getFilteredEvents, getEventById };
