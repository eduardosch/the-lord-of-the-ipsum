import { useTranslation } from 'react-i18next'

const CHARACTERS = [
  { name: 'Aragorn', src: '/images/aragorn.png' },
  { name: 'Samwise', src: '/images/sam.png' },
  { name: 'Sauron',  src: '/images/sauron.png' },
  { name: 'Saruman', src: '/images/saruman.png' },
  { name: 'Orc',     src: '/images/orc.png' },
]

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="footer__characters">
        {CHARACTERS.map((c) => (
          <div key={c.name} className="footer__character">
            <img alt={c.name} src={c.src} className="footer__character-img" />
          </div>
        ))}
      </div>
      <div className="footer__credit">{t('footer.credit')}</div>
      <div className='footer__author'>Eduardo Schröder</div>
    </footer>
  )
}
