import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const fetcher = (url) => fetch(url).then((res) => res.json());

const FilteredEvents = (props) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useSWR(
    "https://client-side-data-fetchin-ebef2-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedEvents = [];
      for (const key in data) {
        transformedEvents.push({
          id: key,
          // username: data[key].username,
          // volume: data[key].volume,
          ...data[key],
        });
      }
      console.log(transformedEvents);
      setLoadedEvents(transformedEvents);
    }
  }, [data]);

  //when the page renders for the first time, the data is not yet available
  if (!loadedEvents) {
    return <p className="center">Loading</p>;
  }

  const filteredYear = slug[0];
  const filteredMonth = slug[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // if (props.hasError) {
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((e) => {
    const eventDate = new Date(e.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const date = new Date(props.date.year, props.date.month - 1);
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// SERVER SIDE FETCHING
// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   // console.log(params);
//   const { slug } = params;

//   if (!slug) {
//     return <p className="center">Loading</p>;
//   }

//   const filteredYear = slug[0];
//   const filteredMonth = slug[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

export default FilteredEvents;
