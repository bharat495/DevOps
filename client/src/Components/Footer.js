import React from 'react';

const Footer = () => {
  const footerStyle = {
    marginTop: '50px',
    backgroundColor: 'rgb(1, 1, 37)',
    color: 'white',
    padding: '20px 0',
    textAlign: 'center',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const columnStyle = {
    flex: 1,
    padding: '20px',
  };

  const linkListStyle = {
    listStyle: 'none',
    padding: 0,
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };

  const socialMediaStyle = {
    fontSize: '24px',
    margin: '0 10px',
  };

  return (
    <footer className='footer' style={footerStyle}>
      <div className='footer-container' style={containerStyle}>
        <div style={columnStyle}>
          <h3>Contact Us</h3>
          <p>123 Main Street</p>
          <p>City, State 12345</p>
          <p>Email: info@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div style={columnStyle}>
          <h3>Quick Links</h3>
          <ul style={linkListStyle}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/services" style={linkStyle}>Our Services</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>
        <div style={columnStyle}>
          <h3>Follow Us</h3>
          <div>
            <a href="https://www.facebook.com" style={linkStyle}>
              <i className="fab fa-facebook-square" style={socialMediaStyle}></i>
            </a>
            <a href="https://www.twitter.com" style={linkStyle}>
              <i className="fab fa-twitter" style={socialMediaStyle}></i>
            </a>
            <a href="https://www.linkedin.com" style={linkStyle}>
              <i className="fab fa-linkedin" style={socialMediaStyle}></i>
            </a>
            <a href="https://www.instagram.com" style={linkStyle}>
              <i className="fab fa-instagram" style={socialMediaStyle}></i>
            </a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
