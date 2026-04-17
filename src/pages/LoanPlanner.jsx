import React, { useState } from 'react';

const LoanPlanner = () => {
  const [loanAmt, setLoanAmt] = useState(25);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(7);

  const P = loanAmt * 100000;
  const r = (rate / 12) / 100;
  const n = tenure * 12;
  const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  return (
    <div id="page-loan">
      <div className="loan-wrap">
        <h2 style={{fontSize: '18px', fontWeight: 500, marginBottom: '16px'}}>Loan Planner</h2>
        
        <div className="loan-eligibility">
          <h3>✦ Loan eligibility</h3>
          <div className="loan-amount">₹25,00,000</div>
          <div className="loan-sub">You are eligible for an education loan — based on your profile</div>
          <button className="btn-primary" style={{marginTop: '14px', fontSize: '13px', padding: '9px 20px'}}>Apply Now →</button>
        </div>

        <div className="emi-calc">
          <h3>EMI Calculator</h3>
          
          <div className="emi-row">
            <span className="emi-label">Loan amount</span>
            <input type="range" min="5" max="50" value={loanAmt} onChange={e => setLoanAmt(Number(e.target.value))} style={{width: '140px'}} />
            <span style={{fontSize: '13px', fontWeight: 500, minWidth: '40px', textAlign: 'right'}}>₹{loanAmt}L</span>
          </div>

          <div className="emi-row">
            <span className="emi-label">Interest rate</span>
            <input type="range" min="7" max="15" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} style={{width: '140px'}} />
            <span style={{fontSize: '13px', fontWeight: 500, minWidth: '40px', textAlign: 'right'}}>{rate}%</span>
          </div>

          <div className="emi-row">
            <span className="emi-label">Tenure</span>
            <input type="range" min="1" max="15" value={tenure} onChange={e => setTenure(Number(e.target.value))} style={{width: '140px'}} />
            <span style={{fontSize: '13px', fontWeight: 500, minWidth: '40px', textAlign: 'right'}}>{tenure} yrs</span>
          </div>

          <div className="emi-result">
            <div className="emi-val">₹{emi.toLocaleString('en-IN')}</div>
            <div className="emi-lbl">Estimated monthly EMI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPlanner;
