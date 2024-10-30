// import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
// // import { providerMap } from "@/auth";
// import { AuthError } from "next-auth";
// import { lusitana } from '@/app/ui/fonts';
// import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
// import { ArrowRightIcon } from '@heroicons/react/20/solid';
// import { SignIn } from "./auth-components";

// const SIGNIN_ERROR_URL = "/auth/error";

// export default async function SignInPage(props: {
//   searchParams: { callbackUrl: string | undefined };
// }) {
//   return (
//     <div className="flex flex-col gap-4 space-y-3">
//       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
//         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
//           Please log in to continue.
//         </h1>
//         <form
//           action={async (formData) => {
//             "use server";
//             try {
//               await signIn( "Credentials", {
//                 ...formData,
//                 callbackUrl:"/usertest"
//               });
//             } catch (error) {
//               if (error instanceof AuthError) {
//                 return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
//               }
//               throw error;
//             }
//           }}
//           className="space-y-4"
//         >
//           <div>
//             <label
//               className="mb-3 block text-xs font-medium text-gray-900"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 required
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           <div>
//             <label
//               className="mb-3 block text-xs font-medium text-gray-900"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 id="password"
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 required
//                 minLength={6}
//               />
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="mt-4 w-full flex items-center justify-center rounded-md bg-blue-500 py-2 text-white"
//           >
//             Log in <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
//           </button>
//           <SignIn />
//           {/* <SignInButton /> */}
//         </form>
//         {/* <div className="mt-6 space-y-3">
//           {Object.values(providerMap).map((provider) => (
//             <form
//               key={provider.id}
//               action={async () => {
//                 "use server";
//                 try {
//                   await signIn(provider.id, {
//                     redirectTo: props.searchParams?.callbackUrl ?? "",
//                   });
//                 } catch (error) {
//                   if (error instanceof AuthError) {
//                     return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
//                   }
//                   throw error;
//                 }
//               }}
//               className="flex items-center justify-center"
//             >
//             </form>
//           ))}

//         </div> */}
//       </div>
//     </div>
//   );
// }
