document.addEventListener('DOMContentLoaded', function() {
  // Find all brand circle links
  const brandLinks = document.querySelectorAll('.brand-circles .card__inner');
  
  if (brandLinks.length > 0) {
    brandLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Get the collection title (brand name)
        const brandName = this.closest('li').querySelector('.card__heading')?.textContent.trim();
        
        if (brandName) {
          // Redirect to all products with vendor filter
          window.location.href = '/collections/all?filter.v.vendor=' + encodeURIComponent(brandName);
        }
      });
    });
  }
});