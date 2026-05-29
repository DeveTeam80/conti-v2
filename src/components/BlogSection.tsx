import { motion } from 'framer-motion';
import { Calendar, User, ArrowUpRight, BookOpen } from 'lucide-react';

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readingTime: string;
}

const INSIGHTS_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Geological Selection",
    title: "Travertine Sourcing: From Tuscan Valleys to Mazgaon",
    excerpt: "An in-depth travelogue detailing how each signature travertine block is individually inspected for fossil deposits, tone consistency, and low water porosity before architectural inclusion.",
    image: "https://continental-beige.vercel.app/assets/images/horizon/Continental%20Horizon_Cam-03.jpg.jpeg",
    author: "Zainab Kanchwala",
    date: "May 12, 2026",
    readingTime: "5 min read"
  },
  {
    id: 2,
    category: "Structural Monoliths",
    title: "The Silent Sanctuary: Acoustic Advantages of Mivan Casts",
    excerpt: "How our pure monolithic continuous aluminum-formwork pour creates sound dissipation layers, reducing standard urban reverberations and keeping your master suites perfectly serene.",
    image: "https://continental-beige.vercel.app/assets/images/Continental%20Horizon_Cam-09-Day.jpg",
    author: "Murtaza Kanchwala",
    date: "April 28, 2026",
    readingTime: "7 min read"
  },
  {
    id: 3,
    category: "Sovereign Legals",
    title: "Understanding Outright Land Titles: A generational safety check",
    excerpt: "Demystifying Mumbai joint venture risk models. Exploring why sole outright ownership of land plots before foundation pouring represents the ultimate defense for multi-generational wealth.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    author: "Al-Haj Shabbir Mazgaonwala",
    date: "March 15, 2026",
    readingTime: "4 min read"
  }
];

export default function BlogSection() {
  return (
    <section 
      id="journals" 
      className="relative w-full bg-white py-24 md:py-32 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-warm-2 overflow-hidden z-20"
    >
      {/* Visual background ambient details */}
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-gold-a/10 to-amber-100/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-brown-deep/5 to-rose-200/5 blur-[120px] pointer-events-none" />

      <div className="max-w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 select-none">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-sans text-[12px] font-medium tracking-[0.4em] uppercase text-[#ca8c19] border border-[#ca8c19] rounded-full py-2 px-3">
                Our Blogs
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-[54px] leading-[1.1] tracking-[0.02em] font-normal text-brown-deep uppercase w-max">
              Architectural <span className="font-serif italic font-normal text-brown-deep">Insights.</span>
            </h2>
          </div>
        </div>

        {/* 3 Grid Columns of Luxury Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {INSIGHTS_POSTS.map((post, idx) => {
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -5% 0px", amount: 0.1 }}
                transition={{ duration: 1.1, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Aspect Ratio Image Frame */}
                  <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-warm-2 shadow-sm bg-warm-1 mb-6">
                    {/* Double reveal curtain inside image */}
                    <div className="w-full h-full overflow-hidden">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s] ease-[0.16,1,0.3,1]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Dark gradient shadow inside photo footer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                  </div>

                  {/* Metadata Indicators Row */}
                  <div className="flex items-center gap-4 text-[13px] font-mono text-brown-deep/60 mb-3 select-none">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-gold-b" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Editorial Title & Narrative */}
                  <span className="text-xl text-brown-deep tracking-wide font-base uppercase mb-3 pr-4 group-hover:text-gold-b transition-colors duration-300 select-text">
                    {post.title}
                  </span>
                  
                  <p className="text-[14px] sm:text-[13px] text-brown-deep font-normal leading-relaxed tracking-wide mb-6 select-text">
                    {post.excerpt}
                  </p>
                </div>

                {/* Highly tactile article linking button */}
                <div className="mt-auto border-t border-brown-deep/5 pt-5 select-none">
                  <motion.a
                    href={`/journal/${post.id}`}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-2 text-brown-deep font-sans text-[11px] font-bold tracking-[0.2em] uppercase group-hover:text-gold-b transition-colors duration-300"
                  >
                    <span>READ MORE</span>
                    <div className="w-5 h-5 rounded-full border border-brown-deep/10 flex items-center justify-center text-brown-deep group-hover:text-white group-hover:bg-brown-deep transition-all duration-300 shrink-0">
                      <ArrowUpRight size={10} className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </motion.a>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
