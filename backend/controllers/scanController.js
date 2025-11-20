import Scan from '../models/Scan.js';

const createScan = async (req, res) => {
  try {
    const { codeSnippet, language } = req.body;
    const newScan = new Scan({
      userId: req.user.id,
      codeSnippet,
      language,
    });
    const scan = await newScan.save();
    res.status(201).json({
      id: scan._id,
      timestamp: scan.timestamp,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllScans = async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .select('_id timestamp language codeSnippet');
    
    const truncatedScans = scans.map(scan => ({
        _id: scan._id,
        timestamp: scan.timestamp,
        language: scan.language,
        codeSnippet: scan.codeSnippet.substring(0, 50) + (scan.codeSnippet.length > 50 ? '...' : '')
    }));

    res.json(truncatedScans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getScanById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);

    if (!scan) {
      return res.status(404).json({ msg: 'Scan not found' });
    }

    // Ensure user owns the scan
    if (scan.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(scan);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Scan not found' });
    }
    res.status(500).send('Server Error');
  }
};

export { createScan, getAllScans, getScanById };
