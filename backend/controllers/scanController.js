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

export { createScan };
