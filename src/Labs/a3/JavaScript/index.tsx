import IfElse from "./conditionals/IfElse";
import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import VariablesAndConstants
  from "./variables/VariablesAndConstants";

function JavaScript() {
    console.log('Hello World!')
    return(
       <div>
          <h1>JavaScript</h1>
          <VariablesAndConstants/>
          <VariableTypes/>
          <BooleanVariables/>
          <IfElse/>
       </div>
    );
 }
 export default JavaScript