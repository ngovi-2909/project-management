import React, {useEffect, useState} from "react";
import {Table, TableProps, Space, Button, Modal, Alert, message} from "antd";
import '../common/css/common.css';
import SearchComponent from "../common/components/SearchComponent";
import {AntDesignOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import ProjectApiService from "../common/api/Project";
import {Project} from "../common/types/Project";
import { useNavigate } from 'react-router-dom';
const ProjectManagement: React.FC = () => {
    const [data, setData] = useState();
    const [projectTypes, setProjectTypes] = useState();
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const { confirm } = Modal;

    useEffect(() => {
        const fetchData = async () => {
            const project = await ProjectApiService.getProject();
            const projectType = await ProjectApiService.getProjectType();

            setData(project);
            setProjectTypes(projectType);
        };
        fetchData();
    }, []);


    const handleClick = () => {
          navigate("/create");
    };

    const handleEditClick = (code: string) => {
        navigate("/edit?code="+code);
    };

    const handleDeleteClick = (code : string) => {
        confirm({
            title: 'Delete Project',
            icon: <ExclamationCircleFilled />,
            content: 'Do you want to delete project code ' + code + '?',
            onOk(){
                return new Promise<void>((resolve, reject) => {
                    try{
                        const statusResult = ProjectApiService.deleteProject(code);
                        setTimeout(() => {
                            message.success('Delete project successfully', 1);
                            // @ts-ignore
                            setData((prevData) => prevData.filter((item: { code: number }) => item.code !== code));
                            Math.random() > 0.5 ? resolve() : reject();
                        }, 1000);
                    }catch(error){
                        message.error('Cannot delete project code ' + code);
                    }
                }).catch(() => message.error('Cannot delete project code ' + code));
            },
            onCancel: handleCancelDelete,
        });
    };

    const handleCancelDelete = () =>{
        setOpen(!isOpen);
    };

    const handleUpdateProject = async (updatedProjects: any[]) => {
        // @ts-ignore
        setData(updatedProjects);
    };

    const columns: TableProps<Project>['columns'] = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.code.localeCompare(b.code),
        },
        {
            title: 'Project Name',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean) => status ? 'Enabled' : 'Disabled',
        },
        {
            title: 'Type',
            dataIndex: 'project_type_id',
            key: 'project_type_id',
            render: (projectTypeId: number) => {
                // @ts-ignore
                const projectType = projectTypes.map((type: { id: number; name: string; }) => type.id === projectTypeId && type.name).find(Boolean);

                return projectType || 'Unknown';
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost onClick={() => handleEditClick(record.code)}>Edit</Button>
                    <Button danger onClick={() => handleDeleteClick(record.code)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="card" style={{margin: '50px auto', padding: '0px 50px'}}>
                <h1>List of projects</h1>
                <div className="right-btn">
                    <Button type="primary" size="large" icon={<AntDesignOutlined/>} onClick={handleClick}>Add</Button>
                </div>
                <div className="search-component">
                    <SearchComponent projectTypes={projectTypes} onProjectUpdate={handleUpdateProject}/>
                </div>
                <Table dataSource={data} columns={columns} pagination={{
                    position: ['bottomLeft'],
                    pageSize: 50,
                    size: 'default'
                }}/>

            </div>
        </div>

    );
};

export default ProjectManagement;