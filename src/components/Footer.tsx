import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-brown-deep text-warm-1 py-8 md:py-10 border-t border-brown-deep/30 font-sans">
      <div className="w-max-8xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Brand Logo & Description */}
        <div className="col-span-1">
          <div className="mb-4 relative w-[240px] h-[60px]">
            <Image
              src="/assets/images/CH-horizontal-logo.png" // 👈 Replace with your actual logo image path
              alt="Continental Group Logo"
              fill
              className="object-contain object-left invert brightness-0 filter"
              priority
            />
          </div>
          <p className="text-warm-1/80 max-w-sm leading-relaxed text-base md:text-xl font-normal">
            Continental Group is a community-first, legacy-driven real estate
            developer focused on trust, transparency, and long-term value.
          </p>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-5 md:pl-8 justify-center text-center">
          <div>
            <h4 className="uppercase text-[13px] tracking-[0.3em] text-gold-a font-semibold mb-1">
              Corporate Address:
            </h4>
            <p className="text-offWhite text-base md:text-xl leading-relaxed font-normal">
              <a
                href="https://maps.app.goo.gl/AQBZTpqA2bHcvArK9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-mid transition-colors duration-300 text-offWhite/70"
              >
                SAKHAR BHAVAN, 9th Floor, Ramnath Goenka Marg, Nariman Point,
                Mumbai, Maharashtra 400021
              </a>
            </p>
          </div>

          <div>
            <h4 className="uppercase text-[13px] tracking-[0.3em] text-gold-a font-semibold mb-1">
              Call Us On
            </h4>
            <p className="text-offWhite text-base md:text-xl leading-relaxed font-normal">
              <a
                href="tel:+918047285253"
                className="hover:text-gold-mid transition-colors duration-300"
              >
                +91 8047285253
              </a>
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-5 md:pl-8 justify-center text-center">
          <div>
            <h4 className="uppercase text-[13px] tracking-[0.3em] text-gold-a font-semibold mb-1">
              Email Us
            </h4>
            <p className="text-offWhite text-base md:text-xl leading-relaxed font-normal">
              <a
                href="mailto:wecare@continental-group.in"
                className="hover:text-gold-mid transition-colors duration-300"
              >
                wecare@continental-group.in
              </a>
            </p>
          </div>
          <span className="block uppercase text-[13px] tracking-[0.3em] text-gold-a font-semibold mb-3">
            Follow Us
          </span>
          <div className="flex gap-6 justify-center">
            <a
              href="https://www.facebook.com/share/1AXbw4bJSV/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Facebook size={22} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.linkedin.com/company/continental-group-53/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Linkedin size={22} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.instagram.com/continentalgroup53?igsh=YThuNmFlZjgwc2ln"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Instagram size={22} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.youtube.com/channel/UCXhDUffEXV9yEoXK8SBWoxw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Youtube size={22} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-max-8xl mx-auto px-6 lg:px-12 mt-8 pt-6 border-t border-brown-deep/20 flex flex-col lg:flex-row justify-between items-center gap-4">
        <p className="text-[11px] uppercase tracking-widest text-warm-1/50 font-normal">
          © 2026 The Continental Group. All rights reserved.
        </p>

        {/* <p className="text-[11px] uppercase tracking-widest text-warm-1/60 text-center max-w-2xl font-normal leading-relaxed">
          Corporate Address:{" "}
          <a
            href="https://maps.app.goo.gl/AQBZTpqA2bHcvArK9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-mid transition-colors duration-300 text-offWhite/70"
          >
            SAKHAR BHAVAN, 9th Floor, Ramnath Goenka Marg, Nariman Point,
            Mumbai, Maharashtra 400021
          </a>
        </p> */}

        <p className="text-[11px] uppercase tracking-widest text-warm-1/50 font-normal">
          Designed & Developed by{" "}
          <a
            href="https://www.visionarybizz.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-mid transition-colors duration-300 text-offWhite/70"
          >
            Visionary Services
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
