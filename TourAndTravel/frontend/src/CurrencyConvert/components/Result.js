import React from "react";

export const Result = ({ value = 0 }) => {
  return (
    <label className="result">
      <div className="label-con">Result:</div>
      <input type="text" value={value} disabled={true} />
    </label>
  );
};
