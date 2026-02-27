import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-mountain/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-xl font-bold">
              Snow<span className="text-ice">Pro</span>
            </Link>
            <p className="mt-3 text-sm text-snow-300">
              Book professional ski & snowboard instructors at Armenia&apos;s
              best mountain resorts.
            </p>
          </div>

          {/* Resorts */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-snow-200">
              Resorts
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/resorts/tsaghkadzor"
                  className="text-sm text-snow-300 hover:text-ice transition-colors"
                >
                  Tsaghkadzor
                </Link>
              </li>
              <li>
                <Link
                  href="/resorts/myler"
                  className="text-sm text-snow-300 hover:text-ice transition-colors"
                >
                  MyLer Mountain Resort
                </Link>
              </li>
              <li>
                <Link
                  href="/resorts/jermuk"
                  className="text-sm text-snow-300 hover:text-ice transition-colors"
                >
                  Jermuk
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-snow-200">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/instructors"
                  className="text-sm text-snow-300 hover:text-ice transition-colors"
                >
                  Find an Instructor
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-snow-300 hover:text-ice transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about#faq"
                  className="text-sm text-snow-300 hover:text-ice transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-snow-200">
              Get in Touch
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-snow-300">
                <a
                  href="mailto:hello@snowpro.am"
                  className="hover:text-ice transition-colors"
                >
                  hello@snowpro.am
                </a>
              </li>
              <li className="text-sm text-snow-300">
                <a
                  href="https://wa.me/37455000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ice transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-sm text-snow-300">Yerevan, Armenia</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-mountain-600">
          <p>
            &copy; {new Date().getFullYear()} SnowPro Armenia. All rights
            reserved.
          </p>
          <p className="mt-1">
            Season: Mid-December to April &middot; Prices in Armenian Dram
            (AMD)
          </p>
        </div>
      </div>
    </footer>
  );
}
