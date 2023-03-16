import { useRouteError } from "react-router-dom";

// TODO may need to expend more properties
interface ErrorType {
  statusText?: string;
  message?: string;
}

export default () => {
  const error = useRouteError() as ErrorType;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
