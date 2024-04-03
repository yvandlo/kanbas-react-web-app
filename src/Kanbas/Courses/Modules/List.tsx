import React, { useEffect, useState } from "react";
import "./index.css";
import { modules } from "../../Database/";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules
} from "./moduleReducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };
    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };


    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();


    return (
        <>
            {<div className="row justify-content-md-end">
                <div className="col-md-auto">
                    <button type="button" className="btn">Collapse All</button>
                </div>
                <div className="col-md-auto">
                    <button type="button" className="btn">View Progress</button>
                </div>
                <div className="col-md-auto">
                    <select className="form-select">
                        <option selected>Publish All</option>
                        <option value="1">Publish All</option>
                    </select>
                </div>
                <div className="col-md-auto">
                    <button type="button" className="btn bg-danger">Module</button>
                </div>
            </div>}

            <div className="card">
                <div className="card-body">
                    <button type="button" className="btn bg-danger"
                        onClick={() => handleAddModule()}> Add</button>
                    <button type="button" className="btn bg-danger"
                        onClick={() => handleUpdateModule()}>
                        Update
                    </button>
                    <br />
                    <input className="form-control" value={module.name}
                        onChange={(e) => dispatch(setModule({
                            ...module, name: e.target.value
                        }))}
                    />
                    <textarea className="form-control" value={module.description}
                        onChange={(e) => dispatch(setModule({
                            ...module, description: e.target.value
                        }))}
                    />
                </div>
            </div >

            <ul className="list-group wd-modules">
                {moduleList.filter((module) => module.course === courseId).map((module) => (
                    <li
                        className="list-group-item">
                        <div>
                            <FaEllipsisV className="me-2" />
                            {module.name}
                            <span className="float-end">
                                <button type="button" className="btn bg-danger" onClick={() => handleDeleteModule(module._id)}>Delete</button>
                                <button type="button" className="btn bg-success" onClick={() => dispatch(setModule(module))}>Edit</button>
                                <FaCheckCircle className="text-success" />
                                <FaPlusCircle className="ms-2" />
                                <FaEllipsisV className="ms-2" />
                            </span>
                            <br />
                            {module.description}
                        </div>

                        {(
                            <ul className="list-group">
                                {module.lessons?.map((lesson) => (
                                    <li className="list-group-item">
                                        <FaEllipsisV className="me-2" />
                                        {lesson.name}
                                        <span className="float-end">
                                            <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                        <br />
                                        {lesson.description}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default ModuleList;