import ErrorPage from "../components/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      description="Halaman yang Anda cari tidak ditemukan atau telah dipindahkan."
    />
  );
}
