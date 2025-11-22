import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { user, isAuthReady, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await signIn(formValues)
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo, { replace: true })
    } catch (authError) {
      setError(authError.message || 'Unable to sign in. Double-check credentials and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isAuthReady && user) {
    const redirectTo = location.state?.from || '/'
    return <Navigate to={redirectTo} replace />
  }

  return (
    <main className="page" aria-labelledby="login-title">
      <header className="page-header">
        <p className="eyebrow">Account</p>
        <h1 id="login-title">Login</h1>
        <p className="page-intro">Authenticate with your Supabase account to access personalized data.</p>
      </header>

      <section>
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formValues.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formValues.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            {error ? <p className="form-error" role="alert">{error}</p> : null}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login
