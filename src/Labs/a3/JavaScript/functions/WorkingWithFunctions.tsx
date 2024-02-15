import ArrowFunctions from "./ArrowFunctions";
import ES5Functions from "./ES5Functions";
import FunctionParenthesisAndParameters from "./FunctionsParenthesisAndParameters";
import ImpliedReturn from "./ImpliedReturn";

function WorkingWithFunctions() {
    console.log('Hello World!')
    return (
        <div>
            <ES5Functions />
            <ArrowFunctions />
            <ImpliedReturn />
            <FunctionParenthesisAndParameters />
        </div>
    );
}
export default WorkingWithFunctions