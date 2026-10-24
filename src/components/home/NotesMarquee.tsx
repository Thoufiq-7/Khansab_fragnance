import { Sparkles } from 'lucide-react';

const notes = [
  'Royal Dehn Al Oud',
  'Cambodian Agarwood',
  'White Kashmir Musk',
  'Taif Rose Otto',
  'Mysore Sandalwood',
  'Golden Ambergris',
  'Saffron Blossom',
  'Smoky Bakhoor',
  'Vetiver Roots',
  'Sweet Frankincense',
];

export function NotesMarquee() {
  return (
    <div className="w-full py-6 overflow-hidden bg-cream/70 border-y border-gold-border/60 my-12 relative select-none">
      {/* Gradient masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-ivory to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-ivory to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-8 items-center">
        {/* Double the list for seamless continuous infinite marquee */}
        {[...notes, ...notes].map((note, idx) => (
          <div key={idx} className="flex items-center gap-4 flex-shrink-0">
            <span className="font-display text-base md:text-lg tracking-wider text-ink/80 font-medium uppercase">
              {note}
            </span>
            <Sparkles size={12} className="text-gold-500/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
