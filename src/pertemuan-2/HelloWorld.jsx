export default function HelloWorld() {
  const propsUserCard = {
    nama: "Goku",
    nim: "999999",
    tanggal: "2025-01-01",
  };
  return (
    <div>
      <h1>Halo Dunia</h1>
      <p>Hari ini kita belajar ReactJs, petemuan 2. Hope we can yaaa</p>
      <GreetingBinjai />
      <QuoteText />
      <UserCard
        nama="Ayu"
        nim="2457301024"
        tanggal={new Date().toLocaleDateString()}
      />
      <UserCard
        nama="Echa"
        nim="2457301125"
        tanggal={new Date().toLocaleDateString()}
      />
      <UserCard {...propsUserCard} />

      <img src="img/download.jpg"/>
    </div>
  );
}

function GreetingBinjai() {
  return <small>Salam dari Binjai</small>;
}

function QuoteText() {
  const text = "Mulutmu Harimaumu";
  const text2 = "Aku ingin jadi macan";
  return (
    <div>
      <hr />
      <p>{text.toLowerCase()}</p>
      <p>{text2.toUpperCase()}</p>
    </div>
  );
}

function UserCard(props) {
  return (
    <div>
      <hr />
      <h3>Nama: {props.nama}</h3>
      <p>NIM: {props.nim}</p>
      <p>Tanggal: {props.tanggal}</p>
    </div>
  );
}
