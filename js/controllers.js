app.controller('hmCtrl', function($scope, $filter, $state){
  $scope.assets = {
    face: [
      {name: "Face 1", url: "img/face/0.png"},
      {name: "Face 2", url: "img/face/1.png"},
      {name: "Face 3", url: "img/face/2.png"},
      {name: "Face 4", url: "img/face/3.png"},
      {name: "Face 5", url: "img/face/4.png"},
      {name: "Face 6", url: "img/face/5.png"},
    ],
    eyes: [
      { name: "Eye 1", url: "img/eyes/0.png", 
        L: { url: "img/eyes/0-L.png" }, 
        R: { url: "img/eyes/0-R.png" }
      },
      { name: "Eye 2", url: "img/eyes/1.png", 
        L: { url: "img/eyes/1-L.png" }, 
        R: { url: "img/eyes/1-R.png" }
      },
      { name: "Eye 3", url: "img/eyes/2.png", 
        L: { url: "img/eyes/2-L.png" }, 
        R: { url: "img/eyes/2-R.png" }
      },
      { name: "Eye 4", url: "img/eyes/3.png", 
        L: { url: "img/eyes/3-L.png" }, 
        R: { url: "img/eyes/3-R.png" }
      },
      { name: "Eye 5", url: "img/eyes/4.png", 
        L: { url: "img/eyes/4-L.png" }, 
        R: { url: "img/eyes/4-R.png" }
      },
      { name: "Eye 6", url: "img/eyes/5.png", 
        L: { url: "img/eyes/5-L.png" }, 
        R: { url: "img/eyes/5-R.png" }
      },
    ],
    mouth: [
      {name: "Mouth 1", url: "img/mouth/0.png"},
      {name: "Mouth 2", url: "img/mouth/1.png"},
      {name: "Mouth 3", url: "img/mouth/2.png"},
      {name: "Mouth 4", url: "img/mouth/3.png"},
      {name: "Mouth 5", url: "img/mouth/4.png"},
      {name: "Mouth 6", url: "img/mouth/5.png"},
    ]
  }

  $scope.config = {
    face: $scope.assets.face[0],
    eye1: "",
    eye2: "",
    mouth: "",
  }  

  $scope.opts = {
    jsonStr: "",
    modal: ""
  }

  $scope.addComponent = function(comp, type){
    switch(type){
      case 'face':
        $scope.config.face = comp;
      break;
      
      case 'eyes':
        comp.type = 'B';
        comp.show = true;

        if($scope.config.eye1 == ""){
          $scope.config.eye1 = comp;
          setTimeout(function(){
            $('.eye1 .eye-L').freetrans({ x: 80, y: 50, angle: 0 });
            $('.eye1 .eye-B').freetrans({ x: 80, y: 50, angle: 0 });
            $('.eye1 .eye-R').freetrans({ x: 200, y: 50, angle: 0 });
            $scope.toggleEye($scope.config.eye1, 'B', '.eye1');
          }, 0)
        }else if($scope.config.eye2 == ""){
          $scope.config.eye2 = comp;
          setTimeout(function(){
            $('.eye2 .eye-L').freetrans({ x: 80, y: 50, angle: 0 });
            $('.eye2 .eye-B').freetrans({ x: 80, y: 50, angle: 0 });
            $('.eye2 .eye-R').freetrans({ x: 200, y: 50, angle: 0 });
            $scope.toggleEye($scope.config.eye2, 'B', '.eye2');
          }, 0)
        }

      break;

      case 'mouth':
        $scope.config.mouth = comp;
        if($('.mouth:visible').length)
          $('.mouth').freetrans('destroy');
        setTimeout(function(){
          $(".mouth").freetrans({ x: 100, y: 200, angle: 0 });
        }, 0)
      break;
    }

  }

  $scope.toggleEye = function(eye, dir, el){
    eye.type = dir;
    $scope.config.eye1.show = true;
    $scope.config.eye2.show = true;
    if(dir == 'L'){
      $(el).find(".eye-L").show();
      $(el).find(".eye-L").siblings(".ft-controls").show();      
      $(el).find(".eye-B").hide();
      $(el).find(".eye-B").siblings(".ft-controls").hide();
      $(el).find(".eye-R").hide();
      $(el).find(".eye-R").siblings(".ft-controls").hide();
    }else if(dir == 'R'){
      $(el).find(".eye-L").hide();
      $(el).find(".eye-L").siblings(".ft-controls").hide();      
      $(el).find(".eye-B").hide();
      $(el).find(".eye-B").siblings(".ft-controls").hide();
      $(el).find(".eye-R").show();
      $(el).find(".eye-R").siblings(".ft-controls").show();
    }else if(dir == 'B'){
      if(el == '.eye1'){
        $scope.config.eye2.show = false;
      }else{
        $scope.config.eye1.show = false;
      }
      $(el).find(".eye-L").hide();
      $(el).find(".eye-L").siblings(".ft-controls").hide();
      $(el).find(".eye-B").show();
      $(el).find(".eye-B").siblings(".ft-controls").show();
      $(el).find(".eye-R").hide();
      $(el).find(".eye-R").siblings(".ft-controls").hide();
    }
  }


  $scope.downloadImage = function(){
    html2canvas(document.querySelector(".base"), { 
      backgroundColor: null,
      logging: false
    }).then(function(canvas){
      var link = document.createElement('a');
      var uri = canvas.toDataURL();
      if (typeof link.download === 'string') {
        link.href = uri;
        link.download = "emoji-dl-" + Date.now() + ".png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    });
  }

  $scope.removeComponent = function(type, subtype){
    switch(type){
      case 'eyes':
        if(subtype == "eye1"){
          $scope.config.eye1 = "";
          $('.eye1 .eyes').freetrans('destroy');
        }else if(subtype == "eye2"){
          $scope.config.eye2 = "";
          $('.eye2 .eyes').freetrans('destroy');
        }
      break;

      case 'mouth':
        $scope.config.mouth = "";
        $('.mouth').freetrans('destroy');
      break;
    }
  }

  $scope.openModal = function(type){
    $scope.opts.modal = type;
    if(type == "export"){
      var str = angular.copy($scope.config);
      if(str.eye1 != ""){
        str.eye1.L.data = $('.eye1 .eye-L').freetrans('getOptions');
        str.eye1.data = $('.eye1 .eye-B').freetrans('getOptions');
        str.eye1.R.data = $('.eye1 .eye-R').freetrans('getOptions');
      }

      if(str.eye2 != ""){
        str.eye2.L.data = $('.eye2 .eye-L').freetrans('getOptions');
        str.eye2.data = $('.eye2 .eye-B').freetrans('getOptions');
        str.eye2.R.data = $('.eye2 .eye-R').freetrans('getOptions');
      }
      
      if(str.mouth != "")
        str.mouth.data = $('.mouth').freetrans('getOptions');
      
      $scope.jsonStr = JSON.stringify(str);
    }else{
      $scope.jsonStr = "";      
    }
    $("#jsonModal").modal('show');
  }

  $scope.importJSON = function(){
    var obj = JSON.parse($scope.jsonStr);
    $scope.config.face = obj.face;

    if(obj.eye1 != ""){      
      $scope.config.eye1 = obj.eye1;
      setTimeout(function(){
        $('.eye1 .eye-L').freetrans(obj.eye1.L.data);
        $('.eye1 .eye-B').freetrans(obj.eye1.data);
        $('.eye1 .eye-R').freetrans(obj.eye1.R.data);
        delete $scope.config.eye1.L.data;
        delete $scope.config.eye1.data;
        delete $scope.config.eye1.R.data;
        $scope.toggleEye($scope.config.eye1, $scope.config.eye1.type, '.eye1')
      }, 0)
    }

    if(obj.eye2 != ""){      
      $scope.config.eye2 = obj.eye2;
      setTimeout(function(){
        $('.eye2 .eye-L').freetrans(obj.eye2.L.data);
        $('.eye2 .eye-B').freetrans(obj.eye2.data);
        $('.eye2 .eye-R').freetrans(obj.eye2.R.data);
        delete $scope.config.eye2.L.data;
        delete $scope.config.eye2.data;
        delete $scope.config.eye2.R.data;
        $scope.toggleEye($scope.config.eye2, $scope.config.eye2.type, '.eye2')
      }, 0)
    }

    if(obj.mouth != ""){
      $scope.config.mouth = obj.mouth;
      setTimeout(function(){
        $('.mouth').freetrans(obj.mouth.data);
        delete $scope.config.mouth.data;
      }, 0)
    }

    $("#jsonModal").modal('hide');
  }

  $(function(){
    $(".base").on('mouseenter', function(e){
      var el = $(".ft-controls");
      el.css("opacity", 1);
      el.siblings().css("outline", "1px solid rgba(0,0,0,.7)");
    })

    $(".base").on('mouseleave', function(e){
      var el = $(".ft-controls");
      el.css("opacity", 0);
      el.siblings().css("outline", "1px solid transparent");
    })
  })
})