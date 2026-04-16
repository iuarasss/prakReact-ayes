import React from 'react';
import UserForm from "./UserForm2";

export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 font-sans">


      {/* Container utama */}
      <main className="flex justify-center items-center py-10 px-4">
        
        <div className="w-full max-w-md">
          
          {/* Card Form */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            
            <h2 className="text-2xl font-bold text-center text-blue-300 mb-4">
              Form Mahasiswa
            </h2>

            <UserForm />

          </div>

        </div>

      </main>
    </div>
  );
}