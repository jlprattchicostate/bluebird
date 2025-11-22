import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
  const { user, signOut, isAuthReady } = useAuth()

  return (
    <div className="app-shell">
      <aside className="site-nav">
        <div className="brand-block">
          <p className="brand">Bluebird</p>
          <span className="tagline">Snow · Road · Community</span>
        </div>

        <nav aria-label="Primary">
          <ul>
            <li>
              <NavLink to="/" end>
                Home Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather">Weather &amp; Road</NavLink>
            </li>
            <li>
              <NavLink to="/conditions">Check Conditions</NavLink>
            </li>
            <li>
              <NavLink to="/community">Community Feed</NavLink>
            </li>
            <li>
              <NavLink to="/compare">Compare Resorts</NavLink>
            </li>
            <li>
              <NavLink to="/messages">Messages</NavLink>
            </li>
            <li>
              <NavLink to="/profiles">User Profiles</NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="auth-summary">
          {isAuthReady ? (
            user ? (
              <>
                <p className="welcome">Signed in as {user.email}</p>
                <button type="button" onClick={signOut}>
                  Sign out
                </button>
              </>
            ) : (
              <p className="welcome">You are not signed in.</p>
            )
          ) : (
            <p className="welcome">Checking session…</p>
          )}
        </div>
      </aside>

      <div className="content-area">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
