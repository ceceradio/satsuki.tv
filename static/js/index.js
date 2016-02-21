$(document).ready(function() {
  $(".opener").click(function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $("#projects p").hide(200);
      //$("#projects .arrow").html("&#9658;");
      $("#projects .arrow").removeClass('active');
      return;
    }
    $("#projects p").hide(200);
    //$("#projects .arrow").html("&#9658;");
    $("#projects .arrow").removeClass('active');
    $("#"+$(this).data('child')).show(200);
    $("#projects div").removeClass('selected');
    $(this).addClass('selected').find('.arrow').addClass('active');
    //.find('.arrow').html('&#9660;');
  });
});