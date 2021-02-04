import React from 'react'
function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          MovLix
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link pad-right" href="/purchased">
              Rp.{localStorage.getItem('budget')}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar
