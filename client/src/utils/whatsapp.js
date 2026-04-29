export const sendWhatsAppOrder = (product, selectedSize) => {
  // Pull the number from .env
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  if (!phoneNumber) {
    console.error("WhatsApp number not found in environment variables!");
    return;
  }

  const message = `Hello! I would like to order:
*Item:* ${product.name}
*Size:* ${selectedSize}
*Price:* KES ${product.price}
Please let me know how to proceed with payment and delivery. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};