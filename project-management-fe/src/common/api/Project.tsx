import api from './config';
import {BASE_URL} from '../../contants/BaseURL';
import {Project} from '../types/Project';


const getProjectType = async () => {
    try{
        const result =  await api.get(BASE_URL + '/api/v1/project-type');
        const projectTypes: any = [];
        if (result?.data) {
            const lists = result.data;
            Object.keys(lists).forEach(key => {
                projectTypes.push({
                    id: lists[key].id,
                    name: lists[key].name,
                });
            });
        }

        return {status: result.status, data: projectTypes};

    }catch(err){
        console.log(err);

        return {status: 500, data: []};
    }
};

const getProject = async () => {
    try {
        const result = await api.get(BASE_URL + '/api/v1/project');

        return {status: result.status, data: result.data, error: null};

    } catch (err) {
        return {status: 500, data: null, error: 'Network Error'};
    }

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
    try {
        const response = await api.get(BASE_URL + '/api/v1/project/find/' + code);

        return {status: response.status, data: response.data};
    } catch (error) {
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
    }).catch(err => {
        return {status: 500, error: 'Network Error'};
    });
};

const searchProject = async (name: string, type: number) => {
    const searchParams = new URLSearchParams();
    searchParams.append('name', name);
    searchParams.append('type', type.toString());
    try{
        const result = await api.get(BASE_URL + `/api/v1/project/search/?${searchParams.toString()}`);
        if (result.data && result.status == 200) {
            return {status: result.status, data: result.data};
        }
    }catch(err){
        return {status: 500, data: []};
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