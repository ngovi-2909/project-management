import api from './config';
import {BASE_URL} from '../../contants/BaseURL';
import {Project} from '../types/Project';


const getProjectType = async () => {
    return await api.get(BASE_URL + '/api/v1/project-type').then((response: any) => {
        const projectTypes: any = [];
        if (response?.data) {
            const lists = response.data;
            Object.keys(lists).forEach(key => {
                projectTypes.push({
                    id: lists[key].id,
                    name: lists[key].name,
                });
            });
        }

        return projectTypes;
    });
};

const getProject = async () => {
    return await api.get(BASE_URL + '/api/v1/project').then((response: any) => {
        if (response?.data) {
            return response.data;
        }
    }).catch();
};

const addProject = async (project: Project): Promise<{ status: number; error?: any }> => {
    try {
        const response = await api.post(BASE_URL + '/api/v1/project', project);

        return {status: response.status};
    } catch (error) {
        // @ts-ignore
        return {status: 500, error: error};
    }
};

const getDetailProject = async (code: string) => {
    try{
        const response = await api.get(BASE_URL + '/api/v1/project/find/' + code);

        return {status: response.status, data: response.data};
    }catch(error){
        return {status: 500, error: error};
    }
};

const updateProject = async (project: Project, code: string): Promise<{ status: number; error?: any }> => {
    try {
        const response = await api.put(BASE_URL + '/api/v1/project/' + code, project);

        return {status: response.status};
    } catch (error) {
        // @ts-ignore
        return {status: 500, error: error};
    }
};

const deleteProject = async (code: string) => {
    return await api.delete(BASE_URL + '/api/v1/project/' + code).then((response: any) => {
        return response.status;
    }).catch();
};

const searchProject = async (name: string, type: number) => {
    const searchParams = new URLSearchParams();
    searchParams.append('name', name);
    searchParams.append('type', type.toString());

    return await api.get(BASE_URL + `/api/v1/project/search/?${searchParams.toString()}`).then((response: any) => {
        if (response.data && response.status == 200) {
            return response.data;
        }
    }).catch();
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