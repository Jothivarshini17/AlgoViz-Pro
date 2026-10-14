import { useMemo, useState } from 'react'

export default function AuthScreen({ mode, onSubmit, onSwitch, error }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const title = mode === 'signup' ? 'Create your premium account' : 'Welcome back!'
  const subtitle = mode === 'signup'
    ? 'Join the most immersive DSA learning experience.'
    : 'Continue your DSA journey with interactive visualizations.'

  const strength = useMemo(() => {
    if (password.length < 6) return { label: 'Weak', score: 1 }
    if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return { label: 'Medium', score: 2 }
    }
    return { label: 'Strong', score: 3 }
  }, [password])

  const canSubmit = mode === 'signup'
    ? name.trim() && email.includes('@') && password.length >= 6 && password === confirmPassword
    : email.includes('@') && password.length >= 6

  return (
    <div className="auth-layout">
      <aside className="auth-panel auth-left">
        <div className="auth-bg-layer" />
        <div className="auth-side-copy">
          <p className="eyebrow">Welcome Back!</p>
          <h1>Continue your DSA journey.</h1>
          <p>Visualize algorithms, track your progress, and learn with premium onboarding designed for mastery.</p>
          <div className="auth-side-tags">
            <span>Floating Trees</span>
            <span>Animated Graphs</span>
            <span>Code-rich Learning</span>
          </div>
        </div>
      </aside>

      <aside className="auth-panel auth-right">
        <div className="auth-card auth-card-premium">
          <div className="auth-header">
            <p className="eyebrow">Secure access</p>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <div className="auth-form">
            {error && <div className="auth-error">{error}</div>}
            {mode === 'signup' && (
              <>
                <label htmlFor="full-name">Full Name</label>
                <input id="full-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ava Chen" />
              </>
            )}

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />

            <label htmlFor="password">Password</label>
            <div className="password-row">
              <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {mode === 'signup' && (
              <>
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="password-row">
                  <input id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword((value) => !value)}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className="strength-row">
                  <span>Password strength: {strength.label}</span>
                  <div className="strength-meter">
                    {[1, 2, 3].map((level) => (
                      <span key={level} className={level <= strength.score ? 'active' : ''} />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="auth-actions-row">
              <label className="checkbox-row">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe((value) => !value)} />
                <span>Remember me</span>
              </label>
              <button type="button" className="link-button">Forgot password?</button>
            </div>

            <button type="button" className="button-primary auth-submit" onClick={() => onSubmit({ name, email, password })} disabled={!canSubmit}>
              {mode === 'signup' ? 'Create account' : 'Log in'}
            </button>

            <div className="social-row">
              <button type="button" className="social-button">Continue with Google</button>
              <button type="button" className="social-button">Continue with GitHub</button>
            </div>

            <div className="divider-row">
              <span>or</span>
            </div>

            <button type="button" className="auth-link" onClick={onSwitch}>
              {mode === 'signup' ? 'Already have an account? Log in' : 'Need an account? Sign up'}
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
