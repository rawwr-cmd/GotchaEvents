import { useRouter } from "next/router";

const FilteredEvents = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>My Event slug</h1>
    </div>
  );
};

export default FilteredEvents;
