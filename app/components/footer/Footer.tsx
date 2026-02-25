import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#1f2f26] text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h1 className=" font-semibold mb-4 text-base">Explore</h1>
            <Link href="#" className="hover:text-slate-400">
              About the Artist
            </Link>
            <Link href="#" className="hover:text-slate-400">
              Shop All Art
            </Link>
            <Link href="#" className="hover:text-slate-400">
              Originals vs Prints
            </Link>
            <Link href="#" className="hover:text-slate-400">
              FAQ
            </Link>
          </FooterList>

          <FooterList>
            <h1 className=" font-semibold mb-4 text-base">Customer Service</h1>
            <Link href="#" className="hover:text-slate-400">
              Shipping & Delivery
            </Link>
            <Link href="#" className="hover:text-slate-400">
              Return & Refund
            </Link>
            <Link href="#" className="hover:text-slate-400">
              Contact Us
            </Link>
            <Link href="#" className="hover:text-slate-400">
              How Custom orders Works
            </Link>
          </FooterList>

          <FooterList>
            <h1 className=" font-semibold mb-4 text-base">Policy</h1>
            <Link href="#" className="hover:text-slate-400">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:text-slate-400">
              Privacy Policy
            </Link>
          </FooterList>

          <FooterList>
            <h1 className=" font-semibold mb-4 text-base">Connect</h1>
            <div className="flex gap-2">
              <Link href="#">
                <FaInstagram className="size-5" />
              </Link>
              <Link href="#">
                <FaFacebook className="size-5" />
              </Link>
              <Link href="#">
                <FaPinterest className="size-5" />
              </Link>
            </div>
          </FooterList>

          <FooterList>
            <p>ABN:</p>
            <p>&copy; {new Date().getFullYear()} Elite Canvas Australia </p>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
