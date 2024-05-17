export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; query?: string };
}) {
  return (
    <div className="pb-6 flex flex-grow">
      <div className="items-start mt-6 w-full flex flex-col px-5 gap-6">
        <div className="bg-white p-5 rounded-2xl lg:flex justify-between items-center w-full">
          <h3 className="text-title text-primary-text-500 font-medium">
            Reportes
          </h3>
        </div>
        <div className="relative h-max overflow-auto bg-white p-5 rounded-2xl w-full flex-grow flex flex-col justify-between"></div>
      </div>
    </div>
  );
}
