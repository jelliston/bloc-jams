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

$(window).load(function() {

    if ($(window).height() > 950) {
        animatePoints();
     }
    
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    $(window).scroll(function(event) {
        
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
        
    });

}