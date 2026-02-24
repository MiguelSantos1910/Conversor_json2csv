function converter() {
  const input = document.getElementById("arquivo");
  const file = input.files[0];

  if (!file) {
    alert("Selecione um arquivo JSON!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const json = JSON.parse(e.target.result);

    // Converte JSON → CSV
    const parser = new json2csv.Parser();
    const csv = parser.parse(json);

    console.log(csv);
    baixarCSV(csv);
  };

  reader.readAsText(file);
}

function baixarCSV(csv) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "dados.csv";
  a.click();

  URL.revokeObjectURL(url);
}