import React from "react";
import CreateProject from "../Pages/CreateProject";
import ProjectManagement from "../Pages/ProjectManagement";

export interface RouterProps{
    [x: string]: any;
    path: string;
    component: React.ReactNode;
    icon?: React.ReactElement;
    label?: string;
    routers?: RouterProps[];
}

const projectRouter: RouterProps = {
    path: 'project',
    component: <ProjectManagement/>,
    routers: [
        {path: 'create', component: <CreateProject/>},
    ],
};

export const routers: RouterProps[] = [
    projectRouter,
];