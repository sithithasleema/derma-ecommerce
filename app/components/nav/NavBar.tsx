import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";

const NavBar = async () => {
  const currentUser = await getCurrentUser();
  console.log("User:", currentUser);

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0 ">
            <Link href="/" className="block w-40 sm:w-48">
              <Image
                src="/logo.png"
                alt="Elite canvas Australia logo"
                width={200}
                height={200}
                className="w-full h-auto"
                priority
              />
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>
                <CartCount />
              </div>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
