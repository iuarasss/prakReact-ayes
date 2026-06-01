import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Table from "../components/Table";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Components() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

  const products = [
    {
      id: 1,
      name: "Laptop Asus",
      category: "Elektronik",
      price: "Rp 8.000.000",
    },
    {
      id: 2,
      name: "Sepatu Sport",
      category: "Fashion",
      price: "Rp 450.000",
    },
    {
      id: 3,
      name: "Jam Tangan",
      category: "Aksesoris",
      price: "Rp 799.000",
    },
  ];
  return (
    <>
      <Container className="bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>

        <p className="text-gray-600">Berikut adalah daftar produk terbaru.</p>

        {/* BUTTON */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Button Component</h2>

          <div className="flex flex-wrap gap-3">
            <Button type="success">Simpan</Button>
            <Button type="danger">Hapus</Button>
          </div>
        </Card>

        {/* BADGE */}
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Badge Component</h2>

            <div className="flex flex-wrap gap-3">
              <Button type="success">Simpan</Button>
              <Button type="danger">Hapus</Button>
            </div>
          </Card>
        </div>

        {/* AVATAR */}
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Avatar Component</h2>

            <div className="flex gap-4">
              <Avatar name="Budi" />
              <Avatar name="Siti" />
            </div>
          </Card>
        </div>

        {/* CARD */}
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-bold">Judul Card</h2>
            <p className="text-gray-600">Ini adalah isi dari card.</p>
          </Card>
        </div>

        {/* TABLE */}
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Table Component</h2>

            <Table headers={headers}>
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3">{index + 1}</td>

                  <td className="border px-4 py-3">{product.name}</td>

                  <td className="border px-4 py-3">{product.category}</td>

                  <td className="border px-4 py-3">{product.price}</td>

                  <td className="border px-4 py-3">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>

        {/* PRODUCT CARD */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Product Card Component</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              title="Sepatu Sport"
              category="Fashion"
              price="Rp 450.000"
              description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
            />

            <ProductCard
              image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              title="Smartphone"
              category="Elektronik"
              price="Rp 4.500.000"
              description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
            />
          </div>
        </div>
      </Container>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
