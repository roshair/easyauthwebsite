# Issue: Add Contact Form with Client-Side Validation

## Title
Implement Contact Form with Validation and Azure Functions Backend

## Description
Add a functional contact form allowing users to get in touch, with client-side validation and optional Azure Functions backend for email notifications. This creates engagement opportunities and demonstrates form handling best practices.

## Current State
- Contact navigation link exists but no form
- No user interaction beyond clicking external links

## Proposed Implementation

### 1. Form Structure

```html
<!-- Contact Section -->
<section id="contact" class="contact-section">
  <div class="container">
    <h2 class="text-center">Contact Us</h2>
    <p class="text-center">Have questions about Azure App Service? Get in touch!</p>
    
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <form id="contactForm" class="contact-form" novalidate>
          <div class="form-group">
            <label for="name">Name <span class="required">*</span></label>
            <input type="text" class="form-control" id="name" name="name" required
                   minlength="2" maxlength="100" 
                   aria-describedby="nameError">
            <span class="error-message" id="nameError"></span>
          </div>
          
          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input type="email" class="form-control" id="email" name="email" required
                   aria-describedby="emailError">
            <span class="error-message" id="emailError"></span>
          </div>
          
          <div class="form-group">
            <label for="company">Company</label>
            <input type="text" class="form-control" id="company" name="company"
                   maxlength="100">
          </div>
          
          <div class="form-group">
            <label for="subject">Subject <span class="required">*</span></label>
            <select class="form-control" id="subject" name="subject" required
                    aria-describedby="subjectError">
              <option value="">Select a topic...</option>
              <option value="general">General Inquiry</option>
              <option value="technical">Technical Support</option>
              <option value="pricing">Pricing Question</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="other">Other</option>
            </select>
            <span class="error-message" id="subjectError"></span>
          </div>
          
          <div class="form-group">
            <label for="message">Message <span class="required">*</span></label>
            <textarea class="form-control" id="message" name="message" rows="5" 
                      required minlength="10" maxlength="1000"
                      aria-describedby="messageError"></textarea>
            <span class="error-message" id="messageError"></span>
            <small class="char-count">0 / 1000 characters</small>
          </div>
          
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              <span class="btn-text">Send Message</span>
              <span class="btn-spinner" style="display: none;">
                <i class="glyphicon glyphicon-refresh spinning"></i> Sending...
              </span>
            </button>
          </div>
          
          <div class="alert alert-success" id="successMessage" style="display: none;">
            <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
          </div>
          
          <div class="alert alert-danger" id="errorMessage" style="display: none;">
            <strong>Error!</strong> <span id="errorText"></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
```

### 2. JavaScript Validation

```javascript
// contact-form.js
(function() {
  'use strict';

  class ContactForm {
    constructor(formId) {
      this.form = document.getElementById(formId);
      this.init();
    }

    init() {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.setupRealTimeValidation();
      this.setupCharacterCount();
    }

    setupRealTimeValidation() {
      const inputs = this.form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            this.validateField(input);
          }
        });
      });
    }

    setupCharacterCount() {
      const message = document.getElementById('message');
      const counter = document.querySelector('.char-count');
      
      message.addEventListener('input', () => {
        const count = message.value.length;
        counter.textContent = `${count} / 1000 characters`;
        counter.style.color = count > 950 ? '#d9534f' : '#666';
      });
    }

    validateField(field) {
      const errorElement = document.getElementById(`${field.id}Error`);
      const value = field.value.trim();
      let errorMessage = '';

      // Required field check
      if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
      }
      // Email validation
      else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
      }
      // Min length check
      else if (field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (value.length < minLength) {
          errorMessage = `Must be at least ${minLength} characters`;
        }
      }

      if (errorMessage) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        errorElement.textContent = errorMessage;
        return false;
      } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        errorElement.textContent = '';
        return true;
      }
    }

    validateForm() {
      const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    }

    async handleSubmit(e) {
      e.preventDefault();

      if (!this.validateForm()) {
        return;
      }

      this.setLoading(true);
      this.hideMessages();

      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      try {
        // Option 1: Azure Function endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        this.showSuccess();
        this.form.reset();
        this.clearValidationStates();
      } catch (error) {
        this.showError(error.message || 'Something went wrong. Please try again later.');
      } finally {
        this.setLoading(false);
      }
    }

    setLoading(isLoading) {
      const button = this.form.querySelector('button[type="submit"]');
      const btnText = button.querySelector('.btn-text');
      const btnSpinner = button.querySelector('.btn-spinner');

      button.disabled = isLoading;
      btnText.style.display = isLoading ? 'none' : 'inline';
      btnSpinner.style.display = isLoading ? 'inline' : 'none';
    }

    clearValidationStates() {
      const inputs = this.form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
      });
      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    hideMessages() {
      document.getElementById('successMessage').style.display = 'none';
      document.getElementById('errorMessage').style.display = 'none';
    }

    showSuccess() {
      const message = document.getElementById('successMessage');
      message.style.display = 'block';
      message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => message.style.display = 'none', 5000);
    }

    showError(text) {
      const message = document.getElementById('errorMessage');
      document.getElementById('errorText').textContent = text;
      message.style.display = 'block';
      message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new ContactForm('contactForm');
  });
})();
```

### 3. CSS Styling

```css
/* Contact Form Styles */
.contact-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.contact-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.contact-form .form-group {
  margin-bottom: 25px;
}

.contact-form label {
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
}

.contact-form .required {
  color: #d9534f;
}

.contact-form .form-control {
  border-radius: 4px;
  border: 2px solid #ddd;
  padding: 12px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.contact-form .form-control:focus {
  border-color: #337ab7;
  box-shadow: 0 0 0 0.2rem rgba(51, 122, 183, 0.25);
  outline: none;
}

.contact-form .form-control.is-valid {
  border-color: #5cb85c;
}

.contact-form .form-control.is-invalid {
  border-color: #d9534f;
}

.error-message {
  color: #d9534f;
  font-size: 14px;
  display: block;
  margin-top: 5px;
  min-height: 20px;
}

.char-count {
  display: block;
  text-align: right;
  color: #666;
  font-size: 12px;
  margin-top: 5px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .contact-form {
    padding: 20px;
  }
}
```

### 4. Azure Function Backend (Optional)

```javascript
// Azure Function: contact/index.js
const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  context.log('Contact form submission received');

  const { name, email, company, subject, message } = req.body;

  // Validate input
  if (!name || !email || !subject || !message) {
    context.res = {
      status: 400,
      body: { error: 'Missing required fields' }
    };
    return;
  }

  try {
    // Configure email transport (example with SendGrid)
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    context.res = {
      status: 200,
      body: { success: true }
    };
  } catch (error) {
    context.log.error('Error sending email:', error);
    context.res = {
      status: 500,
      body: { error: 'Failed to send message' }
    };
  }
};
```

## Files to Create/Modify

### New Files:
1. `contact-form.js` - Form validation and submission
2. `contact-form.css` - Form styling
3. `api/contact/index.js` - Azure Function (optional)
4. `api/contact/function.json` - Function config (optional)

### Modified Files:
1. `index.html` - Add contact form section

## Acceptance Criteria

- [ ] Form displays with all fields properly labeled
- [ ] Real-time validation on blur and input
- [ ] Clear error messages for validation failures
- [ ] Character counter for message field
- [ ] Submit button shows loading state
- [ ] Success message displays after submission
- [ ] Error handling for failed submissions
- [ ] Form resets after successful submission
- [ ] Keyboard accessible (tab navigation)
- [ ] Screen reader compatible (ARIA labels)
- [ ] Mobile responsive layout
- [ ] Email validation uses proper regex
- [ ] Required fields marked clearly

## Testing Checklist

- [ ] Test all validation rules
- [ ] Test with valid data submission
- [ ] Test with invalid email formats
- [ ] Test character limit enforcement
- [ ] Test required field validation
- [ ] Test loading states
- [ ] Test error message display
- [ ] Test form reset functionality
- [ ] Test keyboard navigation
- [ ] Test on mobile devices
- [ ] Test with screen reader
- [ ] Test backend API integration

## Priority
Medium

## Labels
`enhancement`, `form`, `validation`, `accessibility`, `backend-optional`

## Estimated Effort
4-6 hours (frontend only)
+3 hours (Azure Function backend)

## Optional Enhancements
- Honeypot field for spam prevention
- ReCAPTCHA integration
- File upload capability
- Auto-save draft to localStorage
- Thank you page redirect

## Resources
- [MDN: Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [Azure Functions HTTP Trigger](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger)
- [WCAG Forms Guidelines](https://www.w3.org/WAI/tutorials/forms/)
