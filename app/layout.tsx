import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import {Josefin_Sans} from "next/font/google"
import { ReservationProvider } from "./context/ReservationContext";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
})

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: {
    template: 'The Wild Oasis | %s',
    default: 'Welcome | The Wild Oasis',
  },
  description: 'Hotel Booking Website Designed by Heedrhiss with Next.ts',
}

export default function RootLayout({children}: RootLayoutProps){
  return (
  <html lang="en">
    <body className={`${josefinSans.className} flex flex-col bg-primary-950 text-primary-100 min-h-screen`}>
      <Header/>
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <ReservationProvider>
          {children}
          </ReservationProvider>
        </main>
      </div>
    </body>
  </html>
  )
}