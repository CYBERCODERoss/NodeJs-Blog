const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  technicalSkills: [{
    type: String
  }],
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  education: {
    type: String,
    required: true
  },
  workExperience: [{
    type: String
  }],
  contactInformation: {
    email: {
      type: String,
      required: true
    },
    github: {
      type: String
    },
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  aboutBlog: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);
