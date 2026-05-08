import { FiCalendar, FiChevronDown } from "react-icons/fi";

export default function PageHeader({
  title,
  breadcrumb,
  children
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* LEFT */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          {title}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>

          <span>/</span>

          <span className="font-medium text-[#00B074]">
            {breadcrumb}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-4">

        {/* CHILDREN */}
        {children}

        {/* FILTER */}
        <div className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 transition-all hover:border-[#00B074] hover:bg-white hover:shadow-md">

          {/* ICON */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8FFF5] transition-all group-hover:bg-[#00B074]">
            <FiCalendar
              className="text-[#00B074] group-hover:text-white"
              size={18}
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Filter Periode
            </p>

            <p className="text-xs text-gray-400">
              17 Apr 2025 - 21 May 2025
            </p>
          </div>

          {/* ARROW */}
          <FiChevronDown
            className="text-gray-400 transition-transform group-hover:rotate-180"
            size={18}
          />
        </div>
      </div>
    </div>
  );
}