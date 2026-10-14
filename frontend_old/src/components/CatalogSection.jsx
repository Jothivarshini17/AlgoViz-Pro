export default function CatalogSection({ title, items, accent }) {
  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <h3>{title}</h3>
        <span className="catalog-accent" style={{ color: accent }}>
          {items.length} concepts
        </span>
      </div>
      <div className="catalog-grid">
        {items.map((item) => (
          <div key={item} className="catalog-pill">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
