export function Header() {
  return (
    <header className="text-center mb-16" style={{ color: 'var(--color-gold-light)' }}>
      <h1
        className="font-ringbearer tracking-tight text-5xl md:text-6xl"
        style={{ color: 'var(--color-gold-light)' }}
      >
        The Lord of the Ipsum
      </h1>
      <p
        className="mt-2 font-ringbearer text-sm tracking-widest"
        style={{ color: 'rgba(242,202,80,0.8)' }}
      >
        Generate texts since from the Shire all into Mordor
      </p>
    </header>
  )
}
