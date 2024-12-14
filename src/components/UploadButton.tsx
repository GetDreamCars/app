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