const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        alert(this.dataset.page);

    });

});