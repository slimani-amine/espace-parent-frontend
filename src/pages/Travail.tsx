import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneChildren } from "../features/dashboard/reducers/oneChildThunk";
import NewChildCard from "../features/dashboard/ui/NewChildCard";
import TravailCard from "../features/travail/TravailCard";

export default function Travail({ childId }: { childId: string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneChildren(childId) as any);
  }, [dispatch, childId]);

  const oneChildren = useSelector((state: any) => state?.oneChildren);

  return (
    <>
      {oneChildren && oneChildren?.attributes?.status === "accepted" ? (
        <TravailCard />
      ) : (
        <NewChildCard children={oneChildren?.attributes} />
      )}
    </>
  );
}
