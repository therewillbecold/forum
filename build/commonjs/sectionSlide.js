"use strict";

$("#moduleSlide").mouseenter(function () {
  $("#sectionSlide").show();
  $("#hlcircle").show();
});
$("#moduleSlide").mouseleave(function () {
  $("#sectionSlide").hide();
  $("#hlcircle").hide();
});