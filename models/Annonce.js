const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  surface: { type: Number },
  pieces: { type: Number },
  type: { type: String, enum: ['appartement', 'maison', 'terrain', 'local'], required: true },
  ville: { type: String, required: true },
  codePostal: { type: String },
  balcon: { type: Boolean, default: false },
  jardin: { type: Boolean, default: false },
  statut: { type: String, enum: ['active', 'inactive', 'archive'], default: 'active' },
  photos: [String],
  dateCreation: { type: Date, default: Date.now },
  dateModification: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Annonce', annonceSchema);
