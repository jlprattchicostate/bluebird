import { NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home Dashboard', end: true },
  { to: '/weather', label: 'Weather & Road' },
  { to: '/conditions', label: 'Check Conditions' },
  { to: '/community', label: 'Community Feed' },
  { to: '/compare', label: 'Compare Resorts' },
  { to: '/profiles', label: 'User Profiles' },
  { to: '/messages', label: 'Messages' },
]

const Layout = () => (
  <div className="app-shell">
    <aside className="site-nav">
      <div className="brand">
        <p className="brand-kicker">Bluebird</p>
        <p className="brand-tagline">Live snow, road, and community intel.</p>
      </div>

      <nav aria-label="Primary">
        <ul>
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>

    <div className="content-area">
      <Outlet />
    </div>
  </div>
)

export default Layout
