var points = document.getElementsByClassName('point');

var animatePoints = function (points) {

    var revealPoints = function(i) {
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
        points[i].style.opacity = 1;
    }

    for (var i = 0; i < points.length; i++) {
            revealPoints(i);
        }
};

window.onload = function() {

    // Automatically animate the points on a tall screen where scrolling can't trigger the animation
     if (window.innerHeight > 950) {
         animatePoints(points);
     }
    
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    window.addEventListener('scroll',function(event) {
        
        if (document.body.scrollTop >= scrollDistance) {
            animatePoints(points);
        }
        
    });

}