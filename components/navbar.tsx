import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { useContext } from "react";
import { Context } from "../contexts/cart";

export default function Navbar() {
  const { user, isLoading } = useUser();
  const { state } = useContext(Context as any)
  const { cart } = state
  let itemCount = 0
  for (const [key, value] of Object.entries(cart)) {
    itemCount = itemCount + cart[key].qty
  }

  return (
    <nav className="bg-gradient-to-r from-sky-100 via-fuchsia-100 to-yellow-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="ml-6 flex space-x-8">
              <Link href="/">
                <a className={navLinkStyle}>DropShop</a>
              </Link>
            </div>
          </div>
          <div className="ml-6 flex items-center">

            {!user ? (
              <>
                <Link href="/cart">
                  <button className={iconButtonStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {` ${itemCount} Item(s)`}
                  </button>
                </Link>
                <a
                  href="/api/auth/login"
                  className={userButtonStyle + " hover:text-fuchsia-500"}
                >
                  Login as Vendor
                </a>
              </>
            ) : (
              <>
                <img
                  src={"https://pluspng.com/img-png/user-png-icon-big-image-png-2240.png"}
                  className="rounded-full w-8 h-8 ml-2 mr-1"
                />
                <span className="ml-2 mr-4 text-xl">{user.name}</span>
                <Link href="/cart">
                  <button className={iconButtonStyle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {` ${itemCount} Item(s)`}
                  </button>
                </Link>
                <a
                  href="/manage-shop"
                  className={userButtonStyle + " hover:text-fuchsia-500"}
                >
                  Manage Shop
                </a>
                <a
                  href="/api/auth/logout"
                  className={userButtonStyle + " bg-rose-200 hover:border-rose-500 hover:text-rose-500"}
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


const navLinkStyle = `cursor-pointer inline-flex items-center px-1 pt-1 font-black text-2xl text-zinc-500 hover:text-rose-500 uppercase`;
const iconButtonStyle = `flex gap-2 bg-sky-100 p-2 rounded text-zinc-500 hover:text-sky-500 border-2 border-zinc-500 hover:border-sky-500`;
const userButtonStyle = `rounded border-2 border-zinc-500 bg-fuchsia-200 p-2 ml-4 hover:border-fuchsia-500`;