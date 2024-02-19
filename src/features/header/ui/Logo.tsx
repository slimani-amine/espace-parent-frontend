import { Link } from "react-router-dom";

export const Logo = ({ childId }: { childId: string }) => {
  return (
    <Link
      to={`/dashboard/${childId}`}
      className="flex items-center justify-between cursor-pointer"
    >
      <img
        height={200}
        width={200}
        alt="logo"
        src="../../public/assets/logo.png"
      />
    </Link>
  );
};

export default Logo;
