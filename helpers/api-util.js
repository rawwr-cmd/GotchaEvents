export const getAllEvents = async () => {
  const response = await fetch(
    "https://client-side-data-fetchin-ebef2-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  //   console.log(data);

  const transformedData = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      ...data[key],
    });
  }

  return transformedData;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((e) => {
    const eventDate = new Date(e.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
