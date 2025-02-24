import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth()
  const image = session?.user?.image ?? ""
  
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-500 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-500 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
          <div className="flex items-center justify-center space-x-2">
            {image && (
              <Image 
                src={image} 
                alt={session.user.name || "User avatar"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span>
              <Link
                href="/account"
                className="hover:text-accent-500 transition-colors"
              >
                Guest area
              </Link>
            </span>
          </div>
          ) : (
          <Link
            href="/account"
            className="hover:text-accent-500 transition-colors"
          >
            Guest area
          </Link>)}
        </li>
      </ul>
    </nav>
  );
}
