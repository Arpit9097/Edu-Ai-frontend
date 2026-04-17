import React, { useState } from 'react';

const Recommendations = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', '🇺🇸 USA', '🇨🇦 Canada', '🇩🇪 Germany', 'Under ₹30L', 'MS CS'];
  const universities = [
    { flag: '🇺🇸', name: 'Arizona State University', loc: 'Tempe, Arizona · MS in CS', chance: '78%', chanceClass: 'chance-high', cost: '₹38L', dur: '2 yrs' },
    { flag: '🇨🇦', name: 'University of Waterloo', loc: 'Waterloo, Ontario · MEng CS', chance: '54%', chanceClass: 'chance-med', cost: '₹32L', dur: '1.5 yrs' },
    { flag: '🇩🇪', name: 'TU Munich', loc: 'Munich, Germany · MS Informatics', chance: '61%', chanceClass: 'chance-med', cost: '₹12L', dur: '2 yrs' },
    { flag: '🇺🇸', name: 'Northeastern University', loc: 'Boston, MA · MS in CS', chance: '82%', chanceClass: 'chance-high', cost: '₹42L', dur: '2 yrs' },
  ];

  const filteredUnis = activeFilter === 'All' 
    ? universities 
    : universities.filter(u => u.flag.includes(activeFilter.split(' ')[0]) || activeFilter.includes('Under') && parseInt(u.cost.replace('₹', '').replace('L', '')) < 30);

  return (
    <div id="page-recommendations">
      <div className="reco-header">
        <h2>University Recommendations</h2>
      </div>
      
      <div className="filter-row">
        {filters.map(f => (
          <div 
            key={f} 
            className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </div>
        ))}
      </div>
      
      <div className="uni-grid">
        {filteredUnis.map((uni, idx) => (
          <div key={idx} className="uni-card">
            <div className="uni-flag">{uni.flag}</div>
            <div className="uni-name">{uni.name}</div>
            <div className="uni-loc">{uni.loc}</div>
            <div className="uni-stats">
              <div className="uni-stat"><div className={`val ${uni.chanceClass}`}>{uni.chance}</div><div className="lbl">Admit chance</div></div>
              <div className="uni-stat"><div className="val">{uni.cost}</div><div className="lbl">Total cost</div></div>
              <div className="uni-stat"><div className="val">{uni.dur}</div><div className="lbl">Duration</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
