import axios from 'axios';

const baseUrl = '/api';

const getAllPersons = () => {
    const promise = axios.get(`${baseUrl}/persons`).then(result => result.data);
    return promise;
}

const createPerson = (person) => {
    const promise = axios.post(`${baseUrl}/persons`, person).then(result => result.data);
    return promise;
}

const updatePerson = (id, person) => {
    const promise = axios.put(`${baseUrl}/persons/${id}`, person).then(result => result.data);
    return promise;
}

const deletePerson = (id) => {
    const promise = axios.delete(`${baseUrl}/persons/${id}`).then(result => result.data);
    return promise;
}

export default {
    getAllPersons,
    createPerson,
    updatePerson,
    deletePerson
}