import Head from "next/head";
import Comments from "../../components/input/comments";

import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetails = ({ selectedEvent }) => {
  const event = selectedEvent;
  // console.log(event);

  if (!event) {
    return (
      <div className="center">
        <p>No event found!</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { eventid } = params;

  const event = await getEventById(eventid);
  // console.log(event);

  // if (!event) {
  //   return {
  //     notFound: true, //404
  //   };
  // }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  // console.log(events);
  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  return {
    paths: paths,
    // fallback: true, //there are more pages to render, but we don't know how many
    fallback: "blocking", //nextjs will not do anything until it generates rhe page
  };
};

export default EventDetails;
