import { useMoveBack } from "../hooks/useMoveBack";
function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div>
      The page you are looking for could not be found 😢
      <button onClick={moveBack}>&larr; Go back</button>
    </div>
  );
}

export default PageNotFound;
