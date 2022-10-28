import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/events-search";
import EventList from "../../components/events/event-list";

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventshandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventshandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
