import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-brown-deep text-warm-1 py-12 md:py-16 border-t border-brown-mid/30 font-sans">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-3xl md:text-4xl font-serif mb-6 text-gradient-gold">
            The Continental Group
          </h3>
          <p className="text-warm-1/80 max-w-sm leading-relaxed text-2xl md:text-base font-normal">
            Continental Group is a community-first, legacy-driven real estate
            developer focused on trust, transparency, and long-term value.
          </p>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-6 md:pl-8">
          <div>
            <h4 className="uppercase text-[10px] tracking-[0.3em] text-gold-a font-medium mb-2">
              Email Us
            </h4>
            <p className="text-offWhite leading-relaxed font-normal">
              <a
                href="mailto:wecare@continental-group.in"
                className="hover:text-gold-mid transition-colors duration-300"
              >
                wecare@continental-group.in
              </a>
            </p>
          </div>

          <div>
            <h4 className="uppercase text-[10px] tracking-[0.3em] text-gold-a font-medium mb-2">
              Call Us On
            </h4>
            <p className="text-offWhite leading-relaxed font-normal">
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
        <div className="md:pl-8 flex flex-col justify-start">
          <span className="block uppercase text-[10px] tracking-[0.3em] text-gold-a font-medium mb-4">
            Follow Us
          </span>
          <div className="flex gap-5">
            <a
              href="https://www.facebook.com/share/1AXbw4bJSV/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.linkedin.com/company/continental-group-53/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.instagram.com/continentalgroup53?igsh=YThuNmFlZjgwc2ln"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>

            <a
              href="https://www.youtube.com/channel/UCXhDUffEXV9yEoXK8SBWoxw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-offWhite/80 hover:text-gold-mid transition-colors duration-300"
            >
              <Youtube size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-brown-mid/20 flex flex-col lg:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-widest text-warm-1/40 font-normal">
          © 2026 The Continental Group. All rights reserved.
        </p>

        <p className="text-[10px] uppercase tracking-widest text-warm-1/50 text-center max-w-xl font-normal leading-relaxed">
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
        </p>

        <p className="text-[10px] uppercase tracking-widest text-warm-1/40 font-normal">
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