import React from "react";
import "./styles.css";

const Checkbox = ({ onChange, label }) => (
  <div className="checkbox">
    <form>
      <div className="form-group">
        <input type="checkbox" id="html" onChange={onChange} />
        <label className="text-labelGray font-medium text-xs" htmlFor="html">
          {label}
        </label>
      </div>
    </form>
  </div>
);

export default Checkbox;
