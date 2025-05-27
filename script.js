function calculateMetrics() {
  const profit = parseFloat(document.getElementById('profit').value);
  const shares = parseFloat(document.getElementById('shares').value);
  const price = parseFloat(document.getElementById('price').value);
  const assets = parseFloat(document.getElementById('assets').value);
  const liabilities = parseFloat(document.getElementById('liabilities').value);
  const growth = parseFloat(document.getElementById('growth').value);

  let errors = [];

  const eps = shares !== 0 ? profit / shares : errors.push("Cannot divide by zero for EPS");
  const bookValue = assets - liabilities;
  const pb = bookValue !== 0 ? price / bookValue : errors.push("Cannot divide by zero for P/B Ratio");
  const pe = eps !== 0 ? price / eps : errors.push("Cannot divide by zero for P/E Ratio");
  const peg = growth !== 0 ? pe / growth : errors.push("Cannot divide by zero for PEG Ratio");

  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = "";

  if (errors.length > 0) {
    resultDiv.innerHTML = `<div class="alert alert-danger">${errors.join("<br>")}</div>`;
    return;
  }

  resultDiv.innerHTML = `
    <div class="card p-3">
      <h4>Results:</h4>
      <ul class="list-group">
        <li class="list-group-item">EPS: ${eps.toFixed(2)}</li>
        <li class="list-group-item">P/B Ratio: ${pb.toFixed(2)}</li>
        <li class="list-group-item">P/E Ratio: ${pe.toFixed(2)}</li>
        <li class="list-group-item">PEG Ratio: ${peg.toFixed(2)}</li>
      </ul>
    </div>
  `;
}

function clearResults() {
  document.getElementById('results').innerHTML = "";
}
