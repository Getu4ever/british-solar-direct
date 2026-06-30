// app/lib/email-utils.ts
export function getItemImage(item: any): string {
    return item.images?.[0] || 
           item.price?.product?.images?.[0] || 
           '';
  }
  
  export function formatItemHtml(item: any): string {
    const imageUrl = getItemImage(item);
    return `
      <div style="display: flex; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
        ${imageUrl ? `<img src="${imageUrl}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-right: 20px;" alt="${item.description}">` : ''}
        <div>
          <strong>${item.description || 'Solar Panel'}</strong><br>
          Quantity: ${item.quantity || 1}<br>
          Price: $${(item.amount_total / 100).toFixed(2)}
        </div>
      </div>
    `;
  }