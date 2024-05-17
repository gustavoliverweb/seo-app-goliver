export function IntroductionCard({ route, children }) {
  // console.log(agency);
  return (
    <div className="w-full rounded-lg border-2 border-gray-200 p-6">
      {children}
      <div className="mt-2 text-[18px] font-medium">{route}</div>
    </div>
  );
}
