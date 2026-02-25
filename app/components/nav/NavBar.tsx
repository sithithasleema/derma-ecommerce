import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "../SearchBar";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-slate-200 ">
      {/* Top row: logo + search + actions */}
      <div className="py-3">
        <Container>
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-[#e7efe7]">
                <Image
                  src="/logo.png"
                  alt="Pure Derma"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>

              <div className="leading-tight">
                <p className="text-xs tracking-[0.28em] uppercase text-slate-500">
                  Pure Derma
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  Botanical Skincare
                </p>
              </div>
            </Link>

            {/* Search (desktop) */}
            <div className="hidden md:block w-full max-w-xl">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 md:gap-10">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>

          {/* Search (mobile) */}
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>
        </Container>
      </div>

      {/* Categories bar (separate row, still sticky because header is sticky) */}
      <div className="border-t border-slate-200 bg-[#1f2f26]/95 backdrop-blur">
        <Container>
          <Categories />
        </Container>
      </div>
    </header>
  );
};

export default NavBar;
