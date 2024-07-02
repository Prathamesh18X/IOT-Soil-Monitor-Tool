import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 10;
        },
        message: props => `${props.value} is not a valid serial number! It must be 10 characters long.`
      }
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "offline",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { 
    timestamps: true,
  }
);

// Use serial as the _id
deviceSchema.virtual("serial")
  .get(function() {
    return this._id;
  })
  .set(function(value) {
    this._id = value;
  });

export default mongoose.model("Device", deviceSchema);
