import ListRouting from "../sideBar/ui/sidebar-routes";
export default function SideBar({
  childId,
  isOpen,
}: {
  childId: number | null;
  isOpen: boolean;
}) {
  return (
    <div
      className={` ${
        isOpen ? " transition-all duration-300" : " transition-all duration-300"
      } bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 border-r shadow-sm pt-5  pr-0 h-full `}
    >
      <div className={`flex flex-col h-full p-1 font-normal text-white`}>
        <ListRouting isOpen={isOpen} childId={childId} />
      </div>
    </div>
  );
}
