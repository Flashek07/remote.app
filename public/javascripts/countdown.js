
        var timeleft = 3;
        var downloadTimer = setInterval(function(){
          if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Gotowy!";
          } else {
            document.getElementById("countdown").innerHTML = "Poczekaj " + timeleft + " senukdy" ;
          }
          timeleft  -= 1;
        }, 1000);
