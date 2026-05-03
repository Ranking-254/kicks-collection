import React from 'react';
import InformationLayout from '../components/InformationLayout';

const ShippingInfo = () => (
  <InformationLayout title="Shipping Info">
    <section>
      <h2 className="text-xl font-black text-black mb-4 underline decoration-yellow-400">Nairobi Delivery</h2>
      <p>Instant dispatch via boda-boda within Nairobi. Orders placed before 4:00 PM are delivered same-day.</p>
    </section>
    <section>
      <h2 className="text-xl font-black text-black mb-4 underline decoration-yellow-400">Outside Nairobi (Meru & Nationwide)</h2>
      <p>We ship via G4S, Wells Fargo, or preferred Matatu Couriers. Delivery typically takes 24 hours.</p>
    </section>
  </InformationLayout>
);

export default ShippingInfo;