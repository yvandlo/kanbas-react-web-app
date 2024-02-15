import WorkingWithArrays from "./arrays/WorkingWithArrays";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import ES5Functions from "./functions/ES5Functions";
import FunctionDestructing from "./functions/FunctionDestructing";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import Destructing from "./json/Destructing";
import House from "./json/House";
import JsonStringify from "./json/JsonStringify";
import Spreading from "./json/Spreading";
import TemplateLiterals from "./string/TemplateLiterals";
import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import VariablesAndConstants
   from "./variables/VariablesAndConstants";

function JavaScript() {
   console.log('Hello World!')
   return (
      <div>
         <h1>JavaScript</h1>
         <VariablesAndConstants />
         <VariableTypes />
         <BooleanVariables />
         <IfElse />
         <TernaryOperator />
         <WorkingWithFunctions />
         <WorkingWithArrays />
         <JsonStringify />
         <TemplateLiterals />
         <House />
         <Spreading />
         <Destructing />
         <FunctionDestructing />
      </div>
   );
}
export default JavaScript