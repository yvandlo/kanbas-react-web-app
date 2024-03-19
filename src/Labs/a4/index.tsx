import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DataStateVariables from "./DataStateVariables";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";

function sayHello() {
  alert("Hello");
}


const Assignment4 = () => {
  return (
    <>
      <h1>Assignment 4</h1>
      <ReduxExamples />
      <hr />
      <ParentStateComponent />
      <ArrayStateVariable />
      <ObjectStateVariable />
      <DataStateVariables />
      <StringStateVariables />
      <BooleanStateVariables />
      <Counter />
      <EventObject />
      <PassingFunctions theFunction={sayHello} />
      <PassingDataOnEvent />
      <ClickEvent />
    </>
  );
};
export default Assignment4;