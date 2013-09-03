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
      id='add_to_oven'> Add to Oven </li>")
  }
}

var addToOven = {
  init: function() {
    $('#prep_batches').on("click", "#add_to_oven", function(e){
      console.log(e)
      alert('Cookie time motherfucker!')
      $(this).closest('li').remove()
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
      prepTable.append(batch)
    })
  }
}

$(document).ready(function() {
  bakeryForm.get()
  addToOven.init()
});
