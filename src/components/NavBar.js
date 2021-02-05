import React from 'react'
function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <a className="navbar-brand roboto" href="/">
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
        <ul className="navbar-nav">
          <li class="nav-item">
            <a class="nav-link disabled roboto" href="/">
              Rp.{localStorage.getItem('budget')}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link pad-right roboto" href="/purchased">
              Lihat Pembelian
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar
