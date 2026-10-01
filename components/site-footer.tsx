import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/santechinnovate", icon: FaFacebookF },
  { label: "YouTube", href: "https://www.youtube.com/@santechinnovate", icon: FaYoutube },
  { label: "X / Twitter", href: "https://twitter.com/santechinnovate", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/santechinnovate", icon: FaLinkedinIn },
  { label: "WhatsApp", href: "https://wa.me/250780309833", icon: FaWhatsapp },
  { label: "Instagram", href: "https://www.instagram.com/santechinnovate", icon: FaInstagram },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto flex min-h-[68px] shrink-0 flex-col items-center justify-center gap-1 overflow-hidden bg-[#0c1230] px-4 py-2 pb-3 text-center text-[11px] text-white sm:h-12.5 sm:min-h-0 sm:flex-row sm:justify-between sm:gap-4 sm:px-7 sm:pb-1 sm:text-left sm:text-xs">
      <span>© 2026 SAN TECH. All rights reserved.</span>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/connect" className="hidden transition-colors hover:text-white sm:inline-flex">Connect</Link>
        <a href="mailto:info@santechinnovate.com" className="hidden transition-colors hover:text-white sm:inline">info@santechinnovate.com</a>
        <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
        <div className="flex items-center gap-2" aria-label="SAN TECH social media">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="text-white transition-colors hover:text-white/75">
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2 bg-white" style={{ backgroundImage: "url('/imingogo-trimmed.png')", backgroundPosition: "center bottom", backgroundRepeat: "repeat-x", backgroundSize: "44px 22px" }} />
    </footer>
  );
}
