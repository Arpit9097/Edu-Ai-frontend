import React, { useState } from 'react';

const LoanPlanner = () => {
  const [loanAmt, setLoanAmt] = useState(25); // In Lakhs
  const [rate, setRate] = useState(10); // Percentage
  const [tenure, setTenure] = useState(7); // Years

  const P = loanAmt * 100000;
  const r = (rate / 12) / 100;
  const n = tenure * 12;
  
  // Calculate EMI
  const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  
  // Calculate Totals
  const totalPayable = emi * n;
  const totalInterest = totalPayable - P;
  
  // Percentages for breakdown bar
  const principalPct = (P / totalPayable) * 100;
  const interestPct = 100 - principalPct;

  return (
    <div id="page-loan">
      <div className="loan-wrap">
        <h2 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>Education Loan Planner</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Estimate monthly repayments, loan limits, and plan your interest breakdown.</p>
        
        {/* Pre-approved Offer Card */}
        <div className="loan-eligibility">
          <div className="loan-elig-info">
            <h3>✦ Pre-Approved Limit Estimate</h3>
            <div className="loan-amount">₹35,00,000</div>
            <div className="loan-sub">Based on your academic profile and target degree preferences.</div>
          </div>
          <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>Apply Pre-Visa →</button>
        </div>

        {/* Layout Grid */}
        <div className="loan-layout-grid">
          {/* Sliders Control Panel */}
          <div className="emi-calc">
            <h3>Configure Loan Details</h3>
            
            <div className="emi-row">
              <div className="emi-row-label-strip">
                <span>Select Loan Amount</span>
                <span>₹{loanAmt} Lakhs</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={loanAmt} 
                onChange={e => setLoanAmt(Number(e.target.value))} 
                className="emi-slider"
              />
            </div>

            <div className="emi-row">
              <div className="emi-row-label-strip">
                <span>Annual Interest Rate</span>
                <span>{rate}%</span>
              </div>
              <input 
                type="range" 
                min="7" 
                max="15" 
                step="0.5" 
                value={rate} 
                onChange={e => setRate(Number(e.target.value))} 
                className="emi-slider"
              />
            </div>

            <div className="emi-row">
              <div className="emi-row-label-strip">
                <span>Repayment Tenure</span>
                <span>{tenure} Years</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="15" 
                value={tenure} 
                onChange={e => setTenure(Number(e.target.value))} 
                className="emi-slider"
              />
            </div>
          </div>

          {/* Results Analysis Panel */}
          <div className="emi-result-panel">
            <div className="emi-result">
              <div className="emi-val">₹{emi.toLocaleString('en-IN')}</div>
              <div className="emi-lbl">Estimated Monthly EMI</div>
            </div>

            {/* Principal vs Interest Visual breakdown */}
            <div className="breakdown-bar">
              <div className="breakdown-fill-principal" style={{ width: `${principalPct}%` }}></div>
              <div className="breakdown-fill-interest" style={{ width: `${interestPct}%` }}></div>
            </div>

            <div className="breakdown-list">
              <div className="breakdown-row">
                <span>
                  <span className="breakdown-dot" style={{ backgroundColor: 'var(--primary)' }}></span>
                  Principal Amount
                </span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>₹{P.toLocaleString('en-IN')}</span>
              </div>
              <div className="breakdown-row">
                <span>
                  <span className="breakdown-dot" style={{ backgroundColor: 'var(--secondary-light)' }}></span>
                  Total Interest Charges
                </span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-main)', margin: '12px 0' }} />
              <div className="breakdown-row" style={{ fontSize: '14px', fontWeight: 700 }}>
                <span>Total Repayable Amount</span>
                <span style={{ color: 'var(--primary)' }}>₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPlanner;
