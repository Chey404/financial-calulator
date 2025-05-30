function calculateMetrics() {
  const profit = parseFloat(document.getElementById('profit').value);
  const shares = parseFloat(document.getElementById('shares').value);
  const price = parseFloat(document.getElementById('price').value);
  const assets = parseFloat(document.getElementById('assets').value);
  const liabilities = parseFloat(document.getElementById('liabilities').value);
  const expectedGrowth = parseFloat(document.getElementById('expectedGrowth').value);

  let errors = [];

  // Check for non-numeric input
  if (
    isNaN(profit) ||
    isNaN(shares) ||
    isNaN(price) ||
    isNaN(assets) ||
    isNaN(liabilities) ||
    isNaN(expectedGrowth)
  ) {
    document.getElementById('results').innerHTML = `
      <div class="alert alert-danger d-flex align-items-start" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bug me-2 mt-1 error-icon-animate" viewBox="0 0 16 16">
          <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"/>
        </svg>
        <div>
          Please enter a valid numeric value for all fields.
        </div>
      </div>
    `;
    return;
  }

  const EarningPerShare = shares !== 0 ? profit / shares : errors.push("Cannot divide by zero for Earnings Per Share (EPS)");
  const bookValue = assets - liabilities;
  const priceToBookRatio = bookValue !== 0 ? price / bookValue : errors.push("Cannot divide by zero for Price to Book Ratio");
  const priceToEarnings = EarningPerShare !== 0 ? price / EarningPerShare : errors.push("Cannot divide by zero for Price to Earnings Ratio");
  const priceEarningsToGrowth = expectedGrowth !== 0 ? priceToEarnings / expectedGrowth : errors.push("Cannot divide by zero for Price/Earnings to Growth Ratio");

  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = "";

  if (errors.length > 0) {
    document.getElementById('results').innerHTML = `
      <div class="alert alert-danger d-flex align-items-start" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bug me-2 mt-1" viewBox="0 0 16 16">
          <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"/>
        </svg>
        <div>
          ${errors.join("<br>")}
        </div>
      </div>
    `;
    return;
  }
  // If no errors, display the results
  resultDiv.innerHTML = `
    <div class="card p-3">
      <h4>Results:</h4>
      <ul class="list-group">
        <li class="list-group-item">Earnings Per Share (EPS): ${EarningPerShare.toFixed(2)}</li>
        <li class="list-group-item">Price to Book Ratio (P/B): ${priceToBookRatio
    .toFixed(2)}</li>
        <li class="list-group-item">Price to Earnings Ratio (P/E): ${priceToEarnings.toFixed(2)}</li>
        <li class="list-group-item">PEG (Price/Earnings to Growth) Ratio: ${priceEarningsToGrowth.toFixed(2)}</li>
      </ul>
    </div>
  `;
}

function clearResults() {
  // Reset the form to its default values
  document.getElementById('inputForm').reset();
  // Clear the results div
  document.getElementById('results').innerHTML = "";
}

function exportCSV() {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv.innerText.trim()) {
    alert('No results to export.');
    return;
  }
  // Extract the results from the list items
  const items = resultsDiv.querySelectorAll('li');
  let csv = 'Metric,Value\n';
  items.forEach(li => {
    const parts = li.innerText.split(':');
    if (parts.length === 2) {
      csv += `"${parts[0].trim()}","${parts[1].trim()}"\n`;
    }
  });
  // Create a blob and trigger download
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'financial_metrics.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
