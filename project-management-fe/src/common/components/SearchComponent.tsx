import {Button, Form, Input, Select} from "antd";
import React, {useEffect, useState} from "react";
import {ProjectType} from "../types/ProjectType";
import Project from "../api/Project";
import ProjectApiService from "../api/Project";
import project from "../api/Project";


const SearchComponent = (props: any) => {
    const {Option} = Select;
    const [form] = Form.useForm();
    // @ts-ignore
    const storedName = JSON.parse(localStorage.getItem('projectName'));
    // @ts-ignore
    const storedType = JSON.parse(localStorage.getItem('projectType'));
    const [projectName, setProjectName] = useState(storedName);
    const [projectType, setProjectType] = useState(storedType);
    const formStyle = {
        maxWidth: 'none',
        borderRadius: '10px',
        padding: 24,
        margin: '0 auto',
    };
    const [project, setProject] = useState();
    const onFinish = async () => {
        const projectName = form.getFieldValue('name');
        const type = form.getFieldValue('project_type_id');
        const project = await ProjectApiService.searchProject(projectName, type);
        localStorage.setItem('projectName', JSON.stringify(projectName));
        localStorage.setItem('projectData', JSON.stringify(project));
        localStorage.setItem('projectType', JSON.stringify(type));

        await props.onProjectUpdate(project);
    };

    useEffect( () => {
        form.setFieldsValue({
            name: projectName,
            project_type_id: projectType
        });
    }, []);

    return (
        <>
            <Form style={formStyle} wrapperCol={{span: 16}} layout="inline" onFinish={onFinish} form={form}
            >
                <Form.Item
                    label="Project name"
                    name="name"
                    style={{width: 'calc(60% - 8px)'}}
                    rules={[
                        {pattern: /^[a-zA-Z0-9\s]+$/, message: 'Project name must not contain special characters'},
                    ]}
                >
                    <Input size="large" placeholder="Project name..." maxLength={200} value={projectName}/>
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="project_type_id"
                    style={{width: 'calc(15% - 8px)'}}
                >
                    <Select size="large"
                            style={{width: 120}}
                    >
                        <option value="">All</option>
                        {props.projectTypes && Array.isArray(props.projectTypes) && props.projectTypes.length > 0 && (
                            props.projectTypes.map((item: ProjectType) => (
                                <option key={item.id} value={item.id} label={item.name}>
                                    {item.name}
                                </option>
                            ))
                        )}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large">
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default SearchComponent;