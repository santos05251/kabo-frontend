import React from "react";
import "./styles.css";

const Checkbox = ({ onChange, label }) => (
  <div class="checkbox">
    <form>
      <div class="form-group">
        <input type="checkbox" id="html" onChange={onChange} />
        <label className="text-labelGray font-medium text-xs" for="html">
          {label}
        </label>
      </div>
    </form>
  </div>
);

export default Checkbox;
