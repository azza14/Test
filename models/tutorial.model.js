
// const Tutorial = mongoose.Schema;

//  const schema = new Tutorial(
//      {
//     title: String,
//     description: String,
//     published: Boolean
//     },
//     {Timestamp:true}
// );
//module.exports =mongoose.model('Tutorial',schema);

module.exports = mongoose => 
{
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    );
  

schema.method("toJson",function()
{
    const{ __v, _id, ...object}= this.toObject();
    object.id=_id;
    return object;
});

const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
