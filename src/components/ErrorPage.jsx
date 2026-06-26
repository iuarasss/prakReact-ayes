import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const errorConfig = {
  400: {
    emoji: "\uD83D\uDE15",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 via-orange-50 to-white",
    iconBg: "bg-amber-100",
    iconBorder: "border-amber-200",
    badge: "bg-amber-500",
    accent: "text-amber-600",
    lightBg: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
    ring: "focus-visible:ring-amber-500",
    shadow: "shadow-amber-500/10",
    title: "Bad Request",
    description:
      "Maaf, permintaan Anda tidak dapat diproses. Mungkin ada kesalahan pada data yang dikirimkan.",
    helpText:
      "Periksa kembali data yang Anda masukkan atau hubungi tim support kami.",
  },
  401: {
    emoji: "\uD83D\uDD12",
    gradient: "from-red-500 to-rose-600",
    bgGradient: "from-red-50 via-rose-50 to-white",
    iconBg: "bg-red-100",
    iconBorder: "border-red-200",
    badge: "bg-red-500",
    accent: "text-red-600",
    lightBg: "bg-red-50",
    hoverBg: "hover:bg-red-100",
    ring: "focus-visible:ring-red-500",
    shadow: "shadow-red-500/10",
    title: "Unauthorized",
    description:
      "Anda perlu login terlebih dahulu untuk mengakses halaman ini.",
    helpText:
      "Silakan login dengan akun Anda untuk melanjutkan.",
  },
  403: {
    emoji: "\uD83D\uDEAB",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 via-red-50 to-white",
    iconBg: "bg-orange-100",
    iconBorder: "border-orange-200",
    badge: "bg-orange-500",
    accent: "text-orange-600",
    lightBg: "bg-orange-50",
    hoverBg: "hover:bg-orange-100",
    ring: "focus-visible:ring-orange-500",
    shadow: "shadow-orange-500/10",
    title: "Forbidden",
    description:
      "Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.",
    helpText:
      "Halaman ini hanya dapat diakses oleh pengguna dengan hak akses tertentu.",
  },
  404: {
    emoji: "\uD83D\uDD0D",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 via-indigo-50 to-white",
    iconBg: "bg-blue-100",
    iconBorder: "border-blue-200",
    badge: "bg-blue-500",
    accent: "text-blue-600",
    lightBg: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    ring: "focus-visible:ring-blue-500",
    shadow: "shadow-blue-500/10",
    title: "Page Not Found",
    description:
      "Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.",
    helpText:
      "Periksa kembali URL atau navigasikan ke halaman lain.",
  },
};

export default function ErrorPage({ code, description }) {
  const navigate = useNavigate();
  const config = errorConfig[code] || errorConfig[404];
  const desc = description || config.description;

  return (
    <div
      className={`relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-b ${config.bgGradient} p-4 sm:p-6 lg:p-8`}
    >
      {/* Decorative background elements */}
      <div
        className={`pointer-events-none absolute -inset-40 bg-gradient-to-r ${config.gradient} opacity-[0.03] blur-3xl`}
      />
      <div
        className={`pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br ${config.gradient} opacity-[0.04] blur-3xl`}
      />
      <div
        className={`pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr ${config.gradient} opacity-[0.03] blur-3xl`}
      />

      {/* Main card */}
      <div className="relative w-full max-w-lg animate-fade">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full ${config.badge} px-4 py-1.5 text-xs font-semibold text-white shadow-lg ${config.shadow}`}
          >
            <span className="text-white/80">●</span>
            Error {code}
          </span>
        </div>

        {/* Icon / Illustration */}
        <div className="mb-8 flex justify-center">
          <div
            className={`relative flex h-32 w-32 items-center justify-center rounded-3xl border-2 ${config.iconBorder} ${config.iconBg} shadow-xl ${config.shadow} transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
          >
            <span className="text-6xl transition-all duration-500 group-hover:scale-110">
              {config.emoji}
            </span>
            {/* Pulsing ring */}
            <span
              className={`absolute inset-0 animate-ping rounded-3xl ${config.iconBg} opacity-20`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8 text-center">
          <h1
            className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-8xl font-black leading-none text-transparent sm:text-9xl`}
          >
            {code}
          </h1>
          <h2 className={`mt-4 text-2xl font-bold text-gray-800 sm:text-3xl`}>
            {config.title}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-gray-500">
            {desc}
          </p>
          <div
            className={`mx-auto mt-4 inline-flex items-center gap-2 rounded-xl ${config.lightBg} px-4 py-2.5 text-sm text-gray-600`}
          >
            <span className="text-base">{config.emoji}</span>
            <span>{config.helpText}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => navigate("/")}
            className={`group min-w-[160px] bg-gradient-to-r ${config.gradient} text-white shadow-lg ${config.shadow} transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <svg
              className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Kembali ke Beranda
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className={`group min-w-[160px] border-2 text-gray-700 transition-all duration-300 hover:scale-105 ${config.hoverBg} ${config.ring}`}
          >
            <svg
              className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Halaman Sebelumnya
          </Button>
        </div>

        {/* Divider */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-widest text-gray-300">
            atau
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* Support link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Butuh bantuan?{" "}
            <button
              onClick={() => navigate("/")}
              className={`font-semibold underline-offset-2 transition-all hover:underline ${config.accent}`}
            >
              Hubungi Tim Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
