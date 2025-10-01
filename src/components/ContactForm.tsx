import React from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';

const ContactForm: React.FC = () => {
  const {
    formData,
    isSubmitting,
    submitStatus,
    statusMessage,
    handleInputChange,
    handleSubmit
  } = useContactForm();

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto px-4">
            Get in touch to discuss how the VIPI programme can unlock your business potential.
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12">
          <form 
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6"
          >
            {/* Status Message */}
            {statusMessage && (
              <div className={`p-3 sm:p-4 rounded-xl flex items-start space-x-2 sm:space-x-3 ${
                submitStatus === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800 font-semibold' 
                  : 'bg-red-50 border border-red-200 text-red-800 font-semibold'
              }`}>
                {submitStatus === 'success' ? (
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm sm:text-base font-bold">{statusMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base font-medium text-gray-800 min-h-[44px]"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Position/Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Position/Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base font-medium text-gray-800 min-h-[44px]"
                  placeholder="e.g., Managing Director, CEO"
                  autoComplete="organization-title"
                  required
                />
              </div>

              {/* Business Name Field */}
              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base font-medium text-gray-800 min-h-[44px]"
                  placeholder="Your business name"
                  autoComplete="organization"
                  required
                />
              </div>

              {/* Number of Employees Field */}
              <div>
                <label htmlFor="numberemployees" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Number of Employees
                </label>
                <select
                  id="numberemployees"
                  value={formData.numberemployees}
                  onChange={(e) => handleInputChange('numberemployees', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base font-medium text-gray-800 min-h-[44px]"
                >
                  <option value="">Please select...</option>
                  <option value="1-5">1-5 employees</option>
                  <option value="6-10">6-10 employees</option>
                  <option value="11-25">11-25 employees</option>
                  <option value="26-50">26-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="101-250">101-250 employees</option>
                  <option value="250+">250+ employees</option>
                </select>
              </div>

              {/* Annual Turnover Field */}
              <div>
                <label htmlFor="turnover" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Annual Turnover
                </label>
                <select
                  id="turnover"
                  value={formData.turnover}
                  onChange={(e) => handleInputChange('turnover', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base font-medium text-gray-800 min-h-[44px]"
                >
                  <option value="">Please select...</option>
                  <option value="Under £100K">Under £100K</option>
                  <option value="£100K - £500K">£100K - £500K</option>
                  <option value="£500K - £1M">£500K - £1M</option>
                  <option value="£1M - £5M">£1M - £5M</option>
                  <option value="£5M - £10M">£5M - £10M</option>
                  <option value="£10M - £50M">£10M - £50M</option>
                  <option value="Over £50M">Over £50M</option>
                </select>
              </div>

              {/* Email Address Field */}
              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base font-medium text-gray-800 min-h-[44px]"
                  placeholder="your.email@company.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 text-base sm:text-base font-medium text-gray-800 min-h-[44px]"
                  placeholder="+44 123 456 7890"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Additional Information</h3>
              <div>
                <label htmlFor="additionalInfo" className="block text-sm sm:text-base font-bold text-gray-800 mb-2">
                  Tell us more about your business or specific requirements (Optional)
                </label>
                <div className="relative">
                  <textarea
                    id="additionalInfo"
                    value={formData.additionalInfo || ''}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all duration-300 resize-vertical min-h-[120px] sm:min-h-[120px] text-base sm:text-base font-medium text-gray-800"
                    placeholder="Please share any additional details about your business challenges, growth objectives, specific areas of interest, or questions you'd like us to address during our consultation..."
                    maxLength={1000}
                    rows={4}
                  />
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    {(formData.additionalInfo || '').length}/1000
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2">
                  This field is optional. You can include information about specific challenges, growth goals, 
                  areas of interest, or any questions you'd like us to address.
                </p>
              </div>
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-4 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 min-h-[44px] ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed font-bold'
                    : 'bg-purple-800 hover:bg-purple-900 hover:scale-105 hover:shadow-lg font-bold'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs sm:text-sm text-gray-600 font-medium mt-3 sm:mt-4">
              * Required fields. We'll respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;