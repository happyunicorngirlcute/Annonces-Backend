const express = require('express');
const router = express.Router();
const Annonce = require('../models/Annonce');

const CHAMPS_AUTORISES = [
  'titre', 'description', 'prix', 'surface', 'pieces',
  'type', 'ville', 'codePostal', 'balcon', 'jardin', 'statut', 'photos'
];

const BOOLEENS = ['balcon', 'jardin'];

function filtrerChamps(body) {
  const data = {};
  for (const champ of CHAMPS_AUTORISES) {
    if (body[champ] !== undefined) {
      data[champ] = body[champ];
    }
  }
  for (const champ of BOOLEENS) {
    if (typeof data[champ] === 'string') {
      data[champ] = data[champ] === 'true' || data[champ] === 'on' || data[champ] === '1';
    }
  }
  return data;
}

router.get('/', async (req, res) => {
  try {
    const annonces = await Annonce.find({ statut: 'active' }).sort({ dateCreation: -1 });
    res.render('index', { annonces });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/api', async (req, res) => {
  try {
    const annonces = await Annonce.find({ statut: 'active' }).sort({ dateCreation: -1 });
    res.json(annonces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/api/:id', async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);
    if (!annonce) return res.status(404).json({ message: 'Annonce non trouvée' });
    res.json(annonce);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/api', async (req, res) => {
  try {
    const data = filtrerChamps(req.body);
    const annonce = new Annonce(data);
    const saved = await annonce.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/api/:id', async (req, res) => {
  try {
    const data = filtrerChamps(req.body);
    const annonce = await Annonce.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!annonce) return res.status(404).json({ message: 'Annonce non trouvée' });
    res.json(annonce);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/api/:id', async (req, res) => {
  try {
    const annonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!annonce) return res.status(404).json({ message: 'Annonce non trouvée' });
    res.json({ message: 'Annonce supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
