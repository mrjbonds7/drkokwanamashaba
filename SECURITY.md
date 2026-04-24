# Security Guide - Prof K. Mashaba Website

## Overview
This document outlines the security measures implemented on the Prof K. Mashaba herbalist website to protect against common web vulnerabilities.

---

## 🔒 Security Features Implemented

### 1. **HTTPS Enforcement**
- All HTTP traffic is automatically redirected to HTTPS (secure connection)
- Configured via `.htaccess` with HTTP Strict Transport Security (HSTS)
- **Status**: ✅ Enabled

**What it does**: Ensures all data transmitted between the website and visitors is encrypted.

---

### 2. **Content Security Policy (CSP)**
- **Meta Tag & Header**: Prevents injection of unauthorized content
- **Whitelisted Sources**:
  - Scripts: Only from the website itself and WhatsApp
  - Images: From same origin and HTTPS sources
  - Styles: Inline and local only
  - Form submissions: To WhatsApp only

**What it does**: Blocks malicious scripts and prevents XSS (Cross-Site Scripting) attacks.

---

### 3. **XSS (Cross-Site Scripting) Protection**
- **Client-side sanitization**: All form inputs are sanitized before use
- **HTML encoding**: User input is HTML-encoded to prevent script injection
- **Input validation**: Strict patterns for names, phone numbers, and messages
- **X-XSS-Protection header**: Browser-level XSS protection enabled

**What it does**: Prevents attackers from injecting malicious code through forms or URLs.

---

### 4. **Form Input Validation**

#### Name Field
- **Pattern**: Letters, spaces, hyphens, apostrophes only
- **Length**: 2-50 characters
- **Validation**: Real-time on blur event

#### Phone Number Field
- **Pattern**: International phone format
- **Length**: Max 20 characters
- **Example formats accepted**: +27795255211, (27) 79 52 55 211, 27-79-52-55-211

#### Message Field
- **Length**: 5-500 characters
- **Allowed characters**: Letters, numbers, spaces, basic punctuation
- **Validation**: Real-time on blur event

**What it does**: Ensures only valid data is processed, preventing injection attacks.

---

### 5. **CSRF (Cross-Site Request Forgery) Protection**
- Form validation ensures data originates from legitimate form submissions
- No sensitive actions are performed without user interaction
- Cross-origin resource sharing is restricted

**What it does**: Prevents attackers from tricking users into performing unwanted actions.

---

### 6. **Clickjacking Protection**
- **X-Frame-Options**: Set to DENY
- Prevents website from being embedded in malicious iframes

**What it does**: Prevents attackers from embedding your site in hidden frames to perform unauthorized clicks.

---

### 7. **Content Type Protection**
- **X-Content-Type-Options**: Set to nosniff
- Browser won't try to interpret files as different types
- Prevents MIME-sniffing attacks

**What it does**: Prevents attackers from uploading malicious files that could be misinterpreted.

---

### 8. **Referrer Policy**
- Set to `strict-origin-when-cross-origin`
- Only sends referrer to same-origin requests
- Protects user privacy

**What it does**: Prevents sensitive URL information from leaking to other websites.

---

### 9. **Permissions Policy**
- Disables access to: Geolocation, Microphone, Camera, Payment APIs
- Only enabled features needed for the website

**What it does**: Prevents websites from requesting unnecessary device permissions.

---

### 10. **File Access Protection**
- Sensitive files blocked from public access:
  - `.env` files (configuration)
  - `.git` directory (source control)
  - `.json`, `.txt`, `.config`, `.md` files (in web root)

**What it does**: Prevents exposure of sensitive configuration and source code.

---

### 11. **Directory Listing Disabled**
- Users cannot browse directory contents via URL
- Each file must be directly requested

**What it does**: Prevents information disclosure about server structure.

---

### 12. **Secure Window Opening**
- External links (WhatsApp) opened with `noopener,noreferrer` attributes
- Prevents attackers from accessing the `window` object

**What it does**: Protects against window hijacking attacks.

---

### 13. **Output Encoding**
- All user input is HTML-encoded before display
- Uses `div.textContent` method for safe encoding

**What it does**: Ensures user input cannot be interpreted as HTML/JavaScript.

---

## 📋 Server Configuration (.htaccess)

The `.htaccess` file includes:
1. HTTPS enforcement with 301 redirect
2. Security headers
3. Sensitive file protection
4. Directory listing prevention
5. Script execution prevention in upload directories
6. GZIP compression for performance
7. Browser caching policies
8. HTTP method restrictions (only GET, POST, HEAD allowed)

---

## ✅ Security Checklist

- ✅ HTTPS/SSL enforced
- ✅ Content Security Policy (CSP) implemented
- ✅ XSS protection enabled
- ✅ Input validation and sanitization
- ✅ CSRF protection
- ✅ Clickjacking protection
- ✅ MIME-sniffing protection
- ✅ Directory listing disabled
- ✅ Sensitive files protected
- ✅ Secure external links
- ✅ HTTP strict transport security (HSTS)
- ✅ Permissions restricted

---

## 🛡️ Best Practices for Maintenance

### Regular Updates
1. Keep server software updated
2. Monitor security advisories
3. Update dependencies regularly
4. Review server logs for suspicious activity

### Form Security
- Always validate input on both client and server
- Implement rate limiting for form submissions
- Log suspicious form submissions
- Consider adding reCAPTCHA for additional protection

### HTTPS Certificate
- Ensure SSL/TLS certificate is valid and not expired
- Use a certificate from a trusted Certificate Authority (CA)
- Enable automatic certificate renewal
- Monitor certificate expiration

### Data Protection
- Do not store sensitive customer data unnecessarily
- Encrypt sensitive data at rest and in transit
- Implement proper access controls
- Regular security audits

---

## 🚀 Deployment Checklist

Before deploying to production:

1. **HTTPS Setup**
   - [ ] SSL/TLS certificate installed
   - [ ] HTTPS redirect configured
   - [ ] Certificate auto-renewal enabled

2. **Server Configuration**
   - [ ] `.htaccess` file placed in web root
   - [ ] Apache mod_rewrite enabled
   - [ ] Apache mod_headers enabled
   - [ ] Apache mod_deflate enabled (GZIP)
   - [ ] Apache mod_expires enabled (caching)

3. **File Permissions**
   - [ ] Web files readable by web server
   - [ ] Config files not world-readable
   - [ ] `.git` directory not accessible via web

4. **Testing**
   - [ ] HTTPS working correctly
   - [ ] Form validation working
   - [ ] Security headers present (test with browser developer tools)
   - [ ] No console errors or warnings
   - [ ] Test form submission end-to-end

5. **Security Scanning**
   - [ ] Run security headers test: https://securityheaders.com
   - [ ] SSL/TLS test: https://www.ssllabs.com/ssltest
   - [ ] OWASP ZAP scanning
   - [ ] Check for mixed content warnings

---

## 🔍 Security Testing

### Test CSP Headers
```
Open DevTools → Networks → Check Response Headers
Look for: Content-Security-Policy header
```

### Test for XSS Vulnerability
- Attempt to submit: `<script>alert('XSS')</script>`
- Should be safely encoded and not execute

### Test Input Validation
- Submit invalid data (too short, special characters)
- Should be rejected with validation message

### Check Security Headers
Visit: https://securityheaders.com and enter your domain

---

## 📞 Security Contact
If you discover a security vulnerability:
1. Do NOT publish publicly
2. Email security details to the website administrator
3. Allow time for a fix before disclosure
4. Request responsible disclosure policy

---

## 📚 References & Resources

- **OWASP Top 10**: https://owasp.org/Top10/
- **Mozilla Security Guide**: https://infosec.mozilla.org/
- **NIST Cybersecurity Framework**: https://www.nist.gov/cyberframework
- **Web Security Academy**: https://portswigger.net/web-security
- **CSP Documentation**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- **SSL Labs Best Practices**: https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices

---

## 📝 Version History

| Date | Changes |
|------|---------|
| 2026-04-23 | Initial security implementation |
| | - Added CSP headers |
| | - Implemented form validation and sanitization |
| | - Created .htaccess security configuration |
| | - Enabled HTTPS enforcement |
| | - Added HSTS headers |

---

*Last Updated: April 23, 2026*
*For security concerns, contact the website administrator.*
