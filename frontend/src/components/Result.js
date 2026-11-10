import React from 'react';
import CodeComparison from './CodeComparison';

function Result({ resultData }) {
  if (!resultData) return null;

  return (
    <div className="mt-8 px-4 md:px-8">
      <CodeComparison resultData={resultData} />
    </div>
  );
}

export default Result;