// Gera as linhas da tabela ao carregar
window.onload = () => {
  const tbody = document.getElementById("itens");
  for (let i = 1; i <= 8; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i}</td>
      <td><input type="text" placeholder="Descrição do item"></td>
      <td><input type="number" min="0" oninput="calcularTotal(this)" placeholder="Qtd"></td>
      <td><input type="number" min="0" step="0.01" oninput="calcularTotal(this)" placeholder="R$"></td>
      <td><input type="text" disabled></td>
    `;
    tbody.appendChild(row);
  }
};

function calcularTotal(element) {
  const row = element.closest('tr');
  const qtd = parseFloat(row.querySelector('td:nth-child(3) input').value) || 0;
  const unit = parseFloat(row.querySelector('td:nth-child(4) input').value) || 0;
  const total = qtd * unit;
  row.querySelector('td:nth-child(5) input').value = total.toFixed(2);

  let totalGeral = 0;
  document.querySelectorAll('#itens tr').forEach(tr => {
    const itemTotal = parseFloat(tr.querySelector('td:nth-child(5) input').value) || 0;
    totalGeral += itemTotal;
  });
  document.getElementById('totalGeral').innerText = totalGeral.toFixed(2);
}

function gerarPDF() {
  const element = document.getElementById('nota');
  const opt = {
    margin: 0.5,
    filename: 'nota-fiscal.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
  