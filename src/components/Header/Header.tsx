import React from 'react'
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="top-0 left-0 right-0 py-8 px-8 flex justify-between bg-black text-white">
        <Link href="/" className="text-white text-2xl">
        <div className='flex items-center gap-2'>
            <img src="/img/car_logo.png" alt="Logo" className="w-10 h-10" />
            <span className='text-white text-xl'>Dream Cars</span>
        </div>
        </Link>
      <Link href="/dodaj-auto" className="text-white text-lg">Dodaj auto</Link>
    </nav>
  );
}
