import './SiteFooter.css'

type SiteFooterProps = {
  brand: string
  place: string
  year: string
  links: readonly { id: string; label: string }[]
}

/** The name once more at full width, the section list, and the note that the figures are samples. */
export function SiteFooter({ brand, place, year, links }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p className="site-footer__brand">{brand}</p>
      <div className="site-footer__columns">
        <div>
          <h2>Sections</h2>
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{brand}</h2>
          <p className="site-footer__mono">{place}</p>
        </div>
        <div>
          <h2>Please note</h2>
          <p className="site-footer__mono">Timings, fares and coach details on this page are sample data.</p>
        </div>
      </div>
      <div className="site-footer__strip">
        <span>
          © {year} {brand}
        </span>
        <a href="/admin.html">Admin</a>
      </div>
    </footer>
  )
}
