import Scan from '../model/Scan.js';
import { scanCode } from '../services/aiServices.js';

const createScan = async (req, res) => {
  const { codeSnippet, language } = req.body;

  const newScan = new Scan({
    userId: req.user.id,
    codeSnippet,
    language,
    status: 'Pending',
  });

  try {
    await newScan.save();

    const aiResult = await scanCode(codeSnippet);

    if (!aiResult) {
      newScan.status = 'Failed';
      newScan.errorMessage = 'Failed to parse AI response.';
      await newScan.save();
      return res.status(500).send('Server Error: AI response was malformed.');
    }

    newScan.securityFindings = aiResult.issues || [];
    newScan.bestPractices = aiResult.refactor_plan ? [aiResult.refactor_plan] : [];
    newScan.status = 'Complete';
    newScan.errorMessage = undefined;

    const savedScan = await newScan.save();

    res.status(201).json(savedScan);

  } catch (err) {
    console.error(err.message);
    
    newScan.status = 'Failed';
    newScan.errorMessage = err.message;
    await newScan.save().catch(saveErr => {
        console.error("Failed to save the 'Failed' status:", saveErr.message);
    });

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
        codeSnippet: scan.codeSnippet.substring(0, 50) + (scan.codeSnippet.length > 50 ? '...' : ''),
        status: scan.status
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
