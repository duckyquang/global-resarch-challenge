/**
 * Vercel Web Analytics Initialization
 * This script injects Vercel Web Analytics into the page.
 */

(function() {
  'use strict';
  
  // Vercel Web Analytics injection
  // This is the recommended approach for vanilla HTML/JS sites
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
  
  // Create and inject the analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  
  // Append to head
  var firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
})();
