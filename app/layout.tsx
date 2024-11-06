import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'The Wild Oasis',
  description: 'Designed by Heedrhiss with Next.ts',
}

export default function RootLayout({children}: RootLayoutProps){
  return (
  <html lang="en">
    <body>
      <header>
      <Logo/>
      <Navigation/>
      </header>
      {children}
    </body>
  </html>
  )
}