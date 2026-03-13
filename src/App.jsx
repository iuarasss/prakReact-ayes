import React from 'react';
import './App.css';

// Komponen Navbar
const Navbar = () => (
  <nav className="navbar">
    <div className="logo"><strong>YouTube</strong></div>
    <div className="search-bar">
      <input type="text" placeholder="Telusuri" />
      <button>🔍</button>
    </div>
    <div className="user-icons">Profile</div>
  </nav>
);

// Komponen Sidebar
const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-item">🏠 Beranda</div>
    <div className="sidebar-item">📱 Shorts</div>
    <div className="sidebar-item">📺 Subscribe</div>
    <hr style={{ margin: '10px 0', border: '0.5px solid #eee' }} />
    <div className="sidebar-item">📚 Koleksi</div>
  </aside>
);

// Komponen Video Card (Data statis untuk contoh)
const VideoCard = ({ title, channel, views, time }) => (
  <div className="video-card">
    <img className="thumbnail" src="https://via.placeholder.com/320x180" alt="thumbnail" />
    <div className="video-info">
      <div className="channel-icon"></div>
      <div className="details">
        <h3>{title}</h3>
        <p>{channel}</p>
        <p>{views} x ditonton • {time} yang lalu</p>
      </div>
    </div>
  </div>
);

function App() {
  const videoData = [
    { id: 1, title: "Belajar React untuk Pemula", channel: "Coding Indo", views: "10rb", time: "2 jam" },
    { id: 2, title: "Tips Menjadi Senior Developer", channel: "Tech Guru", views: "50rb", time: "1 hari" },
    { id: 3, title: "Review Setup Minimalis 2024", channel: "Workspace", views: "100rb", time: "5 jam" },
    { id: 4, title: "Membangun Startup dari Nol", channel: "Founder Talk", views: "5rb", time: "10 menit" },
    { id: 5, title: "Kenapa Harus Pindah ke React?", channel: "Dev School", views: "25rb", time: "3 hari" },
    { id: 6, title: "Unboxing Laptop Masa Depan", channel: "Gadget Review", views: "1jt", time: "1 minggu" },
  ];

  return (
    <div className="app">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="video-grid">
          {videoData.map(video => (
            <VideoCard key={video.id} {...video} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;