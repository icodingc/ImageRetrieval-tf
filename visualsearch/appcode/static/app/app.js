/**
 * Created by aub3 on 5/1/15.
 */
var canvas = new fabric.Canvas('canvas'),
    output_canvas = document.getElementById('output_canvas'),
    width = canvas.getWidth(),
    height = canvas.getHeight(),
    jqwindow = $(window),
    delta_left = 0,
    delta_top = 0,
    yax = $('#yaxis'),
    state = {
        'images':[],
        'masks_present':false,
        'recompute':true,
        'results':{},
        canvas_data:null,
        mask_data:null,
        'options':{
            'pf':null,
            'slic':null
        }
    },
    network_editor,network_train_editor,network_test_editor;



initialize_ui = function () {
    var jsfeat_gui = new dat.GUI({ autoPlace: false });
    var slic_opt;
    slic_opt = function () {
    this.regionSize = 30;
    this.minSize = 20;
    };
    state.options.slic = new slic_opt();
    var slic_gui = jsfeat_gui.addFolder('Superpixel Segmentation');
    slic_gui.add(state.options.slic, "regionSize", 20, 400);
    slic_gui.add(state.options.slic, "minSize", 2, 100);
    $("#dat_gui").append(jsfeat_gui.domElement);
    canvas.backgroundColor = '#ffffff';
    $('#bg-color').val('#ffffff');
    canvas.renderAll();
    yax.hide();
    $('#imgfile').on("change",function(){
        file = this.files[0];
        fr = new FileReader();
        fr.onload = function () {
            img = new Image();
            img.onload = function () {
                fabric.Image.fromURL(img.src, function (oImg) {
                canvas.add(oImg);
                });
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(file);
    });
//    fabric.Image.fromURL("/static/img/demo.jpg", function(oImg){canvas.add(oImg);},load_options = {crossOrigin:"Anonymous"});
};

    function renderVieportBorders() {
      var ctx = canvas.getContext();
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(
        canvas.viewportTransform[4],
        canvas.viewportTransform[5],
        canvas.getWidth() * canvas.getZoom(),
        canvas.getHeight() * canvas.getZoom());
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        canvas.viewportTransform[4],
        canvas.viewportTransform[5],
        canvas.getWidth() * canvas.getZoom(),
        canvas.getHeight() * canvas.getZoom());
      ctx.restore();
    }


(function() {
    $(canvas.getElement().parentNode).on('mousewheel', function(e) {
      var newZoom = canvas.getZoom() + e.deltaY / 300;
        if (newZoom > 0.1 && newZoom < 10){
            canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);
            state.recompute = true;
            renderVieportBorders();
        }
      return false;
    });

    var viewportLeft = 0,
        viewportTop = 0,
        mouseLeft,
        mouseTop,
        _drawSelection = canvas._drawSelection,
        isDown = false;

    canvas.on('mouse:down', function(options) {
      isDown = true;
      viewportLeft = canvas.viewportTransform[4];
      viewportTop = canvas.viewportTransform[5];
      mouseLeft = options.e.x;
      mouseTop = options.e.y;
      if (options.e.altKey) {
        _drawSelection = canvas._drawSelection;
        canvas._drawSelection = function(){ };
      }
      renderVieportBorders();
    });

    canvas.on('mouse:move', function(options) {
      if (options.e.altKey && isDown) {
        var currentMouseLeft = options.e.x;
        var currentMouseTop = options.e.y;
        var deltaLeft = currentMouseLeft - mouseLeft,
            deltaTop = currentMouseTop - mouseTop;
        canvas.viewportTransform[4] = viewportLeft + deltaLeft;
        canvas.viewportTransform[5] = viewportTop + deltaTop;
        canvas.renderAll();
        renderVieportBorders();
      }
    });

    canvas.on('mouse:up', function() {
      canvas._drawSelection = _drawSelection;
      isDown = false;
    });
  })();



(function() {
  fabric.util.addListener(fabric.window, 'load', function() {
    var canvas = this.__canvas || this.canvas,
        canvases = this.__canvases || this.canvases;

    canvas && canvas.calcOffset && canvas.calcOffset();

    if (canvases && canvases.length) {
      for (var i = 0, len = canvases.length; i < len; i++) {
        canvases[i].calcOffset();
      }
    }
  });
})();

// Define the tour!
var tour = {
  id: "hello-hopscotch",
  showPrevButton:true,
  zindex:-1,
  steps: [
    {
      title: "Click here to add image",
      content: "You can only upload one image at a time. But you can repeat the process to add more images and rearrange them.",
      target: document.querySelector("#btnLoad"),
      placement: "bottom"
    },
    {
      title: "Click inside to select, resize and move images",
      content: "Use this canvas to position and resize images.",
      target: document.querySelector("#canvas"),
      onShow:function(){
        fabric.Image.fromURL("/static/img/demo.jpg", function(oImg){canvas.add(oImg);},load_options = {crossOrigin:"Anonymous"});
        state.recompute = true;
      },
      placement: "right"
    },
    {
      title: "Hide sensitive information",
      content: "Mark regions to exclude. ",
      target: document.querySelector("#drawing-mode_b"),
      placement: "bottom"
    },
    {
      title: "Click to Search",
      content: "Search for similar images",
      target: document.querySelector("#segment"),
      placement: "right"
    }
  ]
};



$(document).ready(function(){
    initialize_ui();
    $('#introModal').modal();
    hopscotch.startTour(tour);
});


