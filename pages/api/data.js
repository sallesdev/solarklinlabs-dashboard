import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dataFilePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  res.status(200).json(jsonData);
}

