const CHARACTERS = [
  { name: 'Aragorn',  src: '/images/aragorn.png' },
  { name: 'Samwise',  src: '/images/sam.png' },
  { name: 'Sauron',   src: '/images/sauron.png' },
  { name: 'Saruman',  src: '/images/saruman.png' },
  { name: 'Orc',      src: '/images/orc.png' },
]

export function Footer() {
  return (
    <footer
      className="mt-20 w-full pt-10 pb-12 relative"
      style={{
        background: '#264d72',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center items-center gap-6 pb-8">
        {CHARACTERS.map((c) => (
          <div
            key={c.name}
            className="w-32 md:w-40 transition-transform duration-300 hover:scale-110"
            style={{ filter: 'drop-shadow(0 10px 12px rgba(0,0,0,0.4))' }}
          >
            <img
              alt={c.name}
              src={c.src}
              className="w-full aspect-square object-cover rounded-full shadow-lg"
              style={{ border: '4px solid var(--color-gold-light)' }}
            />
          </div>
        ))}
      </div>
      <div
        className="text-center text-xs uppercase mt-4"
        style={{ color: 'rgba(242,202,80,0.4)', letterSpacing: '0.2em' }}
      >
        Made with magic in Middle-earth
      </div>
    </footer>
  )
}
