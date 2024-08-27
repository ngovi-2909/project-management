import api from './config';
import {BASE_URL} from '../../contants/BaseURL';
import {Project} from '../types/Project';


const getProjectType = async () => {
    return await api.get(BASE_URL + '/api/v1/project-type').then(res => {
        const projectTypes: any = [];
        if (res?.data) {
            const lists = res.data;
            Object.keys(lists).forEach(key => {
                projectTypes.push({
                    id: lists[key].id,
                    name: lists[key].name,
                });
            });
        }

        return {status: res.status, data: projectTypes, error: ''};
    }).catch(err => {
        return {status: 500, data: [], error: err};
    });

};

const getProject = async () => {
    return await api.get(BASE_URL + '/api/v1/project').then(res => {
        return {status: res.status, data: res.data, error: ''};
    }).catch(err => {
        return {status: 500, data: [], error: err};
    });

};

const addProject = async (project: Project): Promise<{ status: number; error?: any }> => {
    try {
        return await api.post(BASE_URL + '/api/v1/project', project).then(res => {
            return {status: res.status, error: ''};
        }).catch(err => {
            return {status: 500, error: err};
        });

    } catch (error) {
        return {status: 406, error: error};
    }
};

const getDetailProject = async (code: string) => {
    try {
        const response = await api.get(BASE_URL + '/api/v1/project/find/' + code);

        return {status: response.status, error: '', data: response.data};
    } catch (error) {
        return {status: 500, error: error, data: []};
    }
};

const updateProject = async (project: Project, code: string): Promise<{ status: number; error?: any }> => {
    try {
        const response = await api.put(BASE_URL + '/api/v1/project/' + code, project);

        return {status: response.status, error: ''};
    } catch (error) {
        // @ts-ignore
        return {status: 500, error: error};
    }
};

const deleteProject = async (code: string) => {
    return await api.delete(BASE_URL + '/api/v1/project/' + code).then((response: any) => {
        return {status: response.status, error: ''};
    }).catch(err => {
        return {status: 500, error: 'Network Error'};
    });
};

const searchProject = async (name: string, type: number) => {
    const searchParams = new URLSearchParams();
    searchParams.append('name', name);
    searchParams.append('type', type.toString());
    try {
        const result = await api.get(BASE_URL + `/api/v1/project/search/?${searchParams.toString()}`);

        return {status: result.status, data: result.data, error: ''};
    } catch (err) {
        return {status: 500, data: [], error: 'Network Error'};
    }
};

const ProjectApiService = {
    getProject,
    getProjectType,
    addProject,
    getDetailProject,
    updateProject,
    deleteProject,
    searchProject,
};
export default ProjectApiService;