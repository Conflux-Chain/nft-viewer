import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      Profile page
      <div>
        <Link to={`/detail`}>Detail Page</Link>
      </div>
    </>
  );
};
