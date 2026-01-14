// Optional: highlight current nav link
(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a[data-page]").forEach(a=>{
    if(a.getAttribute("data-page") === path) a.style.color = "var(--text)";
  });
})();
