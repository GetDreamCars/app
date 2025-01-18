// "use client";

// import { UploadButton as UTUploadButton } from "@uploadthing/react";
// import { OurFileRouter } from "@/utils/uploadthing";

// export function UploadButton() {
//   return (
//     <UTUploadButton<OurFileRouter>
//       endpoint="imageUploader"
//       onClientUploadComplete={(res) => {
//         // Do something with the response
//         console.log("Files: ", res);
//         alert("Upload Completed");
//       }}
//       onUploadError={(error: Error) => {
//         // Do something with the error.
//         alert(`ERROR! ${error.message}`);
//       }}
//     />
//   );
// } 


src/
├── api/
│   └── cars.ts               # Funkcje API do obsługi samochodów
├── app/
│   ├── [uid]/
│   │   └── page.tsx         # Strona szczegółów samochodu (server component)
│   ├── api/
│   │   └── uploadthing/
│   │       └── route.ts     # Endpoint do uploadowania plików
│   ├── dodaj-auto/
│   │   └── page.tsx         # Strona dodawania samochodu
│   ├── ogloszenie/
│   │   └── [id]/
│   │       └── page.tsx     # Strona szczegółów ogłoszenia
│   ├── szukaj/
│   │   └── page.tsx         # Strona wyszukiwania
│   ├── globals.css          # Globalne style CSS
│   ├── layout.tsx           # Główny layout aplikacji
│   ├── not-found.tsx        # Strona 404
│   └── page.tsx             # Strona główna
├── components/
│   ├── Add/
│   │   └── Add.tsx          # Komponent formularza dodawania
│   ├── Card/
│   │   └── Card.tsx         # Komponent karty samochodu
│   ├── Header/
│   │   └── Header.tsx       # Komponent nagłówka
│   ├── Search/
│   │   └── Search.tsx       # Komponent wyszukiwarki
│   ├── Providers.tsx        # Providery dla React Query i MUI
│   └── UploadButton.tsx     # Komponent przycisku upload (nieużywany)
├── types/
│   └── cars.ts              # Interfejsy TypeScript dla samochodów
└── utils/
    ├── supabase/
    │   ├── client.ts        # Klient Supabase dla przeglądarki
    │   └── server.ts        # Klient Supabase dla serwera
    └── uploadthing.ts       # Konfiguracja uploadthing

Pliki konfiguracyjne w root:
├── .eslintrc.json          # Konfiguracja ESLint
├── .gitignore              # Ignorowane pliki Git
├── next.config.ts          # Konfiguracja Next.js
├── package.json            # Zależności npm
├── postcss.config.mjs      # Konfiguracja PostCSS
├── README.md               # Dokumentacja
├── tailwind.config.ts      # Konfiguracja Tailwind
└── tsconfig.json           # Konfiguracja TypeScript