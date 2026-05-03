import React from 'react';
import InformationLayout from '../components/InformationLayout';

const ReturnPolicy = () => (
  <InformationLayout title="Return Policy">
    <section>
      <h2 className="text-xl font-black text-black mb-4 underline decoration-yellow-400">7-Day Exchange</h2>
      <p>Items must be unworn, with original tags and packaging. We offer exchanges or store credit only.</p>
    </section>
    <section>
      <h2 className="text-xl font-black text-black mb-4 underline decoration-yellow-400">Refunds</h2>
      <p>Refunds are only processed for defective items verified by our technical team within 48 hours of delivery.</p>
    </section>
  </InformationLayout>
);

export default ReturnPolicy;