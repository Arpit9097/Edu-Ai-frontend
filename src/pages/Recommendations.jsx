import React, { useState } from 'react';

const Recommendations = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match'); // 'match', 'cost-low', 'cost-high', 'rank'
  
  const filters = ['All', '🇺🇸 USA', '🇨🇦 Canada', '🇩🇪 Germany', 'Under ₹30L', 'MS CS'];
  
  const universities = [
    { flag: '🇺🇸', name: 'Arizona State University', loc: 'Tempe, Arizona · MS in CS', chance: 78, chanceClass: 'chance-high', cost: 38, dur: '2 yrs', rank: 200 },
    { flag: '🇨🇦', name: 'University of Waterloo', loc: 'Waterloo, Ontario · MEng CS', chance: 54, chanceClass: 'chance-med', cost: 32, dur: '1.5 yrs', rank: 112 },
    { flag: '🇩🇪', name: 'TU Munich', loc: 'Munich, Germany · MS Informatics', chance: 61, chanceClass: 'chance-med', cost: 12, dur: '2 yrs', rank: 37 },
    { flag: '🇺🇸', name: 'Northeastern University', loc: 'Boston, MA · MS in CS', chance: 82, chanceClass: 'chance-high', cost: 42, dur: '2 yrs', rank: 326 },
  ];

  // 1. Filter by country chip / criteria
  let filtered = universities.filter(u => {
    if (activeFilter === 'All') return true;
    if (activeFilter === '🇺🇸 USA') return u.flag === '🇺🇸';
    if (activeFilter === '🇨🇦 Canada') return u.flag === '🇨🇦';
    if (activeFilter === '🇩🇪 Germany') return u.flag === '🇩🇪';
    if (activeFilter === 'Under ₹30L') return u.cost < 30;
    if (activeFilter === 'MS CS') return u.loc.toLowerCase().includes('cs') || u.loc.toLowerCase().includes('informatics');
    return true;
  });

  // 2. Filter by search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(u => u.name.toLowerCase().includes(q) || u.loc.toLowerCase().includes(q));
  }

  // 3. Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'match') return b.chance - a.chance;
    if (sortBy === 'cost-low') return a.cost - b.cost;
    if (sortBy === 'cost-high') return b.cost - a.cost;
    if (sortBy === 'rank') return a.rank - b.rank;
    return 0;
  });

  return (
    <div id="page-recommendations">
      <div className="reco-header">
        <div>
          <h2>University Recommendations</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>AI-matched lists based on your standings and preferences.</p>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="search-filter-container">
        <div className="search-row">
          <div className="search-input-wrap">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by university name or course program..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="match">Sort by Match Chance</option>
            <option value="rank">Sort by QS World Rank</option>
            <option value="cost-low">Sort by Cost: Low to High</option>
            <option value="cost-high">Sort by Cost: High to Low</option>
          </select>
        </div>

        {/* Filter Chips */}
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
      </div>
      
      {/* University Grid Cards */}
      <div className="uni-grid">
        {filtered.map((uni, idx) => (
          <div key={idx} className="uni-card">
            <div className="uni-card-header">
              <div className="uni-flag">{uni.flag}</div>
              <div className="uni-rank-badge"># {uni.rank} QS Rank</div>
            </div>
            <div className="uni-name">{uni.name}</div>
            <div className="uni-loc">{uni.loc}</div>
            
            <div className="uni-stats">
              <div className="uni-stat">
                <div className={`val ${uni.chanceClass}`}>{uni.chance}%</div>
                <div className="lbl">Admit Chance</div>
              </div>
              <div className="uni-stat">
                <div className="val">₹{uni.cost}L</div>
                <div className="lbl">Total Tuition</div>
              </div>
              <div className="uni-stat">
                <div className="val">{uni.dur}</div>
                <div className="lbl">Duration</div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No matching universities found for the active search or filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
