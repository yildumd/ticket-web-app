import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section with Wave Background */}
      <section className="hero">
        <div className="hero-background">
          <div className="wave"></div>
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Streamline Your Support with 
              <span className="text-gradient"> TicketFlow</span>
            </h1>
            <p className="hero-description">
              The ultimate ticket management solution for teams of all sizes. 
              Track, prioritize, and resolve issues efficiently with our intuitive platform.
            </p>
            <div className="hero-actions">
              <Link to="/auth/login" className="btn btn-primary btn-large">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-secondary btn-large">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose TicketFlow?</h2>
            <p>Powerful features designed to streamline your workflow</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Easy Ticket Management</h3>
              <p>Create, track, and resolve tickets with our intuitive interface designed for maximum productivity.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Real-time Updates</h3>
              <p>Stay informed with instant status updates and notifications for all your ticket activities.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3>Secure & Reliable</h3>
              <p>Your data is protected with enterprise-grade security and 99.9% uptime guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Tickets Resolved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Teams</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Workflow?</h2>
            <p>Join thousands of teams already using TicketFlow to manage their support tickets efficiently.</p>
            <Link to="/auth/signup" className="btn btn-primary btn-large">
              Start Free Trial
            </Link>
          </div>
          <div className="circle circle-3"></div>
        </div>
      </section>
    </div>
  )
}

export default Landing