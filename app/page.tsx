'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password)
        setSuccess('Check your email to confirm your account!')
      } else {
        await signInWithEmail(email, password)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    try {
      await signInWithGoogle()
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <p style={{ textAlign: 'center' }}>Loading...</p>
      </div>
    )
  }

  if (user) {
    return (
      <div className="container">
        <div className="user-info">
          <h1>Welcome!</h1>
          <p>Logged in as:</p>
          <p className="email">{user.email}</p>
          <button onClick={signOut} className="btn-secondary" style={{ marginTop: '1rem' }}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="divider">or</div>

      <button onClick={handleGoogleSignIn} className="btn-google">
        Continue with Google
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="toggle">
        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        <button onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  )
}
