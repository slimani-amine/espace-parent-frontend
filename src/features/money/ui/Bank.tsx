interface BancProps {
  name: string;
  account: string;
  rib?: string;
}

export default function Bank({ name, account, rib }: BancProps) {
  return (
    <div className="w-full border-solid border-[2px] rounded-lg border-[#49C3FF] p-4 font-semibold flex flex-col gap-2">
      <h1 className="text-[#3870A3] text-xl">{name}</h1>
      <div className="flex flex-col gap-0">
        <h2 className="text-[#3870A3] text-md">
          Account: <span className="text-[#A2A2A7] text-sm">{account}</span>
        </h2>
        {rib && (
          <h2 className="text-[#3870A3] text-md">
            RIB:
            <span className="text-[#A2A2A7] text-sm">{rib}</span>
          </h2>
        )}
      </div>
    </div>
  );
}
