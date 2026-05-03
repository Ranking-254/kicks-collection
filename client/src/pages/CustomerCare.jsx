import React, { useState } from 'react';
import InformationLayout from '../components/InformationLayout';

const CustomerCare = () => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "HOW DO I TRACK MY G4S DELIVERY?",
      a: "ONCE DISPATCHED, YOU WILL RECEIVE A TRACKING NUMBER VIA SMS. VISIT THE G4S WEBSITE OR CONTACT THE NEAREST COURIER OFFICE WITH YOUR ID."
    },
    {
      q: "CAN I VISIT THE NAIROBI SHOWROOM?",
      a: "YES. WE ARE LOCATED AT NBO_NODE_001. VISITS ARE BY APPOINTMENT ONLY TO ENSURE PERSONALIZED SERVICE."
    },
    {
      q: "DO YOU DO PRE-ORDERS?",
      a: "FOR EXCLUSIVE RELEASES, WE ACCEPT PRE-ORDERS WITH A 50% DEPOSIT. CONTACT US DIRECTLY FOR UPCOMING DROP RESERVATIONS."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const whatsappNumber = "254716700151"; // Replace with your number
    const text = `*NEW INQUIRY*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    
    // Trigger WhatsApp in background/new tab
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');

    // UI Feedback remains exactly as requested
    setStatus('SYSTEM_MESSAGE: INQUIRY RECEIVED. WE WILL RESPOND SHORTLY.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <InformationLayout title="Customer Care">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Support Info */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-black mb-4 underline decoration-yellow-400">Direct Support</h2>
            <p className="text-gray-600 mb-2 text-xs font-bold uppercase">Available Mon - Sat (9AM - 6PM EAT)</p>
            <p className="font-bold text-black tracking-widest">WHATSAPP: +254 716 700 151</p>
            <p className="font-bold text-black tracking-widest uppercase">EMAIL: INFO@SYSTX.CO.KE</p>
          </section>

          <section>
            <h2 className="text-xl font-black mb-4 underline decoration-yellow-400">FAQ Quick-Links</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-2">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left font-bold text-xs flex justify-between items-center group"
                  >
                    <span>{'>'} {faq.q}</span>
                    <span className="text-yellow-400 font-black">{openFaq === index ? '-' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <p className="mt-2 text-[10px] font-bold text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-1">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-100">
          <h2 className="text-xl font-black mb-6 uppercase tracking-tighter italic">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              name="name"
              type="text" 
              placeholder="YOUR NAME" 
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 text-[10px] font-bold border-2 border-white rounded-xl focus:border-yellow-400 outline-none transition-all"
              required 
            />
            <input 
              name="email"
              type="email" 
              placeholder="EMAIL ADDRESS" 
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 text-[10px] font-bold border-2 border-white rounded-xl focus:border-yellow-400 outline-none transition-all"
              required 
            />
            <textarea 
              name="message"
              placeholder="HOW CAN WE HELP?" 
              value={formData.message}
              onChange={handleInputChange}
              rows="4" 
              className="w-full p-4 text-[10px] font-bold border-2 border-white rounded-xl focus:border-yellow-400 outline-none transition-all"
              required
            ></textarea>
            <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all">
              Transmit Message
            </button>
          </form>
          {status && <p className="mt-4 text-[9px] font-black text-green-600 animate-pulse">{status}</p>}
        </div>
      </div>
    </InformationLayout>
  );
};

export default CustomerCare;