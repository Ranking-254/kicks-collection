export const sendWhatsAppOrder = (product) => {
    // Kenyan format: 254 plus the number (removing the leading 0)
    const phoneNumber = "254701196150"; 
    
    const message = `*KICKS COLLECTION ORDER*%0A
*Item:* ${product.name}%0A
*Category:* ${product.category}%0A
*Size:* ${product.size}%0A
*Price:* KES ${product.price}%0A%0A
Please let me know if this is available for delivery!`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};