// Main JavaScript file
console.log('Grocery Store app initialized');

// Initialize shopping bag count
document.addEventListener('DOMContentLoaded', function() {
  const shoppingBagCount = document.querySelector('.shopping-bag__count');
  
  // Example: Update shopping bag count when clicking on feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length > 0) {
    featureCards.forEach(card => {
      card.addEventListener('click', function() {
        const currentCount = parseInt(shoppingBagCount.textContent) || 0;
        shoppingBagCount.textContent = currentCount + 1;
      });
    });
  }
});
