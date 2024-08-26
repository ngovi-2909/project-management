import {Alert, Button, Flex, Form, Input, message, Radio, Select, Space} from 'antd';
import {ProjectType} from '../types/ProjectType';
import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import ProjectApiService from '../api/Project';
import project from '../api/Project';
import {Project} from '../types/Project';
import MessageValues from '../message/Message';

const EditComponent = (props: any) => {
    const navigate = useNavigate();
    const [projectTypes, setProjectType] = useState<ProjectType[]>([]);
    const [searchParams] = useSearchParams();
    const [form] = Form.useForm();
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let projectCode = searchParams.get('code');

    if (!projectCode) {
        projectCode = '';
    }

    const onFinish = async () => {
        const code = String(form.getFieldValue('code'));
        const projectName = form.getFieldValue('name');
        const status = form.getFieldValue('status');
        const type = form.getFieldValue('project_type_id');

        const project: Project = {
            code: code,
            name: projectName,
            status: status,
            project_type_id: type,
        };
        const statusResult = await ProjectApiService.updateProject(project, code);
        if (statusResult.status == 200) {
            message.success('Update project successfully', 2);
            setError(false);
            localStorage.removeItem('projectData');

            // Set a timeout to navigate to the '/project' route after 1.5 seconds
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            setError(true);
            const errorMessage = statusResult.error.response.data.message ? statusResult.error.response.data.message : '';
            if (errorMessage != '') {
                const foundMessage = MessageValues.find((message) => message.key === errorMessage);
                if (foundMessage) {
                    setErrorMessage(foundMessage.value);
                }
            }
        }
    };
    const handleCancelClick = () => {
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
            const projectType = await ProjectApiService.getProjectType();
            setProjectType(projectType);
            const project = await ProjectApiService.getDetailProject(String(projectCode));
            if (project.data) {
                form.setFieldsValue(project.data);
            } else {
                navigate('/');
            }
        };
        fetchData();
    }, [form, project]);


    return (
        <>
            <div className='create-component'>
                <Form
                    layout='horizontal'
                    scrollToFirstError
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    style={{
                        maxWidth: 800,
                        margin: 'auto',
                        paddingBlock: 32
                    }}
                    onFinish={onFinish}
                    form={form}
                    initialValues={{}}
                >
                    <Space size='large' direction='vertical' style={{width: '100%'}}>
                        <Form.Item label='Code' name='code' rules={[
                            {required: true, message: 'Code is required'},
                            {min: 6, max: 6, message: 'Number must be a 6-digit number'},
                            {pattern: /^[0-9]+$/, message: 'Project code must be a number'},
                        ]}>
                            <Input size='large' type='string' disabled/>
                        </Form.Item>
                        <Form.Item label='Project name' name='name'
                                   rules={[
                                       {required: true, message: 'Name is required'},
                                       {type: 'string', message: 'Project name must be a string'},
                                       {
                                           pattern: /^[a-zA-Z0-9\u3040-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\s]+$/,
                                           message: 'Project name must not contain special characters'
                                       },
                                   ]}>
                            <Input size='large' type='string' maxLength={200}/>
                        </Form.Item>
                        <Form.Item label='Type' name='project_type_id'
                                   rules={[{required: true, message: 'Type is required'}]}>
                            <Select size='large'>
                                {projectTypes && Array.isArray(projectTypes) && projectTypes.length > 0 ? (
                                    projectTypes.map((item: ProjectType) => (
                                        <Select.Option key={item.id} value={item.id} label={item.name}>
                                            {item.name}
                                        </Select.Option>
                                    ))
                                ) : (
                                    <Select.Option value=''>No project types available</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item label='Status' name='status'
                                   rules={[{required: true, message: 'Status is required'}]}>
                            <Radio.Group>
                                <Radio value={true}> Enabled </Radio>
                                <Radio value={false}> Disabled </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 2}}>
                            <Flex gap='80px' justify='center' align='center'>
                                <Button type='primary' htmlType='submit' size='large'>Add</Button>
                                <Button type='default' size='large' onClick={handleCancelClick}>Cancel</Button>
                            </Flex>
                        </Form.Item>
                    </Space>
                </Form>
                {isError &&
                    <Alert
                        message='Error'
                        description={errorMessage}
                        type='error'
                        showIcon
                        closable
                    />} {/* Display the error message */}
            </div>

        </>
    );
};

export default EditComponent;