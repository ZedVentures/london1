import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  title: string;
  business: string;
  numberemployees: string;
  turnover: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  additionalInfo?: string;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  statusMessage: string;
  handleInputChange: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ContactFormData = {
  name: '',
  title: '',
  business: '',
  numberemployees: '',
  turnover: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  additionalInfo: '',
};

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_jtv7h1a',
  templateId: 'template_sl400g1',
  publicKey: '6HSQ5K2lYPap8SuCc'
};

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setStatusMessage('');
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setStatusMessage('Please enter your full name');
      setSubmitStatus('error');
      return false;
    }
    
    if (!formData.title.trim()) {
      setStatusMessage('Please enter your position/title');
      setSubmitStatus('error');
      return false;
    }
    
    if (!formData.company.trim()) {
      setStatusMessage('Please enter your business name');
      setSubmitStatus('error');
      return false;
    }
    
    if (!formData.email.trim()) {
      setStatusMessage('Please enter your email address');
      setSubmitStatus('error');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatusMessage('Please enter a valid email address');
      setSubmitStatus('error');
      return false;
    }
    
    if (!formData.phone.trim()) {
      setStatusMessage('Please enter your phone number');
      setSubmitStatus('error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        title: formData.title,
        business: formData.company,
        numberemployees: formData.numberemployees,
        turnover: formData.turnover,
        company: formData.company,
        phone: formData.phone,
        message: `Contact form submission with the following details:
        
Full Name: ${formData.name}
Position/Title: ${formData.title}
Business Name: ${formData.company}
Number of Employees: ${formData.numberemployees}
Annual Turnover: ${formData.turnover}
Email: ${formData.email}
Phone: ${formData.phone}

Additional Information:
${formData.additionalInfo || 'No additional information provided'}`,
        to_name: 'Purple Guard Advisory',
        current_date: new Date().toLocaleString('en-GB', { 
          timeZone: 'Europe/London',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };
      
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
        setFormData(initialFormData);
      } else {
        throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
      }
      
    } catch (error: any) {
      setSubmitStatus('error');
      setStatusMessage('Unable to send message at this time. Please contact us directly at zedwork112@gmail.com or try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSubmitStatus('idle');
    setStatusMessage('');
    setIsSubmitting(false);
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    statusMessage,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};