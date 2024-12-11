const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

function excelToJson(filePath) {
  // Lê o arquivo Excel
  const workbook = XLSX.readFile(filePath);
  
  // Assume que queremos a primeira planilha
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Converte para JSON
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  
  // Salva o JSON em um arquivo
  const jsonFilePath = path.join(__dirname, '..', 'data', 'data.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
  
  console.log(`Dados convertidos e salvos em ${jsonFilePath}`);
}

// Caminho para o seu arquivo Excel
const excelFilePath = path.join(__dirname, '..', 'data', 'dados.xlsx');
excelToJson(excelFilePath);

