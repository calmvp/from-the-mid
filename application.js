var batchArray = []

var Batch = function(batch_type, bake_time){
  this.batch_type = batch_type
  this.bake_time = bake_time
  this.doneness = function(doneness){
    this.status = doneness || "raw"
  }
}

var prepTable = {
  append: function(batch) {
    batchArray.push(batch)
    $('#prep_batches').append("<li>"+batch.batch_type+ "<button type='button',\
      id='add_to_oven'> Add to Oven</button></li>")
  }
}

var addToOven = {
  init: function() {
    $('#prep_batches').on("click", "#add_to_oven", function(){
      alert('Cookie time motherfucker!')
      var indexPosition = $(this).parent().index('li')
      console.log(indexPosition)
      var cookie = batchArray[indexPosition]
      oven.rackArray.push(cookie)
      batchArray.splice(indexPosition, 1)
      $(this).closest('li').remove()
      var rack = $('td:contains("[empty]")').first()
      cookieStatus.update(rack, cookie)
    }) 
  }
}

var cookieStatus = {
  update: function(rack, cookie){
    color = "red"
    rack.html(cookie.batch_type + " " + cookie.status)
      if (cookie.status == "still_gooey"){
        color = "yellow"
      }
      else if (cookie.status == "just_right"){
        color = "green"
      }
      else if (cookie.status == "crispy"){
        color = "black"
      }
    rack.css({"background-color": color, "color": "white"})}
}

var oven = {
  rackArray: [],
  timeBaked: 0,
  bake: function(){
    $("#bake").on('click', function(){
      oven.timeBaked += 1
      for (var i = 0; i < oven.rackArray.length; i++){
        cookie = oven.rackArray[i]
        rackPosition = i + 1
        rack = $("td:contains("+cookie.batch_type+")")
        if ( oven.timeBaked > cookie.bake_time){
          cookie.doneness("crispy")
        }
        else if (oven.timeBaked == cookie.bake_time){
          cookie.doneness("just_right")
        }
        else {
          cookie.doneness("still_gooey")
        }
         cookieStatus.update(rack, cookie)
      }
    })
  }
}

var bakeryForm = {
  get: function() {
    $("#new_batch").on("submit", function(e){
      e.preventDefault();
      var type = $(this).find("input[name=batch_type]").val()
      var time = $(this).find("input[name=bake_time]").val()
      batch = new Batch(type, time)
      batch.doneness()
      prepTable.append(batch)
    })
  }
}

$(document).ready(function() {
  bakeryForm.get()
  addToOven.init()
  oven.bake()
});
