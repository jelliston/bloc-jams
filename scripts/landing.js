var points = document.getElementsByClassName('point');

function revealPoints(i) {
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
        points[i].style.opacity = 1;
    }

document.addEventListener("DOMContentLoaded", function(){ 
for (var i = 0; i < points.length; i++) {
    revealPoints(i);
}
});

