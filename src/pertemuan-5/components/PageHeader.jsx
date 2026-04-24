export default function PageHeader() {
  return (
    <div className="flex items-center justify-between p-4">

      {/* Sisi Kiri */}
      <div className="flex flex-col">

        <span className="text-3xl font-semibold">
          Dashboard
        </span>

        <div className="flex items-center font-medium space-x-2 mt-2">

          <span className="text-gray-500">
            Dashboard
          </span>

          <span className="text-gray-500">
            /
          </span>

          <span className="text-gray-500">
            Order List
          </span>

        </div>
      </div>

      {/* Sisi Kanan */}
      <div>
        <button className="bg-hijau text-white px-4 py-2 rounded-lg">
          Add Button
        </button>
      </div>

    </div>
  );
}