export const getAllEvents = async () => {
  const response = await fetch(
    "https://client-side-data-fetchin-ebef2-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  console.log(data);

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
